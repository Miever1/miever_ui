import { CSSProperties, ReactNode } from 'react';
import { BRAND_COLORS } from '../../Designs';

export type StatisticTheme = keyof typeof BRAND_COLORS;
export type StatisticTrend = 'up' | 'down';

export interface StatisticProps {
    /** Label shown above the value */
    title?: ReactNode;
    /** The value to display */
    value?: ReactNode;
    /** Decimal places applied when `value` is a number */
    precision?: number;
    /** Node rendered before the value (e.g. a currency symbol) */
    prefix?: ReactNode;
    /** Node rendered after the value (e.g. `%`) */
    suffix?: ReactNode;
    /** Value color drawn from the design tokens */
    theme?: StatisticTheme;
    /** Direction arrow rendered next to the trend value */
    trend?: StatisticTrend;
    /** Secondary trend text (e.g. `+12% vs last week`) */
    trendValue?: ReactNode;
    /** Show a loading skeleton instead of the value */
    loading?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Inline styles for the root */
    style?: CSSProperties;
}
