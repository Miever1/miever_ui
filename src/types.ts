import { CSSProperties } from 'react';

/**
 * Props every component accepts for style passthrough. Component prop
 * interfaces should extend this so `className` and `style` are uniformly
 * available across the library.
 */
export interface BaseProps {
    /** Additional CSS class(es) merged onto the component's root element. */
    className?: string;
    /** Inline styles applied to the component's root element. */
    style?: CSSProperties;
}
