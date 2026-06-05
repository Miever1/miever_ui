import React, { forwardRef, useId } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { NativeInputProps } from './interface';
import Icon from '../Icon';

const prefixCls = getPrefixCls('input');

/**
 * A basic text field for collecting user input, with optional trailing icon.
 * Forwards its ref to the underlying `<input>` element.
 *
 * ### Usage
 * ```jsx
 * import { Input } from 'miever_ui';
 *
 * <Input placeholder="Search" icon="magnifying-glass" size="lg" />
 * ```
 */
const Input = forwardRef<HTMLInputElement, NativeInputProps>(
    ({ className, size, disabled, style, icon, label, id, ...restProps }, ref) => {
        const generatedId = useId();
        // Only allocate an id when we actually need one to link a <label>.
        const inputId = id ?? (label ? generatedId : undefined);

        const classes = classNames(`${prefixCls}-wrapper`, !label && className, {
            [`${prefixCls}-size-${size}`]: size,
            disabled,
        });

        const field = (
            <div className={classes} style={label ? undefined : style}>
                {icon && (
                    <span className={`${prefixCls}-icon`}>
                        <Icon icon={icon} size={size === 'lg' ? 'lg' : 'sm'} />
                    </span>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    disabled={disabled}
                    className={`${prefixCls}-inner`}
                    {...(restProps as React.InputHTMLAttributes<HTMLInputElement>)}
                />
            </div>
        );

        if (!label) return field;

        return (
            <div className={classNames(`${prefixCls}-field`, className)} style={style}>
                <label className={`${prefixCls}-label`} htmlFor={inputId}>
                    {label}
                </label>
                {field}
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
