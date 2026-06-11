import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal Component', () => {
    it('renders nothing when closed', () => {
        render(<Modal open={false}>content</Modal>);
        expect(document.querySelector('.miever-modal')).not.toBeInTheDocument();
    });

    it('renders into a portal when open', () => {
        render(
            <Modal open title="Title">
                content
            </Modal>
        );
        expect(document.querySelector('.miever-modal')).toBeInTheDocument();
        expect(document.body.textContent).toContain('content');
    });

    it('fires onOk and onClose', () => {
        const onOk = jest.fn();
        const onClose = jest.fn();
        render(
            <Modal open title="t" onOk={onOk} onClose={onClose}>
                body
            </Modal>
        );
        fireEvent.click(document.querySelector('.miever-modal-close') as HTMLElement);
        expect(onClose).toHaveBeenCalled();
        const okBtn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent === 'OK')!;
        fireEvent.click(okBtn);
        expect(onOk).toHaveBeenCalled();
    });

    it('closes on mask click when maskClosable', () => {
        const onClose = jest.fn();
        render(
            <Modal open onClose={onClose}>
                body
            </Modal>
        );
        fireEvent.click(document.querySelector('.miever-modal-mask') as HTMLElement);
        expect(onClose).toHaveBeenCalled();
    });

    it('labels the dialog with the title via aria-labelledby', () => {
        render(
            <Modal open title="Confirm delete">
                body
            </Modal>
        );
        const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
        const labelledBy = dialog.getAttribute('aria-labelledby');
        expect(labelledBy).toBeTruthy();
        const title = document.getElementById(labelledBy as string);
        expect(title).toHaveTextContent('Confirm delete');
    });

    it('omits aria-labelledby when there is no title', () => {
        render(<Modal open>body</Modal>);
        const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
        expect(dialog).not.toHaveAttribute('aria-labelledby');
    });

    it('traps initial focus inside the dialog and restores it on close', () => {
        const trigger = document.createElement('button');
        document.body.appendChild(trigger);
        trigger.focus();
        expect(document.activeElement).toBe(trigger);

        const { rerender } = render(
            <Modal open title="t">
                body
            </Modal>
        );
        const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
        // Focus moved into the dialog (to the first focusable child or the dialog itself).
        expect(dialog.contains(document.activeElement)).toBe(true);

        rerender(
            <Modal open={false} title="t">
                body
            </Modal>
        );
        // Focus returns to the element that opened the modal.
        expect(document.activeElement).toBe(trigger);
        document.body.removeChild(trigger);
    });

    it('disables the OK button via okDisabled and okLoading', () => {
        const onOk = jest.fn();
        const { rerender } = render(
            <Modal open onOk={onOk} okDisabled>
                content
            </Modal>
        );
        const ok = document.querySelector('.miever-modal-footer .miever-btn-primary') as HTMLButtonElement;
        expect(ok.disabled).toBeTruthy();
        fireEvent.click(ok);
        expect(onOk).not.toBeCalled();

        rerender(
            <Modal open onOk={onOk} okLoading>
                content
            </Modal>
        );
        const okLoading = document.querySelector('.miever-modal-footer .miever-btn-primary') as HTMLButtonElement;
        expect(okLoading.disabled).toBeTruthy();
        expect(okLoading).toHaveClass('miever-btn-loading');
    });
});
