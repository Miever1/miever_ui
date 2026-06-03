import React, { FunctionComponent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Icon from '../Icon';
import { DrawerProps } from './interface';

const prefixCls = getPrefixCls('drawer');

/**
 * Drawer is a panel that slides in from an edge of the screen — handy for
 * mobile navigation, filters or detail views. Rendered via a portal.
 *
 * ### Usage
 * ```jsx
 * import { Drawer } from 'miever_ui';
 *
 * <Drawer open={open} title="Menu" placement="left" onClose={() => setOpen(false)}>
 *   <nav>...</nav>
 * </Drawer>
 * ```
 */
const Drawer: FunctionComponent<DrawerProps> = ({
    open,
    title,
    children,
    placement = 'right',
    size = 320,
    onClose,
    maskClosable = true,
    closable = true,
    className,
    style,
}) => {
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', onKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    if (!open || typeof document === 'undefined') return null;

    const isHorizontal = placement === 'left' || placement === 'right';
    const panelStyle = isHorizontal ? { width: size } : { height: size };

    return createPortal(
        <div className={`${prefixCls}-root`}>
            <div
                className={`${prefixCls}-mask`}
                onClick={maskClosable ? onClose : undefined}
            />
            <div
                className={classNames(prefixCls, `${prefixCls}-${placement}`, className)}
                style={{ ...panelStyle, ...style }}
                role="dialog"
                aria-modal="true"
            >
                {(title || closable) && (
                    <div className={`${prefixCls}-header`}>
                        <div className={`${prefixCls}-title`}>{title}</div>
                        {closable && (
                            <button
                                type="button"
                                className={`${prefixCls}-close`}
                                aria-label="Close"
                                onClick={onClose}
                            >
                                <Icon icon="xmark" />
                            </button>
                        )}
                    </div>
                )}
                <div className={`${prefixCls}-body`}>{children}</div>
            </div>
        </div>,
        document.body
    );
};

Drawer.displayName = 'Drawer';

export default Drawer;
