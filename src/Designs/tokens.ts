/**
 * Design tokens — the documented source of truth for the library's visual
 * language. These values are mirrored on the SCSS side as maps and CSS custom
 * properties (see `Styles/_variables.scss` → `design-tokens` mixin). When you
 * change a scale here, update the matching SCSS block so JS and CSS stay in sync.
 *
 * Naming follows the common t-shirt / numeric scale used by Tailwind, Chakra and
 * Radix so the tokens read predictably to anyone who has used a modern UI kit.
 */

/* ── Color ──────────────────────────────────────────────────────────────── */

/**
 * Neutral ramp. A refined, near-monochrome grey scale tuned for the
 * large-whitespace, editorial surfaces the design system favours. `50` and
 * `950` extend the original `100–900` ramp at both ends.
 */
export const GRAY = {
  50: '#fbfcfd',
  100: '#f8f9fa',
  200: '#e9ecef',
  300: '#dee2e6',
  400: '#ced4da',
  500: '#adb5bd',
  600: '#6c757d',
  700: '#495057',
  800: '#343a40',
  900: '#212529',
  950: '#16191c',
} as const;

/** Brand / semantic accent colors. */
export const BRAND = {
  primary: '#0CC0DF',
  secondary: '#12aa9c',
  success: '#20c997',
  info: '#17a2b8',
  warning: '#fadb14',
  danger: '#dc3545',
} as const;

/* ── Typography ─────────────────────────────────────────────────────────── */

export const FONT_FAMILY = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
  mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
} as const;

/** Modular type scale (rem). Base = 16px. */
export const FONT_SIZE = {
  xs: '0.75rem', //   12px
  sm: '0.875rem', //  14px
  base: '1rem', //    16px
  lg: '1.125rem', //  18px
  xl: '1.25rem', //   20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem', //   48px
  '6xl': '3.75rem', // 60px
  '7xl': '4.5rem', //  72px
} as const;

export const FONT_WEIGHT = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const LINE_HEIGHT = {
  none: 1,
  tight: 1.15,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.65,
  loose: 2,
} as const;

/**
 * Letter spacing. Negative tracking on large display sizes is the editorial
 * signature; body copy stays at `normal`.
 */
export const LETTER_SPACING = {
  tighter: '-0.03em',
  tight: '-0.015em',
  normal: '0',
  wide: '0.02em',
  wider: '0.06em',
} as const;

/* ── Spacing ────────────────────────────────────────────────────────────── */

/** 4px-based spacing scale. Numeric keys map to multiples of 4px. */
export const SPACING = {
  0: '0',
  1: '0.25rem', //   4px
  2: '0.5rem', //    8px
  3: '0.75rem', //  12px
  4: '1rem', //     16px
  5: '1.25rem', //  20px
  6: '1.5rem', //   24px
  8: '2rem', //     32px
  10: '2.5rem', //  40px
  12: '3rem', //    48px
  16: '4rem', //    64px
  20: '5rem', //    80px
  24: '6rem', //    96px
  32: '8rem', //   128px
} as const;

/* ── Radius / Shadow / Z-index ──────────────────────────────────────────── */

export const RADIUS = {
  none: '0',
  sm: '0.25rem', //  4px
  md: '0.5rem', //   8px
  lg: '0.75rem', // 12px
  xl: '1rem', //    16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

/** Soft, layered elevation shadows tuned for light surfaces. */
export const SHADOW = {
  xs: '0 1px 2px rgba(16, 24, 40, 0.05)',
  sm: '0 1px 3px rgba(16, 24, 40, 0.10), 0 1px 2px rgba(16, 24, 40, 0.06)',
  md: '0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)',
  lg: '0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)',
  xl: '0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03)',
} as const;

/**
 * Centralized stacking order for overlay layers. Mirrors the `--z-*` custom
 * properties so JS-positioned portals and SCSS agree on z-index.
 */
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  drawer: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  message: 1080,
} as const;

/* ── Aggregate ──────────────────────────────────────────────────────────── */

/** All token scales under one namespace, for ergonomic destructuring. */
export const tokens = {
  GRAY,
  BRAND,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  LETTER_SPACING,
  SPACING,
  RADIUS,
  SHADOW,
  Z_INDEX,
} as const;

export type Gray = keyof typeof GRAY;
export type Brand = keyof typeof BRAND;
export type FontSize = keyof typeof FONT_SIZE;
export type FontWeight = keyof typeof FONT_WEIGHT;
export type Spacing = keyof typeof SPACING;
export type Radius = keyof typeof RADIUS;
export type Shadow = keyof typeof SHADOW;
export type ZIndex = keyof typeof Z_INDEX;
