import React, { useContext } from "react";
import classNames from "classnames";
import { IMenuItemProps } from "./interface";
import { MenuContext } from "./Menu";

const MenuItem: React.FunctionComponent<IMenuItemProps> = ({
    index, className, style={}, children, disabled
}) => {
    const context = useContext(MenuContext);
    const { index: MenuIndex, onSelect } = context;
    const handleClick = () => {
        !disabled && onSelect?.(index);
    }

    const classes = classNames('menu-item', className, {
        'disabled': disabled,
        'active': MenuIndex === index,
    });

    return (
        <li
            style={style}
            className={classes}
            onClick={handleClick}
        >
            {children}
        </li>
    );
}

export default MenuItem;