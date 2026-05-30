import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { NativeInputProps } from './interface';
import Box from '../Box';
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
        <Box className={classes} style={style}>
            {icon && (
                <Box className={`${prefixCls}-icon`}>
                    <Icon icon={icon} size={size === 'lg' ? 'lg' : 'sm'} />
                </Box>
            )}
            <input
                disabled={disabled}
                className={`${prefixCls}-inner`}
                {...(restProps as React.InputHTMLAttributes<HTMLInputElement>)}
            />
        </Box>
    );
};

Input.displayName = 'Input';

export default Input;
