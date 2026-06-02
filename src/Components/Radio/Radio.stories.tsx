import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Radio from './index';

const meta: Meta<typeof Radio> = {
    title: 'Data Entry/Radio',
    component: Radio,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Radio selects a single option from a mutually-exclusive set. Compose options with ' +
                    '`Radio.Group`, either declaratively via `options` or with `<Radio>` children.',
            },
        },
    },
    argTypes: {
        disabled: { control: 'boolean' },
        defaultChecked: { control: 'boolean' },
    },
    args: { children: 'Option', defaultChecked: false },
};

export default meta;
type Story = StoryObj<typeof Radio>;

/** A single radio. Radios are usually grouped — see the Group story. */
export const Playground: Story = {};

/** A horizontal group built from `options`. */
export const Group: Story = {
    render: () => (
        <Radio.Group
            options={['Small', 'Medium', 'Large']}
            defaultValue="Medium"
            onChange={(value) => console.log(value)}
        />
    ),
};

/** A vertical group composed from children, with a disabled option. */
export const Vertical: Story = {
    render: () => (
        <Radio.Group direction="vertical" defaultValue="standard">
            <Radio value="economy">Economy</Radio>
            <Radio value="standard">Standard</Radio>
            <Radio value="express" disabled>
                Express (sold out)
            </Radio>
        </Radio.Group>
    ),
};
