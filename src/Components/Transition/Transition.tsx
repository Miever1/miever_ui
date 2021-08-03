import React, { FunctionComponent } from 'react';
import { CSSTransition } from 'react-transition-group';

import { TransitionProps } from './interface';

/**
 * 
 * A simple encapsulation of CSSTransition.
 * 
 *  ```javascript
 *      import { Transition } from 'miever_components';
 *  ```
 * 
 * @param TransitionProps 
 * @returns 
 */

const Transition: FunctionComponent<TransitionProps> = ({
    wrapper,
    children,
    classNames,
    animation,
    unmountOnExit=true,
    appear=true,
    ...restProps
}) => {
    return (
        <CSSTransition
            classNames={classNames ?? animation}
            {...restProps}
        >
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    );
}

export default Transition;