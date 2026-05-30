import { CSSProperties } from 'react';

export type ProgressStatus = 'normal' | 'success' | 'warning' | 'danger';

export interface ProgressProps {
    /** Completion percentage, 0–100. */
    percent: number;
    /** Visual variant. */
    type?: 'line' | 'circle';
    /** Status color. */
    status?: ProgressStatus;
    /** Show the percentage label. */
    showInfo?: boolean;
    /** Thickness of the bar (line) or stroke (circle), in pixels. */
    strokeWidth?: number;
    /** Diameter of the circle, in pixels (circle type only). */
    size?: number;
    /** Additional CSS classes. */
    className?: string;
    /** Inline styles for the progress root. */
    style?: CSSProperties;
}
