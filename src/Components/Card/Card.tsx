import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { ICardProps } from './interface';

const prefixCls = getPrefixCls('card');

/**
 * A structured content container with an optional cover, header (title /
 * subtitle / meta / extra), body and footer. Supports vertical and horizontal
 * layouts, an outlined or elevated surface, and a hover lift with cover zoom.
 * Forwards its ref to the root element.
 *
 * ### Usage
 * ```jsx
 * import { Card } from 'miever_ui';
 *
 * <Card
 *   hoverable
 *   cover={<img src="/cover.jpg" alt="" />}
 *   title="Designing for clarity"
 *   meta="May 2026"
 *   clamp={3}
 *   href="/blog/clarity"
 * >
 *   A short, friendly description that gets clamped to three lines…
 * </Card>
 * ```
 */
const Card = forwardRef<HTMLElement, ICardProps>(
    (
        {
            variant = 'outlined',
            hoverable = false,
            orientation = 'vertical',
            cover,
            title,
            subTitle,
            meta,
            extra,
            footer,
            clamp,
            href,
            target,
            onClick,
            children,
            className,
            style,
        },
        ref,
    ) => {
        const classes = classNames(prefixCls, className, {
            [`${prefixCls}-${variant}`]: variant,
            [`${prefixCls}-horizontal`]: orientation === 'horizontal',
            [`${prefixCls}-hoverable`]: hoverable,
            [`${prefixCls}-clickable`]: href || onClick,
        });

        const hasHeader = title || subTitle || meta || extra;

        const body = (
            <>
                {cover && <div className={`${prefixCls}-cover`}>{cover}</div>}
                <div className={`${prefixCls}-body`}>
                    {hasHeader && (
                        <div className={`${prefixCls}-header`}>
                            <div className={`${prefixCls}-heading`}>
                                {title && <div className={`${prefixCls}-title`}>{title}</div>}
                                {subTitle && (
                                    <div className={`${prefixCls}-subtitle`}>{subTitle}</div>
                                )}
                                {meta && <div className={`${prefixCls}-meta`}>{meta}</div>}
                            </div>
                            {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
                        </div>
                    )}
                    {children && (
                        <div
                            className={classNames(`${prefixCls}-content`, {
                                [`${prefixCls}-clamp`]: clamp,
                            })}
                            style={
                                clamp
                                    ? ({ ['--card-clamp']: clamp } as React.CSSProperties)
                                    : undefined
                            }
                        >
                            {children}
                        </div>
                    )}
                    {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
                </div>
            </>
        );

        if (href) {
            return (
                <a
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    className={classes}
                    style={style}
                    href={href}
                    target={target}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    onClick={onClick}
                >
                    {body}
                </a>
            );
        }

        return (
            <div
                ref={ref as React.Ref<HTMLDivElement>}
                className={classes}
                style={style}
                onClick={onClick}
            >
                {body}
            </div>
        );
    },
);

Card.displayName = 'Card';

export default Card;
