import { CSSProperties, ReactNode } from 'react';
import { BRAND_COLORS } from '../../Designs';

export type BadgeTheme = keyof typeof BRAND_COLORS;

export interface BadgeProps {
    /** Number to show in the badge */
    count?: number;
    /** Cap the displayed number; larger values render as `{maxCount}+` */
    maxCount?: number;
    /** Render a small dot instead of a count */
    dot?: boolean;
    /** Show the badge even when count is 0 */
    showZero?: boolean;
    /** Color theme drawn from the design tokens */
    theme?: BadgeTheme;
    /** Element the badge is attached to. When omitted the badge renders standalone. */
    children?: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Inline styles for the badge root */
    style?: CSSProperties;
}
