import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Textarea from './Textarea';

describe('Textarea Component', () => {
    it('renders a textarea and accepts input', () => {
        const onChange = jest.fn();
        const { getByPlaceholderText } = render(
            <Textarea placeholder="Notes" onChange={onChange} />
        );
        const field = getByPlaceholderText('Notes');
        expect(field.tagName).toBe('TEXTAREA');
        fireEvent.change(field, { target: { value: 'hello' } });
        expect(onChange).toHaveBeenCalled();
    });

    it('links a visible label via htmlFor', () => {
        const { getByLabelText } = render(<Textarea label="Message" />);
        expect(getByLabelText('Message')).toBeInTheDocument();
    });

    it('respects the disabled state', () => {
        const { getByPlaceholderText } = render(<Textarea placeholder="Notes" disabled />);
        expect(getByPlaceholderText('Notes')).toBeDisabled();
    });

    it('applies the no-resize class when resizable is false', () => {
        const { container } = render(<Textarea resizable={false} />);
        expect(container.querySelector('.miever-textarea-inner')).toHaveClass(
            'miever-textarea-no-resize'
        );
    });
});
