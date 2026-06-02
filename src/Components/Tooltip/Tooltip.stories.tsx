import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import Button from '../Button';

const meta: Meta<typeof Tooltip> = {
    title: 'Data Display/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Tooltip displays contextual information on hover, focus or click. It is a thin wrapper around [rc-tooltip](https://github.com/react-component/tooltip).',
            },
        },
    },
    argTypes: {
        overlay: { control: 'text', description: 'Content rendered inside the tooltip.' },
        placement: {
            control: 'select',
            options: ['top', 'right', 'bottom', 'left'],
            description: 'Tooltip position relative to the target.',
            table: { defaultValue: { summary: 'top' } },
        },
        trigger: {
            control: 'select',
            options: ['hover', 'click', 'focus'],
            description: 'What triggers the tooltip.',
            table: { defaultValue: { summary: 'hover' } },
        },
    },
    args: {
        overlay: 'Helpful contextual information.',
        placement: 'top',
    },
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                {Story()}
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/** Hover the button to reveal the tooltip. */
export const Basic: Story = {
    render: (args) => (
        <Tooltip {...args}>
            <Button type="primary">Hover me</Button>
        </Tooltip>
    ),
};

/** Triggered by click instead of hover. */
export const ClickTrigger: Story = {
    args: {
        overlay: 'Triggered by clicking.',
        placement: 'bottom',
        trigger: ['click'],
    },
    render: (args) => (
        <Tooltip {...args}>
            <Button>Click me</Button>
        </Tooltip>
    ),
};

/** All four placements. */
export const Placements: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 24 }}>
            {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
                <Tooltip key={placement} overlay={`Tooltip on ${placement}`} placement={placement}>
                    <Button type="secondary">{placement}</Button>
                </Tooltip>
            ))}
        </div>
    ),
};
