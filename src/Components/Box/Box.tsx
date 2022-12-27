import React, { FunctionComponent, forwardRef } from "react"
import styled from "@emotion/styled";
import { BoxProps } from "./interface";
import { SPACE_LIST, SPACE_SIZE, SpaceType } from "../../Designs";

const BoxWrapper = styled("div")((props: BoxProps) => {
    const { flexBox, direction, justifyContent, alignItems, width, height, padding, paddingX, paddingY } = props
    let styleText = `
        display: ${flexBox ? "flex" : "block"};
        flex-direction: ${direction};
        justify-content: ${justifyContent};
        align-items: ${alignItems};
    `;
    if (width) {
        styleText += `width: ${width}${typeof width === "number" ? "px" : ""};`;
    }
    if (height) {
        styleText += `height: ${height}${typeof height === "number" ? "px" : ""};`;
    }
    if (paddingX) {
        styleText += `
            padding-left: ${typeof paddingX === "number" ? paddingX * 4 : paddingX}${typeof paddingX === "number" ? "px" : ""};
            padding-right: ${typeof paddingX === "number" ? paddingX * 4 : paddingX}${typeof paddingX === "number" ? "px" : ""};
        `;
        if (SPACE_LIST.includes(`${paddingX}`)) {
            styleText += `padding-left: ${SPACE_SIZE[paddingX as SpaceType]};padding-right: ${SPACE_SIZE[paddingX as SpaceType]};`;
        }
    }
    if (paddingY) {
        styleText += `
            padding-top: ${typeof paddingY === "number" ? paddingY * 4 : paddingY}${typeof paddingY === "number" ? "px" : ""};
            padding-bottom: ${typeof paddingY === "number" ? paddingY * 4 : paddingY}${typeof paddingY === "number" ? "px" : ""};
        `;
        if (SPACE_LIST.includes(`${paddingY}`)) {
            styleText += `padding-top: ${SPACE_SIZE[paddingY as SpaceType]};padding-bottom: ${SPACE_SIZE[paddingY as SpaceType]};`;
        }
    }
    if (padding) {
        styleText += `padding: ${typeof padding === "number" ? padding * 4 : padding}${typeof padding === "number" ? "px" : ""};`;
        if (SPACE_LIST.includes(`${padding}`)) {
            styleText += `padding: ${SPACE_SIZE[padding as SpaceType]}`;
        }
    }
    return styleText;
})

/**
 * 
 * Box is the most abstract component on top of which all other Miever UI components are built. By default, it renders a `div` element
 * 
 *  ```javascript
 *      import { Box } from 'miever_components';
 *  ```
 * @param BoxProps 
 * @returns 
 */

const Box: FunctionComponent<BoxProps> = forwardRef((props, ref) => {
    const { className } = props;
    return <BoxWrapper {...props} ref={ref} className={className} />
})

export default Box;
