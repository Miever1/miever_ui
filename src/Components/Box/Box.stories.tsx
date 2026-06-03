import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from './Box';

const meta: Meta<typeof Box> = {
    title: 'Layout/Box',
    component: Box,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Box is a low-level layout primitive. It renders a `div` with convenient flex and spacing props. Spacing values accept design tokens (`xs`–`xxxlg`), numbers (multiplied by 4px), or raw CSS lengths.',
            },
        },
    },
    argTypes: {
        flexBox: { control: 'boolean', description: 'Use a flex container.' },
        direction: {
            control: 'select',
            options: ['row', 'row-reverse', 'column', 'column-reverse'],
            description: 'Flex direction.',
        },
        justifyContent: {
            control: 'select',
            options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
            description: 'Main-axis alignment.',
        },
        alignItems: {
            control: 'select',
            options: ['stretch', 'flex-start', 'center', 'flex-end'],
            description: 'Cross-axis alignment.',
        },
        width: { control: 'text', description: 'Width (number → px, or CSS length).' },
        height: { control: 'text', description: 'Height (number → px, or CSS length).' },
        padding: { control: 'text', description: 'Padding (token, number, or CSS length).' },
    },
};

export default meta;
type Story = StoryObj<typeof Box>;

const surface: React.CSSProperties = {
    background: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border-primary)',
    borderRadius: 8,
    color: 'var(--color-text-primary)',
};

const tile = (i: number): React.CSSProperties => ({
    padding: 16,
    color: '#fff',
    borderRadius: 4,
    background: ['#0CC0DF', '#3B82F6', '#20c997'][i % 3],
});

/** A plain block-level box. */
export const Default: Story = {
    args: { width: 200, height: 100, padding: 'md' },
    render: (args) => (
        <Box {...args} style={surface}>
            This is a Box
        </Box>
    ),
};

/** Flex container centering its children. */
export const Flex: Story = {
    render: () => (
        <Box flexBox justifyContent="center" alignItems="center" padding="md" width="100%" height={160} style={surface}>
            {['One', 'Two', 'Three'].map((t, i) => (
                <Box key={t} padding="sm" style={{ ...tile(i), margin: '0 8px' }}>
                    {t}
                </Box>
            ))}
        </Box>
    ),
};

/** Padding scales from the spacing tokens. */
export const PaddingTokens: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(['xs', 'sm', 'md', 'lg', 'xlg'] as const).map((token) => (
                <Box key={token} padding={token} style={surface}>
                    padding=&quot;{token}&quot;
                </Box>
            ))}
        </div>
    ),
};
