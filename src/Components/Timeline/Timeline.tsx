import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { BRAND_COLORS } from '../../Designs';
import { TimelineProps } from './interface';

const prefixCls = getPrefixCls('timeline');

/**
 * Timeline displays a vertical sequence of events — ideal for a résumé,
 * changelog or project history.
 *
 * ### Usage
 * ```jsx
 * import { Timeline } from 'miever_ui';
 *
 * <Timeline
 *   items={[
 *     { label: '2024', color: 'primary', children: 'Started building miever.net' },
 *     { label: '2023', children: 'Learned TypeScript' },
 *   ]}
 * />
 * ```
 */
const Timeline: FunctionComponent<TimelineProps> = ({
    items,
    mode = 'left',
    className,
    style,
}) => {
    const classes = classNames(prefixCls, `${prefixCls}-${mode}`, className);

    return (
        <ul className={classes} style={style}>
            {items.map((item, index) => {
                const dotColor =
                    item.color && BRAND_COLORS[item.color] ? BRAND_COLORS[item.color] : undefined;
                return (
                    <li key={index} className={`${prefixCls}-item`}>
                        {item.label !== undefined && (
                            <div className={`${prefixCls}-label`}>{item.label}</div>
                        )}
                        <div className={`${prefixCls}-tail`} />
                        <div className={`${prefixCls}-dot`} style={{ color: dotColor }}>
                            {item.dot ?? <span className={`${prefixCls}-dot-default`} style={{ background: dotColor }} />}
                        </div>
                        <div className={`${prefixCls}-content`}>{item.children}</div>
                    </li>
                );
            })}
        </ul>
    );
};

Timeline.displayName = 'Timeline';

export default Timeline;
