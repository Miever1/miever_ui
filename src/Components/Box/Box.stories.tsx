import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import '../../Styles/index.scss';
import Box from './Box';
import { BoxProps } from './interface';

export default {
  title: 'General/Box',
  tags: ['autodocs'],
  component: Box,
} as Meta;

const Template: StoryFn<BoxProps> = (args) => <Box {...args} style={{ background: "#12aa9c" }}>This is a div element</Box>;

export const Basic = Template.bind({});
Basic.args = {};