import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { SkeletonProps } from './interface';

const prefixCls = getPrefixCls('skeleton');

/**
 * Skeleton shows placeholder shapes while content loads.
 *
 * ### Usage
 * ```jsx
 * import { Skeleton } from 'miever_ui';
 *
 * <Skeleton loading={loading} avatar title paragraph={3} active>
 *   <RealContent />
 * </Skeleton>
 * ```
 */
const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({
    avatar = false,
    title = true,
    paragraph = 3,
    active = true,
    loading = true,
    children,
    className,
    style,
}, ref) => {
    if (!loading) return <>{children}</>;

    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-active`]: active,
    });

    return (
        <div ref={ref} className={classes} style={style} aria-busy="true" aria-live="polite">
            {avatar && <span className={`${prefixCls}-avatar`} />}
            <div className={`${prefixCls}-body`}>
                {title && <span className={`${prefixCls}-title`} />}
                {paragraph > 0 && (
                    <div className={`${prefixCls}-paragraph`}>
                        {Array.from({ length: paragraph }).map((_, i) => (
                            <span key={i} className={`${prefixCls}-row`} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;
