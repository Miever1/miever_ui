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

    it('exposes combobox/listbox wiring for assistive tech', () => {
        render(<Select options={options} placeholder="Pick" />);
        const combo = screen.getByRole('combobox');
        expect(combo).toHaveAttribute('aria-haspopup', 'listbox');
        // controls is only present while open.
        expect(combo).not.toHaveAttribute('aria-controls');

        fireEvent.click(screen.getByText('Pick'));
        const listbox = screen.getByRole('listbox');
        expect(combo).toHaveAttribute('aria-controls', listbox.id);

        // Highlighting an option points aria-activedescendant at its id.
        fireEvent.keyDown(combo, { key: 'ArrowDown' });
        const activeId = combo.getAttribute('aria-activedescendant');
        expect(activeId).toBeTruthy();
        expect(document.getElementById(activeId as string)).toHaveAttribute('role', 'option');
    });

    it('filters options via the search box when showSearch is set', () => {
        const onChange = jest.fn();
        render(<Select options={options} placeholder="Pick" showSearch onChange={onChange} />);
        fireEvent.click(screen.getByText('Pick'));
        const input = screen.getByPlaceholderText('Search…');
        fireEvent.change(input, { target: { value: 'ban' } });
        expect(screen.queryByText('Apple')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Banana'));
        expect(onChange).toHaveBeenCalledWith('banana', expect.objectContaining({ value: 'banana' }));
    });

    it('shows notFoundContent when the search matches nothing', () => {
        render(<Select options={options} placeholder="Pick" showSearch />);
        fireEvent.click(screen.getByText('Pick'));
        fireEvent.change(screen.getByPlaceholderText('Search…'), { target: { value: 'zzz' } });
        expect(screen.getByText('No options')).toBeInTheDocument();
    });
});
