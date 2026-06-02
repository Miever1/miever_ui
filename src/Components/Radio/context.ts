import { createContext } from 'react';

export type RadioValue = string | number;

export interface RadioGroupContextValue {
    /** The currently selected value. */
    value?: RadioValue;
    /** Select a value within the group. */
    onChange: (value: RadioValue) => void;
    /** Disable every radio in the group. */
    disabled?: boolean;
    /** Shared `name` applied to each radio input. */
    name?: string;
}

/**
 * Provided by Radio.Group so descendant Radios share a single selection.
 * `null` when a Radio is used standalone.
 */
export const RadioGroupContext =
    createContext<RadioGroupContextValue | null>(null);
