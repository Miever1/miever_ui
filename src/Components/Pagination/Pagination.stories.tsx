import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
    title: 'Navigation/Pagination',
    component: Pagination,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Pagination splits long lists across pages, with ellipses for large ranges.',
            },
        },
    },
    argTypes: {
        total: { control: 'number' },
        pageSize: { control: 'number' },
    },
    args: { total: 100, pageSize: 10, defaultCurrent: 1 },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const ControlledDemo = () => {
    const [page, setPage] = useState(1);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Pagination total={195} pageSize={10} current={page} onChange={setPage} />
            <span style={{ fontSize: 14 }}>Current page: {page}</span>
        </div>
    );
};

/** Uncontrolled pagination. */
export const Basic: Story = {};

/** Many pages, showing ellipses. */
export const ManyPages: Story = {
    args: { total: 500, pageSize: 10, defaultCurrent: 6 },
};

/** Controlled with a current-page readout. */
export const Controlled: Story = {
    render: () => <ControlledDemo />,
};
