import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './Table';
import { TableColumn } from './interface';

interface Row {
    id: string;
    name: string;
    age: number;
}

const columns: TableColumn<Row>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { key: 'age', title: 'Age', dataIndex: 'age' },
];

const dataSource: Row[] = [
    { id: '1', name: 'Bob', age: 30 },
    { id: '2', name: 'Alice', age: 25 },
];

describe('Table Component', () => {
    it('renders headers and cells', () => {
        const { getByText } = render(
            <Table columns={columns} dataSource={dataSource} rowKey="id" />
        );
        expect(getByText('Name')).toBeInTheDocument();
        expect(getByText('Alice')).toBeInTheDocument();
        expect(getByText('30')).toBeInTheDocument();
    });

    it('sorts when a sortable header is clicked', () => {
        const { getByText, container } = render(
            <Table columns={columns} dataSource={dataSource} rowKey="id" />
        );
        fireEvent.click(getByText('Name'));
        const cells = container.querySelectorAll('tbody td:first-child');
        expect(cells[0]).toHaveTextContent('Alice');
        fireEvent.click(getByText('Name'));
        const cellsDesc = container.querySelectorAll('tbody td:first-child');
        expect(cellsDesc[0]).toHaveTextContent('Bob');
    });

    it('fires onRowClick with the record', () => {
        const onRowClick = jest.fn();
        const { getByText } = render(
            <Table columns={columns} dataSource={dataSource} rowKey="id" onRowClick={onRowClick} />
        );
        fireEvent.click(getByText('Alice'));
        expect(onRowClick).toHaveBeenCalledWith(expect.objectContaining({ name: 'Alice' }));
    });

    it('renders the empty state', () => {
        const { getByText } = render(
            <Table columns={columns} dataSource={[]} rowKey="id" emptyText="Nothing here" />
        );
        expect(getByText('Nothing here')).toBeInTheDocument();
    });

    it('uses a custom renderer when provided', () => {
        const custom: TableColumn<Row>[] = [
            { key: 'x', title: 'X', render: (r) => <strong>{r.name.toUpperCase()}</strong> },
        ];
        const { getByText } = render(
            <Table columns={custom} dataSource={dataSource} rowKey="id" />
        );
        expect(getByText('ALICE')).toBeInTheDocument();
    });

    it('selects rows via rowSelection checkboxes', () => {
        const onChange = jest.fn();
        const { container } = render(
            <Table
                rowKey="id"
                columns={[{ key: 'name', title: 'Name', dataIndex: 'name' }]}
                dataSource={[
                    { id: '1', name: 'Alpha' },
                    { id: '2', name: 'Beta' },
                ]}
                rowSelection={{ selectedKeys: [], onChange }}
            />
        );
        const boxes = container.querySelectorAll('.miever-table-selection input[type="checkbox"]');
        expect(boxes).toHaveLength(3); // header + 2 rows
        fireEvent.click(boxes[1]);
        expect(onChange).toHaveBeenCalledWith(['1']);
        fireEvent.click(boxes[0]);
        expect(onChange).toHaveBeenCalledWith(['1', '2']);
    });
});
