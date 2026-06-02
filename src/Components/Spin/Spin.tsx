import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { SpinProps } from './interface';

const prefixCls = getPrefixCls('spin');

/**
 * Spin indicates a loading state, either standalone or as an overlay on content.
 *
 * ### Usage
 * ```jsx
 * import { Spin } from 'miever_ui';
 *
 * <Spin />
 * <Spin spinning={loading}><Content /></Spin>
 * ```
 */
const Spin = forwardRef<HTMLElement, SpinProps>(({
    spinning = true,
    size = 'md',
    tip,
    children,
    className,
    style,
}, ref) => {
    const indicator = (
        <span className={classNames(`${prefixCls}-indicator`, `${prefixCls}-${size}`)} role="status" aria-label="loading">
            <span className={`${prefixCls}-dot`} />
            {tip && <span className={`${prefixCls}-tip`}>{tip}</span>}
        </span>
    );

    if (!children) {
        return spinning ? (
            <span
                ref={ref as React.Ref<HTMLSpanElement>}
                className={classNames(prefixCls, className)}
                style={style}
            >
                {indicator}
            </span>
        ) : null;
    }

    return (
        <div
            ref={ref as React.Ref<HTMLDivElement>}
            className={classNames(`${prefixCls}-container`, className)}
            style={style}
        >
            {spinning && <div className={`${prefixCls}-overlay`}>{indicator}</div>}
            <div className={classNames(`${prefixCls}-content`, { blurred: spinning })}>
                {children}
            </div>
        </div>
    );
});

Spin.displayName = 'Spin';

export default Spin;
