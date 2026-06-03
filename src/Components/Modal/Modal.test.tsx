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
});
