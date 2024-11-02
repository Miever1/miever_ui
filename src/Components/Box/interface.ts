import React, { ReactNode, HTMLAttributes } from "react";
import type { SpaceType } from "../../Designs";

// Interface defining the basic properties for the Box component
interface BasicBoxProps {
    // Determines if the Box is a flex container. When true, flex properties can be applied to its children.
    flexBox?: boolean;
    // The children elements to be rendered inside the Box
    children?: ReactNode;
    // Specifies the width of the Box, can be a number (in pixels) or a string (like '100%')
    width?: number | string;
    // Specifies the height of the Box, can be a number (in pixels) or a string (like '100%')
    height?: number | string;
    // Padding applied to all sides of the Box. Can be a predefined space type, string, or number.
    padding?: SpaceType | string | number;
    // Horizontal padding (left and right)
    paddingX?: SpaceType | string | number;
    // Vertical padding (top and bottom)
    paddingY?: SpaceType | string | number;
    // Flex direction for the Box when it is a flex container
    direction?: "row" | "row-reverse" | "column" | "column-reverse";
    // Align items within the flex container
    alignItems?: "center" | "flex-start" | "flex-end" | "stretch";
    // Justify content within the flex container
    justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "stretch";
    // Reference to the underlying HTMLDivElement
    ref?: React.Ref<HTMLDivElement>;
    // Additional inline styles for the Box
    style?: React.CSSProperties;
    // Custom class name for styling
    className?: string;
}

// BoxProps combines BasicBoxProps with standard HTML attributes for a div element
export type BoxProps = BasicBoxProps & HTMLAttributes<HTMLDivElement>;