import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type TransitionProps = CSSTransitionProps & {
    wrapper?: boolean;
    animation?: 'zoom-in-top' | 'zoom-in-right' | 'zoom-in-bottom' | 'zoom-in-left';
}