import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { BreadcrumbProps } from './interface';

const prefixCls = getPrefixCls('breadcrumb');

/**
 * Breadcrumb shows the current page's location within a hierarchy.
 *
 * ### Usage
 * ```jsx
 * import { Breadcrumb } from 'miever_ui';
 *
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Blog', href: '/blog' },
 *     { label: 'Post title' },
 *   ]}
 * />
 * ```
 */
const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(({
    items,
    separator = '/',
    className,
    style,
}, ref) => (
    <nav ref={ref} className={classNames(prefixCls, className)} style={style} aria-label="Breadcrumb">
        <ol className={`${prefixCls}-list`}>
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                const interactive = !isLast && (item.href || item.onClick);
                return (
                    <li key={index} className={`${prefixCls}-item`}>
                        {interactive ? (
                            <a
                                className={`${prefixCls}-link`}
                                href={item.href}
                                onClick={item.onClick}
                            >
                                {item.label}
                            </a>
                        ) : (
                            <span
                                className={classNames(`${prefixCls}-text`, { current: isLast })}
                                aria-current={isLast ? 'page' : undefined}
                            >
                                {item.label}
                            </span>
                        )}
                        {!isLast && (
                            <span className={`${prefixCls}-separator`} aria-hidden="true">
                                {separator}
                            </span>
                        )}
                    </li>
                );
            })}
        </ol>
    </nav>
));

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
