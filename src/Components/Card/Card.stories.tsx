import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta: Meta<typeof Card> = {
    title: 'Data Display/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Cards group related content and actions in a flexible, themeable container. They adapt to light and dark themes automatically.',
            },
        },
    },
    argTypes: {
        title: { control: 'text', description: 'Card title rendered in the header.' },
        subTitle: { control: 'text', description: 'Secondary text shown next to the title.' },
        hoverable: {
            control: 'boolean',
            description: 'Lift the card with a shadow on hover.',
            table: { defaultValue: { summary: 'false' } },
        },
    },
    args: {
        title: 'Card title',
        subTitle: 'Subtitle',
        hoverable: false,
        children: 'This is the content of the card.',
    },
    render: (args) => <Card {...args} style={{ width: 320 }} />,
};

export default meta;
type Story = StoryObj<typeof Card>;

/** The default playground. Use the controls panel to explore every prop. */
export const Playground: Story = {};

/** A card that lifts on hover. */
export const Hoverable: Story = {
    args: { title: 'Hoverable card', subTitle: 'Hover me', hoverable: true },
};

/** A card with richer body content. */
export const WithContent: Story = {
    args: {
        title: 'Release notes',
        subTitle: 'v0.2.0',
        children: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ margin: 0 }}>Unified the component structure and styling.</p>
                <p style={{ margin: 0 }}>Added Divider, Tag and Badge components.</p>
            </div>
        ),
    },
};

/** Several cards in a responsive grid. */
export const Grid: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Card title="Card 1" subTitle="One" hoverable style={{ width: 220 }}>
                Content for card 1
            </Card>
            <Card title="Card 2" subTitle="Two" style={{ width: 220 }}>
                Content for card 2
            </Card>
            <Card title="Card 3" subTitle="Three" hoverable style={{ width: 220 }}>
                Content for card 3
            </Card>
        </div>
    ),
};
