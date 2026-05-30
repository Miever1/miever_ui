import { CSSProperties, ReactNode } from 'react';

export type DividerDirection = 'horizontal' | 'vertical';

export interface DividerProps {
    /** Orientation of the divider */
    direction?: DividerDirection;
    /** Render the line as dashed instead of solid */
    dashed?: boolean;
    /** Optional text rendered in the middle (horizontal only) */
    children?: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Inline styles for the divider root */
    style?: CSSProperties;
}
