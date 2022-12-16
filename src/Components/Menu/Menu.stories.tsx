import React from 'react';
import { Meta, } from '@storybook/react';

import Box from '../Box';
import Menu from './index';
import '../../Styles/index.scss';

export default {
  title: 'Navigation/Menu',
  component: Menu,
  decorators: [
    Story => (
      <Box style={{ height: '200px' }}>
        {Story()}
      </Box>
    ),
  ],
} as Meta;

export const Basic: React.VFC<{}> = () => {
  return (
      <Menu>
        <Menu.Item>Docs</Menu.Item>
        <Menu.Item>Tutorial</Menu.Item>
        <Menu.Item>Blog</Menu.Item>
        <Menu.Item>Community</Menu.Item>
      </Menu>
  )
};

export const SubMenu: React.VFC<{}> = () => {
  return (
    <Box>
      <Menu>
        <Menu.Item>React</Menu.Item>
        <Menu.Item>JavaScript</Menu.Item>
        <Menu.SubMenu title="Hooks">
          <Menu.Item>Introducing Hooks</Menu.Item>
          <Menu.Item>Hooks at a Glance</Menu.Item>
          <Menu.Item>Using the State Hook</Menu.Item>
          <Menu.Item>Using the Effect Hook</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item disabled>Disabled</Menu.Item>
      </Menu>
      <Menu mode='vertical' style={{ width: '200px'}}>
        <Menu.Item>React</Menu.Item>
        <Menu.SubMenu title="Hooks" isOpened>
          <Menu.Item>Introducing Hooks</Menu.Item>
          <Menu.Item>Rules of Hooks</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="Testing">
          <Menu.Item>Testing Overview</Menu.Item>
          <Menu.Item>Testing Recipes</Menu.Item>
          <Menu.Item>Testing Environments</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Box>
  )
};