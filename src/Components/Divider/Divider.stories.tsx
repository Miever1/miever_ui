import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Divider from './Divider';
import { DividerProps } from './interface';

export default {
    title: 'Layout/Divider',
    component: Divider,
    tags: ['autodocs'],
    argTypes: {
        direction: {
            control: { type: 'radio' },
            options: ['horizontal', 'vertical'],
        },
    },
} as Meta;

const Template: StoryFn<DividerProps> = (args) => (
    <div>
        <p>Content above the divider.</p>
        <Divider {...args} />
        <p>Content below the divider.</p>
    </div>
);

export const Basic = Template.bind({});
Basic.args = {};

export const WithText = Template.bind({});
WithText.args = { children: 'Section' };

export const Dashed = Template.bind({});
Dashed.args = { dashed: true, children: 'Dashed' };

export const Vertical = () => (
    <div>
        Home
        <Divider direction="vertical" />
        Docs
        <Divider direction="vertical" />
        About
    </div>
);
