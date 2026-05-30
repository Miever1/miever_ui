import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Badge from './Badge';
import { BadgeProps } from './interface';

export default {
    title: 'Data Display/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
        theme: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
        },
    },
} as Meta;

const Box = () => (
    <span
        style={{
            display: 'inline-block',
            width: 40,
            height: 40,
            background: 'var(--color-bg-secondary)',
            borderRadius: 6,
        }}
    />
);

const Template: StoryFn<BadgeProps> = (args) => (
    <Badge {...args}>
        <Box />
    </Badge>
);

export const Basic = Template.bind({});
Basic.args = { count: 5 };

export const Overflow = Template.bind({});
Overflow.args = { count: 120, maxCount: 99 };

export const Dot = Template.bind({});
Dot.args = { dot: true, theme: 'primary' };

export const Standalone = () => (
    <div style={{ display: 'flex', gap: '8px' }}>
        <Badge count={1} theme="primary" />
        <Badge count={8} theme="success" />
        <Badge count={99} theme="warning" />
    </div>
);
