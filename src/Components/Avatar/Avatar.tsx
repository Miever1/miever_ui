import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Icon from '../Icon';
import { AvatarProps } from './interface';

const prefixCls = getPrefixCls('avatar');

/**
 * Avatar represents a user or entity with an image, icon or text fallback.
 *
 * ### Usage
 * ```jsx
 * import { Avatar } from 'miever_ui';
 *
 * <Avatar src="/me.jpg" alt="Miever" />
 * <Avatar>MV</Avatar>
 * <Avatar icon="user" shape="square" />
 * ```
 */
const Avatar: FunctionComponent<AvatarProps> = ({
    src,
    alt,
    icon,
    shape = 'circle',
    size = 'md',
    children,
    className,
    style,
}) => {
    const [imgFailed, setImgFailed] = useState(false);

    const isPresetSize = typeof size === 'string';
    const classes = classNames(prefixCls, `${prefixCls}-${shape}`, className, {
        [`${prefixCls}-${size}`]: isPresetSize,
    });

    const sizeStyle = isPresetSize
        ? undefined
        : { width: size, height: size, lineHeight: `${size}px`, fontSize: (size as number) / 2.5 };

    const renderInner = () => {
        if (src && !imgFailed) {
            return <img src={src} alt={alt} onError={() => setImgFailed(true)} />;
        }
        if (icon) {
            return typeof icon === 'string' ? <Icon icon={icon as never} /> : icon;
        }
        return <span className={`${prefixCls}-text`}>{children}</span>;
    };

    return (
        <span className={classes} style={{ ...sizeStyle, ...style }}>
            {renderInner()}
        </span>
    );
};

Avatar.displayName = 'Avatar';

export default Avatar;
