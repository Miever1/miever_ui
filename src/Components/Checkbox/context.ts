import { createContext } from 'react';

export type CheckboxValue = string | number;

export interface CheckboxGroupContextValue {
    /** Currently selected values. */
    value: CheckboxValue[];
    /** Toggle a value within the group. */
    toggle: (value: CheckboxValue, checked: boolean) => void;
    /** Disable every checkbox in the group. */
    disabled?: boolean;
    /** Shared `name` applied to each checkbox input. */
    name?: string;
}

/**
 * Provided by Checkbox.Group so descendant Checkboxes share selection state.
 * `null` when a Checkbox is used standalone.
 */
export const CheckboxGroupContext =
    createContext<CheckboxGroupContextValue | null>(null);
