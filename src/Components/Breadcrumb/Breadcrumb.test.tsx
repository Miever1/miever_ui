import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Breadcrumb from './Breadcrumb';

const items = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Post' },
];

describe('Breadcrumb Component', () => {
    it('renders all items', () => {
        const { getByText } = render(<Breadcrumb items={items} />);
        expect(getByText('Home')).toBeInTheDocument();
        expect(getByText('Blog')).toBeInTheDocument();
        expect(getByText('Post')).toBeInTheDocument();
    });

    it('renders links for non-last items with href', () => {
        const { getByText } = render(<Breadcrumb items={items} />);
        expect(getByText('Home').tagName).toBe('A');
        expect(getByText('Post').tagName).toBe('SPAN');
        expect(getByText('Post')).toHaveAttribute('aria-current', 'page');
    });

    it('fires onClick handlers', () => {
        const onClick = jest.fn();
        const { getByText } = render(
            <Breadcrumb items={[{ label: 'Home', onClick }, { label: 'Now' }]} />
        );
        fireEvent.click(getByText('Home'));
        expect(onClick).toHaveBeenCalled();
    });

    it('renders separators between items', () => {
        const { container } = render(<Breadcrumb items={items} separator=">" />);
        expect(container.querySelectorAll('.miever-breadcrumb-separator').length).toBe(2);
    });
});
