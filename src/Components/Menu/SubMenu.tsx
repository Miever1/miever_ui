import React, { useContext, FunctionComponent, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import { ISubmenuProps, IMenuItemProps } from "./interface";

const SubMenu: FunctionComponent<ISubmenuProps> = ({
    index = 0, title ,className, children
}) => {
    const context = useContext(MenuContext);
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
    });

    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<IMenuItemProps>;
            if (childElement.type && (childElement.type.displayName === 'MenuItem' || childElement.type.displayName === 'MenuItem')) {
                return childElement;
            } else {
                console.error('Error: SubMenu has a child which is not a MenuItem!');
            }
        });
        return (
            <ul className='submenu'>
                {childrenComponent}
            </ul>
        );
    }

    return (
        <li key={index} className={classes}>
            <div className="submenu-title">
                {title}
            </div>
            {renderChildren()}
        </li>
    );
}

SubMenu.displayName = 'SubMenu'
export default SubMenu;