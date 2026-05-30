import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { TabsProps } from './interface';

const prefixCls = getPrefixCls('tabs');

/**
 * Tabs organize content into switchable panels.
 *
 * ### Usage
 * ```jsx
 * import { Tabs } from 'miever_ui';
 *
 * <Tabs
 *   defaultActiveKey="about"
 *   items={[
 *     { key: 'about', label: 'About', children: <About /> },
 *     { key: 'work', label: 'Work', children: <Work /> },
 *   ]}
 * />
 * ```
 */
const Tabs: FunctionComponent<TabsProps> = ({
    items,
    activeKey,
    defaultActiveKey,
    onChange,
    className,
    style,
}) => {
    const [internalKey, setInternalKey] = useState(
        defaultActiveKey ?? items[0]?.key
    );
    const currentKey = activeKey ?? internalKey;

    const handleClick = (key: string, disabled?: boolean) => {
        if (disabled || key === currentKey) return;
        if (activeKey === undefined) {
            setInternalKey(key);
        }
        onChange?.(key);
    };

    const activeItem = items.find((item) => item.key === currentKey);

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            <div className={`${prefixCls}-nav`} role="tablist">
                {items.map((item) => (
                    <button
                        key={item.key}
                        type="button"
                        role="tab"
                        aria-selected={item.key === currentKey}
                        disabled={item.disabled}
                        className={classNames(`${prefixCls}-tab`, {
                            active: item.key === currentKey,
                            disabled: item.disabled,
                        })}
                        onClick={() => handleClick(item.key, item.disabled)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div className={`${prefixCls}-content`} role="tabpanel">
                {activeItem?.children}
            </div>
        </div>
    );
};

Tabs.displayName = 'Tabs';

export default Tabs;
