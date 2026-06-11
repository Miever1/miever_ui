import { CSSProperties, ReactNode } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface EmptyProps {
    /** FontAwesome icon shown above the description */
    icon?: IconProp;
    /** Custom illustration node (overrides icon) */
    image?: ReactNode;
    /** Description text */
    description?: ReactNode;
    /** Optional actions rendered below the description */
    children?: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Inline styles for the root */
    style?: CSSProperties;
}
