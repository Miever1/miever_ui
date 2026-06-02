import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import Button from '../Button/Button';

const cover = (seed: string) => (
    <img src={`https://picsum.photos/seed/${seed}/640/360`} alt="" />
);

const meta: Meta<typeof Card> = {
    title: 'Data Display/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A structured content container with an optional cover, header (title / subtitle / ' +
                    'meta / extra), body and footer. Supports vertical and horizontal layouts, an outlined ' +
                    'or elevated surface, and a hover lift with cover zoom. Adapts to light and dark themes.',
            },
        },
    },
    argTypes: {
        variant: { control: 'inline-radio', options: ['outlined', 'elevated'] },
        orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
        hoverable: { control: 'boolean' },
        clamp: { control: 'number' },
    },
    args: {
        variant: 'outlined',
        orientation: 'vertical',
        hoverable: true,
        title: 'Designing for clarity',
        subTitle: 'Essay',
        meta: 'May 2026 · 6 min read',
        children:
            'A short, friendly description of the article that explains what the reader will get out of it.',
    },
    render: (args) => (
        <Card {...args} cover={cover('clarity')} style={{ width: 340 }} />
    ),
};

export default meta;
type Story = StoryObj<typeof Card>;

/** The default playground. Use the controls to explore every prop. */
export const Playground: Story = {};

/** Outlined vs elevated surfaces. */
export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Card variant="outlined" title="Outlined" meta="1px border" cover={cover('a')} style={{ width: 260 }}>
                A bordered surface with no shadow.
            </Card>
            <Card variant="elevated" title="Elevated" meta="Soft shadow" cover={cover('b')} style={{ width: 260 }}>
                A shadowed surface with no border.
            </Card>
        </div>
    ),
};

/** A horizontal media card — cover beside the body, stacking on small screens. */
export const Horizontal: Story = {
    args: {
        orientation: 'horizontal',
        title: 'Three years on a cloud console',
        subTitle: 'Case study',
        meta: 'UCloud · Frontend',
        clamp: 3,
        children:
            'Frontend engineering on a large-scale cloud console — networking products, monitoring components, and system-level consistency across a sprawling product surface.',
        footer: (
            <>
                <Button size="sm" type="primary">
                    Live demo
                </Button>
                <Button size="sm" type="link">
                    GitHub
                </Button>
            </>
        ),
    },
    render: (args) => <Card {...args} cover={cover('console')} style={{ maxWidth: 560 }} />,
};

/** A responsive grid of vertical cards. */
export const CardGrid: Story = {
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 20,
            }}
        >
            {['react', 'design', 'travel'].map((s) => (
                <Card
                    key={s}
                    hoverable
                    cover={cover(s)}
                    title={`Story about ${s}`}
                    meta="May 2026"
                    clamp={2}
                    href="#"
                >
                    A clamped description that keeps every card the same height regardless of how
                    much text it contains.
                </Card>
            ))}
        </div>
    ),
};
