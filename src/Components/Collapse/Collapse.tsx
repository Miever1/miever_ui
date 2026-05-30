import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Icon from '../Icon';
import { CollapseProps } from './interface';

const prefixCls = getPrefixCls('collapse');

/**
 * Collapse shows a list of expandable panels — great for an FAQ section.
 *
 * ### Usage
 * ```jsx
 * import { Collapse } from 'miever_ui';
 *
 * <Collapse
 *   accordion
 *   items={[
 *     { key: '1', header: 'Question 1', children: 'Answer 1' },
 *     { key: '2', header: 'Question 2', children: 'Answer 2' },
 *   ]}
 * />
 * ```
 */
const Collapse: FunctionComponent<CollapseProps> = ({
    items,
    activeKeys,
    defaultActiveKeys = [],
    accordion = false,
    onChange,
    className,
    style,
}) => {
    const [internal, setInternal] = useState<string[]>(defaultActiveKeys);
    const current = activeKeys ?? internal;

    const toggle = (key: string, disabled?: boolean) => {
        if (disabled) return;
        const isOpen = current.includes(key);
        let next: string[];
        if (accordion) {
            next = isOpen ? [] : [key];
        } else {
            next = isOpen ? current.filter((k) => k !== key) : [...current, key];
        }
        if (activeKeys === undefined) {
            setInternal(next);
        }
        onChange?.(next);
    };

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            {items.map((item) => {
                const isOpen = current.includes(item.key);
                return (
                    <div
                        key={item.key}
                        className={classNames(`${prefixCls}-item`, {
                            active: isOpen,
                            disabled: item.disabled,
                        })}
                    >
                        <button
                            type="button"
                            className={`${prefixCls}-header`}
                            aria-expanded={isOpen}
                            disabled={item.disabled}
                            onClick={() => toggle(item.key, item.disabled)}
                        >
                            <span className={`${prefixCls}-arrow`}>
                                <Icon icon="angle-right" />
                            </span>
                            <span className={`${prefixCls}-header-text`}>{item.header}</span>
                        </button>
                        {isOpen && (
                            <div className={`${prefixCls}-content`}>
                                <div className={`${prefixCls}-body`}>{item.children}</div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

Collapse.displayName = 'Collapse';

export default Collapse;
