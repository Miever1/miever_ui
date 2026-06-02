import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Radio from './index';

describe('Radio', () => {
    it('renders a label and an unchecked input', () => {
        render(<Radio>Pick me</Radio>);
        expect(screen.getByRole('radio')).not.toBeChecked();
        expect(screen.getByText('Pick me')).toBeInTheDocument();
    });

    it('forwards a ref to the input element', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Radio ref={ref}>x</Radio>);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    describe('Radio.Group', () => {
        it('renders options and selects the default value', () => {
            render(
                <Radio.Group options={['Small', 'Medium', 'Large']} defaultValue="Medium" />,
            );
            const radios = screen.getAllByRole('radio');
            expect(radios).toHaveLength(3);
            expect(radios[1]).toBeChecked();
        });

        it('changes selection and fires onChange', () => {
            const onChange = jest.fn();
            render(
                <Radio.Group options={['A', 'B', 'C']} defaultValue="A" onChange={onChange} />,
            );
            const radios = screen.getAllByRole('radio');
            fireEvent.click(radios[2]);
            expect(onChange).toHaveBeenCalledWith('C');
            expect(radios[2]).toBeChecked();
            expect(radios[0]).not.toBeChecked();
        });

        it('does not select a disabled option', () => {
            const onChange = jest.fn();
            render(
                <Radio.Group defaultValue="a" onChange={onChange}>
                    <Radio value="a">A</Radio>
                    <Radio value="b" disabled>
                        B
                    </Radio>
                </Radio.Group>,
            );
            fireEvent.click(screen.getAllByRole('radio')[1]);
            expect(onChange).not.toHaveBeenCalled();
        });

        it('respects a controlled value', () => {
            const { rerender } = render(
                <Radio.Group value="a" options={['a', 'b']} />,
            );
            const radios = screen.getAllByRole('radio');
            fireEvent.click(radios[1]);
            expect(radios[0]).toBeChecked(); // stays controlled
            rerender(<Radio.Group value="b" options={['a', 'b']} />);
            expect(radios[1]).toBeChecked();
        });
    });
});
