import { useEffect, useState } from 'react';
import { BREAKPOINTS, BREAKPOINT_KEYS, Breakpoint } from '../Designs/breakpoints';

export interface BreakpointState {
    /** The largest active breakpoint, e.g. 'md'. */
    breakpoint: Breakpoint;
    /** Current viewport width in pixels (0 during SSR). */
    width: number;
    /** True below the `md` breakpoint (< 768px). */
    isMobile: boolean;
    /** True between `md` and `lg` (768–991px). */
    isTablet: boolean;
    /** True at `lg` and above (≥ 992px). */
    isDesktop: boolean;
    /** `true` for every breakpoint at or below the current width. */
    up: Record<Breakpoint, boolean>;
}

const resolve = (width: number): Breakpoint => {
    let current: Breakpoint = 'xs';
    for (const key of BREAKPOINT_KEYS) {
        if (width >= BREAKPOINTS[key]) current = key;
    }
    return current;
};

const buildState = (width: number): BreakpointState => {
    const breakpoint = resolve(width);
    const up = BREAKPOINT_KEYS.reduce(
        (acc, key) => {
            acc[key] = width >= BREAKPOINTS[key];
            return acc;
        },
        {} as Record<Breakpoint, boolean>
    );
    return {
        breakpoint,
        width,
        isMobile: width < BREAKPOINTS.md,
        isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
        isDesktop: width >= BREAKPOINTS.lg,
        up,
    };
};

/**
 * Track the active responsive breakpoint. SSR-safe: returns the `xl` desktop
 * state on the server / first render, then syncs to the real viewport after
 * mount (avoids hydration mismatches in Gatsby/Next).
 *
 * ### Usage
 * ```tsx
 * const { isMobile, breakpoint, up } = useBreakpoint();
 * return isMobile ? <Drawer /> : <Menu />;
 * ```
 */
export const useBreakpoint = (): BreakpointState => {
    const [state, setState] = useState<BreakpointState>(() =>
        buildState(typeof window === 'undefined' ? BREAKPOINTS.xl : window.innerWidth)
    );

    useEffect(() => {
        const onResize = () => setState(buildState(window.innerWidth));
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return state;
};

export default useBreakpoint;
