import React, { useState, createContext } from "react";
import classNames from "classnames";
import { IMenuProps, IMenuContext } from "./interface";

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
        'menu-vertical': mode === 'vertical'
    });

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
                {children}
            </MenuContext.Provider>
        </ul>
    );
}

export default Menu;