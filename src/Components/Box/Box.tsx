import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { SPACE_LIST, SPACE_SIZE, SpaceType } from '../../Designs';
import { BoxProps } from './interface';

const prefixCls = getPrefixCls('box');

/** Resolve a spacing value to a CSS length (design token, number→px*4, or raw string). */
const resolveSpace = (value?: SpaceType | string | number): string | undefined => {
    if (value === undefined || value === null || value === '') return undefined;
    if (SPACE_LIST.includes(`${value}`)) return SPACE_SIZE[value as SpaceType];
    return typeof value === 'number' ? `${value * 4}px` : `${value}`;
};

/** Resolve a dimension value to a CSS length (number→px, or raw string). */
const resolveSize = (value?: string | number): string | undefined => {
    if (value === undefined || value === null || value === '') return undefined;
    return typeof value === 'number' ? `${value}px` : `${value}`;
};

/**
 * Box is a versatile, low-level layout primitive. By default it renders a `div`
 * and exposes flex and spacing props driven by the shared design tokens.
 *
 * ### Usage
 * ```jsx
 * import { Box } from 'miever_ui';
 *
 * <Box flexBox justifyContent="center" padding="sm" width={200} height={100}>
 *   Content goes here
 * </Box>
 * ```
 */
const Box: FunctionComponent<BoxProps> = ({
    flexBox,
    direction,
    justifyContent,
    alignItems,
    width,
    height,
    padding,
    paddingX,
    paddingY,
    className,
    style,
    children,
    ...restProps
}) => {
    const computedStyle: React.CSSProperties = {
        display: flexBox ? 'flex' : 'block',
        flexDirection: direction,
        justifyContent,
        alignItems,
        width: resolveSize(width),
        height: resolveSize(height),
    };

    if (padding !== undefined) {
        computedStyle.padding = resolveSpace(padding);
    } else {
        computedStyle.paddingLeft = resolveSpace(paddingX);
        computedStyle.paddingRight = resolveSpace(paddingX);
        computedStyle.paddingTop = resolveSpace(paddingY);
        computedStyle.paddingBottom = resolveSpace(paddingY);
    }

    return (
        <div
            className={classNames(prefixCls, className)}
            style={{ ...computedStyle, ...style }}
            {...restProps}
        >
            {children}
        </div>
    );
};

Box.displayName = 'Box';

export default Box;
