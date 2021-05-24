import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
    Large = 'lg',
    Middle = 'md',
    Small = 'sm',
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link',
    Disabled = 'disabled',
    Secondary = 'secondary'
}
export interface IButtonProps {
    className?: string,
    size?: ButtonSize,
    styleType?: ButtonType,
    disabled?: boolean,
    children?: React.ReactNode
}

export type NativeButtonProps = IButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
const Button: React.FunctionComponent<NativeButtonProps> = (props) => {
    const { size, styleType, disabled, children, className, ...restProps } = props;
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
}

Button.defaultProps = {
    size: ButtonSize.Middle,
    styleType: ButtonType.Default,
    disabled: false 
}

export default Button;