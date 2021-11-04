import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import Transition from './index';
import Button from '../Button';

export default {
  title: 'Other/Transition',
  component: Transition,
  decorators: [
    Story => (
      <div style={{ height: '200px' }}>
        {Story()}
      </div>
    )
  ]
} as Meta;

export const Basic: React.VFC<{}> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(!visible)}>click</Button>
      <Transition
        timeout={300}
        in={visible}
        animation="zoom-in-top"
      >
        <div>
          当点击按钮时会出现动画效果
        </div>
      </Transition>
    </div>
  )
};
