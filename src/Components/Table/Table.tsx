import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Empty from '../Empty';
import Icon from '../Icon';
import Spin from '../Spin';
import { SortOrder, TableProps } from './interface';

const prefixCls = getPrefixCls('table');

interface SortState {
    key: string;
    order: SortOrder;
}

/**
 * A data table with client-side sorting, row click handling, loading and
 * empty states. Cell content is fully customizable per column via `render`.
 *
 * ### Usage
 * ```jsx
 * import { Table } from 'miever_ui';
 *
 * <Table
 *     rowKey="id"
 *     columns={[
 *         { key: 'name', title: 'Name', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
 *         { key: 'age', title: 'Age', dataIndex: 'age', align: 'right' },
 *     ]}
 *     dataSource={users}
 * />
 * ```
 */
function Table<T>({
    columns,
    dataSource,
    rowKey,
    size = 'md',
    loading = false,
    emptyText = 'No data',
    onRowClick,
    className,
    style,
}: TableProps<T>) {
    const [sort, setSort] = useState<SortState | null>(null);

    const getRowKey = (record: T): string =>
        typeof rowKey === 'function' ? rowKey(record) : String(record[rowKey]);

    const sortedData = useMemo(() => {
        if (!sort) return dataSource;
        const column = columns.find((c) => c.key === sort.key);
        if (!column?.sorter) return dataSource;
        const sorted = [...dataSource].sort(column.sorter);
        return sort.order === 'desc' ? sorted.reverse() : sorted;
    }, [dataSource, columns, sort]);

    const handleSort = (key: string) => {
        setSort((prev) => {
            if (prev?.key !== key) return { key, order: 'asc' };
            if (prev.order === 'asc') return { key, order: 'desc' };
            return null;
        });
    };

    const classes = classNames(prefixCls, `${prefixCls}-${size}`, className, {
        [`${prefixCls}-loading`]: loading,
    });

    return (
        <div className={classes} style={style}>
            <table className={`${prefixCls}-inner`}>
                <thead>
                    <tr>
                        {columns.map((column) => {
                            const sortable = Boolean(column.sorter);
                            const active = sort?.key === column.key ? sort.order : undefined;

                            return (
                                <th
                                    key={column.key}
                                    style={{ width: column.width, textAlign: column.align }}
                                    className={classNames({
                                        [`${prefixCls}-sortable`]: sortable,
                                    })}
                                    aria-sort={
                                        active
                                            ? active === 'asc'
                                                ? 'ascending'
                                                : 'descending'
                                            : undefined
                                    }
                                    onClick={sortable ? () => handleSort(column.key) : undefined}
                                >
                                    <span className={`${prefixCls}-th-content`}>
                                        {column.title}
                                        {sortable && (
                                            <span
                                                className={classNames(`${prefixCls}-sort-icon`, {
                                                    [`${prefixCls}-sort-active`]: active,
                                                })}
                                            >
                                                <Icon
                                                    icon={
                                                        active === 'asc'
                                                            ? 'sort-up'
                                                            : active === 'desc'
                                                              ? 'sort-down'
                                                              : 'sort'
                                                    }
                                                    size="sm"
                                                />
                                            </span>
                                        )}
                                    </span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((record, index) => (
                        <tr
                            key={getRowKey(record)}
                            className={classNames({
                                [`${prefixCls}-row-clickable`]: Boolean(onRowClick),
                            })}
                            onClick={onRowClick ? () => onRowClick(record) : undefined}
                        >
                            {columns.map((column) => (
                                <td key={column.key} style={{ textAlign: column.align }}>
                                    {column.render
                                        ? column.render(record, index)
                                        : column.dataIndex !== undefined
                                          ? (record[column.dataIndex] as ReactNodeSafe)
                                          : null}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {!loading && sortedData.length === 0 && (
                <div className={`${prefixCls}-empty`}>
                    {typeof emptyText === 'string' ? <Empty description={emptyText} /> : emptyText}
                </div>
            )}
            {loading && (
                <div className={`${prefixCls}-spin`}>
                    <Spin />
                </div>
            )}
        </div>
    );
}

type ReactNodeSafe = React.ReactNode;

export default Table;
