import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Checkbox from './index';

describe('Checkbox', () => {
    it('renders a label and an unchecked input by default', () => {
        render(<Checkbox>Accept</Checkbox>);
        const input = screen.getByRole('checkbox') as HTMLInputElement;
        expect(input).not.toBeChecked();
        expect(screen.getByText('Accept')).toBeInTheDocument();
    });

    it('toggles and fires onChange when uncontrolled', () => {
        const onChange = jest.fn();
        render(<Checkbox onChange={onChange}>x</Checkbox>);
        const input = screen.getByRole('checkbox');
        fireEvent.click(input);
        expect(input).toBeChecked();
        expect(onChange).toHaveBeenCalledWith(true, expect.anything());
    });

    it('respects a controlled checked prop', () => {
        const { rerender } = render(<Checkbox checked={false}>x</Checkbox>);
        const input = screen.getByRole('checkbox');
        fireEvent.click(input);
        expect(input).not.toBeChecked(); // stays controlled
        rerender(<Checkbox checked>x</Checkbox>);
        expect(input).toBeChecked();
    });

    it('does not toggle when disabled', () => {
        const onChange = jest.fn();
        render(
            <Checkbox disabled onChange={onChange}>
                x
            </Checkbox>,
        );
        fireEvent.click(screen.getByRole('checkbox'));
        expect(onChange).not.toHaveBeenCalled();
    });

    it('reflects the indeterminate state on the input', () => {
        render(<Checkbox indeterminate>x</Checkbox>);
        const input = screen.getByRole('checkbox') as HTMLInputElement;
        expect(input.indeterminate).toBe(true);
    });

    it('forwards a ref to the input element', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Checkbox ref={ref}>x</Checkbox>);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    describe('Checkbox.Group', () => {
        it('renders options and reports selected values', () => {
            const onChange = jest.fn();
            render(
                <Checkbox.Group
                    options={['Email', 'SMS', 'Push']}
                    defaultValue={['Email']}
                    onChange={onChange}
                />,
            );
            const boxes = screen.getAllByRole('checkbox');
            expect(boxes).toHaveLength(3);
            expect(boxes[0]).toBeChecked();
            fireEvent.click(boxes[1]);
            expect(onChange).toHaveBeenCalledWith(['Email', 'SMS']);
        });

        it('deselects a value on second click', () => {
            const onChange = jest.fn();
            render(
                <Checkbox.Group options={['A', 'B']} defaultValue={['A', 'B']} onChange={onChange} />,
            );
            fireEvent.click(screen.getAllByRole('checkbox')[0]);
            expect(onChange).toHaveBeenCalledWith(['B']);
        });
    });
});
