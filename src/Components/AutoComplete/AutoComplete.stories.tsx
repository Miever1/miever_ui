import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AutoComplete from './AutoComplete';

interface Product {
    name: string;
    price: string;
    category: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

const FRUITS = [
    'Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Date',
    'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon', 'Mango', 'Orange',
];

const meta: Meta<typeof AutoComplete> = {
    title: 'Data Entry/AutoComplete',
    component: AutoComplete,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'AutoComplete provides real-time suggestions as the user types. It works with simple string arrays or arbitrary objects, and supports custom filtering and option rendering. Keyboard navigation (↑/↓/Enter) is built in.',
            },
        },
    },
    argTypes: {
        options: { control: 'object', description: 'Array of selectable options.', table: { category: 'Data' } },
        value: { control: 'text', description: 'Controlled input value.', table: { category: 'Data' } },
        placeholder: { control: 'text', description: 'Placeholder text.', table: { category: 'Appearance' } },
        size: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg'],
            description: 'Component size.',
            table: { category: 'Appearance', defaultValue: { summary: 'md' } },
        },
        disabled: { control: 'boolean', description: 'Disables the component.', table: { category: 'State' } },
        onSelect: { action: 'selected', table: { category: 'Events' } },
        onChange: { action: 'changed', table: { category: 'Events' } },
    },
    decorators: [
        // Give the floating options panel room to render.
        (Story) => <div style={{ maxWidth: 360, minHeight: 320 }}>{Story()}</div>,
    ],
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

/** Basic usage with a string array. Type a letter to filter. */
export const Basic: Story = {
    args: {
        options: FRUITS,
        placeholder: 'Search fruits...',
        size: 'md',
    },
};

/** The three available sizes. */
export const Sizes: Story = {
    render: () => {
        const options = FRUITS.slice(0, 6);
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <AutoComplete options={options} size="sm" placeholder="Small" />
                <AutoComplete options={options} size="md" placeholder="Medium" />
                <AutoComplete options={options} size="lg" placeholder="Large" />
            </div>
        );
    },
};

const ControlledDemo = () => {
    const [value, setValue] = useState('');
    const options = ['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Qwik', 'Preact'];
    return (
        <div>
            <AutoComplete
                value={value}
                options={options}
                onChange={setValue}
                onSelect={setValue}
                placeholder="Search frameworks..."
            />
            <p style={{ marginTop: 12, fontSize: 14 }}>
                <strong>Current value:</strong> {value || '—'}
            </p>
        </div>
    );
};

/** A controlled AutoComplete whose value is owned by the parent. */
export const Controlled: Story = {
    render: () => <ControlledDemo />,
};

/** A custom filter that only matches options starting with the input. */
export const CustomFilter: StoryObj<typeof AutoComplete<string>> = {
    args: {
        options: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'Ruby', 'Kotlin'],
        placeholder: 'Type to search (starts with)...',
        filterFunction: (input: string, options: string[]) =>
            options.filter((o) => o.toLowerCase().startsWith(input.toLowerCase())),
    },
};

/** Rich object options with a custom renderer and filter. */
export const CustomRenderOption: StoryObj<typeof AutoComplete<Product>> = {
    args: {
        options: [
            { name: 'iPhone 15', price: '$999', category: 'Phones' },
            { name: 'MacBook Pro', price: '$1999', category: 'Laptops' },
            { name: 'AirPods Pro', price: '$249', category: 'Audio' },
            { name: 'iPad Air', price: '$599', category: 'Tablets' },
            { name: 'Apple Watch', price: '$399', category: 'Wearables' },
        ],
        placeholder: 'Search products...',
        getOptionLabel: (p: Product) => p.name,
        filterFunction: (input: string, options: Product[]) =>
            options.filter(
                (p) =>
                    p.name.toLowerCase().includes(input.toLowerCase()) ||
                    p.category.toLowerCase().includes(input.toLowerCase())
            ),
        renderOption: (p: Product) => (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span>
                    <strong>{p.name}</strong>
                    <span style={{ marginLeft: 8, fontSize: 12, opacity: 0.7 }}>{p.category}</span>
                </span>
                <span style={{ fontWeight: 600 }}>{p.price}</span>
            </div>
        ),
    },
};

/** Object options representing users, filtered by name or email. */
export const UserSelection: StoryObj<typeof AutoComplete<User>> = {
    args: {
        options: [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
            { id: 4, name: 'Alice Brown', email: 'alice@example.com' },
        ],
        placeholder: 'Search users...',
        getOptionLabel: (u: User) => u.name,
        filterFunction: (input: string, options: User[]) =>
            options.filter(
                (u) =>
                    u.name.toLowerCase().includes(input.toLowerCase()) ||
                    u.email.toLowerCase().includes(input.toLowerCase())
            ),
        renderOption: (u: User) => (
            <div>
                <div style={{ fontWeight: 500 }}>{u.name}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{u.email}</div>
            </div>
        ),
    },
};

/** Filtering stays responsive even with a large option set. */
export const LongList: Story = {
    args: {
        options: Array.from({ length: 1000 }, (_, i) => `Option ${i + 1}`),
        placeholder: 'Search 1,000 options...',
    },
};

/** Empty, single-option, and disabled edge cases. */
export const EdgeCases: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <AutoComplete options={[]} placeholder="No options available" />
            <AutoComplete options={['Only option']} placeholder="Single option" />
            <AutoComplete options={FRUITS} value="Apple" placeholder="Disabled" disabled />
        </div>
    ),
};
