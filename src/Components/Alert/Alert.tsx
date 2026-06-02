import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Icon from '../Icon';
import { AlertProps, AlertType } from './interface';

const prefixCls = getPrefixCls('alert');

const ICON_MAP: Record<AlertType, string> = {
    success: 'circle-check',
    info: 'circle-info',
    warning: 'triangle-exclamation',
    error: 'circle-xmark',
};

/**
 * Alert displays an important, contextual message inline on the page.
 *
 * ### Usage
 * ```jsx
 * import { Alert } from 'miever_ui';
 *
 * <Alert type="success" message="Saved!" showIcon />
 * <Alert type="warning" message="Heads up" description="More detail here." closable />
 * ```
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(({
    type = 'info',
    message,
    description,
    showIcon = false,
    closable = false,
    onClose,
    className,
    style,
}, ref) => {
    const [closed, setClosed] = useState(false);

    if (closed) return null;

    const handleClose = () => {
        setClosed(true);
        onClose?.();
    };

    const classes = classNames(prefixCls, `${prefixCls}-${type}`, className, {
        [`${prefixCls}-with-description`]: description,
    });

    return (
        <div ref={ref} className={classes} style={style} role="alert">
            {showIcon && (
                <span className={`${prefixCls}-icon`}>
                    <Icon icon={ICON_MAP[type] as never} />
                </span>
            )}
            <div className={`${prefixCls}-body`}>
                <div className={`${prefixCls}-message`}>{message}</div>
                {description && <div className={`${prefixCls}-description`}>{description}</div>}
            </div>
            {closable && (
                <button
                    type="button"
                    className={`${prefixCls}-close`}
                    aria-label="Close"
                    onClick={handleClose}
                >
                    <Icon icon="xmark" />
                </button>
            )}
        </div>
    );
});

Alert.displayName = 'Alert';

export default Alert;
