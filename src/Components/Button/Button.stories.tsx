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
        styleType: {
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
        styleType: 'default',
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
            <Button styleType="default">Default</Button>
            <Button styleType="primary">Primary</Button>
            <Button styleType="secondary">Secondary</Button>
            <Button styleType="danger">Danger</Button>
            <Button styleType="link">Link</Button>
        </div>
    ),
};

/** The three available sizes. */
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Button size="sm" styleType="primary">
                Small
            </Button>
            <Button size="md" styleType="primary">
                Medium
            </Button>
            <Button size="lg" styleType="primary">
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
            <Button styleType="primary" disabled>
                Primary
            </Button>
            <Button styleType="danger" disabled>
                Danger
            </Button>
            <Button styleType="link" disabled>
                Link
            </Button>
        </div>
    ),
};
