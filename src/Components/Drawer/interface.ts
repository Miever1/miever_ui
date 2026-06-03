import { CSSProperties, ReactNode } from 'react';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
    /** Whether the drawer is visible. */
    open: boolean;
    /** Drawer title. */
    title?: ReactNode;
    /** Body content. */
    children?: ReactNode;
    /** Edge the drawer slides in from. */
    placement?: DrawerPlacement;
    /** Width (left/right) or height (top/bottom). */
    size?: number | string;
    /** Called when the drawer requests to close (overlay, Esc, close icon). */
    onClose?: () => void;
    /** Close when the overlay is clicked. */
    maskClosable?: boolean;
    /** Show the header close icon. */
    closable?: boolean;
    /** Additional CSS classes for the drawer panel. */
    className?: string;
    /** Inline styles for the drawer panel. */
    style?: CSSProperties;
}
