import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Timeline from './Timeline';

const items = [
    { label: '2024', color: 'primary' as const, children: 'Event one' },
    { label: '2023', children: 'Event two' },
];

describe('Timeline Component', () => {
    it('renders all items with labels and content', () => {
        const { getByText, container } = render(<Timeline items={items} />);
        expect(getByText('Event one')).toBeInTheDocument();
        expect(getByText('Event two')).toBeInTheDocument();
        expect(getByText('2024')).toBeInTheDocument();
        expect(container.querySelectorAll('.miever-timeline-item').length).toBe(2);
    });

    it('applies the mode class', () => {
        const { container } = render(<Timeline items={items} mode="alternate" />);
        expect(container.querySelector('.miever-timeline')).toHaveClass('miever-timeline-alternate');
    });

    it('supports a custom dot node', () => {
        const { getByText } = render(
            <Timeline items={[{ children: 'x', dot: <span>★</span> }]} />
        );
        expect(getByText('★')).toBeInTheDocument();
    });
});
