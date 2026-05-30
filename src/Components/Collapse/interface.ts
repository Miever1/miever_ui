import { CSSProperties, ReactNode } from 'react';

export interface CollapseItem {
    /** Unique key for the panel. */
    key: string;
    /** Panel header. */
    header: ReactNode;
    /** Panel content. */
    children: ReactNode;
    /** Disable this panel. */
    disabled?: boolean;
}

export interface CollapseProps {
    /** Panel definitions. */
    items: CollapseItem[];
    /** Controlled active keys. */
    activeKeys?: string[];
    /** Default active keys (uncontrolled). */
    defaultActiveKeys?: string[];
    /** Only allow one panel open at a time. */
    accordion?: boolean;
    /** Called when the open panels change. */
    onChange?: (keys: string[]) => void;
    /** Additional CSS classes. */
    className?: string;
    /** Inline styles for the collapse root. */
    style?: CSSProperties;
}
