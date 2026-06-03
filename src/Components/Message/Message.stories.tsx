import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { message } from './api';
import Button from '../Button';

const meta: Meta = {
    title: 'Feedback/Message',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Message shows a global, lightweight notification at the top of the screen. It is called imperatively: `message.success("Saved")`. Each call returns a function that closes that message.',
            },
        },
    },
};

export default meta;
type Story = StoryObj;

/** Trigger each message type imperatively. */
export const Basic: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button type="primary" onClick={() => message.success('Saved successfully')}>
                Success
            </Button>
            <Button onClick={() => message.info('Heads up, something happened')}>Info</Button>
            <Button onClick={() => message.warning('This is a warning')}>Warning</Button>
            <Button type="danger" onClick={() => message.error('Something went wrong')}>
                Error
            </Button>
            <Button
                onClick={() => {
                    const close = message.loading('Loading...', 0);
                    setTimeout(close, 2000);
                }}
            >
                Loading (2s)
            </Button>
        </div>
    ),
};
