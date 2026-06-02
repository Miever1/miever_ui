import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { PageHeaderProps } from './interface';

const prefixCls = getPrefixCls('page-header');

/**
 * A consistent page or section header — an optional eyebrow, a title, optional
 * subtitle, and optional trailing actions. Gives long pages a shared editorial
 * rhythm instead of ad-hoc markup. Forwards its ref to the root element.
 *
 * ### Usage
 * ```jsx
 * import { PageHeader } from 'miever_ui';
 *
 * <PageHeader
 *   eyebrow="01"
 *   title="Blog"
 *   subtitle="Notes on front-end, design systems and the craft."
 *   actions={<Button type="primary">Subscribe</Button>}
 * />
 * ```
 */
const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(
    (
        { title, subtitle, eyebrow, actions, level = 1, align = 'left', className, style },
        ref,
    ) => {
        const Heading = `h${level}` as React.ElementType;
        const classes = classNames(prefixCls, `${prefixCls}-${align}`, className);

        return (
            <header ref={ref} className={classes} style={style}>
                {eyebrow && <span className={`${prefixCls}-eyebrow`}>{eyebrow}</span>}
                <div className={`${prefixCls}-row`}>
                    <div className={`${prefixCls}-heading`}>
                        <Heading className={`${prefixCls}-title`}>{title}</Heading>
                        {subtitle && (
                            <p className={`${prefixCls}-subtitle`}>{subtitle}</p>
                        )}
                    </div>
                    {actions && <div className={`${prefixCls}-actions`}>{actions}</div>}
                </div>
            </header>
        );
    },
);

PageHeader.displayName = 'PageHeader';

export default PageHeader;
