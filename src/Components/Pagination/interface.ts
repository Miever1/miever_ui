import { CSSProperties } from 'react';

export interface PaginationProps {
    /** Total number of items. */
    total: number;
    /** Items per page. */
    pageSize?: number;
    /** Controlled current page (1-based). */
    current?: number;
    /** Default current page (uncontrolled). */
    defaultCurrent?: number;
    /** Called when the page changes. */
    onChange?: (page: number) => void;
    /** Additional CSS classes. */
    className?: string;
    /** Inline styles for the pagination root. */
    style?: CSSProperties;
}
