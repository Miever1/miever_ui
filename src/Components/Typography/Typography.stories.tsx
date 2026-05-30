import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Typography, { Title, Text, Paragraph, Link } from './Typography';

const meta: Meta<typeof Typography.Text> = {
    title: 'General/Typography',
    component: Typography.Text,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Typography provides consistent text styles: `Title` (h1–h5), `Text` (inline), `Paragraph` (block) and `Link`. Each supports semantic color types and text decorations.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Typography.Text>;

/** Heading levels 1 through 5. */
export const Titles: Story = {
    render: () => (
        <div>
            <Title level={1}>h1. Miever</Title>
            <Title level={2}>h2. Miever</Title>
            <Title level={3}>h3. Miever</Title>
            <Title level={4}>h4. Miever</Title>
            <Title level={5}>h5. Miever</Title>
        </div>
    ),
};

/** Inline text variants. */
export const Texts: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Text>Default text</Text>
            <Text type="secondary">Secondary text</Text>
            <Text type="success">Success text</Text>
            <Text type="warning">Warning text</Text>
            <Text type="danger">Danger text</Text>
            <Text disabled>Disabled text</Text>
            <Text strong>Strong text</Text>
            <Text italic>Italic text</Text>
            <Text delete>Deleted text</Text>
            <Text underline>Underlined text</Text>
        </div>
    ),
};

/** Block paragraph. */
export const Paragraphs: Story = {
    render: () => (
        <div style={{ maxWidth: 480 }}>
            <Paragraph>
                I&apos;m a developer building things for the web. This paragraph demonstrates the
                default block text style with comfortable line height.
            </Paragraph>
            <Paragraph type="secondary">
                A secondary paragraph, useful for captions and supporting copy.
            </Paragraph>
        </div>
    ),
};

/** Links. */
export const Links: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 16 }}>
            <Link href="https://miever.net" target="_blank" rel="noreferrer">
                miever.net
            </Link>
            <Link href="#" type="success">
                Success link
            </Link>
            <Link href="#" disabled>
                Disabled link
            </Link>
        </div>
    ),
};
