import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Statistic from './Statistic';

describe('Statistic Component', () => {
    it('renders title and value', () => {
        const { getByText } = render(<Statistic title="Total" value={42} />);
        expect(getByText('Total')).toBeInTheDocument();
        expect(getByText('42')).toBeInTheDocument();
    });

    it('applies precision to numeric values', () => {
        const { getByText } = render(<Statistic value={32.456} precision={1} suffix="%" />);
        expect(getByText('32.5')).toBeInTheDocument();
        expect(getByText('%')).toBeInTheDocument();
    });

    it('renders the trend with direction class', () => {
        const { container, getByText } = render(
            <Statistic value={10} trend="up" trendValue="+5%" />
        );
        expect(getByText('+5%')).toBeInTheDocument();
        expect(container.querySelector('.miever-statistic-trend')).toHaveClass(
            'miever-statistic-trend-up'
        );
    });

    it('applies the theme class to the value', () => {
        const { container } = render(<Statistic value={1} theme="danger" />);
        expect(container.querySelector('.miever-statistic-content')).toHaveClass(
            'miever-statistic-danger'
        );
    });

    it('shows a loading placeholder instead of the value', () => {
        const { container, queryByText } = render(<Statistic value={99} loading />);
        expect(container.querySelector('.miever-statistic-loading')).toBeInTheDocument();
        expect(queryByText('99')).not.toBeInTheDocument();
    });
});
