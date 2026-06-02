import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Transition from './Transition';
import type { TransitionProps } from './interface';
import Button from '../Button';

const meta: Meta<typeof Transition> = {
    title: 'Utility/Transition',
    component: Transition,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Transition wraps content with a CSS animation as it mounts and unmounts. It is built on `react-transition-group` and ships four zoom directions.',
            },
        },
    },
    argTypes: {
        animation: {
            control: 'select',
            options: ['zoom-in-top', 'zoom-in-right', 'zoom-in-bottom', 'zoom-in-left'],
            description: 'Animation preset.',
        },
        timeout: { control: 'number', description: 'Duration in milliseconds.' },
    },
};

export default meta;
type Story = StoryObj<typeof Transition>;

const Panel = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            padding: 20,
            minWidth: 140,
            textAlign: 'center',
            fontWeight: 600,
            color: '#fff',
            background: 'var(--color-border-focus, #0CC0DF)',
            borderRadius: 8,
        }}
    >
        {children}
    </div>
);

const BasicDemo = (args: TransitionProps) => {
    const [visible, setVisible] = useState(true);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <Button type="primary" onClick={() => setVisible((v) => !v)}>
                Toggle
            </Button>
            <Transition {...args} in={visible} unmountOnExit>
                <Panel>Animated content</Panel>
            </Transition>
        </div>
    );
};

const AllAnimationsDemo = () => {
    const [visible, setVisible] = useState(true);
    const animations = ['zoom-in-top', 'zoom-in-right', 'zoom-in-bottom', 'zoom-in-left'] as const;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Button type="primary" onClick={() => setVisible((v) => !v)}>
                Toggle all
            </Button>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {animations.map((animation) => (
                    <Transition key={animation} animation={animation} timeout={300} in={visible} unmountOnExit>
                        <Panel>{animation}</Panel>
                    </Transition>
                ))}
            </div>
        </div>
    );
};

/** Toggle to play the animation in and out. */
export const Basic: Story = {
    args: { animation: 'zoom-in-top', timeout: 300 },
    render: (args) => <BasicDemo {...args} />,
};

/** All four zoom directions at once. */
export const AllAnimations: Story = {
    render: () => <AllAnimationsDemo />,
};
