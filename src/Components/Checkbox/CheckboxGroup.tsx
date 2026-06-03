import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { CheckboxGroupProps } from './interface';
import { CheckboxGroupContext, CheckboxValue } from './context';
import Checkbox from './Checkbox';

const prefixCls = getPrefixCls('checkbox-group');

/**
 * Groups multiple {@link Checkbox}es into a single multi-select control. Provide
 * options declaratively via `options`, or render `<Checkbox value=…>` children.
 *
 * ### Usage
 * ```jsx
 * import { Checkbox } from 'miever_ui';
 *
 * <Checkbox.Group
 *   options={['Email', 'SMS', 'Push']}
 *   defaultValue={['Email']}
 *   onChange={(values) => console.log(values)}
 * />
 * ```
 */
const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    value,
    defaultValue = [],
    options,
    disabled,
    name,
    direction = 'horizontal',
    onChange,
    children,
    className,
    style,
}) => {
    const [internal, setInternal] = useState<CheckboxValue[]>(defaultValue);
    const selected = value ?? internal;

    const toggle = useCallback(
        (optionValue: CheckboxValue, checked: boolean) => {
            const next = checked
                ? [...selected, optionValue]
                : selected.filter((v) => v !== optionValue);
            if (value === undefined) {
                setInternal(next);
            }
            onChange?.(next);
        },
        [selected, value, onChange],
    );

    const contextValue = useMemo(
        () => ({ value: selected, toggle, disabled, name }),
        [selected, toggle, disabled, name],
    );

    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-vertical`]: direction === 'vertical',
    });

    return (
        <CheckboxGroupContext.Provider value={contextValue}>
            <div className={classes} style={style} role="group">
                {options
                    ? options.map((option) => {
                          const normalized =
                              typeof option === 'object'
                                  ? option
                                  : { label: option, value: option };
                          return (
                              <Checkbox
                                  key={normalized.value}
                                  value={normalized.value}
                                  disabled={normalized.disabled}
                              >
                                  {normalized.label}
                              </Checkbox>
                          );
                      })
                    : children}
            </div>
        </CheckboxGroupContext.Provider>
    );
};

CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup;
