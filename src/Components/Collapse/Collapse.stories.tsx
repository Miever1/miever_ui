import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Collapse from './Collapse';

const items = [
    { key: '1', header: 'What is miever_ui?', children: 'A personal React component library.' },
    { key: '2', header: 'Does it support dark mode?', children: 'Yes — via CSS variables and data-theme.' },
    { key: '3', header: 'Is it free?', children: 'Yes, under the MPL-2.0 license.' },
];

const meta: Meta<typeof Collapse> = {
    title: 'Data Display/Collapse',
    component: Collapse,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Collapse shows expandable panels, ideal for an FAQ. Use `accordion` to allow only one open at a time.',
            },
        },
    },
    args: { items, defaultActiveKeys: ['1'] },
    argTypes: { accordion: { control: 'boolean' } },
    decorators: [(Story) => <div style={{ maxWidth: 480 }}>{Story()}</div>],
};

export default meta;
type Story = StoryObj<typeof Collapse>;

/** Multiple panels can be open at once. */
export const Basic: Story = {};

/** Accordion mode: only one panel open at a time. */
export const Accordion: Story = {
    args: { accordion: true, defaultActiveKeys: ['1'] },
};
