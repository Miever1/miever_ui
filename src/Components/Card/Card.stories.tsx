import React from 'react';
import { Meta, Story } from '@storybook/react';

import Card from './index';
import { ICardProps } from "./interface";
import '../../Styles/index.scss';

export default {
  title: 'General/Card',
  component: Card
} as Meta;

const Template: Story<ICardProps> = (args) => <Card title={"This is card title!"} subTitle="2019-05-04 20:09" {...args}>This is the card body!</Card>;
export const Basic = Template.bind({});
Basic.args = {
    hoverable: true
};
