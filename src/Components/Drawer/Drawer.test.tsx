import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Drawer from './Drawer';

describe('Drawer Component', () => {
    it('renders nothing when closed', () => {
        render(<Drawer open={false}>content</Drawer>);
        expect(document.querySelector('.miever-drawer')).not.toBeInTheDocument();
    });

    it('renders into a portal with placement class', () => {
        render(
            <Drawer open placement="left" title="Menu">
                content
            </Drawer>
        );
        const el = document.querySelector('.miever-drawer');
        expect(el).toBeInTheDocument();
        expect(el).toHaveClass('miever-drawer-left');
        expect(document.body.textContent).toContain('content');
    });

    it('closes via the close button and the mask', () => {
        const onClose = jest.fn();
        render(
            <Drawer open onClose={onClose}>
                body
            </Drawer>
        );
        fireEvent.click(document.querySelector('.miever-drawer-close') as HTMLElement);
        fireEvent.click(document.querySelector('.miever-drawer-mask') as HTMLElement);
        expect(onClose).toHaveBeenCalledTimes(2);
    });
});
