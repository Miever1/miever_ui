import React, { useState, createContext, FunctionComponentElement, cloneElement } from "react";
import classNames from "classnames";
import { IMenuProps, IMenuContext, IMenuItemProps } from "./interface";

export const MenuContext = createContext<IMenuContext>({ index: "0" });

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
    children,
    defaultIndex = "0",
    onSelect = () => {}
}) => {
    const [currentActive, setCurrentActive] = useState(defaultIndex);
    const classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<IMenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return cloneElement(childElement, { index: index.toString() });
            } else {
                console.error('Error: Menu has a child which is not a MenuItem or SubMenu!');
            }
        });
    }

    const handleClick = (index: string) => {
        setCurrentActive(index);
        onSelect?.(index);
    }

    const passedContext: IMenuContext = {
        index: currentActive ?? '0',
        onSelect: handleClick,
        mode
    }

    return (
        <ul
            style={style}
            className={classes}
            data-testid="test-menu"
        >
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    );
}

export default Menu;