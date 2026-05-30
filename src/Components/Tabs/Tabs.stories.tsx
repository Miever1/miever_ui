import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';

const items = [
    { key: 'about', label: 'About', children: <p>A short bio about myself.</p> },
    { key: 'work', label: 'Work', children: <p>Selected projects and case studies.</p> },
    { key: 'contact', label: 'Contact', children: <p>How to reach me.</p> },
    { key: 'archived', label: 'Archived', children: <p>Old stuff.</p>, disabled: true },
];

const meta: Meta<typeof Tabs> = {
    title: 'Navigation/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Tabs switch between related panels of content. Supports controlled and uncontrolled usage.',
            },
        },
    },
    args: { items, defaultActiveKey: 'about' },
    decorators: [(Story) => <div style={{ maxWidth: 480 }}>{Story()}</div>],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

/** Uncontrolled tabs with a disabled item. */
export const Basic: Story = {};
