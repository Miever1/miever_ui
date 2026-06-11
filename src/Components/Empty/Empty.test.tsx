import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Empty from './Empty';

describe('Empty Component', () => {
    it('renders the default description', () => {
        const { getByText } = render(<Empty />);
        expect(getByText('No data')).toBeInTheDocument();
    });

    it('renders a custom description and children', () => {
        const { getByText } = render(
            <Empty description="Not enough data yet.">
                <button>Add</button>
            </Empty>
        );
        expect(getByText('Not enough data yet.')).toBeInTheDocument();
        expect(getByText('Add')).toBeInTheDocument();
    });

    it('renders a custom image instead of the icon', () => {
        const { container, getByAltText } = render(
            <Empty image={<img src="x.png" alt="illustration" />} />
        );
        expect(getByAltText('illustration')).toBeInTheDocument();
        expect(container.querySelector('svg')).not.toBeInTheDocument();
    });
});
