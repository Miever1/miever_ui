import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Steps from './Steps';

const items = [{ title: 'One' }, { title: 'Two' }, { title: 'Three' }];

describe('Steps Component', () => {
    it('renders all steps', () => {
        const { getByText } = render(<Steps items={items} />);
        items.forEach(({ title }) => expect(getByText(title)).toBeInTheDocument());
    });

    it('marks previous, current and waiting steps', () => {
        const { container } = render(<Steps items={items} current={1} />);
        const steps = container.querySelectorAll('.miever-steps-item');
        expect(steps[0]).toHaveClass('miever-steps-item-finish');
        expect(steps[1]).toHaveClass('miever-steps-item-process');
        expect(steps[2]).toHaveClass('miever-steps-item-wait');
        expect(steps[1]).toHaveAttribute('aria-current', 'step');
    });

    it('applies the error status to the current step', () => {
        const { container } = render(<Steps items={items} current={2} status="error" />);
        const steps = container.querySelectorAll('.miever-steps-item');
        expect(steps[2]).toHaveClass('miever-steps-item-error');
    });

    it('supports vertical direction', () => {
        const { container } = render(<Steps items={items} direction="vertical" />);
        expect(container.querySelector('.miever-steps')).toHaveClass('miever-steps-vertical');
    });
});
