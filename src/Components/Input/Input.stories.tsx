import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Input from './index';
import { NativeInputProps } from './interface';

export default {
  title: 'General/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'lg'],
      description: 'Set the size of the input field.',
      defaultValue: 'sm',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the input field.',
      defaultValue: false,
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field.',
      defaultValue: 'Enter text...',
    },
    style: {
      control: 'object',
      description: 'Inline styles applied to the input wrapper.',
    },
    className: {
      control: 'text',
      description: 'Custom class names for styling the input wrapper.',
    },
  },
} as Meta;

// Template for stories
const Template: StoryFn<NativeInputProps> = (args) => <Input {...args} />;

// Basic Input Story
export const Basic = Template.bind({});
Basic.args = {
  placeholder: 'Basic Input',
};

// Disabled Input
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: 'Disabled Input',
};

// Input with Different Sizes
export const SizeVariants = () => (
  <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
    <Input size="sm" placeholder="Small Input" />
    <Input size="lg" placeholder="Large Input" />
  </div>
);
SizeVariants.storyName = 'Input with Different Sizes';