import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Icon from '../Icon';
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
            loading = false,
            children,
            className,
            ...restProps
        },
        ref,
    ) => {
        const isDisabled = disabled || loading;
        const classes = classNames(prefixCls, className, {
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-loading`]: loading,
            disabled: isDisabled,
        });

        return (
            <button
                ref={ref}
                type={htmlType}
                className={classes}
                disabled={isDisabled}
                aria-busy={loading || undefined}
                {...restProps}
            >
                {loading && (
                    <Icon
                        icon="spinner"
                        spin
                        className={`${prefixCls}-loading-icon`}
                        data-testid="btn-loading-icon"
                    />
                )}
                {children}
            </button>
        );
    },
);

Button.displayName = 'Button';

export default Button;
