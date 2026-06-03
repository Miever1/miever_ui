import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tag from './Tag';

const meta: Meta<typeof Tag> = {
    title: 'Data Display/Tag',
    component: Tag,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Tag is a compact label for categorizing or marking content. It supports brand color themes and an optional close button.',
            },
        },
    },
    argTypes: {
        theme: {
            control: 'select',
            options: [undefined, 'primary', 'secondary', 'success', 'info', 'warning', 'danger'],
            description: 'Brand color theme.',
        },
        closable: {
            control: 'boolean',
            description: 'Show a close button.',
            table: { defaultValue: { summary: 'false' } },
        },
        children: { control: 'text', description: 'Tag content.' },
        onClose: { action: 'closed', table: { category: 'Events' } },
    },
    args: {
        children: 'Tag',
        closable: false,
    },
};

export default meta;
type Story = StoryObj<typeof Tag>;

/** The default playground. Use the controls panel to explore every prop. */
export const Playground: Story = {};

/** Every brand color theme. */
export const Themes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Tag>Default</Tag>
            <Tag theme="primary">Primary</Tag>
            <Tag theme="secondary">Secondary</Tag>
            <Tag theme="success">Success</Tag>
            <Tag theme="info">Info</Tag>
            <Tag theme="warning">Warning</Tag>
            <Tag theme="danger">Danger</Tag>
        </div>
    ),
};

/** Closable tags disappear when their close button is clicked. */
export const Closable: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Tag theme="primary" closable>
                React
            </Tag>
            <Tag theme="success" closable>
                TypeScript
            </Tag>
            <Tag theme="danger" closable>
                Remove me
            </Tag>
        </div>
    ),
};
