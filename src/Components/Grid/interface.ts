import { CSSProperties, ReactNode } from 'react';
import type { Breakpoint } from '../../Designs/breakpoints';

export type FlexJustify =
    | 'start'
    | 'end'
    | 'center'
    | 'space-between'
    | 'space-around';
export type FlexAlign = 'top' | 'middle' | 'bottom' | 'stretch';

export interface RowProps {
    /** Horizontal gutter in pixels between columns (also used as vertical gutter when wrapping). */
    gutter?: number;
    /** Horizontal arrangement of columns. */
    justify?: FlexJustify;
    /** Vertical alignment of columns. */
    align?: FlexAlign;
    /** Allow columns to wrap onto multiple lines. */
    wrap?: boolean;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

/**
 * Per-breakpoint column span. The base `span` applies from `xs` up; any
 * breakpoint key (`sm`–`xxl`) overrides it at that width and above.
 */
export type ColResponsive = Partial<Record<Breakpoint, number>>;

export interface ColProps extends ColResponsive {
    /** Number of 24 grid columns to span (base, applies at all widths). */
    span?: number;
    /** Number of columns to offset from the left. */
    offset?: number;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
