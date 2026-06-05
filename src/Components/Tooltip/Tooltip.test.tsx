import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Tooltip from './Tooltip';

describe('Tooltip Component', () => {
    it('renders its trigger child', () => {
        render(
            <Tooltip overlay={<span>hint</span>} trigger={['click']}>
                <button type="button">trigger</button>
            </Tooltip>,
        );
        expect(screen.getByRole('button', { name: 'trigger' })).toBeInTheDocument();
    });

    it('shows the overlay content when triggered', () => {
        render(
            <Tooltip overlay={<span>hint text</span>} trigger={['click']}>
                <button type="button">open tip</button>
            </Tooltip>,
        );
        expect(screen.queryByText('hint text')).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'open tip' }));
        expect(screen.getByText('hint text')).toBeInTheDocument();
    });
});
