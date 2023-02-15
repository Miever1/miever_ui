import React, { useState } from "react";
import classNames from "classnames";
import { IMenuProps } from "./interface";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";

/**
 * 
 * A versatile menu for navigation.
 * 
 *  ```javascript
 *      import { Menu } from 'miever_components';
 *  ```
 * 
 * @param IMenuComponent 
 * @returns 
 */

const Menu: React.FunctionComponent<IMenuProps> = ({
    className,
    mode = 'horizontal',
    style,
    items,
    defaultKey = "0",
    onSelect = () => {},
    prefix,
    suffix
}) => {
    const [currentKey, setCurrentKey] = useState(defaultKey);
    const classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });

    const handleClick = (key: string) => {
        setCurrentKey(key);
        onSelect?.(key);
    }

    const renderChildren = () => {
        return items.map(item => {
            const { label, key, children=[], disabled } = item;
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
                )
            }
            return (
                <MenuItem key={key} disabled={disabled} currentKey={currentKey} itemKey={key} label={label} handleClick={() => handleClick(key)} />
            )
        })
    }

    return (
        <ul
            style={style}
            className={classes}
            data-testid="test-menu"
        >
            {mode === "horizontal" && prefix}
            {renderChildren()}
            {mode === "horizontal" && suffix && <div style={{ position: "absolute", right: 0 }}>{suffix}</div>}
        </ul>
    );
}

export default Menu;