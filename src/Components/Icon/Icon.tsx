import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, IconPack } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { IIconProps } from './interface';
import { BRAND_COLORS } from '../../Designs';

// Register the FontAwesome solid and brand icon packs once, at module load.
library.add(fas, fab as IconPack);

const prefixCls = getPrefixCls('icon');

/**
 * A versatile and customizable icon component built on FontAwesome.
 *
 * ### Usage
 * ```jsx
 * import { Icon } from 'miever_ui';
 *
 * <Icon icon="coffee" theme="primary" style={{ fontSize: '24px' }} />
 * ```
 */
const Icon: FunctionComponent<IIconProps> = ({
    theme,
    className,
    style,
    ...restProps
}) => {
    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-${theme}`]: theme,
    });

    const themeColor = theme && BRAND_COLORS[theme] ? { color: BRAND_COLORS[theme] } : {};

    return (
        <FontAwesomeIcon
            className={classes}
            style={{ ...style, ...themeColor }}
            {...restProps}
        />
    );
};

Icon.displayName = 'Icon';

export default Icon;
