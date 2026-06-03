import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Section from './Section';
import { Paragraph } from '../Typography/Typography';

const meta: Meta<typeof Section> = {
    title: 'Layout/Section',
    component: Section,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Section is a page block with an optional title, subtitle and divider. It gives long pages consistent vertical rhythm and headings.',
            },
        },
    },
    argTypes: {
        align: { control: 'inline-radio', options: ['left', 'center', 'right'] },
        titleLevel: { control: 'inline-radio', options: [1, 2, 3, 4, 5] },
        divider: { control: 'boolean' },
    },
    args: {
        title: 'Section title',
        subtitle: 'A short supporting line that explains the section.',
        align: 'left',
        titleLevel: 3,
        divider: false,
    },
    decorators: [(Story) => <div style={{ maxWidth: 640 }}>{Story()}</div>],
};

export default meta;
type Story = StoryObj<typeof Section>;

/** The default playground. */
export const Playground: Story = {
    render: (args) => (
        <Section {...args}>
            <Paragraph>
                The section body goes here. It can hold any content — text, cards, a grid, a map.
            </Paragraph>
        </Section>
    ),
};

/** Centered header with a divider — common for a homepage section. */
export const Centered: Story = {
    args: { align: 'center', divider: true, title: 'My Skills', subtitle: 'What I work with' },
    render: (args) => (
        <Section {...args}>
            <Paragraph align="center">Body content below a centered, divided header.</Paragraph>
        </Section>
    ),
};

/** Stacked sections show the built-in rhythm. */
export const Stacked: Story = {
    render: () => (
        <div>
            <Section title="About" subtitle="Who I am" divider>
                <Paragraph>First section body.</Paragraph>
            </Section>
            <Section title="Work" subtitle="What I have built" divider>
                <Paragraph>Second section body.</Paragraph>
            </Section>
        </div>
    ),
};
