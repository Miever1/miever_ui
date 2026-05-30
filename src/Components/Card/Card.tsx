import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Box from '../Box';
import { ICardProps } from './interface';

const prefixCls = getPrefixCls('card');

/**
 * A versatile, rectangular container for displaying grouped content.
 *
 * ### Usage
 * ```jsx
 * import { Card } from 'miever_ui';
 *
 * <Card title="Card Title" subTitle="Subtitle" hoverable style={{ width: 300 }}>
 *   This is the content of the card.
 * </Card>
 * ```
 */
const Card: FunctionComponent<ICardProps> = ({
    title,
    subTitle,
    children,
    style,
    className,
    hoverable = false,
}) => {
    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-hover`]: hoverable,
    });

    return (
        <Box className={classes} style={style}>
            <Box className={`${prefixCls}-header`}>
                <Box>{title}</Box>
                {subTitle && <Box className={`${prefixCls}-subtitle`}>{subTitle}</Box>}
            </Box>
            <Box className={`${prefixCls}-content`}>{children}</Box>
        </Box>
    );
};

Card.displayName = 'Card';

export default Card;
