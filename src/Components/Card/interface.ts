import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { BaseProps } from '../../types';

export interface ICardProps extends BaseProps {
    /**
     * Surface style.
     * - 'outlined' — 1px border, no shadow (default)
     * - 'elevated' — soft shadow, no border
     * @default 'outlined'
     */
    variant?: 'outlined' | 'elevated';
    /** Lift the card and zoom its cover on hover. Implies a pointer cursor. */
    hoverable?: boolean;
    /**
     * Layout of the cover relative to the body.
     * - 'vertical' — cover on top (default)
     * - 'horizontal' — cover beside the body, stacking on small screens
     * @default 'vertical'
     */
    orientation?: 'vertical' | 'horizontal';
    /** Media shown in the cover frame (an `<img>`, video, etc.). Zooms on hover. */
    cover?: ReactNode;
    /** Primary heading. */
    title?: ReactNode;
    /** Accent line shown under the title (e.g. a category or one-liner). */
    subTitle?: ReactNode;
    /** Muted metadata line (e.g. a date). */
    meta?: ReactNode;
    /** Content for the top-right of the header (badges, quick actions). */
    extra?: ReactNode;
    /** Footer content, typically actions. */
    footer?: ReactNode;
    /** Clamp the body to N lines with an ellipsis. */
    clamp?: number;
    /** Render the whole card as a link to this href. */
    href?: string;
    /** Open the link in a new tab (only with `href`). */
    target?: string;
    /** Click handler for the whole card. */
    onClick?: MouseEventHandler<HTMLElement>;
    /** Card body. */
    children?: ReactNode;
    style?: CSSProperties;
}
