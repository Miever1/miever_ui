import { ReactNode, TextareaHTMLAttributes } from 'react';

export interface TextareaProps {
    /** Disabled state of the textarea */
    disabled?: boolean;
    /**
     * Optional visible label rendered as a `<label>` associated with the
     * textarea via `htmlFor`. When omitted, pass `aria-label` instead.
     */
    label?: ReactNode;
    /** Allow vertical resizing by the user */
    resizable?: boolean;
}

export type NativeTextareaProps = TextareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>;
