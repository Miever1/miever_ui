import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ConfigProvider from './ConfigProvider';
import { useTheme } from './context';
import Button from '../Button/Button';
import Switch from '../Switch/Switch';

const meta: Meta<typeof ConfigProvider> = {
    title: 'Config/ConfigProvider',
    component: ConfigProvider,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'ConfigProvider scopes a theme and design-token overrides to its subtree. ' +
                    'It carries a `data-theme` attribute so the library CSS variables cascade to ' +
                    'every descendant, and exposes the active theme through the `useTheme` hook. ' +
                    'Per-token overrides are passed via the `tokens` prop as CSS custom properties.',
            },
        },
    },
    argTypes: {
        defaultTheme: { control: 'inline-radio', options: ['light', 'dark'] },
    },
};

export default meta;
type Story = StoryObj<typeof ConfigProvider>;

const Panel = () => (
    <div
        style={{
            padding: 24,
            background: 'var(--color-bg-secondary)',
            color: 'var(--color-text-primary)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            gap: 12,
            alignItems: 'center',
        }}
    >
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <span>Surface follows the scoped theme.</span>
    </div>
);

/** A self-contained dark island inside an otherwise light page. */
export const ScopedTheme: Story = {
    args: { defaultTheme: 'dark' },
    render: (args) => (
        <ConfigProvider {...args}>
            <Panel />
        </ConfigProvider>
    ),
};

/** Override individual design tokens for a subtree without touching SCSS. */
export const TokenOverrides: Story = {
    render: () => (
        <ConfigProvider tokens={{ '--color-border-focus': '#ff5c00', '--radius-lg': '0px' }}>
            <Panel />
        </ConfigProvider>
    ),
};

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span>useTheme(): {theme}</span>
            <Switch
                checked={theme === 'dark'}
                onChange={(dark) => setTheme(dark ? 'dark' : 'light')}
                checkedChildren="Dark"
                uncheckedChildren="Light"
            />
        </div>
    );
};

/** Drive the theme at runtime with the `useTheme` hook. */
export const UseThemeHook: Story = {
    render: () => (
        <ConfigProvider defaultTheme="light">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <ThemeToggle />
                <Panel />
            </div>
        </ConfigProvider>
    ),
};
