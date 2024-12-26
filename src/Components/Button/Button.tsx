import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { NativeButtonProps } from './interface';

/**
 *
 * A versatile and customizable button component for various use cases.
 *
 * ### Usage
 * ```javascript
 * import { Button } from 'miever_components';
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