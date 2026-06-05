import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Icon from './Icon';
import { BRAND_COLORS } from '../../Designs';

describe('Icon Component', () => {
    it('renders a FontAwesome svg with the base class', () => {
        const { container } = render(<Icon icon="coffee" />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('miever-icon');
        // FontAwesome resolves "coffee" to its canonical name "mug-saucer".
        expect(svg).toHaveAttribute('data-icon', 'mug-saucer');
    });

    it('merges a custom className', () => {
        const { container } = render(<Icon icon="coffee" className="extra" />);
        expect(container.querySelector('svg')).toHaveClass('miever-icon', 'extra');
    });

    it('applies a theme class and brand colour', () => {
        const { container } = render(<Icon icon="coffee" theme="primary" />);
        const svg = container.querySelector('svg') as SVGElement;
        expect(svg).toHaveClass('miever-icon-primary');
        expect(svg).toHaveStyle({ color: BRAND_COLORS.primary });
    });

    it('does not add theme colour when no theme is given', () => {
        const { container } = render(<Icon icon="coffee" />);
        const svg = container.querySelector('svg') as SVGElement;
        expect(svg.style.color).toBe('');
    });
});
