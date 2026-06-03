import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar from './Avatar';

describe('Avatar Component', () => {
    it('renders an image when src is provided', () => {
        const { container } = render(<Avatar src="/me.jpg" alt="me" />);
        const img = container.querySelector('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/me.jpg');
    });

    it('renders text fallback', () => {
        const { getByText, container } = render(<Avatar>MV</Avatar>);
        expect(getByText('MV')).toBeInTheDocument();
        expect(container.querySelector('.miever-avatar')).toHaveClass('miever-avatar-circle');
    });

    it('applies preset size and shape classes', () => {
        const { container } = render(
            <Avatar size="lg" shape="square">
                A
            </Avatar>
        );
        const el = container.querySelector('.miever-avatar');
        expect(el).toHaveClass('miever-avatar-lg');
        expect(el).toHaveClass('miever-avatar-square');
    });

    it('applies a custom numeric size as inline style', () => {
        const { container } = render(<Avatar size={80}>A</Avatar>);
        const el = container.querySelector('.miever-avatar') as HTMLElement;
        expect(el.style.width).toBe('80px');
        expect(el.style.height).toBe('80px');
    });
});
