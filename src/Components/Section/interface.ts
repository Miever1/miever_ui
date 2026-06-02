import { CSSProperties, ReactNode } from 'react';
import type { TextAlign } from '../Typography/interface';

export interface SectionProps {
    /** Section heading. */
    title?: ReactNode;
    /** Supporting text shown under the title. */
    subtitle?: ReactNode;
    /** Alignment of the title/subtitle block. */
    align?: TextAlign;
    /** Heading level for the title (maps to Typography.Title). */
    titleLevel?: 1 | 2 | 3 | 4 | 5;
    /** Show a divider below the header. */
    divider?: boolean;
    /** Section content. */
    children?: ReactNode;
    /** Additional CSS classes. */
    className?: string;
    /** Inline styles for the section root. */
    style?: CSSProperties;
}
