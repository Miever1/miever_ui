import React, { forwardRef, useContext, useState } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { RadioProps } from './interface';
import { RadioGroupContext } from './context';

const prefixCls = getPrefixCls('radio');

/**
 * A radio selects exactly one option from a set. Use it inside
 * {@link RadioGroup} for mutually-exclusive choices. Forwards its ref to the
 * underlying `<input type="radio">`.
 *
 * ### Usage
 * ```jsx
 * import { Radio } from 'miever_ui';
 *
 * <Radio.Group defaultValue="a">
 *   <Radio value="a">Option A</Radio>
 *   <Radio value="b">Option B</Radio>
 * </Radio.Group>
 * ```
 */
const Radio = forwardRef<HTMLInputElement, RadioProps>(
    (
        {
            checked,
            defaultChecked = false,
            disabled = false,
            value,
            children,
            className,
            style,
            onChange,
            ...restProps
        },
        ref,
    ) => {
        const group = useContext(RadioGroupContext);
        const [internal, setInternal] = useState(defaultChecked);

        const isChecked =
            group && value !== undefined
                ? group.value === value
                : checked ?? internal;

        const isDisabled = disabled || group?.disabled || false;

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (isDisabled) return;
            if (group && value !== undefined) {
                group.onChange(value);
            } else if (checked === undefined) {
                setInternal(true);
            }
            onChange?.(true, event);
        };

        const wrapperClasses = classNames(`${prefixCls}-wrapper`, className, {
            checked: isChecked,
            disabled: isDisabled,
        });

        return (
            <label className={wrapperClasses} style={style}>
                <span className={prefixCls}>
                    <input
                        ref={ref}
                        type="radio"
                        className={`${prefixCls}-input`}
                        checked={isChecked}
                        disabled={isDisabled}
                        value={value}
                        name={group?.name}
                        onChange={handleChange}
                        {...restProps}
                    />
                    <span className={`${prefixCls}-dot`} />
                </span>
                {children !== undefined && (
                    <span className={`${prefixCls}-label`}>{children}</span>
                )}
            </label>
        );
    },
);

Radio.displayName = 'Radio';

export default Radio;
