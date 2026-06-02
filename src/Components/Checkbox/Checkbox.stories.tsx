import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from './index';
import { CheckboxValue } from './context';

const meta: Meta<typeof Checkbox> = {
    title: 'Data Entry/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Checkbox toggles a single option, or composes into a multi-select via `Checkbox.Group`. ' +
                    'It forwards its ref to the underlying input and supports an `indeterminate` state.',
            },
        },
    },
    argTypes: {
        disabled: { control: 'boolean' },
        indeterminate: { control: 'boolean' },
        defaultChecked: { control: 'boolean' },
    },
    args: { children: 'Subscribe to updates', defaultChecked: false },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/** The default playground. */
export const Playground: Story = {};

/** States: unchecked, checked, indeterminate and disabled. */
export const States: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox>Unchecked</Checkbox>
            <Checkbox defaultChecked>Checked</Checkbox>
            <Checkbox indeterminate>Indeterminate</Checkbox>
            <Checkbox disabled>Disabled</Checkbox>
            <Checkbox disabled defaultChecked>
                Disabled checked
            </Checkbox>
        </div>
    ),
};

/** A group built declaratively from `options`. */
export const Group: Story = {
    render: () => (
        <Checkbox.Group
            options={['Email', 'SMS', 'Push']}
            defaultValue={['Email']}
            onChange={(values) => console.log(values)}
        />
    ),
};

/** A "select all" pattern driven by the indeterminate state. */
export const SelectAll: Story = {
    render: () => {
        const options: CheckboxValue[] = ['Apple', 'Banana', 'Cherry'];
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [checked, setChecked] = useState<CheckboxValue[]>(['Apple']);
        const allChecked = checked.length === options.length;
        const someChecked = checked.length > 0 && !allChecked;
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Checkbox
                    checked={allChecked}
                    indeterminate={someChecked}
                    onChange={(c) => setChecked(c ? [...options] : [])}
                >
                    Select all
                </Checkbox>
                <Checkbox.Group
                    direction="vertical"
                    options={options}
                    value={checked}
                    onChange={setChecked}
                />
            </div>
        );
    },
};
