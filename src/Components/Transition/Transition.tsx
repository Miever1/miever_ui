import React, { FunctionComponent } from 'react';
import { CSSTransition } from 'react-transition-group';

import { TransitionProps } from './interface';
import Box from '../Box';

/**
 * A wrapper component for `CSSTransition` from `react-transition-group`, providing easy integration for CSS-based animations.
 * This component allows wrapping content with various transition animations and provides the ability to control the mounting/unmounting behavior.
 *
 * ### Usage
 * ```javascript
 * import { Transition } from 'miever_components';
 *
 * <Transition 
 *   in={isVisible} 
 *   timeout={300} 
 *   animation="zoom-in-top" 
 *   unmountOnExit
 * >
 *   <div>Your content here</div>
 * </Transition>
 * ```
 *
 */

const Transition: FunctionComponent<TransitionProps> = ({
    wrapper = false,
    children,
    classNames,
    animation,
    unmountOnExit=true,
    appear=true,
    ...restProps
}) => {
    return (
        <CSSTransition
            appear={appear}
            unmountOnExit={unmountOnExit}
            classNames={classNames ?? animation}
            {...restProps}
        >
            {wrapper ? <Box>{children}</Box> : children}
        </CSSTransition>
    );
}

export default Transition;