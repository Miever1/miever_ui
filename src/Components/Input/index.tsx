import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { NativeInputProps } from "./interface";

/**
 * 
 * A basic widget for getting the user input is a text field.
 * 
 *  ```javascript
 *      import { Input } from 'miever_components';
 *  ```
 * 
 * @param InputProps 
 * @returns 
 */

const Input: FunctionComponent<NativeInputProps> = ({
    className,
    size,
    disabled,
    style,
    ...restProps
}) => {

    const classes = classNames('input-wrapper', className, {
        [`input-size-${size}`]: size,
        'disabled': disabled
    });
    
    return (
        <div className={classes} style={style}>
            <input
                disabled={disabled}
                className="input-inner"
                {...restProps}
            />
        </div>
        
    );
}

export default Input;