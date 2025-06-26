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

    const onClickHandler = (e: React.MouseEvent) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        handleClick(itemKey);
    };

    return (
        <li
            key={itemKey}
            className={classes}
            onClick={onClickHandler}
        >
            {label}
        </li>
    );
}

MenuItem.displayName = 'MenuItem';
export default MenuItem;