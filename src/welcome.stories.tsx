import React from 'react';
import { Meta } from '@storybook/react';

export default {
  title: 'Welcome',
} as Meta;

export const Welcome: React.VFC<{}> = () => {
  return (
    <React.Fragment>
      <h1>Welcome to miever components!</h1>
    </React.Fragment>
  )
};