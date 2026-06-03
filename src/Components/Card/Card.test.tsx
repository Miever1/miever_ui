import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from './Card';

describe('Card', () => {
    it('renders title, subtitle, meta and body', () => {
        render(
            <Card title="Title" subTitle="Sub" meta="May 2026">
                Body content
            </Card>,
        );
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Sub')).toBeInTheDocument();
        expect(screen.getByText('May 2026')).toBeInTheDocument();
        expect(screen.getByText('Body content')).toBeInTheDocument();
    });

    it('renders the cover and footer slots', () => {
        render(
            <Card
                cover={<img src="/x.jpg" alt="cover" />}
                footer={<button>Act</button>}
                title="t"
            />,
        );
        expect(screen.getByAltText('cover')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Act' })).toBeInTheDocument();
    });

    it('applies variant and orientation classes', () => {
        const { container } = render(
            <Card variant="elevated" orientation="horizontal" title="t" />,
        );
        const root = container.firstChild as HTMLElement;
        expect(root).toHaveClass('miever-card-elevated');
        expect(root).toHaveClass('miever-card-horizontal');
    });

    it('renders as a link when href is set', () => {
        render(<Card href="/post" title="t" />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/post');
        expect(link).toHaveClass('miever-card-clickable');
    });

    it('adds rel for external links', () => {
        render(<Card href="https://x.com" target="_blank" title="t" />);
        expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('fires onClick on the whole card', () => {
        const onClick = jest.fn();
        render(<Card onClick={onClick} title="Clickable" />);
        fireEvent.click(screen.getByText('Clickable'));
        expect(onClick).toHaveBeenCalled();
    });

    it('sets the line-clamp custom property when clamp is set', () => {
        render(
            <Card clamp={3} title="t">
                long body
            </Card>,
        );
        const content = screen.getByText('long body');
        expect(content).toHaveClass('miever-card-clamp');
        expect(content.style.getPropertyValue('--card-clamp')).toBe('3');
    });

    it('forwards a ref to the root element', () => {
        const ref = React.createRef<HTMLElement>();
        render(<Card ref={ref} title="t" />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});
