import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Empty from './Empty';
import Button from '../Button';

const meta: Meta<typeof Empty> = {
    title: 'Data Display/Empty',
    component: Empty,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Empty is a placeholder for states with no data. It shows an icon (or custom illustration), a description and optional actions.',
            },
        },
    },
    argTypes: {
        icon: { control: 'text', description: 'FontAwesome icon name.' },
        description: { control: 'text', description: 'Description text.' },
    },
    args: {
        description: 'No data',
    },
};

export default meta;
type Story = StoryObj<typeof Empty>;

/** The default playground. Use the controls panel to explore every prop. */
export const Playground: Story = {};

/** With a call to action. */
export const WithAction: Story = {
    render: (args) => (
        <Empty {...args} description="Not enough data yet.">
            <Button type="primary">Add your first item</Button>
        </Empty>
    ),
};

/** A different icon. */
export const CustomIcon: Story = {
    args: { icon: 'magnifying-glass', description: 'No results found' },
};
