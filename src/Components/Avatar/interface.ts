import { CSSProperties, ReactNode } from 'react';

export type AvatarShape = 'circle' | 'square';
export type AvatarSize = 'sm' | 'md' | 'lg' | number;

export interface AvatarProps {
    /** Image source. When it fails to load, falls back to icon/text. */
    src?: string;
    /** Alt text for the image. */
    alt?: string;
    /** Icon name (FontAwesome) shown when there is no image. */
    icon?: ReactNode;
    /** Shape of the avatar. */
    shape?: AvatarShape;
    /** Preset size (sm/md/lg) or a custom pixel number. */
    size?: AvatarSize;
    /** Text content (e.g. initials) shown when there is no image. */
    children?: ReactNode;
    /** Additional CSS classes. */
    className?: string;
    /** Inline styles for the avatar root. */
    style?: CSSProperties;
}
