import { ButtonHTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../../types';

/**
 * Available button sizes.
 * - 'sm' - Small
 * - 'md' - Medium (default)
 * - 'lg' - Large
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Visual / semantic button variants.
 * - 'default' - Default styling
 * - 'primary' - Primary action button
 * - 'danger' - Warning or danger button
 * - 'link' - Link-styled button
 * - 'secondary' - Secondary action button
 */
export type ButtonType = 'default' | 'primary' | 'danger' | 'link' | 'secondary';

/**
 * Props for the Button component.
 */
export interface IButtonProps extends BaseProps {
    /** Button size: sm, md, or lg. @default 'md' */
    size?: ButtonSize;
    /** Visual / semantic variant of the button. @default 'default' */
    type?: ButtonType;
    /**
     * The native HTML `type` attribute of the underlying `<button>`.
     * Kept separate from the visual `type` prop (mirrors Ant Design's API).
     * @default 'button'
     */
    htmlType?: 'button' | 'submit' | 'reset';
    /** Disabled state of the button. */
    disabled?: boolean;
    /**
     * Loading state — shows a spinner and disables the button.
     * @default false
     */
    loading?: boolean;
    /** Child elements within the button. */
    children?: ReactNode;
}

/**
 * Combined type for Button including native HTML button attributes. The native
 * `type` attribute is replaced by {@link IButtonProps.htmlType}.
 */
export type NativeButtonProps = IButtonProps &
    Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>;
