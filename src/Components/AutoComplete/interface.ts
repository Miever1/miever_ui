import { InputProps } from "../Input/interface";

export interface AutoCompleteProps<T> extends Omit<InputProps, 'onSelect' | 'onChange'> {
    value?: string;
    options: T[];
    onSelect?: (selectedOption: T) => void;
    onChange?: (value: string) => void;
    filterFunction?: (input: string, options: T[]) => T[];
    renderOption?: (option: T, index: number) => React.ReactNode;
    getOptionLabel?: (option: T) => string;
    placeholder?: string;
    className?: string;
}
