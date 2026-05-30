import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { ProgressProps } from './interface';

const prefixCls = getPrefixCls('progress');

const clamp = (n: number) => Math.max(0, Math.min(100, n));

/**
 * Progress shows the completion of a task as a bar or circle — useful for
 * skill levels, upload progress or page-read indicators.
 *
 * ### Usage
 * ```jsx
 * import { Progress } from 'miever_ui';
 *
 * <Progress percent={70} />
 * <Progress type="circle" percent={90} status="success" />
 * ```
 */
const Progress: FunctionComponent<ProgressProps> = ({
    percent,
    type = 'line',
    status = 'normal',
    showInfo = true,
    strokeWidth,
    size = 120,
    className,
    style,
}) => {
    const value = clamp(percent);
    const classes = classNames(prefixCls, `${prefixCls}-${type}`, `${prefixCls}-${status}`, className);

    if (type === 'circle') {
        const stroke = strokeWidth ?? 6;
        const radius = (size - stroke) / 2;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference * (1 - value / 100);
        return (
            <div className={classes} style={{ width: size, height: size, ...style }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <circle
                        className={`${prefixCls}-circle-trail`}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={stroke}
                        fill="none"
                    />
                    <circle
                        className={`${prefixCls}-circle-path`}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={stroke}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                </svg>
                {showInfo && <span className={`${prefixCls}-circle-info`}>{value}%</span>}
            </div>
        );
    }

    return (
        <div className={classes} style={style}>
            <div className={`${prefixCls}-outer`}>
                <div
                    className={`${prefixCls}-inner`}
                    style={{ width: `${value}%`, height: strokeWidth }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
            {showInfo && <span className={`${prefixCls}-info`}>{value}%</span>}
        </div>
    );
};

Progress.displayName = 'Progress';

export default Progress;
