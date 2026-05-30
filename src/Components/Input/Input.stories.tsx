import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
    title: 'Data Entry/Input',
    component: Input,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A text field for collecting single-line user input. Supports three sizes, an optional trailing icon, a disabled state, and all native `<input>` attributes.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg'],
            description: 'Input size.',
            table: { defaultValue: { summary: 'md' } },
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the input.',
            table: { defaultValue: { summary: 'false' } },
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text.',
        },
        icon: {
            control: 'text',
            description: 'Optional trailing FontAwesome icon name (e.g. "magnifying-glass").',
        },
    },
    args: {
        placeholder: 'Enter text...',
        disabled: false,
    },
    decorators: [
        (Story) => <div style={{ maxWidth: 320 }}>{Story()}</div>,
    ],
};

export default meta;
type Story = StoryObj<typeof Input>;

/** The default playground. Use the controls panel to explore every prop. */
export const Playground: Story = {};

/** Input with a trailing icon. */
export const WithIcon: Story = {
    args: { icon: 'magnifying-glass', placeholder: 'Search...' },
};

/** Disabled input. */
export const Disabled: Story = {
    args: { disabled: true, placeholder: 'Disabled' },
};

/** The three available sizes. */
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium" />
            <Input size="lg" placeholder="Large" />
        </div>
    ),
};
