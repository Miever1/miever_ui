import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Spin from './Spin';

const meta: Meta<typeof Spin> = {
    title: 'Feedback/Spin',
    component: Spin,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Spin shows a loading indicator, standalone or overlaying content.',
            },
        },
    },
    argTypes: {
        size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
        spinning: { control: 'boolean' },
    },
    args: { size: 'md', spinning: true },
};

export default meta;
type Story = StoryObj<typeof Spin>;

/** Standalone spinner. */
export const Basic: Story = {};

/** Sizes. */
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <Spin size="sm" />
            <Spin size="md" />
            <Spin size="lg" />
        </div>
    ),
};

/** With a tip. */
export const WithTip: Story = {
    args: { tip: 'Loading...' },
};

/** Overlaying content. */
export const Overlay: Story = {
    render: () => (
        <Spin spinning tip="Fetching...">
            <div style={{ padding: 24, width: 280, background: 'var(--color-bg-secondary)', borderRadius: 8 }}>
                <p style={{ margin: 0 }}>This content is covered by the spinner while loading.</p>
            </div>
        </Spin>
    ),
};
