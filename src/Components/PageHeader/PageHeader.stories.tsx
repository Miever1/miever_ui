import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import PageHeader from './PageHeader';
import Button from '../Button/Button';

const meta: Meta<typeof PageHeader> = {
    title: 'Layout/PageHeader',
    component: PageHeader,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A consistent page/section header: an optional eyebrow, a title, an optional ' +
                    'subtitle and optional trailing actions. Gives long pages a shared editorial rhythm.',
            },
        },
    },
    argTypes: {
        level: { control: 'inline-radio', options: [1, 2, 3] },
        align: { control: 'inline-radio', options: ['left', 'center'] },
    },
    args: {
        eyebrow: '01',
        title: 'Blog',
        subtitle: 'Notes on front-end engineering, design systems and the craft.',
        level: 1,
        align: 'left',
    },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

/** The default playground. */
export const Playground: Story = {};

/** A header with a trailing action. */
export const WithActions: Story = {
    args: { actions: <Button type="primary">Subscribe</Button> },
};

/** Centered, without an eyebrow. */
export const Centered: Story = {
    args: { align: 'center', eyebrow: undefined },
};
