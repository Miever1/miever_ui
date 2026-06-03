import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skeleton from './Skeleton';

describe('Skeleton Component', () => {
    it('renders placeholder shapes when loading', () => {
        const { container } = render(<Skeleton avatar title paragraph={3} />);
        expect(container.querySelector('.miever-skeleton-avatar')).toBeInTheDocument();
        expect(container.querySelector('.miever-skeleton-title')).toBeInTheDocument();
        expect(container.querySelectorAll('.miever-skeleton-row').length).toBe(3);
    });

    it('renders children when not loading', () => {
        const { getByText, container } = render(
            <Skeleton loading={false}>
                <span>real</span>
            </Skeleton>
        );
        expect(getByText('real')).toBeInTheDocument();
        expect(container.querySelector('.miever-skeleton')).not.toBeInTheDocument();
    });

    it('applies the active class for shimmer', () => {
        const { container } = render(<Skeleton active />);
        expect(container.querySelector('.miever-skeleton')).toHaveClass('miever-skeleton-active');
    });

    it('omits avatar and title when disabled', () => {
        const { container } = render(<Skeleton avatar={false} title={false} paragraph={2} />);
        expect(container.querySelector('.miever-skeleton-avatar')).not.toBeInTheDocument();
        expect(container.querySelector('.miever-skeleton-title')).not.toBeInTheDocument();
        expect(container.querySelectorAll('.miever-skeleton-row').length).toBe(2);
    });
});
