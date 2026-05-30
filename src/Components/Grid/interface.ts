import { CSSProperties, ReactNode } from 'react';

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

export interface ColProps {
    /** Number of 24 grid columns to span. */
    span?: number;
    /** Number of columns to offset from the left. */
    offset?: number;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
