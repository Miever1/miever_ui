import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Icon from './Icon';
import { IIconProps } from './interface';
import { BRAND_COLORS } from '../../Designs';

export default {
  title: 'General/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['coffee', 'home', 'user', 'bell', 'cog'],
      description: 'Specifies the icon to render (e.g., "coffee", "home").',
    },
    theme: {
      control: { type: 'select' },
      options: Object.keys(BRAND_COLORS),
      description: 'Applies a theme class to the icon.',
    },
    style: {
      control: 'object',
      description: 'Custom inline styles applied to the icon.',
    },
    className: {
      control: 'text',
      description: 'Additional class names for custom styling.',
    },
  },
} as Meta;

// Template for general use
const Template: StoryFn<IIconProps> = (args) => <Icon {...args} />;

// Story 1: Icon with theme
export const ThemedIcon = Template.bind({});
ThemedIcon.args = {
  icon: 'coffee',
  theme: 'primary',
  style: { fontSize: '24px' },
};
ThemedIcon.storyName = 'Themed Icon';

// Story 2: All themes displayed together
export const AllThemes = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    {Object.keys(BRAND_COLORS).map((theme) => (
      <Icon
        key={theme}
        icon="home"
        theme={theme as keyof typeof BRAND_COLORS}
        style={{ fontSize: '24px' }}
      />
    ))}
  </div>
);
AllThemes.storyName = 'Icons with All Themes';

// Story 3: Icon Sizes
export const IconSizes = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Icon icon="user" style={{ fontSize: '16px' }} />
    <Icon icon="user" style={{ fontSize: '24px' }} />
    <Icon icon="user" style={{ fontSize: '32px' }} />
    <Icon icon="user" style={{ fontSize: '48px' }} />
  </div>
);
IconSizes.storyName = 'Icons with Different Sizes';

// Story 4: Custom Styles
export const CustomStyles = () => (
  <Icon
    icon="cog"
    style={{
      fontSize: '32px',
      color: 'purple',
      border: '2px solid purple',
      padding: '8px',
      borderRadius: '50%',
    }}
  />
);
CustomStyles.storyName = 'Icon with Custom Styles';

// Story 5: Interactive Example
export const InteractiveIcon = Template.bind({});
InteractiveIcon.args = {
  icon: 'bell',
  theme: 'warning',
  style: { fontSize: '24px', cursor: 'pointer' },
};
InteractiveIcon.storyName = 'Interactive Icon';
InteractiveIcon.parameters = {
  docs: {
    description: {
      story:
        'This example demonstrates an interactive icon styled with a warning theme and a clickable cursor.',
    },
  },
};

// Story 6: Accessibility Showcase
export const AccessibleIcon = () => (
  <Icon icon="home" style={{ fontSize: '32px' }} aria-label="Home icon" />
);
AccessibleIcon.storyName = 'Accessible Icon';
AccessibleIcon.parameters = {
  docs: {
    description: {
      story: 'This icon includes an `aria-label` for improved accessibility.',
    },
  },
};