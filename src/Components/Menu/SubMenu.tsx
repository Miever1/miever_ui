import React, { useContext, useState ,FunctionComponent, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import { ISubmenuProps, IMenuItemProps } from "./interface";

const SubMenu: FunctionComponent<ISubmenuProps> = ({
    index, title ,className, children, isOpened
}) => {
    let timer: any;
    const context = useContext(MenuContext);
    const [subMenuVisible, setSubMenuVisible] = useState(isOpened);
    const classes = classNames('menu-item submenu-item', className, {
        'active': context.index[0] === index,
        'is-vertical': context.mode === 'vertical'
    });

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setSubMenuVisible(!subMenuVisible);
    }  
    
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setSubMenuVisible(toggle);
        }, 200);
    }

    const clickEvents = context.mode === 'vertical' && { onClick: handleClick };
    const hoverEvents = context.mode === 'horizontal' && {
        onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
        onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false)
    }
    const renderChildren = () => {
        const submenuClasses = classNames('submenu', className, {
            'submenu-visible': subMenuVisible
        });
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<IMenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                });
            } else {
                console.error('Error: SubMenu has a child which is not a MenuItem!');
            }
        });
        return (
            <ul className={submenuClasses}>
                {childrenComponent}
            </ul>
        );
    }

    return (
        <li key={index} className={classes} {...hoverEvents} >
            <div className="submenu-title" {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    );
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;