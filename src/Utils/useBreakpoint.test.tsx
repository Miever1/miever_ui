import { renderHook, act } from '@testing-library/react';
import { useBreakpoint } from './useBreakpoint';

const setWidth = (width: number) => {
    (window as { innerWidth: number }).innerWidth = width;
    window.dispatchEvent(new Event('resize'));
};

describe('useBreakpoint', () => {
    it('resolves the mobile breakpoint below md', () => {
        const { result } = renderHook(() => useBreakpoint());
        act(() => setWidth(375));
        expect(result.current.breakpoint).toBe('xs');
        expect(result.current.isMobile).toBe(true);
        expect(result.current.isTablet).toBe(false);
        expect(result.current.isDesktop).toBe(false);
    });

    it('resolves the tablet range (md–lg)', () => {
        const { result } = renderHook(() => useBreakpoint());
        act(() => setWidth(800));
        expect(result.current.breakpoint).toBe('md');
        expect(result.current.isTablet).toBe(true);
        expect(result.current.isMobile).toBe(false);
    });

    it('resolves desktop breakpoints and the up map', () => {
        const { result } = renderHook(() => useBreakpoint());
        act(() => setWidth(1280));
        expect(result.current.breakpoint).toBe('xl');
        expect(result.current.isDesktop).toBe(true);
        expect(result.current.up.md).toBe(true);
        expect(result.current.up.xl).toBe(true);
        expect(result.current.up.xxl).toBe(false);
    });

    it('reacts to viewport resize', () => {
        const { result } = renderHook(() => useBreakpoint());
        act(() => setWidth(1500));
        expect(result.current.breakpoint).toBe('xxl');
        act(() => setWidth(500));
        expect(result.current.breakpoint).toBe('xs');
    });
});
