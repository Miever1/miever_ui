import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Card from './Card';
import '../../Styles/index.scss';

export default {
  title: 'General/Card',
  component: Card,
  tags: ['autodocs', 'examples'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title of the card.',
    },
    subTitle: {
      control: 'text',
      description: 'Optional subtitle displayed below the title.',
    },
    hoverable: {
      control: 'boolean',
      description: 'If true, the card will have hover effects.',
    },
  },
} as Meta;

// Template for reusable story creation
const Template: StoryFn = (args) => (
  <Card {...args} style={{ width: '300px', padding: '16px' }}>
    {args.children || 'This is the content of the card.'}
  </Card>
);

// Basic Card Example
export const Basic = Template.bind({});
Basic.args = {
  title: 'Card Title',
  subTitle: 'Card Subtitle',
};

// Hoverable Card Example
export const Hoverable = Template.bind({});
Hoverable.args = {
  title: 'Hoverable Card',
  subTitle: 'Card with hover effect',
  hoverable: true,
};

// Card with Long Content Example
export const WithLongContent = Template.bind({});
WithLongContent.args = {
  title: 'Card with Long Content',
  subTitle: 'Long content example',
  children: (
    <div>
      <p>This is an example of a card with more content than usual.</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
      </p>
      <p>
        Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
      </p>
    </div>
  ),
};

// Multiple Cards Example
export const MultipleCards = () => (
  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
    <Card title="Card 1" subTitle="Subtitle 1" hoverable>
      Content for card 1
    </Card>
    <Card title="Card 2" subTitle="Subtitle 2">
      Content for card 2
    </Card>
    <Card title="Card 3" subTitle="Subtitle 3" hoverable>
      Content for card 3
    </Card>
  </div>
);