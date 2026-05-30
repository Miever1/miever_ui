import { CSSProperties, ReactNode } from 'react';

export type TextType = 'secondary' | 'success' | 'warning' | 'danger';

export interface BaseTextProps {
    /** Semantic color variant. */
    type?: TextType;
    /** Bold text. */
    strong?: boolean;
    /** Italic text. */
    italic?: boolean;
    /** Strikethrough text. */
    delete?: boolean;
    /** Underlined text. */
    underline?: boolean;
    /** Disabled (muted, non-interactive look). */
    disabled?: boolean;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export interface TitleProps extends Omit<BaseTextProps, 'strong'> {
    /** Heading level 1–5, mapped to h1–h5. */
    level?: 1 | 2 | 3 | 4 | 5;
}

export type TextProps = BaseTextProps;

export type ParagraphProps = BaseTextProps;

export interface LinkProps
    extends BaseTextProps,
        Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseTextProps> {}
