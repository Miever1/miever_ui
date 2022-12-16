import type { SpaceType } from "./types";

const SpaceList = ["xs", "sm", "md", "lg", "xlg", "xxlg", "xxxlg"]

const Space_Size: {
    [key in SpaceType]: string
} = {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xlg: "20px",
    xxlg: "24px",
    xxxlg: "32px"
}

export {
    Space_Size,
    SpaceList
}

export type {
    SpaceType
}