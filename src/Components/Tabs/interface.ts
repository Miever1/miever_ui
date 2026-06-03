import { CSSProperties, ReactNode } from 'react';

export interface TabItem {
    /** Unique key for the tab. */
    key: string;
    /** Tab label. */
    label: ReactNode;
    /** Tab panel content. */
    children: ReactNode;
    /** Disable this tab. */
    disabled?: boolean;
}

export interface TabsProps {
    /** Tab definitions. */
    items: TabItem[];
    /** Controlled active key. */
    activeKey?: string;
    /** Default active key (uncontrolled). */
    defaultActiveKey?: string;
    /** Called when the active tab changes. */
    onChange?: (key: string) => void;
    /** Additional CSS classes. */
    className?: string;
    /** Inline styles for the tabs root. */
    style?: CSSProperties;
}
