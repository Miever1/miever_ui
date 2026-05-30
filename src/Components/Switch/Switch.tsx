import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { SwitchProps } from './interface';

const prefixCls = getPrefixCls('switch');

/**
 * Switch toggles a single boolean — e.g. a dark-mode toggle.
 *
 * ### Usage
 * ```jsx
 * import { Switch } from 'miever_ui';
 *
 * <Switch defaultChecked onChange={setDark} />
 * <Switch checkedChildren="On" uncheckedChildren="Off" />
 * ```
 */
const Switch: FunctionComponent<SwitchProps> = ({
    checked,
    defaultChecked = false,
    disabled = false,
    size = 'md',
    checkedChildren,
    uncheckedChildren,
    onChange,
    className,
    style,
}) => {
    const [internal, setInternal] = useState(defaultChecked);
    const isChecked = checked ?? internal;

    const handleClick = () => {
        if (disabled) return;
        const next = !isChecked;
        if (checked === undefined) {
            setInternal(next);
        }
        onChange?.(next);
    };

    const classes = classNames(prefixCls, `${prefixCls}-${size}`, className, {
        checked: isChecked,
        disabled,
    });

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isChecked}
            disabled={disabled}
            className={classes}
            style={style}
            onClick={handleClick}
        >
            <span className={`${prefixCls}-inner`}>
                {isChecked ? checkedChildren : uncheckedChildren}
            </span>
            <span className={`${prefixCls}-handle`} />
        </button>
    );
};

Switch.displayName = 'Switch';

export default Switch;
