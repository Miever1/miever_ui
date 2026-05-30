import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spin from './Spin';

describe('Spin Component', () => {
    it('renders an indicator by default', () => {
        const { container } = render(<Spin />);
        expect(container.querySelector('.miever-spin-dot')).toBeInTheDocument();
    });

    it('renders nothing when standalone and not spinning', () => {
        const { container } = render(<Spin spinning={false} />);
        expect(container.querySelector('.miever-spin')).not.toBeInTheDocument();
    });

    it('shows a tip', () => {
        const { getByText } = render(<Spin tip="Loading..." />);
        expect(getByText('Loading...')).toBeInTheDocument();
    });

    it('overlays children and blurs them while spinning', () => {
        const { container, getByText } = render(
            <Spin spinning>
                <div>content</div>
            </Spin>
        );
        expect(getByText('content')).toBeInTheDocument();
        expect(container.querySelector('.miever-spin-overlay')).toBeInTheDocument();
        expect(container.querySelector('.miever-spin-content')).toHaveClass('blurred');
    });

    it('does not overlay when not spinning', () => {
        const { container } = render(
            <Spin spinning={false}>
                <div>content</div>
            </Spin>
        );
        expect(container.querySelector('.miever-spin-overlay')).not.toBeInTheDocument();
    });
});
