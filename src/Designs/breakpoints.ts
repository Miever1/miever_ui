/**
 * Responsive breakpoints shared across the library (TS and SCSS).
 *
 * Each value is the **minimum** viewport width (px) at which the breakpoint
 * becomes active, following the common mobile-first scale used by Bootstrap
 * and Ant Design. The matching SCSS map lives in `Styles/_variables.scss` —
 * keep both in sync.
 *
 * - xs:  < 576   (phones, portrait)
 * - sm:  ≥ 576   (phones, landscape)
 * - md:  ≥ 768   (tablets)
 * - lg:  ≥ 992   (small laptops)
 * - xl:  ≥ 1200  (desktops)
 * - xxl: ≥ 1400  (large desktops)
 */
export const BREAKPOINTS = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/** Ordered breakpoint keys, smallest to largest. */
export const BREAKPOINT_KEYS = Object.keys(BREAKPOINTS) as Breakpoint[];
