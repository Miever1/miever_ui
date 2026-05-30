import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import Button from '../Button';

const meta: Meta<typeof Modal> = {
    title: 'Feedback/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Modal shows content in a dialog overlaying the page. It renders via a portal, traps scroll, and closes on overlay click or Escape.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const BasicDemo = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button styleType="primary" onClick={() => setOpen(true)}>
                Open modal
            </Button>
            <Modal
                open={open}
                title="Confirm action"
                onOk={() => setOpen(false)}
                onClose={() => setOpen(false)}
            >
                <p style={{ margin: 0 }}>Are you sure you want to continue?</p>
            </Modal>
        </>
    );
};

const CustomFooterDemo = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)}>Open</Button>
            <Modal open={open} title="No footer" footer={null} onClose={() => setOpen(false)}>
                <p style={{ margin: 0 }}>This modal hides the default footer.</p>
            </Modal>
        </>
    );
};

/** A basic confirm dialog. */
export const Basic: Story = {
    render: () => <BasicDemo />,
};

/** Custom footer (or no footer). */
export const CustomFooter: Story = {
    render: () => <CustomFooterDemo />,
};
