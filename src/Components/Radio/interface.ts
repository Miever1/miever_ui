import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../../types';
import { RadioValue } from './context';

export interface RadioProps
    extends BaseProps,
        Omit<
            InputHTMLAttributes<HTMLInputElement>,
            'onChange' | 'size' | 'type' | 'checked' | 'defaultChecked' | 'value'
        > {
    /** Controlled checked state (ignored inside a Radio.Group). */
    checked?: boolean;
    /** Initial checked state for standalone uncontrolled usage. */
    defaultChecked?: boolean;
    /** Disable interaction. */
    disabled?: boolean;
    /** Value used to identify this option inside a Radio.Group. */
    value?: RadioValue;
    /** Label content shown next to the dot. */
    children?: ReactNode;
    /** Fired when this radio becomes checked. */
    onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

/** An option for the `options` prop of Radio.Group. */
export interface RadioOption {
    label: ReactNode;
    value: RadioValue;
    disabled?: boolean;
}

export interface RadioGroupProps extends BaseProps {
    /** Controlled selected value. */
    value?: RadioValue;
    /** Initial selected value for uncontrolled usage. */
    defaultValue?: RadioValue;
    /** Declarative options; alternatively pass `<Radio>` children. */
    options?: Array<RadioOption | string | number>;
    /** Disable every radio in the group. */
    disabled?: boolean;
    /** Shared `name` applied to each radio input. */
    name?: string;
    /** Layout direction. @default 'horizontal' */
    direction?: 'horizontal' | 'vertical';
    /** Fired with the next selected value. */
    onChange?: (value: RadioValue) => void;
    children?: ReactNode;
}
