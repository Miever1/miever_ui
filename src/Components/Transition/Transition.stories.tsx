import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Transition from './Transition';
import { TransitionProps } from './interface';
import '../../Styles/index.scss';
import Button from '../Button';

export default {
  title: 'General/Transition',
  component: Transition,
  tags: ['autodocs'],
  argTypes: {
    animation: {
      control: { type: 'select' },
      options: ['zoom-in-top', 'zoom-in-right', 'zoom-in-bottom', 'zoom-in-left'],
      description: 'Specifies the animation class to use.',
    },
    timeout: {
      control: { type: 'number' },
      description: 'Duration of the animation in milliseconds.',
    },
    in: {
      control: { type: 'boolean' },
      description: 'Determines whether the transition is in or out.',
    },
    unmountOnExit: {
      control: { type: 'boolean' },
      description: 'Unmounts the component when it is not visible.',
    },
    wrapper: {
      control: { type: 'boolean' },
      description: 'Wraps the child in a Box container if true.',
    },
  },
} as Meta;

const Template: StoryFn<TransitionProps> = (args) => {
  const [visible, setVisible] = useState(!args.in);

  return (
    <div style={{ padding: '20px' }}>
      <Button
        style={{ marginBottom: '16px', padding: '8px 16px' }}
        styleType="primary"
        onClick={() => setVisible((prev) => !prev)}
      >
        Toggle Animation
      </Button>
      <Transition {...args} in={visible}>
        <div
          style={{
            padding: '20px',
            background: '#0CC0DF',
            color: '#fff',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          Animated Content
        </div>
      </Transition>
    </div>
  );
};

// Basic Transition
export const Basic = Template.bind({});
Basic.args = {
  animation: 'zoom-in-top',
  timeout: 300,
  in: true,
};

// Showcase All Animations
export const AllAnimations = () => {
  const animations: TransitionProps['animation'][] = [
    'zoom-in-top',
    'zoom-in-right',
    'zoom-in-bottom',
    'zoom-in-left',
  ];
  const [visible, setVisible] = useState(true);

  return (
    <div style={{ padding: '20px' }}>
      <Button
        style={{ marginBottom: '16px', padding: '8px 16px' }}
        styleType="primary"
        onClick={() => setVisible((prev) => !prev)}
      >
        Toggle All Animations
      </Button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {animations.map((animation) => (
          <Transition
            key={animation}
            animation={animation}
            timeout={300}
            in={visible}
            unmountOnExit
          >
            <div
              style={{
                padding: '20px',
                background: '#12aa9c',
                color: '#fff',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                minWidth: '120px',
              }}
            >
              {animation}
            </div>
          </Transition>
        ))}
      </div>
    </div>
  );
};
AllAnimations.storyName = 'Showcase of All Animations';