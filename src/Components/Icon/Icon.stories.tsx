import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import Icon from './index';
import { IIconProps }  from './interface';

export default {
  title: 'General/Icon',
  component: Icon,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<IIconProps> = (args) => <Icon {...args}>Icon</Icon>;
export const Basic = Template.bind({});
Basic.args = { icon: ["fab", "github"] };

export const Size = Template.bind({});
Size.args = { size: '10x', icon: 'coffee' }

export const Theme = Template.bind({});
Theme.args = { size: '10x', icon: 'coffee', theme: 'primary' }