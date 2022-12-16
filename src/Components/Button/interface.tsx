import { ButtonHTMLAttributes, ReactNode } from 'react';

export type sizes = 'sm' | 'md' | 'lg';
export type styleTypes = 'default' | 'primary' | 'danger' | 'link' | 'disabled' | 'secondary';

export interface IButtonProps {
    className?: string,
    size?: sizes,
    styleType?: styleTypes,
    disabled?: boolean,
    children?: ReactNode
}

export type NativeButtonProps = IButtonProps & ButtonHTMLAttributes<HTMLElement>;
