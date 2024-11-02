import { CSSTransition } from 'react-transition-group';

export type TransitionProps = React.ComponentProps<typeof CSSTransition> & {
    wrapper?: boolean;
    animation?: 'zoom-in-top' | 'zoom-in-right' | 'zoom-in-bottom' | 'zoom-in-left';
    children?: React.ReactNode;
};