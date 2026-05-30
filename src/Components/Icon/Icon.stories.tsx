import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';
import { BRAND_COLORS } from '../../Designs';

const meta: Meta<typeof Icon> = {
    title: 'General/Icon',
    component: Icon,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Icon renders any [FontAwesome](https://fontawesome.com/icons) glyph and can be tinted with a brand theme color. It forwards all `FontAwesomeIcon` props.',
            },
        },
    },
    argTypes: {
        icon: {
            control: 'select',
            options: ['coffee', 'house', 'user', 'bell', 'gear', 'heart', 'star', 'magnifying-glass'],
            description: 'FontAwesome icon name.',
        },
        theme: {
            control: 'select',
            options: [undefined, ...Object.keys(BRAND_COLORS)],
            description: 'Brand color theme.',
        },
    },
    args: {
        icon: 'coffee',
        theme: 'primary',
        style: { fontSize: 24 },
    },
};

export default meta;
type Story = StoryObj<typeof Icon>;

/** The default playground. Use the controls panel to explore every prop. */
export const Playground: Story = {};

/** Every brand theme color. */
export const Themes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {Object.keys(BRAND_COLORS).map((theme) => (
                <Icon
                    key={theme}
                    icon="house"
                    theme={theme as keyof typeof BRAND_COLORS}
                    style={{ fontSize: 24 }}
                />
            ))}
        </div>
    ),
};

/** Size is driven by `font-size`. */
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {[16, 24, 32, 48].map((size) => (
                <Icon key={size} icon="user" style={{ fontSize: size }} />
            ))}
        </div>
    ),
};

/** Brand icons work too — pass the `['fab', name]` tuple. */
export const BrandIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Icon icon={['fab', 'github']} style={{ fontSize: 28 }} />
            <Icon icon={['fab', 'react']} theme="info" style={{ fontSize: 28 }} />
            <Icon icon={['fab', 'js']} theme="warning" style={{ fontSize: 28 }} />
        </div>
    ),
};
