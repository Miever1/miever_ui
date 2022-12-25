import React from "react";
import classNames from "classnames";
import { IMenuItemProps } from "./interface";

const MenuItem: React.FunctionComponent<Omit<IMenuItemProps, "key"> & {
    itemKey: string, 
    currentKey: string;
    handleClick: (key: string) => void;
}> = ({
    itemKey,
    currentKey,
    label,
    disabled,
    handleClick
}) => {
    const classes = classNames('menu-item', {
        'disabled': disabled,
        'active': currentKey === itemKey
    });

    return (
        <li
            key={itemKey}
            className={classes}
            onClick={() => handleClick(itemKey)}
        >
            {label}
        </li>
    );
}

MenuItem.displayName = 'MenuItem';
export default MenuItem;