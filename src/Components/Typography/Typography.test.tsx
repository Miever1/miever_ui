import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Title, Text, Paragraph, Link } from './Typography';

describe('Typography', () => {
    it('Title renders the correct heading level', () => {
        const { getByText } = render(<Title level={3}>Heading</Title>);
        const el = getByText('Heading');
        expect(el.tagName).toBe('H3');
        expect(el).toHaveClass('miever-typography-title');
    });

    it('Title defaults to h1', () => {
        const { getByText } = render(<Title>Heading</Title>);
        expect(getByText('Heading').tagName).toBe('H1');
    });

    it('Text applies type and decoration classes', () => {
        const { getByText } = render(
            <Text type="danger" strong italic>
                hello
            </Text>
        );
        const el = getByText('hello');
        expect(el).toHaveClass('miever-typography-danger');
        expect(el).toHaveClass('miever-typography-strong');
        expect(el).toHaveClass('miever-typography-italic');
    });

    it('Paragraph renders a <p>', () => {
        const { getByText } = render(<Paragraph>body</Paragraph>);
        expect(getByText('body').tagName).toBe('P');
    });

    it('Link renders an anchor with href and disabled state', () => {
        const { getByText } = render(
            <Link href="https://miever.net" disabled>
                link
            </Link>
        );
        const el = getByText('link');
        expect(el.tagName).toBe('A');
        expect(el).toHaveAttribute('href', 'https://miever.net');
        expect(el).toHaveAttribute('aria-disabled', 'true');
    });
});
