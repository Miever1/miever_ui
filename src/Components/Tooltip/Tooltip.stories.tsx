import React from 'react';
import { Meta, Story } from '@storybook/react';

import '../../Styles/index.scss';
import Tooltip from './index';

export default {
  title: 'General/Tooltip',
  component: Tooltip
} as Meta;

const Template: Story<typeof Tooltip> = (args) => <Tooltip {...args} placement="right" overlay={<span>This is a tooltip!</span>}><span>This is a div element</span></Tooltip>;
export const Basic = Template.bind({});
Basic.args = {};
