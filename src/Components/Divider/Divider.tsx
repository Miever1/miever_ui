import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { DividerProps } from './interface';

const prefixCls = getPrefixCls('divider');

/**
 * A thin line that separates content, optionally with centered text.
 *
 * ### Usage
 * ```jsx
 * import { Divider } from 'miever_ui';
 *
 * <Divider />
 * <Divider>Section</Divider>
 * <Divider direction="vertical" />
 * ```
 */
const Divider: FunctionComponent<DividerProps> = ({
    direction = 'horizontal',
    dashed = false,
    children,
    className,
    style,
}) => {
    const hasText = direction === 'horizontal' && children !== undefined && children !== null && children !== '';

    const classes = classNames(prefixCls, `${prefixCls}-${direction}`, className, {
        [`${prefixCls}-dashed`]: dashed,
        [`${prefixCls}-with-text`]: hasText,
    });

    return (
        <div className={classes} style={style} role="separator">
            {hasText && <span className={`${prefixCls}-text`}>{children}</span>}
        </div>
    );
};

Divider.displayName = 'Divider';

export default Divider;
