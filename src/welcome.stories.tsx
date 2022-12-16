import React from 'react';
import { Meta } from '@storybook/react';

import Box from './Components/Box';

export default {
  title: 'Welcome',
} as Meta;

export const Welcome: React.VFC<{}> = () => {
  return (
    <Box>
      <h1>Components Overview</h1>
    </Box>
  )
};