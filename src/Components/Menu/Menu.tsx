<<<<<<< HEAD
import React, { useState, createContext, FunctionComponentElement, cloneElement } from "react";
import classNames from "classnames";
import { IMenuProps, IMenuContext, IMenuItemProps } from "./interface";
=======
import React, { useState, createContext } from "react";
import classNames from "classnames";
import { IMenuProps, IMenuContext } from "./interface";
>>>>>>> master

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FunctionComponent<IMenuProps> = ({
    className,
    mode = 'horizontal',
    style = {},
    children,
    defaultIndex = 0,
    onSelect = () => {}
}) => {
    const [currentActive, setCurrentActive] = useState(defaultIndex);

    const classes = classNames('menu', className, {
<<<<<<< HEAD
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<IMenuItemProps>;
            if (childElement.type && (childElement.type.displayName === 'MenuItem' || childElement.type.displayName === 'SubMenu')) {
                return cloneElement(childElement, { index });
            } else {
                console.error('Error: Menu has a child which is not a MenuItem or SubMenu!');
            }
        });
    }

=======
        'menu-vertical': mode === 'vertical'
    });

>>>>>>> master
    const handleClick = (index: number) => {
        console.log(index);
        setCurrentActive(index);
        onSelect?.(index);
    }

    const passedContext: IMenuContext = {
        index: currentActive,
        onSelect: handleClick
    }

    return (
        <ul
            style={style}
            className={classes}
            data-testid="test-menu"
        >
            <MenuContext.Provider value={passedContext}>
<<<<<<< HEAD
                {renderChildren()}
=======
                {children}
>>>>>>> master
            </MenuContext.Provider>
        </ul>
    );
}

export default Menu;