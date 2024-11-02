import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import Transition from './index';
import Button from '../Button';
import Box from '../Box';

export default {
  title: 'Other/Transition',
  component: Transition,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <Box style={{ height: '200px', padding: '20px', background: '#f5f5f5' }}>
        {Story()}
      </Box>
    ),
  ],
} as Meta;

export const Basic: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Box>
      <Button onClick={() => setVisible(!visible)} styleType="primary">
        Click Me
      </Button>
      <Transition timeout={300} in={visible} animation="zoom-in-top">
        <Box style={{ padding: '20px', backgroundColor: '#e0f7fa', borderRadius: '8px', marginTop: '10px' }}>
          This text appears with a transition effect!
        </Box>
      </Transition>
    </Box>
  );
};