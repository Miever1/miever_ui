import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const Avatar = () => (
    <span
        style={{
            display: 'inline-block',
            width: 40,
            height: 40,
            background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border-primary)',
            borderRadius: 8,
        }}
    />
);

const meta: Meta<typeof Badge> = {
    title: 'Data Display/Badge',
    component: Badge,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Badge shows a small count or status dot, either attached to an element or standalone. Counts above `maxCount` render as `{maxCount}+`.',
            },
        },
    },
    argTypes: {
        count: { control: 'number', description: 'Number to display.' },
        maxCount: {
            control: 'number',
            description: 'Cap before showing `{maxCount}+`.',
            table: { defaultValue: { summary: '99' } },
        },
        dot: { control: 'boolean', description: 'Render a dot instead of a count.' },
        showZero: { control: 'boolean', description: 'Show the badge when count is 0.' },
        theme: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
            description: 'Brand color theme.',
            table: { defaultValue: { summary: 'danger' } },
        },
    },
    args: {
        count: 5,
        theme: 'danger',
    },
    render: (args) => (
        <Badge {...args}>
            <Avatar />
        </Badge>
    ),
};

export default meta;
type Story = StoryObj<typeof Badge>;

/** A count badge attached to an element. */
export const Basic: Story = {};

/** Counts above `maxCount` overflow to `{maxCount}+`. */
export const Overflow: Story = {
    args: { count: 120, maxCount: 99 },
};

/** A status dot instead of a number. */
export const Dot: Story = {
    args: { dot: true, theme: 'primary' },
};

/** Standalone badges across themes. */
export const Standalone: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Badge count={1} theme="primary" />
            <Badge count={8} theme="success" />
            <Badge count={99} theme="warning" />
            <Badge count={120} maxCount={99} theme="danger" />
        </div>
    ),
};
