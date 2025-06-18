import { InputHTMLAttributes } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type InputSizes = 'sm' | 'md' | 'lg';

export interface InputProps {
    size?: InputSizes,
    disabled?: boolean,
    icon?: IconProp,
}

export type NativeInputProps = InputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;