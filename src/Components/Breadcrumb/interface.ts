import { CSSProperties, ReactNode } from 'react';

export interface BreadcrumbItem {
    /** Item label. */
    label: ReactNode;
    /** Optional link target. When set, the item renders as an anchor. */
    href?: string;
    /** Click handler (e.g. for client-side routing). */
    onClick?: () => void;
}

export interface BreadcrumbProps {
    /** Breadcrumb items, ordered root → current. */
    items: BreadcrumbItem[];
    /** Separator between items. */
    separator?: ReactNode;
    /** Additional CSS classes. */
    className?: string;
    /** Inline styles for the breadcrumb root. */
    style?: CSSProperties;
}
