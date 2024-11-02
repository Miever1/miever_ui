import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import Input from './index';
import { NativeInputProps } from './interface';

export default {
    title: 'Data Entry/Input',
    component: Input,
    tags: ['autodocs'],
} as Meta;

const Template: StoryFn<NativeInputProps> = (args) => <Input {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    placeholder: 'Enter text...',
    value: '',
};

export const StyleType: StoryFn<NativeInputProps> = () => {
    return (
      <React.Fragment>
        <Input size="sm" onChange={() => console.log(1)} disabled value={123} />
        <Input size="lg" placeholder="Large Input" />
      </React.Fragment>
    )
};