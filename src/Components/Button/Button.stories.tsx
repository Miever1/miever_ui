import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Button from './index';
import '../../Styles/index.scss';
import { IButtonProps } from './interface';

export default {
  title: 'General/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the button size',
    },
    styleType: {
      control: { type: 'select' },
      options: ['default', 'primary', 'danger', 'link', 'disabled', 'secondary'],
      description: 'Determines the button style',
    },
  },
} as Meta;

const Template: StoryFn<IButtonProps> = (args) => <Button {...args}>Button</Button>;

// Basic Button Story
export const Basic = Template.bind({});
Basic.args = {};

// Button Styles
export const StyleType = Template.bind({});
StyleType.args = { styleType: 'primary' };

// Sizes
export const Size = Template.bind({});
Size.args = { size: 'md' };

// Multiple Style Variations
export const StyleVariations: React.VFC = () => (
  <>
    <Button styleType="link" style={{ marginRight: '8px' }}>Link</Button>
    <Button styleType="default" style={{ marginRight: '8px' }}>Default</Button>
    <Button styleType="primary" style={{ marginRight: '8px' }}>Primary</Button>
    <Button styleType="danger" style={{ marginRight: '8px' }}>Danger</Button>
    <Button styleType="disabled" style={{ marginRight: '8px' }}>Disabled</Button>
    <Button styleType="secondary" style={{ marginRight: '8px' }}>Secondary</Button>
  </>
);

// Multiple Size Variations
export const SizeVariations: React.VFC = () => (
  <>
    <Button size="sm" style={{ marginRight: '8px' }}>Small</Button>
    <Button size="md" style={{ marginRight: '8px' }}>Medium</Button>
    <Button size="lg">Large</Button>
  </>
);