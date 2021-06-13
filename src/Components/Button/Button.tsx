import React, { FunctionComponent, } from 'react';
import classNames from 'classnames';
import { NativeButtonProps } from './interface';

/**
 * 
 * To trigger an operation.
 * 
 *  ```javascript
 *      import { Button } from 'miever_components';
 *  ```
 * @param NativeButtonProps 
 * @returns 
 */

const Button: FunctionComponent<NativeButtonProps> = (props) => {
    const { size, styleType, disabled = false, children, className, ...restProps } = props;
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
    size: 'md',
    styleType: 'default',
    disabled: false,
}

export default Button;