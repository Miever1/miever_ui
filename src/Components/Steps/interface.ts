import { CSSProperties, ReactNode } from 'react';

export interface StepItem {
    /** Step title */
    title: ReactNode;
    /** Optional secondary line below the title */
    description?: ReactNode;
}

export type StepStatus = 'process' | 'finish' | 'error';

export interface StepsProps {
    /** The steps to render, in order */
    items: StepItem[];
    /** Zero-based index of the current step */
    current?: number;
    /** Status of the current step */
    status?: StepStatus;
    /** Layout direction */
    direction?: 'horizontal' | 'vertical';
    /** Additional CSS classes */
    className?: string;
    /** Inline styles for the root */
    style?: CSSProperties;
}
