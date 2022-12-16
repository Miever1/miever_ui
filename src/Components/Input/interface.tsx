import { InputHTMLAttributes } from 'react';

export type InputSizes = 'sm' | 'lg';

export interface InputProps {
    size?: InputSizes,
    disabled?: boolean
}

export type NativeInputProps = InputProps & Omit<InputHTMLAttributes<HTMLElement>, "size">;