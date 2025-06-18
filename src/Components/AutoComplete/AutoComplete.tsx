import React, {
    FunctionComponent,
    useState,
    useRef,
    useMemo,
    useEffect,
    KeyboardEvent
} from 'react';
import classNames from 'classnames';

import { AutoCompleteProps } from './interface';
import Box from '../Box';
import Input from '../Input';
import Transition from '../Transition';

/**
 * AutoComplete is a flexible input component that provides real-time suggestions based on user input.
 * It supports both simple string arrays and complex object arrays with customizable filtering and rendering.
 * ### Basic Usage
 * 
 * ```jsx
 * import { AutoComplete } from 'miever_components';
 * 
 * // Simple string array
 * <AutoComplete
 *   options={["Apple", "Banana", "Cherry"]}
 *   placeholder="Search fruits..."
 *   onSelect={(option) => console.log('Selected:', option)}
 * />
 * ```
 * 
 * ### Advanced Usage
 * ```jsx
 * // Object array with custom filtering
 * const users = [
 *   { id: 1, name: "John Doe", email: "john@example.com" },
 *   { id: 2, name: "Jane Smith", email: "jane@example.com" }
 * ];
 * 
 * <AutoComplete
 *   options={users}
 *   filterFunction={(input, options) => 
 *     options.filter(user => 
 *       user.name.toLowerCase().includes(input.toLowerCase())
 *     )
 *   }
 *   renderOption={(user) => (
 *     <div>
 *       <div style={{ fontWeight: 'bold' }}>{user.name}</div>
 *       <div style={{ fontSize: '12px', color: '#666' }}>{user.email}</div>
 *     </div>
 *   )}
 *   onSelect={(user) => console.log('Selected user:', user)}
 * />
 * ```
 */

const AutoComplete: FunctionComponent<AutoCompleteProps> = ({
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
}) => {
    const [inputValue, setInputValue] = useState(String(value || ''));
    const [showOptions, setShowOptions] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const isSelecting = useRef(false);

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

    const defaultGetOptionLabel = (option: any): string => {
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

    const defaultFilterFunction = (input: string, options: any[]): any[] => {
        const inputStr = String(input || '');
        if (!inputStr.trim()) return options;
        
        const searchTerm = inputStr.toLowerCase();
        
        return options.filter(option => {
            const optionLabel = defaultGetOptionLabel(option);
            return optionLabel.toLowerCase().includes(searchTerm);
        });
    };

    const filteredOptions = useMemo(() => {
        const filterFn = filterFunction || defaultFilterFunction;
        return filterFn(inputValue, options);
    }, [inputValue, options, filterFunction]);

    const handleSelect = (selectedOption: any) => {
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
                setHighlightIndex((prev) =>
                    (prev - 1 + filteredOptions.length) % filteredOptions.length
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

    const renderTemplate = (option: any, index: number) => {
        if (renderOption) {
            return renderOption(option, index);
        }
        return defaultGetOptionLabel(option);
    };

    const classes = classNames('auto-complete', className, {
        [`auto-complete-${size}`]: size,
        'disabled': disabled
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
                className="autocompelete-input"
            />
            <Transition
                in={showOptions && filteredOptions.length >= 0}
                timeout={200}
                animation="zoom-in-top"
                unmountOnExit
            >
                <Box className="options-list">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <Box
                                key={index}
                                className={`option-item ${
                                    highlightIndex === index ? 'highlight' : ''
                                }`}
                                onMouseDown={() => {
                                    isSelecting.current = true;
                                }}
                                onClick={() => handleSelect(option)}
                            >
                                {renderTemplate(option, index)}
                            </Box>
                        ))
                    ) : (
                        <Box className="option-item disabled">No matching result</Box>
                    )}
                </Box>
            </Transition>
        </Box>
    );
};

AutoComplete.displayName = 'AutoComplete';

export default AutoComplete;

    