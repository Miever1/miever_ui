import { CSSProperties, ReactNode } from 'react';

export interface SwitchProps {
    /** Controlled checked state. */
    checked?: boolean;
    /** Default checked state (uncontrolled). */
    defaultChecked?: boolean;
    /** Disable the switch. */
    disabled?: boolean;
    /** Size of the switch. */
    size?: 'sm' | 'md';
    /** Content shown when checked. */
    checkedChildren?: ReactNode;
    /** Content shown when unchecked. */
    uncheckedChildren?: ReactNode;
    /** Called when the state changes. */
    onChange?: (checked: boolean) => void;
    /** Additional CSS classes. */
    className?: string;
    /** Inline styles for the switch root. */
    style?: CSSProperties;
}
