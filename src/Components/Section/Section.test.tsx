import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Section from './Section';

describe('Section Component', () => {
    it('renders title, subtitle and children', () => {
        const { getByText, container } = render(
            <Section title="My Skills" subtitle="What I work with">
                <p>body content</p>
            </Section>
        );
        expect(getByText('My Skills')).toBeInTheDocument();
        expect(getByText('What I work with')).toBeInTheDocument();
        expect(getByText('body content')).toBeInTheDocument();
        expect(container.querySelector('.miever-section')).toBeInTheDocument();
    });

    it('renders the title at the requested level', () => {
        const { getByText } = render(<Section title="Heading" titleLevel={2} />);
        expect(getByText('Heading').tagName).toBe('H2');
    });

    it('omits the header when no title/subtitle', () => {
        const { container } = render(
            <Section>
                <p>only body</p>
            </Section>
        );
        expect(container.querySelector('.miever-section-header')).not.toBeInTheDocument();
        expect(container.querySelector('.miever-section-body')).toBeInTheDocument();
    });

    it('renders a divider when requested', () => {
        const { container } = render(<Section title="t" divider />);
        expect(container.querySelector('.miever-divider')).toBeInTheDocument();
    });

    it('applies alignment to the title', () => {
        const { getByText } = render(<Section title="Centered" align="center" />);
        expect(getByText('Centered')).toHaveClass('miever-typography-align-center');
    });
});
