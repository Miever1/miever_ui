import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Divider from './Divider';

const meta: Meta<typeof Divider> = {
    title: 'Layout/Divider',
    component: Divider,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Divider separates content with a thin line, horizontally or vertically, optionally with centered text.',
            },
        },
    },
    argTypes: {
        direction: {
            control: 'inline-radio',
            options: ['horizontal', 'vertical'],
            description: 'Orientation.',
            table: { defaultValue: { summary: 'horizontal' } },
        },
        dashed: {
            control: 'boolean',
            description: 'Render a dashed line.',
            table: { defaultValue: { summary: 'false' } },
        },
        children: { control: 'text', description: 'Centered text (horizontal only).' },
    },
    decorators: [
        (Story) => <div style={{ maxWidth: 400 }}>{Story()}</div>,
    ],
};

export default meta;
type Story = StoryObj<typeof Divider>;

/** A plain horizontal divider. */
export const Basic: Story = {
    render: (args) => (
        <div>
            <p style={{ margin: 0 }}>Content above.</p>
            <Divider {...args} />
            <p style={{ margin: 0 }}>Content below.</p>
        </div>
    ),
};

/** With centered text. */
export const WithText: Story = {
    args: { children: 'Section' },
    render: (args) => (
        <div>
            <p style={{ margin: 0 }}>Content above.</p>
            <Divider {...args} />
            <p style={{ margin: 0 }}>Content below.</p>
        </div>
    ),
};

/** Dashed variant. */
export const Dashed: Story = {
    args: { dashed: true, children: 'Dashed' },
    render: (args) => (
        <div>
            <p style={{ margin: 0 }}>Content above.</p>
            <Divider {...args} />
            <p style={{ margin: 0 }}>Content below.</p>
        </div>
    ),
};

/** Vertical dividers separate inline items. */
export const Vertical: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            Home
            <Divider direction="vertical" />
            Docs
            <Divider direction="vertical" />
            About
        </div>
    ),
};
