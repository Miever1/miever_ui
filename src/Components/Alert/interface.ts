import { CSSProperties, ReactNode } from 'react';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface AlertProps {
    /** Semantic type, controlling color and default icon. */
    type?: AlertType;
    /** Alert title / main message. */
    message: ReactNode;
    /** Optional supporting description. */
    description?: ReactNode;
    /** Show a leading status icon. */
    showIcon?: boolean;
    /** Allow the user to dismiss the alert. */
    closable?: boolean;
    /** Called after the alert is closed. */
    onClose?: () => void;
    /** Additional CSS classes. */
    className?: string;
    /** Inline styles for the alert root. */
    style?: CSSProperties;
}
