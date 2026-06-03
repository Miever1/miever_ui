import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Collapse from './Collapse';

const items = [
    { key: '1', header: 'Q1', children: 'A1' },
    { key: '2', header: 'Q2', children: 'A2' },
    { key: '3', header: 'Q3', children: 'A3', disabled: true },
];

describe('Collapse Component', () => {
    it('shows content for default active keys', () => {
        const { getByText, queryByText } = render(
            <Collapse items={items} defaultActiveKeys={['1']} />
        );
        expect(getByText('A1')).toBeInTheDocument();
        expect(queryByText('A2')).not.toBeInTheDocument();
    });

    it('toggles panels open and closed', () => {
        const { getByText, queryByText } = render(<Collapse items={items} />);
        fireEvent.click(getByText('Q2'));
        expect(getByText('A2')).toBeInTheDocument();
        fireEvent.click(getByText('Q2'));
        expect(queryByText('A2')).not.toBeInTheDocument();
    });

    it('accordion keeps only one panel open', () => {
        const { getByText, queryByText } = render(<Collapse items={items} accordion />);
        fireEvent.click(getByText('Q1'));
        fireEvent.click(getByText('Q2'));
        expect(getByText('A2')).toBeInTheDocument();
        expect(queryByText('A1')).not.toBeInTheDocument();
    });

    it('does not toggle disabled panels', () => {
        const onChange = jest.fn();
        const { getByText, queryByText } = render(<Collapse items={items} onChange={onChange} />);
        fireEvent.click(getByText('Q3'));
        expect(queryByText('A3')).not.toBeInTheDocument();
        expect(onChange).not.toHaveBeenCalled();
    });
});
