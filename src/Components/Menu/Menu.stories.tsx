import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Menu from './index'; // 导入 Menu 组件
import Box from '../Box';
import '../../Styles/index.scss'; // 导入样式文件

export default {
  title: 'Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box style={{ height: '300px', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
        {Story()}
      </Box>
    ),
  ],
  argTypes: {
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Specifies the layout mode of the menu: horizontal or vertical.',
    },
    defaultKey: {
      control: 'text',
      description: 'The key of the menu item that should be selected by default.',
    },
    onSelect: {
      action: 'selected', // Action will log the selected key to the console
      description: 'Callback function when a menu item is selected.',
    },
    prefix: {
      control: 'text',
      description: 'Content to be displayed as the prefix (left side of the menu).',
    },
    suffix: {
      control: 'text',
      description: 'Content to be displayed as the suffix (right side of the menu).',
    },
    items: {
      control: 'object',
      description: 'Array of menu items to be rendered.',
    },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <Menu
    {...args}
    items={[
      { label: 'Active', key: 'active' },
      { label: 'Disabled', key: 'disabled', disabled: true },
      { label: 'Click Me', key: 'click' },
      { label: 'Dropdown', key: 'drop1' },
    ]}
  />
);

// Basic Menu (Default Horizontal Menu)
export const Basic = Template.bind({});
Basic.args = {
  mode: 'horizontal',
  defaultKey: 'active',
  onSelect: (value: string) => console.log('Selected item key:', value),
};

// Vertical Menu
export const VerticalMenu = Template.bind({});
VerticalMenu.args = {
  mode: 'vertical',
  defaultKey: 'click',
  onSelect: (value: string) => console.log('Selected item key:', value),
};

// Menu with Prefix and Suffix
export const MenuWithPrefixSuffix = Template.bind({});
MenuWithPrefixSuffix.args = {
  mode: 'horizontal',
  prefix: 'Prefix Content', // Example for prefix content
  suffix: 'Suffix Content', // Example for suffix content
  defaultKey: 'click',
  onSelect: (value: string) => console.log('Selected item key:', value),
};

// Menu with Disabled Item (Showcase disabled state for a menu item)
export const MenuWithDisabledItem = Template.bind({});
MenuWithDisabledItem.args = {
  mode: 'horizontal',
  defaultKey: 'active',
  items: [
    { label: 'Active', key: 'active' },
    { label: 'Disabled', key: 'disabled', disabled: true }, // Disabled menu item
    { label: 'Click Me', key: 'click' },
  ],
  onSelect: (value: string) => console.log('Selected item key:', value),
};

// Menu with Multiple Dropdowns (Submenus)
export const MenuWithSubMenus = Template.bind({});
MenuWithSubMenus.args = {
  mode: 'horizontal',
  defaultKey: 'click',
  items: [
    { label: 'Home', key: 'home' },
    {
      label: 'Products',
      key: 'products',
      children: [
        { label: 'Product A', key: 'productA' },
        { label: 'Product B', key: 'productB' },
      ],
    },
    {
      label: 'Services',
      key: 'services',
      children: [
        { label: 'Service A', key: 'serviceA' },
        { label: 'Service B', key: 'serviceB' },
      ],
    },
  ],
  onSelect: (value: string) => console.log('Selected item key:', value),
};
MenuWithSubMenus.storyName = 'Menu with Submenus';