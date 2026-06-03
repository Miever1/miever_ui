import { ReactNode } from 'react';
import { BaseProps } from '../../types';

export type SelectValue = string | number;

export interface SelectOption {
    /** Text shown in the trigger and the option row. */
    label: ReactNode;
    /** The value reported through `onChange`. */
    value: SelectValue;
    /** Disable this option. */
    disabled?: boolean;
}

export interface SelectProps extends BaseProps {
    /** The list of selectable options. */
    options: SelectOption[];
    /** Controlled selected value. */
    value?: SelectValue;
    /** Initial selected value for uncontrolled usage. */
    defaultValue?: SelectValue;
    /** Placeholder shown when nothing is selected. @default 'Select…' */
    placeholder?: string;
    /** Disable the whole control. */
    disabled?: boolean;
    /** Control size. @default 'md' */
    size?: 'sm' | 'md' | 'lg';
    /** Show a clear button when a value is selected. */
    allowClear?: boolean;
    /** Content shown when there are no options. @default 'No options' */
    notFoundContent?: ReactNode;
    /** Fired with the next value and its option (null when cleared). */
    onChange?: (value: SelectValue | undefined, option: SelectOption | null) => void;
}
