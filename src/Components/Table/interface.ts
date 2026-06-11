import { CSSProperties, ReactNode } from 'react';

export type TableAlign = 'left' | 'center' | 'right';
export type TableSize = 'sm' | 'md';
export type SortOrder = 'asc' | 'desc';

export interface TableColumn<T> {
    /** Unique column key */
    key: string;
    /** Column header content */
    title: ReactNode;
    /** Field of the record to display when `render` is not provided */
    dataIndex?: keyof T;
    /** Custom cell renderer */
    render?: (record: T, index: number) => ReactNode;
    /** Cell text alignment */
    align?: TableAlign;
    /** Fixed column width */
    width?: number | string;
    /** Comparator enabling client-side sorting for this column */
    sorter?: (a: T, b: T) => number;
}

export interface TableRowSelection<T> {
    /** Controlled list of selected row keys. */
    selectedKeys: string[];
    /** Called with the next list of selected keys. */
    onChange: (keys: string[]) => void;
    /** Disable selection for a row. */
    getDisabled?: (record: T) => boolean;
}

export interface TableProps<T> {
    /** Column definitions */
    columns: TableColumn<T>[];
    /** Row data */
    dataSource: T[];
    /** Unique key per row — a field name or an extractor function */
    rowKey: keyof T | ((record: T) => string);
    /** Density */
    size?: TableSize;
    /** Show a loading overlay */
    loading?: boolean;
    /** Content shown when `dataSource` is empty */
    emptyText?: ReactNode;
    /** Row click handler — also enables the hover/pointer affordance */
    onRowClick?: (record: T) => void;
    /** Adds a checkbox column for multi-row selection. */
    rowSelection?: TableRowSelection<T>;
    /** Additional CSS classes */
    className?: string;
    /** Inline styles for the root */
    style?: CSSProperties;
}
