import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Menu from './Menu';

const ITEMS = [
    { label: 'Home', key: 'home' },
    { label: 'Pricing', key: 'pricing' },
    { label: 'Archived', key: 'archived', disabled: true },
    {
        label: 'Products',
        key: 'products',
        children: [
            { label: 'Product A', key: 'a' },
            { label: 'Product B', key: 'b' },
        ],
    },
];

const meta: Meta<typeof Menu> = {
    title: 'Navigation/Menu',
    component: Menu,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Menu provides horizontal or vertical navigation with support for submenus, a default selected key, disabled items, and prefix/suffix slots.',
            },
        },
    },
    argTypes: {
        mode: {
            control: 'inline-radio',
            options: ['horizontal', 'vertical'],
            description: 'Layout direction.',
            table: { defaultValue: { summary: 'horizontal' } },
        },
        defaultKey: { control: 'text', description: 'Key of the initially active item.' },
        onSelect: { action: 'selected', table: { category: 'Events' } },
    },
    args: {
        mode: 'horizontal',
        defaultKey: 'home',
        items: ITEMS,
    },
    decorators: [(Story) => <div style={{ minHeight: 220 }}>{Story()}</div>],
};

export default meta;
type Story = StoryObj<typeof Menu>;

/** Horizontal menu with a submenu — hover "Products". */
export const Horizontal: Story = {};

/** Vertical menu, e.g. for a sidebar. */
export const Vertical: Story = {
    args: { mode: 'vertical', defaultKey: 'pricing' },
};

/** Prefix and suffix slots for branding and actions. */
export const WithPrefixSuffix: Story = {
    args: {
        prefix: <strong style={{ padding: '0 8px' }}>Miever</strong>,
        suffix: <span style={{ padding: '0 8px' }}>Sign in</span>,
    },
};
