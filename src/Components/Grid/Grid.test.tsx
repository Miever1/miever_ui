import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Row from './Row';
import Col from './Col';

const setWidth = (width: number) => {
    (window as { innerWidth: number }).innerWidth = width;
    window.dispatchEvent(new Event('resize'));
};

describe('Grid (Row/Col)', () => {
    it('renders a row with columns', () => {
        const { container } = render(
            <Row gutter={16}>
                <Col span={12}>A</Col>
                <Col span={12}>B</Col>
            </Row>
        );
        expect(container.querySelector('.miever-row')).toBeInTheDocument();
        expect(container.querySelectorAll('.miever-col').length).toBe(2);
    });

    it('applies span as flex-basis percentage', () => {
        act(() => setWidth(1280));
        const { container } = render(
            <Row>
                <Col span={6}>A</Col>
            </Row>
        );
        const col = container.querySelector('.miever-col') as HTMLElement;
        expect(col.style.maxWidth).toBe('25%');
    });

    it('applies offset as a left margin percentage', () => {
        const { container } = render(
            <Row>
                <Col span={12} offset={6}>
                    A
                </Col>
            </Row>
        );
        const col = container.querySelector('.miever-col') as HTMLElement;
        expect(col.style.marginLeft).toBe('25%');
    });

    it('passes gutter to columns as padding', () => {
        const { container } = render(
            <Row gutter={16}>
                <Col span={12}>A</Col>
            </Row>
        );
        const col = container.querySelector('.miever-col') as HTMLElement;
        expect(col.style.paddingLeft).toBe('8px');
    });

    it('resolves responsive span by breakpoint', () => {
        // Desktop (xl): lg override (8/24) wins → 33.33%
        act(() => setWidth(1280));
        const { container, rerender } = render(
            <Row>
                <Col xs={24} md={12} lg={8}>
                    A
                </Col>
            </Row>
        );
        let col = container.querySelector('.miever-col') as HTMLElement;
        expect(col.style.maxWidth).toBe(`${(8 / 24) * 100}%`);

        // Phone (xs): base xs (24/24) → 100%
        act(() => setWidth(375));
        rerender(
            <Row>
                <Col xs={24} md={12} lg={8}>
                    A
                </Col>
            </Row>
        );
        col = container.querySelector('.miever-col') as HTMLElement;
        expect(col.style.maxWidth).toBe('100%');

        // Tablet (md): md override (12/24) → 50%
        act(() => setWidth(800));
        rerender(
            <Row>
                <Col xs={24} md={12} lg={8}>
                    A
                </Col>
            </Row>
        );
        col = container.querySelector('.miever-col') as HTMLElement;
        expect(col.style.maxWidth).toBe('50%');
    });
});
