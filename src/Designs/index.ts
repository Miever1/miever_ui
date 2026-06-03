import type { SpaceType } from "./types";
import { BREAKPOINTS, BREAKPOINT_KEYS } from "./breakpoints";

const SPACE_LIST = ["xs", "sm", "md", "lg", "xlg", "xxlg", "xxxlg"];

const BRAND_COLORS = {
    primary: "#0CC0DF",
    secondary: "#3B82F6",
    success: "#20c997",
    info: "#17a2b8",
    warning: "#fadb14",
    danger: "#dc3545",
};

const SPACE_SIZE: {
    [key in SpaceType]: string;
} = {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xlg: "20px",
    xxlg: "24px",
    xxxlg: "32px",
};

const designs = {
    SPACE_SIZE,
    SPACE_LIST,
    BRAND_COLORS,
    BREAKPOINTS,
};

export {
    designs,
    SPACE_SIZE,
    SPACE_LIST,
    BRAND_COLORS,
    BREAKPOINTS,
    BREAKPOINT_KEYS,
};

export type {
    SpaceType,
};
export type { Breakpoint } from "./breakpoints";

// Full design-token system (palette, typography, spacing, radius, shadow,
// z-index). Mirrored on the SCSS side as maps + CSS custom properties.
export * from "./tokens";