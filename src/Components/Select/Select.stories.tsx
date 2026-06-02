import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Select from './Select';

const fruits = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Durian (out of stock)', value: 'durian', disabled: true },
    { label: 'Elderberry', value: 'elderberry' },
];

const meta: Meta<typeof Select> = {
    title: 'Data Entry/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A single-select dropdown with a styled trigger, keyboard navigation ' +
                    '(↑/↓/Enter/Esc) and outside-click dismissal.',
            },
        },
    },
    argTypes: {
        size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
        disabled: { control: 'boolean' },
        allowClear: { control: 'boolean' },
    },
    args: {
        options: fruits,
        placeholder: 'Choose a fruit',
        size: 'md',
        disabled: false,
        allowClear: false,
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: 280 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Select>;

/** The default playground. */
export const Playground: Story = {};

/** Pre-selected with a clear button. */
export const Clearable: Story = {
    args: { defaultValue: 'banana', allowClear: true },
};

/** The three sizes. */
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Select size="sm" options={fruits} placeholder="Small" />
            <Select size="md" options={fruits} placeholder="Medium" />
            <Select size="lg" options={fruits} placeholder="Large" />
        </div>
    ),
};

/** Disabled control. */
export const Disabled: Story = {
    args: { disabled: true, defaultValue: 'apple' },
};
