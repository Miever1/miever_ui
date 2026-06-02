import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { BadgeProps } from './interface';

const prefixCls = getPrefixCls('badge');

/**
 * A small numeric or dot indicator, shown standalone or attached to an element.
 *
 * ### Usage
 * ```jsx
 * import { Badge } from 'miever_ui';
 *
 * <Badge count={5}><Avatar /></Badge>
 * <Badge dot theme="primary"><Icon icon="bell" /></Badge>
 * <Badge count={120} maxCount={99} />
 * ```
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
    count,
    maxCount = 99,
    dot = false,
    showZero = false,
    theme = 'danger',
    children,
    className,
    style,
}, ref) => {
    const hasCount = count !== undefined && (count !== 0 || showZero);
    const display = count !== undefined && count > maxCount ? `${maxCount}+` : count;
    const themeCls = `${prefixCls}-${theme}`;

    const renderIndicator = () => {
        if (dot) {
            return <span className={classNames(`${prefixCls}-dot`, themeCls)} />;
        }
        if (hasCount) {
            return <sup className={classNames(`${prefixCls}-count`, themeCls)}>{display}</sup>;
        }
        return null;
    };

    const indicator = renderIndicator();

    if (!children) {
        return (
            <span ref={ref} className={classNames(prefixCls, `${prefixCls}-standalone`, className)} style={style}>
                {indicator}
            </span>
        );
    }

    return (
        <span ref={ref} className={classNames(prefixCls, className)} style={style}>
            {children}
            {indicator}
        </span>
    );
});

Badge.displayName = 'Badge';

export default Badge;
