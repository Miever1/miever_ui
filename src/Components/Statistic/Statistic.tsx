import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Icon from '../Icon';
import { StatisticProps } from './interface';

const prefixCls = getPrefixCls('statistic');

/**
 * Displays a key figure with an optional label, prefix/suffix and trend.
 * Designed for KPI rows on dashboards.
 *
 * ### Usage
 * ```jsx
 * import { Statistic } from 'miever_ui';
 *
 * <Statistic title="Response Rate" value={32.5} suffix="%" trend="up" trendValue="+4% this week" />
 * ```
 */
const Statistic = forwardRef<HTMLDivElement, StatisticProps>(
    (
        {
            title,
            value,
            precision,
            prefix,
            suffix,
            theme,
            trend,
            trendValue,
            loading = false,
            className,
            style,
        },
        ref,
    ) => {
        const formattedValue =
            typeof value === 'number' && precision !== undefined
                ? value.toFixed(precision)
                : value;

        return (
            <div ref={ref} className={classNames(prefixCls, className)} style={style}>
                {title && <div className={`${prefixCls}-title`}>{title}</div>}
                {loading ? (
                    <div className={`${prefixCls}-loading`} aria-busy="true" />
                ) : (
                    <div
                        className={classNames(`${prefixCls}-content`, {
                            [`${prefixCls}-${theme}`]: theme,
                        })}
                    >
                        {prefix && <span className={`${prefixCls}-prefix`}>{prefix}</span>}
                        <span className={`${prefixCls}-value`}>{formattedValue}</span>
                        {suffix && <span className={`${prefixCls}-suffix`}>{suffix}</span>}
                    </div>
                )}
                {!loading && trendValue && (
                    <div
                        className={classNames(`${prefixCls}-trend`, {
                            [`${prefixCls}-trend-${trend}`]: trend,
                        })}
                    >
                        {trend && (
                            <Icon
                                icon={trend === 'up' ? 'arrow-trend-up' : 'arrow-trend-down'}
                                size="sm"
                            />
                        )}
                        <span>{trendValue}</span>
                    </div>
                )}
            </div>
        );
    },
);

Statistic.displayName = 'Statistic';

export default Statistic;
