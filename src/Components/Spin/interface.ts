import { CSSProperties, ReactNode } from 'react';

export type SpinSize = 'sm' | 'md' | 'lg';

export interface SpinProps {
    /** Whether the spinner is active. */
    spinning?: boolean;
    /** Spinner size. */
    size?: SpinSize;
    /** Optional tip text shown beneath the spinner. */
    tip?: ReactNode;
    /** When children are provided, the spinner overlays them. */
    children?: ReactNode;
    /** Additional CSS classes. */
    className?: string;
    /** Inline styles for the spin root. */
    style?: CSSProperties;
}
