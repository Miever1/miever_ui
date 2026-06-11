import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Textarea from './Textarea';

const meta: Meta<typeof Textarea> = {
    title: 'Data Entry/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Textarea is a multi-line text field for longer input such as notes or pasted content. It shares the Input visual language and supports labels, disabled state and resize control.',
            },
        },
    },
    argTypes: {
        disabled: {
            control: 'boolean',
            description: 'Disabled state.',
            table: { defaultValue: { summary: 'false' } },
        },
        resizable: {
            control: 'boolean',
            description: 'Allow vertical resizing.',
            table: { defaultValue: { summary: 'true' } },
        },
        label: { control: 'text', description: 'Visible label linked to the field.' },
        placeholder: { control: 'text' },
        rows: { control: 'number', table: { defaultValue: { summary: '4' } } },
    },
    args: {
        placeholder: 'Type here…',
        rows: 4,
    },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/** The default playground. Use the controls panel to explore every prop. */
export const Playground: Story = {};

/** With a visible, associated label. */
export const WithLabel: Story = {
    args: { label: 'Notes', placeholder: 'Add a note…' },
};

/** Disabled state. */
export const Disabled: Story = {
    args: { disabled: true, value: 'Read-only content' },
};

/** Fixed size — user resizing disabled. */
export const NotResizable: Story = {
    args: { resizable: false, rows: 6 },
};
