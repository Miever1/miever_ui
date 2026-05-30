import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Tag from './Tag';
import { TagProps } from './interface';

export default {
    title: 'Data Display/Tag',
    component: Tag,
    tags: ['autodocs'],
    argTypes: {
        theme: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
        },
    },
} as Meta;

const Template: StoryFn<TagProps> = (args) => <Tag {...args}>Tag</Tag>;

export const Basic = Template.bind({});
Basic.args = {};

export const Themes = () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Tag>Default</Tag>
        <Tag theme="primary">Primary</Tag>
        <Tag theme="secondary">Secondary</Tag>
        <Tag theme="success">Success</Tag>
        <Tag theme="info">Info</Tag>
        <Tag theme="warning">Warning</Tag>
        <Tag theme="danger">Danger</Tag>
    </div>
);

export const Closable = () => (
    <div style={{ display: 'flex', gap: '8px' }}>
        <Tag theme="primary" closable>
            Closable
        </Tag>
        <Tag theme="danger" closable>
            Remove me
        </Tag>
    </div>
);
