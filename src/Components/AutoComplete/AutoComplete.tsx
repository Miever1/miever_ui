import React, {
    useState,
    useRef,
    useMemo,
    useEffect,
    useId,
    KeyboardEvent,
} from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { AutoCompleteProps } from './interface';
import Box from '../Box';
import Input from '../Input';
import Transition from '../Transition';

const prefixCls = getPrefixCls('autocomplete');

/**
 * AutoComplete is a flexible input that provides real-time suggestions based on
 * user input. It supports both simple string arrays and complex object arrays
 * with customizable filtering and rendering.
 *
 * ### Basic Usage
 * ```jsx
 * import { AutoComplete } from 'miever_ui';
 *
 * <AutoComplete
 *   options={['Apple', 'Banana', 'Cherry']}
 *   placeholder="Search fruits..."
 *   onSelect={(option) => console.log('Selected:', option)}
 * />
 * ```
 *
 * ### Advanced Usage
 * ```jsx
 * <AutoComplete
 *   options={users}
 *   filterFunction={(input, options) =>
 *     options.filter((u) => u.name.toLowerCase().includes(input.toLowerCase()))
 *   }
 *   renderOption={(user) => <div>{user.name}</div>}
 *   onSelect={(user) => console.log('Selected user:', user)}
 * />
 * ```
 */
const AutoComplete = <T,>({
    value = '',
    size = 'md',
    disabled = false,
    options,
    className,
    filterFunction,
    onSelect,
    onChange,
    renderOption,
    placeholder = 'Search...',
    ...restProps
}: AutoCompleteProps<T>) => {
    const [inputValue, setInputValue] = useState(String(value || ''));
    const [showOptions, setShowOptions] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const isSelecting = useRef(false);

    const listboxId = useId();
    const getOptionId = (index: number) => `${listboxId}-option-${index}`;

    useEffect(() => {
        setInputValue(String(value || ''));
    }, [value]);

    const handleChange = (newValue: string) => {
        setInputValue(newValue);
        onChange?.(newValue);
        if (!showOptions) {
            setShowOptions(true);
        }
    };

    const defaultGetOptionLabel = (option: T): string => {
        if (typeof option === 'string' || typeof option === 'number') {
            return String(option);
        }
        if (typeof option === 'object' && option !== null) {
            if ('label' in option) return String(option.label);
            if ('name' in option) return String(option.name);
            if ('title' in option) return String(option.title);
            return JSON.stringify(option);
        }
        return String(option);
    };

    const defaultFilterFunction = (input: string, opts: T[]): T[] => {
        const inputStr = String(input || '');
        if (!inputStr.trim()) return opts;
        const searchTerm = inputStr.toLowerCase();
        return opts.filter((option) =>
            defaultGetOptionLabel(option).toLowerCase().includes(searchTerm)
        );
    };

    const filteredOptions = useMemo(() => {
        const filterFn = filterFunction || defaultFilterFunction;
        return filterFn(inputValue, options);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue, options, filterFunction]);

    const handleSelect = (selectedOption: T) => {
        const displayValue = defaultGetOptionLabel(selectedOption);
        setInputValue(displayValue);
        onChange?.(displayValue);
        onSelect?.(selectedOption);
        isSelecting.current = false;
        setShowOptions(false);
        setHighlightIndex(-1);
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (!isSelecting.current) {
                setShowOptions(false);
                setHighlightIndex(-1);
            }
        }, 200);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!filteredOptions.length) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightIndex((prev) => (prev + 1) % filteredOptions.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightIndex(
                    (prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightIndex >= 0 && highlightIndex < filteredOptions.length) {
                    handleSelect(filteredOptions[highlightIndex]);
                }
                (e.target as HTMLInputElement).blur();
                break;
            default:
                break;
        }
    };

    const renderTemplate = (option: T, index: number) =>
        renderOption ? renderOption(option, index) : defaultGetOptionLabel(option);

    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-${size}`]: size,
        disabled,
    });

    return (
        <Box className={classes} {...restProps}>
            <Input
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setShowOptions(true)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={`${prefixCls}-input`}
                disabled={disabled}
                role="combobox"
                aria-expanded={showOptions}
                aria-autocomplete="list"
                aria-controls={showOptions ? listboxId : undefined}
                aria-activedescendant={
                    showOptions && highlightIndex >= 0
                        ? getOptionId(highlightIndex)
                        : undefined
                }
            />
            <Transition in={showOptions} timeout={200} animation="zoom-in-top" unmountOnExit>
                <Box className={`${prefixCls}-options`} role="listbox" id={listboxId}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <Box
                                key={index}
                                id={getOptionId(index)}
                                role="option"
                                aria-selected={highlightIndex === index}
                                className={classNames(`${prefixCls}-option`, {
                                    highlight: highlightIndex === index,
                                })}
                                onMouseDown={() => {
                                    isSelecting.current = true;
                                }}
                                onClick={() => handleSelect(option)}
                            >
                                {renderTemplate(option, index)}
                            </Box>
                        ))
                    ) : (
                        <Box className={classNames(`${prefixCls}-option`, 'disabled')}>
                            No matching result
                        </Box>
                    )}
                </Box>
            </Transition>
        </Box>
    );
};

AutoComplete.displayName = 'AutoComplete';

export default AutoComplete;
