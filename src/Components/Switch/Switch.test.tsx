import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Switch from './Switch';

describe('Switch Component', () => {
    it('renders with role switch and reflects default state', () => {
        const { getByRole } = render(<Switch defaultChecked />);
        const sw = getByRole('switch');
        expect(sw).toHaveAttribute('aria-checked', 'true');
        expect(sw).toHaveClass('checked');
    });

    it('toggles on click and fires onChange', () => {
        const onChange = jest.fn();
        const { getByRole } = render(<Switch onChange={onChange} />);
        const sw = getByRole('switch');
        fireEvent.click(sw);
        expect(onChange).toHaveBeenCalledWith(true);
        expect(sw).toHaveAttribute('aria-checked', 'true');
    });

    it('does not toggle when disabled', () => {
        const onChange = jest.fn();
        const { getByRole } = render(<Switch disabled onChange={onChange} />);
        fireEvent.click(getByRole('switch'));
        expect(onChange).not.toHaveBeenCalled();
    });

    it('respects controlled checked prop', () => {
        const { getByRole, rerender } = render(<Switch checked={false} />);
        const sw = getByRole('switch');
        fireEvent.click(sw);
        // still false because controlled
        expect(sw).toHaveAttribute('aria-checked', 'false');
        rerender(<Switch checked />);
        expect(sw).toHaveAttribute('aria-checked', 'true');
    });
});
