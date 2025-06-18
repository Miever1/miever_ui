import { InputProps } from "../Input/interface";

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
    value?: string;
    options: any[];
    onSelect?: (selectedOption: any) => void;
    onChange?: (value: string) => void;
    filterFunction?: (input: string, options: any[]) => any[];
    renderOption?: (option: any, index: number) => React.ReactNode;
    getOptionLabel?: (option: any) => string;
    placeholder?: string;
    className?: string;
}
