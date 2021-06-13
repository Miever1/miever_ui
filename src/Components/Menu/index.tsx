import React from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import { IMenuProps, IMenuItemProps, ISubmenuProps } from "./interface";
import SubMenu from "./SubMenu";

export type IMenuComponent = React.FunctionComponent<IMenuProps> & {
    Item: React.FunctionComponent<IMenuItemProps>,
    SubMenu: React.FunctionComponent<ISubmenuProps>
}

const TransMenu = Menu as IMenuComponent;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
