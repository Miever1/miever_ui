import { ReactNode } from 'react';
import { BaseProps } from '../../types';

export interface PageHeaderProps extends BaseProps {
    /** The main heading. */
    title: ReactNode;
    /** Supporting text below the title. */
    subtitle?: ReactNode;
    /** A small label above the title (e.g. a section number or category). */
    eyebrow?: ReactNode;
    /** Content aligned to the trailing edge of the title row (e.g. actions). */
    actions?: ReactNode;
    /** Heading level rendered for the title. @default 1 */
    level?: 1 | 2 | 3;
    /** Text alignment. @default 'left' */
    align?: 'left' | 'center';
}
