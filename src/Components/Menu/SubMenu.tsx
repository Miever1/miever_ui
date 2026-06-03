import React, { useState, FunctionComponent } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Icon from '../Icon';
import Box from '../Box';
import Transition from '../Transition';
import { ISubmenuProps } from './interface';
import MenuItem from './MenuItem';

const prefixCls = getPrefixCls('menu');
const submenuCls = getPrefixCls('submenu');

let timer: ReturnType<typeof setTimeout>;

const SubMenu: FunctionComponent<ISubmenuProps> = ({
    mode,
    title,
    items,
    isOpened,
    itemKey,
    currentKey,
    handleClick: onItemClick,
}) => {
    const [subMenuVisible, setSubMenuVisible] = useState(isOpened);
    const classes = classNames(`${prefixCls}-item`, `${submenuCls}-item`, {
        active: currentKey.split('_')[0] === itemKey,
        'is-vertical': mode === 'vertical',
        'is-opened': subMenuVisible,
    });

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setSubMenuVisible(!subMenuVisible);
    };

    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setSubMenuVisible(toggle);
        }, 200);
    };

    const clickEvents = mode === 'vertical' && { onClick: handleClick };
    const hoverEvents =
        mode === 'horizontal' && {
            onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
            onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        };

    const renderChildren = () => {
        const submenuClasses = classNames(submenuCls, {
            [`${submenuCls}-visible`]: subMenuVisible,
        });
        const childrenComponent = items.map((item) => {
            const { label, key } = item;
            return (
                <MenuItem
                    key={`${itemKey}_${key}`}
                    label={label}
                    itemKey={`${itemKey}_${key}`}
                    currentKey={currentKey}
                    handleClick={() => onItemClick(`${itemKey}_${key}`)}
                />
            );
        });
        return (
            <Transition timeout={300} in={subMenuVisible} animation="zoom-in-top">
                <ul className={submenuClasses}>{childrenComponent}</ul>
            </Transition>
        );
    };

    return (
        <li className={classes} {...hoverEvents}>
            <Box className={`${submenuCls}-title`} {...clickEvents}>
                {title}
                <Icon icon="angle-down" className={getPrefixCls('menu', 'arrow')} />
            </Box>
            {subMenuVisible && renderChildren()}
        </li>
    );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
