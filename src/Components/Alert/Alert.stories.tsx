import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Alert from './Alert';

const meta: Meta<typeof Alert> = {
    title: 'Feedback/Alert',
    component: Alert,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Alert shows a contextual message inline, with four semantic types, an optional icon, description and close button.',
            },
        },
    },
    argTypes: {
        type: { control: 'select', options: ['success', 'info', 'warning', 'error'] },
        showIcon: { control: 'boolean' },
        closable: { control: 'boolean' },
    },
    args: {
        type: 'info',
        message: 'This is an informational alert.',
        showIcon: true,
    },
    decorators: [(Story) => <div style={{ maxWidth: 480 }}>{Story()}</div>],
};

export default meta;
type Story = StoryObj<typeof Alert>;

/** The default playground. */
export const Playground: Story = {};

/** All four types. */
export const Types: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Alert type="success" message="Success — your changes were saved." showIcon />
            <Alert type="info" message="Info — a new version is available." showIcon />
            <Alert type="warning" message="Warning — your session expires soon." showIcon />
            <Alert type="error" message="Error — something went wrong." showIcon />
        </div>
    ),
};

/** With description and close button. */
export const WithDescription: Story = {
    args: {
        type: 'warning',
        message: 'Heads up',
        description: 'This alert includes a longer description and can be dismissed.',
        closable: true,
    },
};
