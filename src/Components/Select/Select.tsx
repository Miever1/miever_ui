import React, {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useImperativeHandle,
    useRef,
    useState,
    KeyboardEvent,
} from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Icon from '../Icon';
import Transition from '../Transition';
import { SelectOption, SelectProps, SelectValue } from './interface';

const prefixCls = getPrefixCls('select');

/**
 * A single-select dropdown with a styled trigger, keyboard navigation and
 * outside-click dismissal. Forwards its ref to the root element.
 *
 * ### Usage
 * ```jsx
 * import { Select } from 'miever_ui';
 *
 * <Select
 *   placeholder="Choose a fruit"
 *   options={[
 *     { label: 'Apple', value: 'apple' },
 *     { label: 'Banana', value: 'banana' },
 *   ]}
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
const Select = forwardRef<HTMLDivElement, SelectProps>(
    (
        {
            options,
            value,
            defaultValue,
            placeholder = 'Select…',
            disabled = false,
            size = 'md',
            allowClear = false,
            notFoundContent = 'No options',
            showSearch = false,
            searchPlaceholder = 'Search…',
            filterOption,
            className,
            style,
            onChange,
        },
        ref,
    ) => {
        const rootRef = useRef<HTMLDivElement>(null);
        useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, []);

        const listboxId = useId();
        const getOptionId = (index: number) => `${listboxId}-option-${index}`;

        const [open, setOpen] = useState(false);
        const [internal, setInternal] = useState<SelectValue | undefined>(defaultValue);
        const [highlight, setHighlight] = useState(-1);
        const [search, setSearch] = useState('');
        const searchRef = useRef<HTMLInputElement>(null);

        const selectedValue = value ?? internal;
        const selectedOption =
            options.find((o) => o.value === selectedValue) ?? null;

        const defaultFilter = useCallback((input: string, option: SelectOption) => {
            const haystack =
                option.searchText ??
                (typeof option.label === 'string' ? option.label : String(option.value));
            return haystack.toLowerCase().includes(input.toLowerCase());
        }, []);

        const visibleOptions =
            showSearch && search
                ? options.filter((option) => (filterOption ?? defaultFilter)(search, option))
                : options;

        const close = useCallback(() => {
            setOpen(false);
            setHighlight(-1);
            setSearch('');
        }, []);

        // Focus the search box as soon as the dropdown opens.
        useEffect(() => {
            if (open && showSearch) {
                searchRef.current?.focus();
            }
        }, [open, showSearch]);

        // Dismiss on outside click.
        useEffect(() => {
            if (!open) return;
            const onDocMouseDown = (e: MouseEvent) => {
                if (!rootRef.current?.contains(e.target as Node)) {
                    close();
                }
            };
            document.addEventListener('mousedown', onDocMouseDown);
            return () => document.removeEventListener('mousedown', onDocMouseDown);
        }, [open, close]);

        const commit = useCallback(
            (option: SelectOption) => {
                if (option.disabled) return;
                if (value === undefined) {
                    setInternal(option.value);
                }
                onChange?.(option.value, option);
                close();
            },
            [value, onChange, close],
        );

        const clear = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (value === undefined) {
                setInternal(undefined);
            }
            onChange?.(undefined, null);
        };

        const moveHighlight = useCallback(
            (dir: 1 | -1) => {
                if (!visibleOptions.length) return;
                setHighlight((prev) => {
                    let next = prev;
                    for (let i = 0; i < visibleOptions.length; i += 1) {
                        next = (next + dir + visibleOptions.length) % visibleOptions.length;
                        if (!visibleOptions[next].disabled) return next;
                    }
                    return prev;
                });
            },
            [visibleOptions],
        );

        const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
            if (disabled) return;
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (!open) setOpen(true);
                    else moveHighlight(1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (open) moveHighlight(-1);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (open && highlight >= 0 && visibleOptions[highlight]) {
                        commit(visibleOptions[highlight]);
                    } else if (!open) {
                        setOpen(true);
                    }
                    break;
                case 'Escape':
                    if (open) {
                        e.preventDefault();
                        close();
                    }
                    break;
                default:
                    break;
            }
        };

        const classes = classNames(prefixCls, `${prefixCls}-${size}`, className, {
            [`${prefixCls}-open`]: open,
            [`${prefixCls}-disabled`]: disabled,
        });

        const showClear = allowClear && selectedOption && !disabled;

        return (
            <div
                ref={rootRef}
                className={classes}
                style={style}
                role="combobox"
                aria-expanded={open}
                aria-disabled={disabled}
                aria-haspopup="listbox"
                aria-controls={open ? listboxId : undefined}
                aria-activedescendant={
                    open && highlight >= 0 ? getOptionId(highlight) : undefined
                }
                tabIndex={disabled ? -1 : 0}
                onKeyDown={handleKeyDown}
            >
                <div
                    className={`${prefixCls}-selector`}
                    onClick={() => !disabled && setOpen((o) => !o)}
                >
                    {showSearch && open ? (
                        // While open, the trigger doubles as the search box.
                        <input
                            ref={searchRef}
                            type="text"
                            className={`${prefixCls}-search-input`}
                            value={search}
                            placeholder={
                                selectedOption && typeof selectedOption.label === 'string'
                                    ? selectedOption.label
                                    : searchPlaceholder
                            }
                            aria-label={searchPlaceholder}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setHighlight(0);
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    ) : (
                        <span
                            className={classNames(`${prefixCls}-value`, {
                                [`${prefixCls}-placeholder`]: !selectedOption,
                            })}
                        >
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                    )}
                    <span className={`${prefixCls}-icons`}>
                        {showClear && (
                            <button
                                type="button"
                                className={`${prefixCls}-clear`}
                                aria-label="Clear"
                                onClick={clear}
                            >
                                <Icon icon="circle-xmark" />
                            </button>
                        )}
                        <Icon icon="chevron-down" className={`${prefixCls}-arrow`} />
                    </span>
                </div>

                <Transition in={open} timeout={200} animation="zoom-in-top" unmountOnExit>
                    <ul className={`${prefixCls}-dropdown`} role="listbox" id={listboxId}>
                        {visibleOptions.length === 0 && (
                            <li className={`${prefixCls}-empty`}>{notFoundContent}</li>
                        )}
                        {visibleOptions.map((option, index) => (
                            <li
                                key={option.value}
                                id={getOptionId(index)}
                                role="option"
                                aria-selected={option.value === selectedValue}
                                aria-disabled={option.disabled || undefined}
                                className={classNames(`${prefixCls}-option`, {
                                    [`${prefixCls}-option-selected`]:
                                        option.value === selectedValue,
                                    [`${prefixCls}-option-active`]: index === highlight,
                                    [`${prefixCls}-option-disabled`]: option.disabled,
                                })}
                                onMouseEnter={() => setHighlight(index)}
                                onClick={() => commit(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </Transition>
            </div>
        );
    },
);

Select.displayName = 'Select';

export default Select;
