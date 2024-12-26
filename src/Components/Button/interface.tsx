import { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Available button sizes.
 * - 'sm' - Small
 * - 'md' - Medium (default)
 * - 'lg' - Large
 */
export type ButtonSizes = 'sm' | 'md' | 'lg';

/**
 * Available button styles.
 * - 'default' - Default styling
 * - 'primary' - Primary action button
 * - 'danger' - Warning or danger button
 * - 'link' - Link-styled button
 * - 'secondary' - Secondary action button
 */
export type ButtonStyleTypes = 'default' | 'primary' | 'danger' | 'link' | 'secondary';

/**
 * Props for the Button component.
 */
export interface IButtonProps {
    /** Additional CSS classes */
    className?: string;
    /** Button size: sm, md, or lg */
    size?: ButtonSizes;
    /** Styling type for the button */
    styleType?: ButtonStyleTypes;
    /** Disabled state of the button */
    disabled?: boolean;
    /** Child elements within the button */
    children?: ReactNode;
}

/**
 * Combined type for Button component including native HTML button attributes.
 */
export type NativeButtonProps = IButtonProps & ButtonHTMLAttributes<HTMLElement>;