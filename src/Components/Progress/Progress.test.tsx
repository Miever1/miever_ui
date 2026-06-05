import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Progress from './Progress';

describe('Progress Component', () => {
    it('renders a line progressbar with accessible value attributes', () => {
        render(<Progress percent={70} />);
        const bar = screen.getByRole('progressbar');
        expect(bar).toHaveAttribute('aria-valuenow', '70');
        expect(bar).toHaveAttribute('aria-valuemin', '0');
        expect(bar).toHaveAttribute('aria-valuemax', '100');
        expect(bar).toHaveStyle({ width: '70%' });
    });

    it('clamps the percentage to the 0–100 range', () => {
        const { rerender } = render(<Progress percent={150} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
        rerender(<Progress percent={-20} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    });

    it('shows the percentage label by default and hides it with showInfo={false}', () => {
        const { rerender, container } = render(<Progress percent={42} />);
        expect(container.querySelector('.miever-progress-info')).toHaveTextContent('42%');
        rerender(<Progress percent={42} showInfo={false} />);
        expect(container.querySelector('.miever-progress-info')).not.toBeInTheDocument();
    });

    it('applies status and type modifier classes', () => {
        const { container } = render(<Progress percent={50} status="success" />);
        const root = container.querySelector('.miever-progress');
        expect(root).toHaveClass('miever-progress-line', 'miever-progress-success');
    });

    it('renders an svg circle for the circle type', () => {
        const { container } = render(<Progress type="circle" percent={90} />);
        expect(container.querySelector('.miever-progress-circle')).toBeInTheDocument();
        expect(container.querySelector('svg')).toBeInTheDocument();
        expect(container.querySelector('.miever-progress-circle-info')).toHaveTextContent('90%');
    });

    it('forwards a ref to the root element', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Progress ref={ref} percent={10} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});
