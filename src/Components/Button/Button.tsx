import React, { FunctionComponent } from 'react';
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
 * <Button styleType="primary" size="lg">Click Me</Button>
 * ```
 */
const Button: FunctionComponent<NativeButtonProps> = ({
    size = 'md',
    styleType = 'default',
    disabled = false,
    children,
    className,
    ...restProps
}) => {
    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-${styleType}`]: styleType,
        [`${prefixCls}-${size}`]: size,
        disabled,
    });

    return (
        <button className={classes} disabled={disabled} {...restProps}>
            {children}
        </button>
    );
};

Button.displayName = 'Button';

export default Button;
