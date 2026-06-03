import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
    title: 'Data Entry/Switch',
    component: Switch,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Switch toggles a single boolean value, such as a dark-mode preference.',
            },
        },
    },
    argTypes: {
        size: { control: 'inline-radio', options: ['sm', 'md'] },
        disabled: { control: 'boolean' },
        defaultChecked: { control: 'boolean' },
    },
    args: { defaultChecked: false, disabled: false, size: 'md' },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/** The default playground. */
export const Playground: Story = {};

/** With text labels. */
export const WithText: Story = {
    args: { checkedChildren: 'On', uncheckedChildren: 'Off', defaultChecked: true },
};

/** Sizes and states. */
export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Switch defaultChecked />
            <Switch />
            <Switch size="sm" defaultChecked />
            <Switch disabled />
            <Switch disabled defaultChecked />
        </div>
    ),
};
