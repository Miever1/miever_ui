import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import AutoComplete from './AutoComplete';

describe('AutoComplete Component', () => {
    const defaultProps = {
        options: ['Apple', 'Banana', 'Cherry', 'Date'],
        onSelect: jest.fn(),
        onChange: jest.fn(),
        placeholder: 'Search fruits...',
    };

    const wrapper = render(<AutoComplete {...defaultProps} />);
    const autoCompleteComponent = wrapper.container.querySelector('.auto-complete');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('test basic rendering', () => {
        expect(autoCompleteComponent).toBeInTheDocument();
        expect(autoCompleteComponent).toHaveClass('auto-complete-md');
    });

    test('displays initial value correctly', () => {
        render(<AutoComplete {...defaultProps} value="Apple" />);
        
        const input = screen.getByDisplayValue('Apple');
        expect(input).toBeInTheDocument();
    });

    test('shows filtered options when typing', async () => {
        const user = userEvent.setup();
        render(<AutoComplete {...defaultProps} />);
        
        const input = screen.getByRole('textbox');
        await user.type(input, 'a');
        
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
        expect(screen.getByText('Date')).toBeInTheDocument();
        expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
    });

    test('shows all options when input is empty', async () => {
        const user = userEvent.setup();
        render(<AutoComplete {...defaultProps} />);
        
        const input = screen.getByRole('textbox');
        await user.click(input);
        
        defaultProps.options.forEach(option => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });
});