import { CSSProperties, ReactNode } from 'react';
import { BRAND_COLORS } from '../../Designs';

export type TimelineColor = keyof typeof BRAND_COLORS;

export interface TimelineItem {
    /** Node content. */
    children: ReactNode;
    /** Dot color, drawn from the design tokens. */
    color?: TimelineColor;
    /** Custom dot node (overrides color). */
    dot?: ReactNode;
    /** Optional label shown opposite the content (e.g. a date). */
    label?: ReactNode;
}

export interface TimelineProps {
    /** Timeline items. */
    items: TimelineItem[];
    /** Position of the content relative to the line. */
    mode?: 'left' | 'alternate';
    /** Additional CSS classes. */
    className?: string;
    /** Inline styles for the timeline root. */
    style?: CSSProperties;
}
