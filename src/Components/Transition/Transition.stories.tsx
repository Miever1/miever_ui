import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import Transition from './index';
import Button from '../Button';
import Box from '../Box';

export default {
  title: 'Other/Transition',
  component: Transition,
  decorators: [
    Story => (
      <Box style={{ height: '200px' }}>
        {Story()}
      </Box>
    )
  ]
} as Meta;

export const Basic: React.VFC<{}> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Box>
      <Button onClick={() => setVisible(!visible)}>click</Button>
      <Transition
        timeout={300}
        in={visible}
        animation="zoom-in-top"
      >
        <Box>
          当点击按钮时会出现动画效果
        </Box>
      </Transition>
    </Box>
  )
};
