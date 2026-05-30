import { CSSProperties, MouseEvent, ReactNode } from 'react';
import { BRAND_COLORS } from '../../Designs';

export type TagTheme = keyof typeof BRAND_COLORS;

export interface TagProps {
    /** Color theme drawn from the design tokens */
    theme?: TagTheme;
    /** Show a close button */
    closable?: boolean;
    /** Called when the close button is clicked */
    onClose?: (e: MouseEvent<HTMLElement>) => void;
    /** Tag content */
    children?: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Inline styles for the tag root */
    style?: CSSProperties;
}
