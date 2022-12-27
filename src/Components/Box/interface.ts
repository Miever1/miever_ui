import React, { ReactNode, HTMLAttributes } from "react"
import type { SpaceType } from "../../Designs";

interface BasicBoxProps {
    // 是否为容器，为容器时容器属性才能生效，并且被包裹的子组件中的一些属性（如 flex，order 等）才能生效）
    flexBox?: boolean
    children?: ReactNode
    width?: number | string 
    height?: number | string
    padding?: SpaceType | string | number
    paddingX?: SpaceType | string | number
    paddingY?: SpaceType | string | number
    direction?: "row" | "row-reverse" | "column" | "column-reverse"
    alignItems?: "center" | "flex-start" | "flex-end" | "stretch"
    justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "stretch"
    ref?: React.Ref<HTMLDivElement>
    style?: React.CSSProperties
    className?: string
}

export type BoxProps = BasicBoxProps & HTMLAttributes<HTMLDivElement>;