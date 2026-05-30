import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Timeline from './Timeline';

const items = [
    { label: '2024', color: 'primary' as const, children: 'Launched miever.net' },
    { label: '2023', color: 'success' as const, children: 'Shipped my component library' },
    { label: '2022', children: 'Started learning TypeScript' },
    { label: '2021', color: 'danger' as const, children: 'First line of React' },
];

const meta: Meta<typeof Timeline> = {
    title: 'Data Display/Timeline',
    component: Timeline,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Timeline shows a vertical sequence of events, great for a résumé, changelog or project history.',
            },
        },
    },
    args: { items, mode: 'left' },
    argTypes: {
        mode: { control: 'inline-radio', options: ['left', 'alternate'] },
    },
    decorators: [(Story) => <div style={{ maxWidth: 480 }}>{Story()}</div>],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

/** Default left-aligned timeline. */
export const Basic: Story = {};

/** Alternate layout with labels opposite the content. */
export const Alternate: Story = {
    args: { mode: 'alternate' },
};
