import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
    title: 'Data Display/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Avatar represents a user or entity. It renders an image, falling back to an icon or text (e.g. initials) when no image is available.',
            },
        },
    },
    argTypes: {
        shape: { control: 'inline-radio', options: ['circle', 'square'] },
        size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
        src: { control: 'text' },
    },
    args: { shape: 'circle', size: 'md' },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/** Image avatar. */
export const Image: Story = {
    args: { src: 'https://i.pravatar.cc/120?img=12', alt: 'User' },
};

/** Falls back to initials when there is no image. */
export const Text: Story = {
    args: { children: 'MV' },
};

/** Falls back to an icon. */
export const WithIcon: Story = {
    args: { icon: 'user' },
};

/** Sizes and shapes. */
export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Avatar size="sm">S</Avatar>
            <Avatar size="md">M</Avatar>
            <Avatar size="lg">L</Avatar>
            <Avatar size={80}>XL</Avatar>
            <Avatar shape="square" icon="user" />
        </div>
    ),
};
