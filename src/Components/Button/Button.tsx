import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { NativeButtonProps } from './interface';

const prefixCls = getPrefixCls('btn');

/**
 * A versatile and customizable button component for various use cases.
 *
 * ### Usage
 * ```jsx
 * import { Button } from 'miever_ui';
 *
 * <Button type="primary" size="lg">Click Me</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, NativeButtonProps>(
    (
        {
            size = 'md',
            type = 'default',
            htmlType = 'button',
            disabled = false,
            children,
            className,
            ...restProps
        },
        ref,
    ) => {
        const classes = classNames(prefixCls, className, {
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${size}`]: size,
            disabled,
        });

        return (
            <button
                ref={ref}
                type={htmlType}
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = 'Button';

export default Button;
