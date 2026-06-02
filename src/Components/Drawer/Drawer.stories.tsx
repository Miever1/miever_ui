import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Drawer from './Drawer';
import Button from '../Button';
import type { DrawerPlacement } from './interface';

const meta: Meta<typeof Drawer> = {
    title: 'Feedback/Drawer',
    component: Drawer,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Drawer slides a panel in from a screen edge — useful for mobile navigation, filters or detail views. Rendered via a portal.',
            },
        },
    },
    argTypes: {
        placement: { control: 'inline-radio', options: ['left', 'right', 'top', 'bottom'] },
    },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const DrawerDemo = ({ placement = 'right' }: { placement?: DrawerPlacement }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Open drawer
            </Button>
            <Drawer open={open} placement={placement} title="Navigation" onClose={() => setOpen(false)}>
                <p style={{ margin: 0 }}>Drawer content goes here.</p>
            </Drawer>
        </>
    );
};

/** Drawer with selectable placement. */
export const Basic: Story = {
    args: { placement: 'right' },
    render: (args) => <DrawerDemo placement={args.placement} />,
};
