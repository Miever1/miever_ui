import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './Skeleton';

const meta: Meta<typeof Skeleton> = {
    title: 'Feedback/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Skeleton shows placeholder shapes while content loads, optionally with a shimmer animation.',
            },
        },
    },
    argTypes: {
        avatar: { control: 'boolean' },
        title: { control: 'boolean' },
        paragraph: { control: 'number' },
        active: { control: 'boolean' },
    },
    args: { avatar: true, title: true, paragraph: 3, active: true },
    decorators: [(Story) => <div style={{ maxWidth: 480 }}>{Story()}</div>],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

/** The default playground. */
export const Playground: Story = {};

/** Text-only skeleton. */
export const TextOnly: Story = {
    args: { avatar: false },
};

/** Toggles between placeholder and real content. */
export const WithContent: Story = {
    args: { loading: false, children: <p>The real content appears once loading is false.</p> },
};
