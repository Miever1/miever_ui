import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PageHeader from './PageHeader';

describe('PageHeader', () => {
    it('renders eyebrow, title and subtitle', () => {
        render(<PageHeader eyebrow="01" title="Blog" subtitle="Some notes" />);
        expect(screen.getByRole('heading', { name: 'Blog' })).toBeInTheDocument();
        expect(screen.getByText('01')).toBeInTheDocument();
        expect(screen.getByText('Some notes')).toBeInTheDocument();
    });

    it('renders the title at the requested level', () => {
        render(<PageHeader title="Projects" level={2} />);
        expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument();
    });

    it('renders actions and applies center alignment', () => {
        const { container } = render(
            <PageHeader title="X" align="center" actions={<button>Go</button>} />,
        );
        expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
        expect(container.firstChild).toHaveClass('miever-page-header-center');
    });

    it('forwards a ref to the root element', () => {
        const ref = React.createRef<HTMLElement>();
        render(<PageHeader ref={ref} title="X" />);
        expect(ref.current).toBeInstanceOf(HTMLElement);
    });
});
