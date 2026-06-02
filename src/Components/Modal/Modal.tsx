import React, { FunctionComponent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Button from '../Button';
import Icon from '../Icon';
import { ModalProps } from './interface';

const prefixCls = getPrefixCls('modal');

/**
 * Modal shows content in a dialog overlaying the page, rendered via a portal.
 *
 * ### Usage
 * ```jsx
 * import { Modal } from 'miever_ui';
 *
 * <Modal open={open} title="Confirm" onOk={save} onClose={() => setOpen(false)}>
 *   Are you sure?
 * </Modal>
 * ```
 */
const Modal: FunctionComponent<ModalProps> = ({
    open,
    title,
    children,
    footer,
    okText = 'OK',
    cancelText = 'Cancel',
    onOk,
    onClose,
    maskClosable = true,
    closable = true,
    width = 520,
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

    const defaultFooter = (
        <>
            <Button onClick={onClose}>{cancelText}</Button>
            <Button type="primary" onClick={onOk}>
                {okText}
            </Button>
        </>
    );

    return createPortal(
        <div className={`${prefixCls}-root`}>
            <div
                className={`${prefixCls}-mask`}
                onClick={maskClosable ? onClose : undefined}
            />
            <div className={`${prefixCls}-wrap`} role="dialog" aria-modal="true">
                <div
                    className={classNames(`${prefixCls}`, className)}
                    style={{ width, ...style }}
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
                    {footer !== null && (
                        <div className={`${prefixCls}-footer`}>{footer ?? defaultFooter}</div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

Modal.displayName = 'Modal';

export default Modal;
