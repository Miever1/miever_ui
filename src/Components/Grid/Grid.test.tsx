import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Row from './Row';
import Col from './Col';

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
});
