import React, { FunctionComponent, forwardRef } from "react"
import styled from "@emotion/styled";
import { BoxProps } from "./interface";
import { SpaceList, Space_Size, SpaceType } from "../../Designs";

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
        styleText += `padding-left: ${typeof paddingX === "number" ? paddingX * 4 : paddingX}${typeof paddingX === "number" ? "px" : ""};padding-right: ${paddingX}${typeof paddingX === "number" ? "px" : ""};`;
        if (SpaceList.includes(`${paddingX}`)) {
            styleText += `padding-left: ${Space_Size[paddingX as SpaceType]};padding-right: ${Space_Size[paddingX as SpaceType]};`;
        }
    }
    if (paddingY) {
        styleText += `padding-top: ${typeof paddingY === "number" ? paddingY * 4 : paddingY}${typeof paddingY === "number" ? "px" : ""};padding-bottom: ${paddingY}${typeof paddingY === "number" ? "px" : ""};`;
        if (SpaceList.includes(`${paddingY}`)) {
            styleText += `padding-top: ${Space_Size[paddingY as SpaceType]};padding-bottom: ${Space_Size[paddingY as SpaceType]};`;
        }
    }
    if (padding) {
        styleText += `padding: ${typeof padding === "number" ? padding * 4 : padding}${typeof padding === "number" ? "px" : ""};`;
        if (SpaceList.includes(`${padding}`)) {
            styleText += `padding: ${Space_Size[padding as SpaceType]}`;
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
