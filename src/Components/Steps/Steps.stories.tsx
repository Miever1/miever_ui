import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Steps from './Steps';

const items = [
    { title: 'Applied', description: 'Submitted via Greenhouse' },
    { title: 'Confirmed', description: 'Email received' },
    { title: 'Interview', description: 'Phone screen' },
    { title: 'Offer' },
];

const meta: Meta<typeof Steps> = {
    title: 'Navigation/Steps',
    component: Steps,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Steps shows progress through a sequence of stages. Completed steps render a check, the current step is highlighted, and the current step can carry an error status.',
            },
        },
    },
    argTypes: {
        current: { control: 'number', description: 'Zero-based index of the current step.' },
        status: {
            control: 'select',
            options: ['process', 'finish', 'error'],
            description: 'Status of the current step.',
            table: { defaultValue: { summary: 'process' } },
        },
        direction: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            table: { defaultValue: { summary: 'horizontal' } },
        },
    },
    args: {
        items,
        current: 1,
    },
};

export default meta;
type Story = StoryObj<typeof Steps>;

/** The default playground. Use the controls panel to explore every prop. */
export const Playground: Story = {};

/** Current step failed. */
export const ErrorStatus: Story = {
    args: { current: 2, status: 'error' },
};

/** Vertical layout. */
export const Vertical: Story = {
    args: { direction: 'vertical', current: 2 },
};
