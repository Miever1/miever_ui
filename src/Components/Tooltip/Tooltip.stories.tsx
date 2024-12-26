import { Meta, StoryFn } from '@storybook/react';

import '../../Styles/index.scss';
import Tooltip from './index';
import Button from '../Button';

export default {
  title: 'General/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    overlay: {
      control: 'text',
      description: 'Content to be displayed inside the tooltip.',
      defaultValue: 'This is a tooltip!',
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position of the tooltip relative to the target.',
      defaultValue: 'right',
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'click', 'focus', 'contextMenu'],
      description: 'Defines the trigger for the tooltip.',
      defaultValue: 'hover',
    },
  },
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
    <Tooltip {...args}>
      <Button styleType='primary'>
        Hover Me
      </Button>
    </Tooltip>
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  overlay: 'This is a tooltip with detailed information.',
  placement: 'right',
};

export const TopPlacement = Template.bind({});
TopPlacement.args = {
  overlay: 'Tooltip shown on the top.',
  placement: 'top',
};

export const ClickTrigger = Template.bind({});
ClickTrigger.args = {
  overlay: 'This tooltip is triggered by clicking.',
  placement: 'bottom',
  trigger: 'click',
};

export const MultipleExamples = () => (
  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '50px' }}>
    <Tooltip overlay="Tooltip on Top" placement="top">
      <Button styleType='primary'>
        Top
      </Button>
    </Tooltip>
    <Tooltip overlay="Tooltip on Right" placement="right">
      <Button styleType='secondary'>
        Right
      </Button>
    </Tooltip>
    <Tooltip overlay="Tooltip on Bottom" placement="bottom">
      <Button styleType='danger'>
        Bottom
      </Button>
    </Tooltip>
    <Tooltip overlay="Tooltip on Left" placement="left">
      <Button styleType='primary'>
        Left
      </Button>
    </Tooltip>
  </div>
);
MultipleExamples.storyName = 'Tooltip Positions Example';