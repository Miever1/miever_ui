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
      <Menu
          defaultKey='active'
          onSelect={value => console.log(value)}
          items={[
              {
                  label: "active",
                  key: "active"
              },
              {
                  label: "disabled",
                  key: "disabled"
              },
              {
                  label: "click",
                  key: "click"
              },
              {
                  label: "drop1",
                  key: "drop1"
              },
          ]}
      />
  )
};

export const SubMenu: React.VFC<{}> = () => {
  return (
    <Box>
      <Menu
        defaultKey='JavaScript'
        items={[
          {
            label: "React",
            key: "React",
          },
          {
            label: "JavaScript",
            key: "JavaScript",
          },
          {
            label: "Hooks",
            key: "Hooks",
            children: [
              {
                label: "Introducing_Hooks",
                key: "Hooks_a",
              },
              {
                label: "JavaScript",
                key: "Hooks_b",
              },
              {
                label: "Introducing_Hooks",
                key: "Hooks_c",
              },
              {
                label: "JavaScript",
                key: "Hooks_d",
              },
            ]
          },
          {
            label: "Disabled",
            key: "Disabled",
            disabled: true
          },
        ]}
      />
      <Menu
        mode='vertical'
        style={{ width: '200px'}}
        defaultKey="JavaScript"
        items={[
          {
            label: "React",
            key: "React",
          },
          {
            label: "JavaScript",
            key: "JavaScript",
          },
          {
            label: "Hooks",
            key: "Hooks",
            children: [
              {
                label: "Introducing_Hooks",
                key: "Hooks_a",
              },
              {
                label: "JavaScript",
                key: "Hooks_b",
              },
              {
                label: "Introducing_Hooks",
                key: "Hooks_c",
              },
              {
                label: "JavaScript",
                key: "Hooks_d",
              },
            ]
          },
          {
            label: "Disabled",
            key: "Disabled",
            disabled: true
          }
        ]}
      />
    </Box>
  )
};