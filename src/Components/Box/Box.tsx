import { forwardRef } from "react";
import styled from "@emotion/styled";
import { BoxProps } from "./interface";  // Ensure BoxProps type definition is correct
import { SPACE_LIST, SPACE_SIZE, SpaceType } from "../../Designs";

// Define the styled BoxWrapper component
const BoxWrapper = styled.div<BoxProps>`
  display: ${({ flexBox }) => (flexBox ? "flex" : "block")};
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  width: ${({ width }) => (width ? `${width}${typeof width === "number" ? "px" : ""}` : "auto")};
  height: ${({ height }) => (height ? `${height}${typeof height === "number" ? "px" : ""}` : "auto")};

  /* Handle padding properties */
  padding: ${({ padding }) => padding ? `${typeof padding === "number" ? padding * 4 : padding}${typeof padding === "number" ? "px" : ""}` : "0"};
  padding-left: ${({ paddingX }) => paddingX ? `${typeof paddingX === "number" ? paddingX * 4 : paddingX}${typeof paddingX === "number" ? "px" : ""}` : "0"};
  padding-right: ${({ paddingX }) => paddingX ? `${typeof paddingX === "number" ? paddingX * 4 : paddingX}${typeof paddingX === "number" ? "px" : ""}` : "0"};
  padding-top: ${({ paddingY }) => paddingY ? `${typeof paddingY === "number" ? paddingY * 4 : paddingY}${typeof paddingY === "number" ? "px" : ""}` : "0"};
  padding-bottom: ${({ paddingY }) => paddingY ? `${typeof paddingY === "number" ? paddingY * 4 : paddingY}${typeof paddingY === "number" ? "px" : ""}` : "0"};
  
  /* Handle special padding values using SPACE_LIST */
  ${({ paddingX, paddingY, padding }) => {
    let styles = "";
    if (SPACE_LIST.includes(`${paddingX}`)) {
      styles += `
        padding-left: ${SPACE_SIZE[paddingX as SpaceType]};
        padding-right: ${SPACE_SIZE[paddingX as SpaceType]};
      `;
    }
    if (SPACE_LIST.includes(`${paddingY}`)) {
      styles += `
        padding-top: ${SPACE_SIZE[paddingY as SpaceType]};
        padding-bottom: ${SPACE_SIZE[paddingY as SpaceType]};
      `;
    }
    if (SPACE_LIST.includes(`${padding}`)) {
      styles += `
        padding: ${SPACE_SIZE[padding as SpaceType]};
      `;
    }
    return styles;
  }}
`;

/**
 * Box component is the most abstract component on top of which all other Miever UI components are built.
 * By default, it renders a `div` element.
 * 
 *  ```javascript
 *      import { Box } from 'miever_ui';
 *  ```
 * @param BoxProps 
 * @returns Rendered Box component
 */
const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
    return <BoxWrapper {...props} ref={ref} />;
});

// Ensure PropTypes are defined correctly if used
Box.propTypes = {
  // Add prop-types validation here if needed
};

export default Box;