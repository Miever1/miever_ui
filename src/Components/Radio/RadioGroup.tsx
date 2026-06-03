import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { RadioGroupProps } from './interface';
import { RadioGroupContext, RadioValue } from './context';
import Radio from './Radio';

const prefixCls = getPrefixCls('radio-group');

/**
 * Groups {@link Radio}s into a single-select control. Provide options
 * declaratively via `options`, or render `<Radio value=…>` children.
 *
 * ### Usage
 * ```jsx
 * import { Radio } from 'miever_ui';
 *
 * <Radio.Group
 *   options={['Small', 'Medium', 'Large']}
 *   defaultValue="Medium"
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
const RadioGroup: React.FC<RadioGroupProps> = ({
    value,
    defaultValue,
    options,
    disabled,
    name,
    direction = 'horizontal',
    onChange,
    children,
    className,
    style,
}) => {
    const [internal, setInternal] = useState<RadioValue | undefined>(defaultValue);
    const selected = value ?? internal;

    const handleChange = useCallback(
        (next: RadioValue) => {
            if (value === undefined) {
                setInternal(next);
            }
            onChange?.(next);
        },
        [value, onChange],
    );

    const contextValue = useMemo(
        () => ({ value: selected, onChange: handleChange, disabled, name }),
        [selected, handleChange, disabled, name],
    );

    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-vertical`]: direction === 'vertical',
    });

    return (
        <RadioGroupContext.Provider value={contextValue}>
            <div className={classes} style={style} role="radiogroup">
                {options
                    ? options.map((option) => {
                          const normalized =
                              typeof option === 'object'
                                  ? option
                                  : { label: option, value: option };
                          return (
                              <Radio
                                  key={normalized.value}
                                  value={normalized.value}
                                  disabled={normalized.disabled}
                              >
                                  {normalized.label}
                              </Radio>
                          );
                      })
                    : children}
            </div>
        </RadioGroupContext.Provider>
    );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
