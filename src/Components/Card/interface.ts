import { CSSProperties, ReactNode } from 'react';

export interface ICardProps {
    /** Highlight the card with a shadow on hover */
    hoverable?: boolean;
    /** Card body content */
    children?: ReactNode;
    /** Card title rendered in the header */
    title?: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Secondary text rendered next to the title */
    subTitle?: ReactNode;
    /** Inline styles for the card root */
    style?: CSSProperties;
}
