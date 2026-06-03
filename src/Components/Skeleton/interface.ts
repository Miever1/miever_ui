import { CSSProperties } from 'react';

export interface SkeletonProps {
    /** Render an avatar placeholder. */
    avatar?: boolean;
    /** Render a title placeholder. */
    title?: boolean;
    /** Number of paragraph rows (0 to disable). */
    paragraph?: number;
    /** Apply a shimmer animation. */
    active?: boolean;
    /** When false, render children instead of the placeholder. */
    loading?: boolean;
    /** Content shown when not loading. */
    children?: React.ReactNode;
    /** Additional CSS classes. */
    className?: string;
    /** Inline styles for the skeleton root. */
    style?: CSSProperties;
}
