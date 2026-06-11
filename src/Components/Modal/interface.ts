import { CSSProperties, ReactNode } from 'react';

export interface ModalProps {
    /** Whether the modal is visible. */
    open: boolean;
    /** Modal title. */
    title?: ReactNode;
    /** Body content. */
    children?: ReactNode;
    /** Footer content. Pass `null` to hide the default footer. */
    footer?: ReactNode;
    /** OK button text. */
    okText?: ReactNode;
    /** Cancel button text. */
    cancelText?: ReactNode;
    /** Called when the OK button is clicked. */
    onOk?: () => void;
    /** Show a loading spinner on the OK button and disable it. */
    okLoading?: boolean;
    /** Disable the OK button. */
    okDisabled?: boolean;
    /** Called when the modal requests to close (cancel, overlay, Esc, close icon). */
    onClose?: () => void;
    /** Close when the overlay is clicked. */
    maskClosable?: boolean;
    /** Show the header close icon. */
    closable?: boolean;
    /** Modal width. */
    width?: number | string;
    /** Additional CSS classes for the modal panel. */
    className?: string;
    /** Inline styles for the modal panel. */
    style?: CSSProperties;
}
