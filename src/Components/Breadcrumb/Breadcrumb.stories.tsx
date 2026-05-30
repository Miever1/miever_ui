import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
    title: 'Navigation/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: "Breadcrumb shows the current page's position within the site hierarchy.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/** A typical blog post path. */
export const Basic: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'Building a component library' },
        ],
    },
};

/** Custom separator. */
export const CustomSeparator: Story = {
    args: {
        separator: '›',
        items: [
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: 'miever_ui' },
        ],
    },
};
