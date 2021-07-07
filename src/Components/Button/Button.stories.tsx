import React from 'react';
import { Meta, Story } from '@storybook/react';

import Button from './Button';
import '../../Styles/index.scss';
import { IButtonProps } from './interface';

export default {
  title: 'General/Button',
  component: Button
} as Meta;

const Template: Story<IButtonProps> = (args) => <Button {...args}>Button</Button>;
export const Basic = Template.bind({});
Basic.args = {};

export const StyleType: React.VFC<{}> = () => {
  return (
    <React.Fragment>
      <Button styleType='link' style={{ marginRight: '8px' }}>Link</Button>
      <Button styleType='default' style={{ marginRight: '8px' }}>Default</Button>
      <Button styleType='primary' style={{ marginRight: '8px' }}>Primary</Button>
      <Button styleType='danger' style={{ marginRight: '8px' }}>Danger</Button>
      <Button styleType='disabled' style={{ marginRight: '8px' }}>Disabled</Button>
      <Button styleType='secondary' style={{ marginRight: '8px' }}>Secondary</Button>
    </React.Fragment>
  )
};

export const Size: React.VFC<{}> = () => {
  return (
    <React.Fragment>
      <React.Fragment>
      <Button size='sm' style={{ marginRight: '8px' }}>Small</Button>
      <Button size='md' style={{ marginRight: '8px' }}>Medium</Button>
      <Button size='lg' style={{ marginRight: '8px' }}>Large</Button>
    </React.Fragment>
    </React.Fragment>
  )
};