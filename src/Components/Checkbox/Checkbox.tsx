import React, {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { CheckboxProps } from './interface';
import { CheckboxGroupContext } from './context';

const prefixCls = getPrefixCls('checkbox');

/**
 * A checkbox lets the user toggle one option on or off. Use it standalone for a
 * single boolean, or inside {@link CheckboxGroup} for multi-select. Forwards its
 * ref to the underlying `<input type="checkbox">`.
 *
 * ### Usage
 * ```jsx
 * import { Checkbox } from 'miever_ui';
 *
 * <Checkbox defaultChecked onChange={(checked) => console.log(checked)}>
 *   Subscribe
 * </Checkbox>
 * ```
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            checked,
            defaultChecked = false,
            indeterminate = false,
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
        const group = useContext(CheckboxGroupContext);
        const innerRef = useRef<HTMLInputElement>(null);
        useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, []);

        const [internal, setInternal] = useState(defaultChecked);

        // Group selection takes precedence, then controlled, then internal state.
        const isChecked =
            group && value !== undefined
                ? group.value.includes(value)
                : checked ?? internal;

        const isDisabled = disabled || group?.disabled || false;

        useEffect(() => {
            if (innerRef.current) {
                innerRef.current.indeterminate = indeterminate;
            }
        }, [indeterminate]);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (isDisabled) return;
            const next = event.target.checked;
            if (group && value !== undefined) {
                group.toggle(value, next);
            } else if (checked === undefined) {
                setInternal(next);
            }
            onChange?.(next, event);
        };

        const wrapperClasses = classNames(`${prefixCls}-wrapper`, className, {
            checked: isChecked && !indeterminate,
            indeterminate,
            disabled: isDisabled,
        });

        return (
            <label className={wrapperClasses} style={style}>
                <span className={prefixCls}>
                    <input
                        ref={innerRef}
                        type="checkbox"
                        className={`${prefixCls}-input`}
                        checked={isChecked}
                        disabled={isDisabled}
                        value={value}
                        name={group?.name}
                        onChange={handleChange}
                        {...restProps}
                    />
                    <span className={`${prefixCls}-box`} />
                </span>
                {children !== undefined && (
                    <span className={`${prefixCls}-label`}>{children}</span>
                )}
            </label>
        );
    },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
