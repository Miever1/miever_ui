import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Icon from '../Icon';
import { StepsProps } from './interface';

const prefixCls = getPrefixCls('steps');

/**
 * Shows progress through a sequence of steps.
 *
 * ### Usage
 * ```jsx
 * import { Steps } from 'miever_ui';
 *
 * <Steps
 *     current={1}
 *     items={[{ title: 'Applied' }, { title: 'Interview' }, { title: 'Offer' }]}
 * />
 * ```
 */
const Steps = forwardRef<HTMLOListElement, StepsProps>(
    (
        { items, current = 0, status = 'process', direction = 'horizontal', className, style },
        ref,
    ) => {
        return (
            <ol
                ref={ref}
                className={classNames(prefixCls, `${prefixCls}-${direction}`, className)}
                style={style}
            >
                {items.map((item, index) => {
                    const stepStatus =
                        index < current ? 'finish' : index === current ? status : 'wait';

                    return (
                        <li
                            key={index}
                            className={classNames(
                                `${prefixCls}-item`,
                                `${prefixCls}-item-${stepStatus}`,
                            )}
                            aria-current={index === current ? 'step' : undefined}
                        >
                            <span className={`${prefixCls}-dot`}>
                                {stepStatus === 'finish' ? (
                                    <Icon icon="check" size="sm" />
                                ) : stepStatus === 'error' ? (
                                    <Icon icon="xmark" size="sm" />
                                ) : (
                                    index + 1
                                )}
                            </span>
                            <span className={`${prefixCls}-content`}>
                                <span className={`${prefixCls}-title`}>{item.title}</span>
                                {item.description && (
                                    <span className={`${prefixCls}-description`}>
                                        {item.description}
                                    </span>
                                )}
                            </span>
                        </li>
                    );
                })}
            </ol>
        );
    },
);

Steps.displayName = 'Steps';

export default Steps;
