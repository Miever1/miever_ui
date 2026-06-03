import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
    title: 'General/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Buttons trigger an action or event. They come in several style types and three sizes, and accept all native `<button>` attributes.',
            },
        },
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['default', 'primary', 'secondary', 'danger', 'link'],
            description: 'Visual style of the button.',
            table: { defaultValue: { summary: 'default' } },
        },
        size: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg'],
            description: 'Button size.',
            table: { defaultValue: { summary: 'md' } },
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the button.',
            table: { defaultValue: { summary: 'false' } },
        },
        children: {
            control: 'text',
            description: 'Button content.',
        },
        onClick: { action: 'clicked', table: { category: 'Events' } },
    },
    args: {
        children: 'Button',
        type: 'default',
        size: 'md',
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** The default playground. Use the controls panel to explore every prop. */
export const Playground: Story = {};

/** All five style types side by side. */
export const StyleTypes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button type="default">Default</Button>
            <Button type="primary">Primary</Button>
            <Button type="secondary">Secondary</Button>
            <Button type="danger">Danger</Button>
            <Button type="link">Link</Button>
        </div>
    ),
};

/** The three available sizes. */
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Button size="sm" type="primary">
                Small
            </Button>
            <Button size="md" type="primary">
                Medium
            </Button>
            <Button size="lg" type="primary">
                Large
            </Button>
        </div>
    ),
};

/** Disabled state across style types. */
export const Disabled: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button disabled>Default</Button>
            <Button type="primary" disabled>
                Primary
            </Button>
            <Button type="danger" disabled>
                Danger
            </Button>
            <Button type="link" disabled>
                Link
            </Button>
        </div>
    ),
};
