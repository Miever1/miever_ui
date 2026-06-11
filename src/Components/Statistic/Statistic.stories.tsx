import type { Meta, StoryObj } from '@storybook/react';
import Statistic from './Statistic';

const meta: Meta<typeof Statistic> = {
    title: 'Data Display/Statistic',
    component: Statistic,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Statistic displays a key figure with an optional label, prefix/suffix, color theme and trend indicator. Designed for KPI rows on dashboards.',
            },
        },
    },
    argTypes: {
        theme: {
            control: 'select',
            options: [undefined, 'primary', 'secondary', 'success', 'info', 'warning', 'danger'],
            description: 'Value color drawn from the design tokens.',
        },
        trend: {
            control: 'select',
            options: [undefined, 'up', 'down'],
            description: 'Direction arrow next to the trend value.',
        },
        precision: { control: 'number', description: 'Decimal places for numeric values.' },
        loading: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    },
    args: {
        title: 'Total Applications',
        value: 128,
    },
};

export default meta;
type Story = StoryObj<typeof Statistic>;

/** The default playground. Use the controls panel to explore every prop. */
export const Playground: Story = {};

/** Percentage with precision and a positive trend. */
export const WithTrend: Story = {
    args: {
        title: 'Response Rate',
        value: 32.456,
        precision: 1,
        suffix: '%',
        trend: 'up',
        trendValue: '+4.2% this week',
    },
};

/** Themed value color. */
export const Themed: Story = {
    args: { title: 'Rejections', value: 23, theme: 'danger' },
};

/** Loading skeleton. */
export const Loading: Story = {
    args: { loading: true },
};
