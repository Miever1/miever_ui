import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tag from './Tag';

describe('Tag Component', () => {
    it('renders its content', () => {
        const { getByText } = render(<Tag>Hello</Tag>);
        expect(getByText('Hello')).toBeInTheDocument();
    });

    it('applies the theme class', () => {
        const { container } = render(<Tag theme="primary">Primary</Tag>);
        expect(container.querySelector('.miever-tag')).toHaveClass('miever-tag-primary');
    });

    it('hides itself and fires onClose when closed', () => {
        const onClose = jest.fn();
        const { container } = render(
            <Tag closable onClose={onClose}>
                Closable
            </Tag>
        );
        const close = container.querySelector('.miever-tag-close') as HTMLElement;
        expect(close).toBeInTheDocument();
        fireEvent.click(close);
        expect(onClose).toHaveBeenCalled();
        expect(container.querySelector('.miever-tag')).not.toBeInTheDocument();
    });
});
