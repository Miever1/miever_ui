import React, { useState } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { IMenuProps } from './interface';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

const prefixCls = getPrefixCls('menu');

/**
 * A versatile navigation menu supporting horizontal/vertical modes and submenus.
 *
 * ### Usage
 * ```jsx
 * import { Menu } from 'miever_ui';
 *
 * <Menu defaultKey="0" items={[{ label: 'Home', key: '0' }]} />
 * ```
 */
const Menu: React.FunctionComponent<IMenuProps> = ({
    className,
    mode = 'horizontal',
    style,
    items,
    defaultKey = '0',
    onSelect = () => {},
    prefix,
    suffix,
}) => {
    const [currentKey, setCurrentKey] = useState(defaultKey);
    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-vertical`]: mode === 'vertical',
        [`${prefixCls}-horizontal`]: mode !== 'vertical',
    });

    const handleClick = (key: string) => {
        setCurrentKey(key);
        onSelect?.(key);
    };

    const renderChildren = () =>
        items.map((item) => {
            const { label, key, children = [], disabled } = item;
            if (children && children.length) {
                return (
                    <SubMenu
                        key={key}
                        itemKey={key}
                        title={label}
                        items={children}
                        mode={mode}
                        currentKey={currentKey}
                        handleClick={handleClick}
                    />
                );
            }
            return (
                <MenuItem
                    key={key}
                    disabled={disabled}
                    aria-disabled={disabled}
                    currentKey={currentKey}
                    itemKey={key}
                    label={label}
                    handleClick={() => handleClick(key)}
                />
            );
        });

    return (
        <ul style={style} className={classes} data-testid="test-menu">
            {mode === 'horizontal' && prefix && <li>{prefix}</li>}
            {renderChildren()}
            {mode === 'horizontal' && suffix && (
                <li style={{ position: 'absolute', right: 0 }}>{suffix}</li>
            )}
        </ul>
    );
};

Menu.displayName = 'Menu';

export default Menu;
