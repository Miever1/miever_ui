import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from './Alert';

describe('Alert Component', () => {
    it('renders the message and type class', () => {
        const { getByText, container } = render(<Alert type="success" message="Saved" />);
        expect(getByText('Saved')).toBeInTheDocument();
        expect(container.querySelector('.miever-alert')).toHaveClass('miever-alert-success');
    });

    it('renders a description', () => {
        const { getByText } = render(<Alert message="Title" description="Detail" />);
        expect(getByText('Detail')).toBeInTheDocument();
    });

    it('shows an icon when showIcon is set', () => {
        const { container } = render(<Alert message="x" showIcon />);
        expect(container.querySelector('.miever-alert-icon')).toBeInTheDocument();
    });

    it('closes and fires onClose', () => {
        const onClose = jest.fn();
        const { container } = render(<Alert message="x" closable onClose={onClose} />);
        const close = container.querySelector('.miever-alert-close') as HTMLElement;
        fireEvent.click(close);
        expect(onClose).toHaveBeenCalled();
        expect(container.querySelector('.miever-alert')).not.toBeInTheDocument();
    });
});
