import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { NativeInputProps } from "./interface";
import Box from '../Box';
import Icon from '../Icon';

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
    icon,
    ...restProps
}) => {

    const classes = classNames('input-wrapper', className, {
        [`input-size-${size}`]: size,
        'disabled': disabled
    });
    
    return (
        <Box className={classes} style={style}>
            {icon && (
                <Box className="icon-wrapper">
                    <Icon
                        icon={icon}
                        size={size === 'lg' ? 'lg' : 'sm'}
                    />
                </Box>
            )}
            <input
                disabled={disabled}
                className="input-inner"
                {...(restProps as React.InputHTMLAttributes<HTMLInputElement>)}
            />
        </Box>
        
    );
}

export default Input;