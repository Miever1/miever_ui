import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { NativeButtonProps } from './interface';

/**
 * A customizable button component.
 * 
 * @param {IButtonProps} props - Props for the button.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Specifies button size.
 * @param {'default' | 'primary' | 'danger' | 'link' | 'disabled' | 'secondary'} [props.styleType='default'] - Style variation of the button.
 * @param {boolean} [props.disabled=false] - Disables the button if true.
 * @returns {JSX.Element} The rendered button component.
 */
const Button: FunctionComponent<NativeButtonProps> = ({
    size = 'md',
    styleType = 'default',
    disabled = false,
    children,
    className,
    ...restProps
}) => {
    const classes = classNames('btn', className, {
        [`btn-${styleType}`]: styleType,
        [`btn-${size}`]: size,
        'disabled': disabled
    });

    return (
        <button
            className={classes}
            disabled={disabled}
            {...restProps}
        >
            {children}
        </button>
    );
};

export default Button;