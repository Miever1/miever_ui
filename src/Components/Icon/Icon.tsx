import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, IconPack } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from "@fortawesome/free-brands-svg-icons";

import classNames from 'classnames';
import { IIconProps } from './interface';
import { BRAND_COLORS } from '../../Designs';

// Load FontAwesome libraries once
library.add(fab as IconPack, fas);

/**
 * A versatile and customizable icon component built on FontAwesome.
 * 
 * **Example usage:**
 * 
 * ```jsx
 * import { Icon } from 'miever_components';
 * 
 * <Icon 
 *   icon="coffee" 
 *   theme="primary" 
 *   style={{ fontSize: '24px' }} 
 * />
 * ```
 */
const Icon: FunctionComponent<IIconProps> = ({
    theme,
    className,
    style,
    ...restProps
}) => {
    library.add(fab as IconPack);
    library.add(fas);

    const classes = classNames('icon', className, {
        [`icon-${theme}`]: theme,
    });

    // 动态应用主题颜色
    const themeColor = theme && BRAND_COLORS[theme] ? { color: BRAND_COLORS[theme] } : {};

    return (
        <FontAwesomeIcon
            className={classes}
            style={{ ...style, ...themeColor }}
            {...restProps}
        />
    );
};

export default Icon;