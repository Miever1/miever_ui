import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from './Tabs';

const items = [
    { key: 'a', label: 'Tab A', children: <div>Panel A</div> },
    { key: 'b', label: 'Tab B', children: <div>Panel B</div> },
    { key: 'c', label: 'Tab C', children: <div>Panel C</div>, disabled: true },
];

describe('Tabs Component', () => {
    it('shows the first panel by default', () => {
        const { getByText, queryByText } = render(<Tabs items={items} />);
        expect(getByText('Panel A')).toBeInTheDocument();
        expect(queryByText('Panel B')).not.toBeInTheDocument();
    });

    it('switches panel on tab click and fires onChange', () => {
        const onChange = jest.fn();
        const { getByText } = render(<Tabs items={items} onChange={onChange} />);
        fireEvent.click(getByText('Tab B'));
        expect(getByText('Panel B')).toBeInTheDocument();
        expect(onChange).toHaveBeenCalledWith('b');
    });

    it('does not switch to a disabled tab', () => {
        const onChange = jest.fn();
        const { getByText, queryByText } = render(<Tabs items={items} onChange={onChange} />);
        fireEvent.click(getByText('Tab C'));
        expect(queryByText('Panel C')).not.toBeInTheDocument();
        expect(onChange).not.toHaveBeenCalled();
    });

    it('respects defaultActiveKey', () => {
        const { getByText } = render(<Tabs items={items} defaultActiveKey="b" />);
        expect(getByText('Panel B')).toBeInTheDocument();
    });
});
