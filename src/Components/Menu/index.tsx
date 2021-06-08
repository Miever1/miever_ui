import React from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import { IMenuProps, IMenuItemProps } from "./interface";

export type IMenuComponent = React.FunctionComponent<IMenuProps> & {
    Item: React.FunctionComponent<IMenuItemProps>
}

const TransMenu = Menu as IMenuComponent;
TransMenu.Item = MenuItem;

export default TransMenu;
