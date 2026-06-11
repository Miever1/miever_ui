import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Icon from '../Icon';
import Select from '../Select';
import { PaginationProps } from './interface';

const prefixCls = getPrefixCls('pagination');

/** Build the list of page numbers / ellipses to display. */
const getPages = (current: number, totalPages: number): (number | 'prev-ellipsis' | 'next-ellipsis')[] => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | 'prev-ellipsis' | 'next-ellipsis')[] = [1];
    const left = Math.max(2, current - 1);
    const right = Math.min(totalPages - 1, current + 1);

    if (left > 2) pages.push('prev-ellipsis');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('next-ellipsis');

    pages.push(totalPages);
    return pages;
};

/**
 * Pagination splits long lists (e.g. a blog index) across pages.
 *
 * ### Usage
 * ```jsx
 * import { Pagination } from 'miever_ui';
 *
 * <Pagination total={195} pageSize={10} onChange={setPage} />
 * ```
 */
const Pagination = forwardRef<HTMLUListElement, PaginationProps>(({
    total,
    pageSize = 10,
    current,
    defaultCurrent = 1,
    onChange,
    pageSizeOptions,
    onPageSizeChange,
    className,
    style,
}, ref) => {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const [internal, setInternal] = useState(defaultCurrent);
    const page = Math.min(current ?? internal, totalPages);

    const goTo = (next: number) => {
        if (next < 1 || next > totalPages || next === page) return;
        if (current === undefined) {
            setInternal(next);
        }
        onChange?.(next);
    };

    const pages = getPages(page, totalPages);

    return (
        <ul ref={ref} className={classNames(prefixCls, className)} style={style}>
            <li
                className={classNames(`${prefixCls}-item`, `${prefixCls}-prev`, {
                    disabled: page === 1,
                })}
                onClick={() => goTo(page - 1)}
                aria-label="Previous page"
            >
                <Icon icon="angle-left" />
            </li>
            {pages.map((p, index) =>
                typeof p === 'number' ? (
                    <li
                        key={p}
                        className={classNames(`${prefixCls}-item`, { active: p === page })}
                        onClick={() => goTo(p)}
                        aria-current={p === page ? 'page' : undefined}
                    >
                        {p}
                    </li>
                ) : (
                    <li key={`${p}-${index}`} className={`${prefixCls}-ellipsis`} aria-hidden="true">
                        …
                    </li>
                )
            )}
            <li
                className={classNames(`${prefixCls}-item`, `${prefixCls}-next`, {
                    disabled: page === totalPages,
                })}
                onClick={() => goTo(page + 1)}
                aria-label="Next page"
            >
                <Icon icon="angle-right" />
            </li>
            {pageSizeOptions && pageSizeOptions.length > 0 && (
                <li className={`${prefixCls}-size-changer`}>
                    <Select
                        size="sm"
                        options={pageSizeOptions.map((n) => ({
                            label: `${n} / page`,
                            value: n,
                        }))}
                        value={pageSize}
                        onChange={(next) => {
                            if (typeof next === 'number') onPageSizeChange?.(next);
                        }}
                        aria-label="Items per page"
                    />
                </li>
            )}
        </ul>
    );
});

Pagination.displayName = 'Pagination';

export default Pagination;
