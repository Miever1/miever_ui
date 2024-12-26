import React, { FunctionComponent } from "react";
import classNames from 'classnames';

import Box from "../Box";
import { ICardProps } from "./interface";

/**
 * A versatile and customizable rectangular container for displaying content.
 * 
 * ```jsx
 * import { Card } from 'miever_components';
 *
 * <Card 
 *   title="Card Title" 
 *   subTitle="Card Subtitle" 
 *   hoverable 
 *   style={{ width: '300px', padding: '16px' }}
 * >
 *   This is the content of the card.
 * </Card>
 * ```
 */

const Card:FunctionComponent<ICardProps> = ({
    title,
    subTitle,
    children,
    style,
    className,
    hoverable=false,
}) => {
    const classes = classNames('card', className, {
        'card-hover': hoverable
    });
    return (
        <Box className={classes} style={style}>
            <Box className="card-header">
                <Box>
                    {title}
                </Box>
                {subTitle && (
                    <Box className="card-subtitle">
                        {subTitle}
                    </Box>
                )}
            </Box>
            <Box className="card-content">
                {children}
            </Box>
        </Box>
    );
}

export default Card;