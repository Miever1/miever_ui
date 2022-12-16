import React from 'react';
import { Meta, Story } from '@storybook/react';

import '../../Styles/index.scss';
import Box from './Box';
import { BoxProps } from './interface';

export default {
  title: 'General/Box',
  component: Box
} as Meta;

const Template: Story<BoxProps> = (args) => <Box {...args} style={{ background: "#12aa9c"}}>This is a div element</Box>;
export const Basic = Template.bind({});
Basic.args = {};