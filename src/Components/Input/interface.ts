import { InputHTMLAttributes } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type InputSizes = 'sm' | 'md' | 'lg';

export interface InputProps {
    /** Input size: sm, md, or lg */
    size?: InputSizes;
    /** Disabled state of the input */
    disabled?: boolean;
    /** Optional trailing FontAwesome icon */
    icon?: IconProp;
}

export type NativeInputProps = InputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
