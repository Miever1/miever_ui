import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';
import Tag from '../Tag';
import { TableColumn } from './interface';

interface DemoRow {
    id: string;
    company: string;
    role: string;
    country: string;
    status: 'Applied' | 'Interview' | 'Rejected';
}

const dataSource: DemoRow[] = [
    { id: '1', company: 'Spotify', role: 'Fullstack Engineer', country: 'Sweden', status: 'Rejected' },
    { id: '2', company: 'Reaktor', role: 'Software Developer', country: 'Finland', status: 'Applied' },
    { id: '3', company: 'ŌURA', role: 'Fullstack Engineer', country: 'Finland', status: 'Interview' },
];

const columns: TableColumn<DemoRow>[] = [
    {
        key: 'company',
        title: 'Company',
        dataIndex: 'company',
        sorter: (a, b) => a.company.localeCompare(b.company),
    },
    { key: 'role', title: 'Role', dataIndex: 'role' },
    {
        key: 'country',
        title: 'Country',
        dataIndex: 'country',
        sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
        key: 'status',
        title: 'Status',
        align: 'right',
        render: (record) => (
            <Tag
                theme={
                    record.status === 'Rejected'
                        ? 'danger'
                        : record.status === 'Interview'
                          ? 'success'
                          : 'primary'
                }
            >
                {record.status}
            </Tag>
        ),
    },
];

const meta: Meta<typeof Table<DemoRow>> = {
    title: 'Data Display/Table',
    component: Table,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Table renders row data with client-side sorting, custom cell renderers, loading and empty states, and an optional row click affordance.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md'],
            table: { defaultValue: { summary: 'md' } },
        },
        loading: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
        emptyText: { control: 'text', table: { defaultValue: { summary: 'No data' } } },
    },
    args: {
        columns,
        dataSource,
        rowKey: 'id',
    },
};

export default meta;
type Story = StoryObj<typeof Table<DemoRow>>;

/** The default playground. Click sortable headers to cycle asc → desc → off. */
export const Playground: Story = {};

/** Clickable rows. */
export const ClickableRows: Story = {
    args: { onRowClick: (record: DemoRow) => alert(record.company) },
};

/** Empty state. */
export const EmptyState: Story = {
    args: { dataSource: [], emptyText: 'No applications yet' },
};

/** Loading state. */
export const Loading: Story = {
    args: { dataSource: [], loading: true },
};
