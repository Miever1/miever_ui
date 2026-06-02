import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Select from './Select';

const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry', disabled: true },
];

describe('Select', () => {
    it('shows the placeholder when nothing is selected', () => {
        render(<Select options={options} placeholder="Pick one" />);
        expect(screen.getByText('Pick one')).toBeInTheDocument();
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('opens the dropdown on click and selects an option', () => {
        const onChange = jest.fn();
        render(<Select options={options} placeholder="Pick" onChange={onChange} />);
        const combo = screen.getByRole('combobox');
        fireEvent.click(screen.getByText('Pick'));
        expect(combo).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Banana'));
        expect(onChange).toHaveBeenCalledWith('banana', options[1]);
        // dropdown collapses after selection (aria-expanded flips synchronously)
        expect(combo).toHaveAttribute('aria-expanded', 'false');
    });

    it('does not select a disabled option', () => {
        const onChange = jest.fn();
        render(<Select options={options} placeholder="Pick" onChange={onChange} />);
        fireEvent.click(screen.getByText('Pick'));
        fireEvent.click(screen.getByText('Cherry'));
        expect(onChange).not.toHaveBeenCalled();
    });

    it('reflects a controlled value', () => {
        render(<Select options={options} value="apple" />);
        expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('clears the value via the clear button', () => {
        const onChange = jest.fn();
        render(
            <Select options={options} defaultValue="apple" allowClear onChange={onChange} />,
        );
        fireEvent.click(screen.getByLabelText('Clear'));
        expect(onChange).toHaveBeenCalledWith(undefined, null);
    });

    it('navigates with the keyboard and selects with Enter', () => {
        const onChange = jest.fn();
        render(<Select options={options} onChange={onChange} />);
        const combo = screen.getByRole('combobox');
        fireEvent.keyDown(combo, { key: 'ArrowDown' }); // open
        fireEvent.keyDown(combo, { key: 'ArrowDown' }); // highlight first (apple)
        fireEvent.keyDown(combo, { key: 'Enter' });
        expect(onChange).toHaveBeenCalledWith('apple', options[0]);
    });

    it('closes on Escape', () => {
        render(<Select options={options} placeholder="Pick" />);
        const combo = screen.getByRole('combobox');
        fireEvent.click(screen.getByText('Pick'));
        expect(combo).toHaveAttribute('aria-expanded', 'true');
        fireEvent.keyDown(combo, { key: 'Escape' });
        expect(combo).toHaveAttribute('aria-expanded', 'false');
    });

    it('forwards a ref to the root element', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Select ref={ref} options={options} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});
