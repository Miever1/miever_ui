import { InputHTMLAttributes, ReactNode } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type InputSizes = 'sm' | 'md' | 'lg';

export interface InputProps {
    /** Input size: sm, md, or lg */
    size?: InputSizes;
    /** Disabled state of the input */
    disabled?: boolean;
    /** Optional trailing FontAwesome icon */
    icon?: IconProp;
    /**
     * Optional visible label rendered as a `<label>` associated with the input
     * via `htmlFor`. When omitted, no label element is rendered — pass
     * `aria-label` instead for an accessible name on a label-less field.
     */
    label?: ReactNode;
}

export type NativeInputProps = InputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
