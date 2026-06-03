import React, { forwardRef, MouseEvent, useState } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Icon from '../Icon';
import { TagProps } from './interface';

const prefixCls = getPrefixCls('tag');

/**
 * A compact label for categorizing or marking content.
 *
 * ### Usage
 * ```jsx
 * import { Tag } from 'miever_ui';
 *
 * <Tag>Default</Tag>
 * <Tag theme="primary">Primary</Tag>
 * <Tag closable onClose={() => {}}>Closable</Tag>
 * ```
 */
const Tag = forwardRef<HTMLSpanElement, TagProps>(({
    theme,
    closable = false,
    onClose,
    children,
    className,
    style,
}, ref) => {
    const [visible, setVisible] = useState(true);

    const handleClose = (e: MouseEvent<HTMLElement>) => {
        setVisible(false);
        onClose?.(e);
    };

    if (!visible) return null;

    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-${theme}`]: theme,
    });

    return (
        <span ref={ref} className={classes} style={style}>
            <span className={`${prefixCls}-text`}>{children}</span>
            {closable && (
                <span
                    className={`${prefixCls}-close`}
                    role="button"
                    aria-label="Close"
                    onClick={handleClose}
                >
                    <Icon icon="xmark" />
                </span>
            )}
        </span>
    );
});

Tag.displayName = 'Tag';

export default Tag;
