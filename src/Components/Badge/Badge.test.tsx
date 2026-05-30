import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Badge from './Badge';

describe('Badge Component', () => {
    it('renders the count', () => {
        const { getByText } = render(<Badge count={5} />);
        expect(getByText('5')).toBeInTheDocument();
    });

    it('caps the count at maxCount', () => {
        const { getByText } = render(<Badge count={120} maxCount={99} />);
        expect(getByText('99+')).toBeInTheDocument();
    });

    it('hides a zero count unless showZero is set', () => {
        const { container, rerender } = render(<Badge count={0} />);
        expect(container.querySelector('.miever-badge-count')).not.toBeInTheDocument();
        rerender(<Badge count={0} showZero />);
        expect(container.querySelector('.miever-badge-count')).toBeInTheDocument();
    });

    it('renders a dot when dot is set', () => {
        const { container } = render(<Badge dot theme="primary" />);
        const dotEl = container.querySelector('.miever-badge-dot');
        expect(dotEl).toBeInTheDocument();
        expect(dotEl).toHaveClass('miever-badge-primary');
    });

    it('wraps children', () => {
        const { getByText } = render(
            <Badge count={1}>
                <span>child</span>
            </Badge>
        );
        expect(getByText('child')).toBeInTheDocument();
        expect(getByText('1')).toBeInTheDocument();
    });
});
