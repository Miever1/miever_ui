import React from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { IMenuItemProps } from './interface';

const prefixCls = getPrefixCls('menu');

const MenuItem: React.FunctionComponent<
    Omit<IMenuItemProps, 'key'> & {
        itemKey: string;
        currentKey: string;
        handleClick: (key: string) => void;
    }
> = ({ itemKey, currentKey, label, disabled, handleClick }) => {
    const classes = classNames(`${prefixCls}-item`, {
        disabled,
        active: currentKey === itemKey,
    });

    const onClickHandler = (e: React.MouseEvent) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        handleClick(itemKey);
    };

    return (
        <li className={classes} onClick={onClickHandler}>
            {label}
        </li>
    );
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
