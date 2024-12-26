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
      options: ['default', 'primary', 'danger', 'link', 'secondary'],
      description: 'Determines the button style',
    },
  },
} as Meta;

// Basic Button Story
const Template: StoryFn<IButtonProps> = (args) => <Button {...args}>Button</Button>;

export const Basic = Template.bind({});
Basic.args = {
  size: 'md',
  styleType: 'default',
};

// Button Styles Variations
export const StyleVariations = () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <Button styleType="default">Default</Button>
    <Button styleType="primary">Primary</Button>
    <Button styleType="secondary">Secondary</Button>
    <Button styleType="danger">Danger</Button>
    <Button disabled>Disabled</Button>
    <Button styleType="link">Link</Button>
  </div>
);
StyleVariations.parameters = {
  docs: {
    description: {
      story: 'Showcases all the different button styles supported by the `Button` component.',
    },
  },
};

// Button Size Variations
export const SizeVariations = () => (
  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
    <Button size="sm" style={{ flex: 'none' }}>Small</Button>
    <Button size="md" style={{ flex: 'none' }}>Medium</Button>
    <Button size="lg" style={{ flex: 'none' }}>Large</Button>
  </div>
);
SizeVariations.parameters = {
  docs: {
    description: {
      story: 'Displays buttons in small, medium, and large sizes.',
    },
  },
};