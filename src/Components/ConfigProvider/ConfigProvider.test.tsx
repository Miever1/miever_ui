import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ConfigProvider from './ConfigProvider';
import { useTheme } from './context';

const ThemeProbe = () => {
    const { theme, setTheme } = useTheme();
    return (
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            current:{theme}
        </button>
    );
};

describe('ConfigProvider', () => {
    it('renders children inside a themed wrapper', () => {
        render(
            <ConfigProvider data-testid="cp">
                <span>hello</span>
            </ConfigProvider>,
        );
        const wrapper = screen.getByTestId('cp');
        expect(wrapper).toHaveAttribute('data-theme', 'light');
        expect(wrapper).toHaveTextContent('hello');
    });

    it('reflects a controlled theme', () => {
        render(
            <ConfigProvider theme="dark" data-testid="cp">
                <ThemeProbe />
            </ConfigProvider>,
        );
        expect(screen.getByTestId('cp')).toHaveAttribute('data-theme', 'dark');
        expect(screen.getByRole('button')).toHaveTextContent('current:dark');
    });

    it('manages theme state when uncontrolled', () => {
        render(
            <ConfigProvider defaultTheme="light" data-testid="cp">
                <ThemeProbe />
            </ConfigProvider>,
        );
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByTestId('cp')).toHaveAttribute('data-theme', 'dark');
        expect(screen.getByRole('button')).toHaveTextContent('current:dark');
    });

    it('applies token overrides as inline custom properties', () => {
        render(
            <ConfigProvider
                data-testid="cp"
                tokens={{ '--color-border-focus': '#ff5c00' }}
            >
                <span>x</span>
            </ConfigProvider>,
        );
        expect(screen.getByTestId('cp').style.getPropertyValue('--color-border-focus')).toBe(
            '#ff5c00',
        );
    });

    it('fires onThemeChange', () => {
        const onThemeChange = jest.fn();
        render(
            <ConfigProvider onThemeChange={onThemeChange}>
                <ThemeProbe />
            </ConfigProvider>,
        );
        fireEvent.click(screen.getByRole('button'));
        expect(onThemeChange).toHaveBeenCalledWith('dark');
    });
});
