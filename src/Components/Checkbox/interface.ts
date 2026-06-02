import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../../types';
import { CheckboxValue } from './context';

export interface CheckboxProps
    extends BaseProps,
        Omit<
            InputHTMLAttributes<HTMLInputElement>,
            'onChange' | 'size' | 'type' | 'checked' | 'defaultChecked' | 'value'
        > {
    /** Controlled checked state. */
    checked?: boolean;
    /** Initial checked state for uncontrolled usage. @default false */
    defaultChecked?: boolean;
    /** Render a visually indeterminate (partial) state. */
    indeterminate?: boolean;
    /** Disable interaction. */
    disabled?: boolean;
    /** Value used to identify this option inside a Checkbox.Group. */
    value?: CheckboxValue;
    /** Label content shown next to the box. */
    children?: ReactNode;
    /** Fired when the checked state changes. */
    onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

/** An option for the `options` prop of Checkbox.Group. */
export interface CheckboxOption {
    label: ReactNode;
    value: CheckboxValue;
    disabled?: boolean;
}

export interface CheckboxGroupProps extends BaseProps {
    /** Controlled selected values. */
    value?: CheckboxValue[];
    /** Initial selected values for uncontrolled usage. */
    defaultValue?: CheckboxValue[];
    /** Declarative options; alternatively pass `<Checkbox>` children. */
    options?: Array<CheckboxOption | string | number>;
    /** Disable every checkbox in the group. */
    disabled?: boolean;
    /** Shared `name` applied to each checkbox input. */
    name?: string;
    /** Layout direction. @default 'horizontal' */
    direction?: 'horizontal' | 'vertical';
    /** Fired with the next list of selected values. */
    onChange?: (value: CheckboxValue[]) => void;
    children?: ReactNode;
}
