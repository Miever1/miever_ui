import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Divider from './Divider';

describe('Divider Component', () => {
    it('renders a horizontal separator by default', () => {
        const { container } = render(<Divider />);
        const el = container.querySelector('.miever-divider');
        expect(el).toBeInTheDocument();
        expect(el).toHaveClass('miever-divider-horizontal');
        expect(el).toHaveAttribute('role', 'separator');
    });

    it('renders centered text when children are provided', () => {
        const { getByText, container } = render(<Divider>Hello</Divider>);
        expect(getByText('Hello')).toBeInTheDocument();
        expect(container.querySelector('.miever-divider')).toHaveClass('miever-divider-with-text');
    });

    it('supports dashed and vertical variants', () => {
        const { container } = render(<Divider direction="vertical" dashed />);
        const el = container.querySelector('.miever-divider');
        expect(el).toHaveClass('miever-divider-vertical');
        expect(el).toHaveClass('miever-divider-dashed');
    });
});
