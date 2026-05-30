import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Row from './Row';
import Col from './Col';

const meta: Meta<typeof Row> = {
    title: 'Layout/Grid',
    component: Row,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A 24-column flexbox grid. `Row` is the container (with `gutter`, `justify`, `align`); `Col` is a cell with a `span` out of 24 and optional `offset`.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Row>;

const cell: React.CSSProperties = {
    background: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border-primary)',
    borderRadius: 4,
    padding: 12,
    textAlign: 'center',
};

/** Equal columns with a gutter. */
export const Basic: Story = {
    render: () => (
        <Row gutter={16}>
            <Col span={8}>
                <div style={cell}>span 8</div>
            </Col>
            <Col span={8}>
                <div style={cell}>span 8</div>
            </Col>
            <Col span={8}>
                <div style={cell}>span 8</div>
            </Col>
        </Row>
    ),
};

/** Offset columns. */
export const Offset: Story = {
    render: () => (
        <Row gutter={16}>
            <Col span={8}>
                <div style={cell}>span 8</div>
            </Col>
            <Col span={8} offset={8}>
                <div style={cell}>span 8, offset 8</div>
            </Col>
        </Row>
    ),
};

/** Justify and align. */
export const Alignment: Story = {
    render: () => (
        <Row gutter={16} justify="space-between" align="middle">
            <Col span={6}>
                <div style={{ ...cell, height: 40 }}>6</div>
            </Col>
            <Col span={6}>
                <div style={{ ...cell, height: 80 }}>6 (taller)</div>
            </Col>
            <Col span={6}>
                <div style={{ ...cell, height: 40 }}>6</div>
            </Col>
        </Row>
    ),
};
