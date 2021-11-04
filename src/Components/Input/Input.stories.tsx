import React from 'react';
import { Meta, Story } from '@storybook/react';

import Input from './index';
import { NativeInputProps } from './interface';

export default {
    title: 'Data Entry/Input',
    component: Input
} as Meta;

const Template: Story<NativeInputProps> = (args) => <Input {...args} />;
export const Basic = Template.bind({});
Basic.args = {};

export const StyleType: React.VFC<{}> = () => {
    return (
      <React.Fragment>
        <Input size="sm" onChange={() => console.log(1)} disabled value={123} />
        <Input size="lg" />
      </React.Fragment>
    )
};
