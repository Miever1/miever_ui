import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { NativeInputProps } from './interface';
import Icon from '../Icon';

const prefixCls = getPrefixCls('input');

/**
 * A basic text field for collecting user input, with optional trailing icon.
 *
 * ### Usage
 * ```jsx
 * import { Input } from 'miever_ui';
 *
 * <Input placeholder="Search" icon="magnifying-glass" size="lg" />
 * ```
 */
const Input: FunctionComponent<NativeInputProps> = ({
    className,
    size,
    disabled,
    style,
    icon,
    ...restProps
}) => {
    const classes = classNames(`${prefixCls}-wrapper`, className, {
        [`${prefixCls}-size-${size}`]: size,
        disabled,
    });

    return (
        <div className={classes} style={style}>
            {icon && (
                <span className={`${prefixCls}-icon`}>
                    <Icon icon={icon} size={size === 'lg' ? 'lg' : 'sm'} />
                </span>
            )}
            <input
                disabled={disabled}
                className={`${prefixCls}-inner`}
                {...(restProps as React.InputHTMLAttributes<HTMLInputElement>)}
            />
        </div>
    );
};

Input.displayName = 'Input';

export default Input;
