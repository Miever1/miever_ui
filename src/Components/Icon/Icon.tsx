import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, IconPack } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from "@fortawesome/free-brands-svg-icons";

import classNames from 'classnames';
import { IIconProps } from './interface';

/**
 * 
 * Semantic vector graphics. 
 * please checkout https://fontawesome.com/v6.0/icons?d=gallery&p=1&s=solid&m=free to get type
 * 
 *  ```javascript
 *      import { Icon } from 'miever_components';
 *  ```
 * @param IIconProps 
 * @returns 
 */
const Icon: FunctionComponent<IIconProps> = ({
    theme, className, ...restProps
}) => {
    library.add(fab as IconPack);
    library.add(fas);
    const classes = classNames('icon', className, {
        [`icon-${theme}`]: theme
    });
    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}

export default Icon;