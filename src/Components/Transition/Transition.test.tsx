import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Transition from './Transition';

describe('Transition Component', () => {
    it('renders children while `in` is true', () => {
        render(
            <Transition in timeout={200} animation="zoom-in-top">
                <div>visible</div>
            </Transition>,
        );
        expect(screen.getByText('visible')).toBeInTheDocument();
    });

    it('unmounts children when `in` is false and unmountOnExit is set', () => {
        render(
            <Transition in={false} timeout={200} animation="zoom-in-top" unmountOnExit>
                <div>hidden</div>
            </Transition>,
        );
        expect(screen.queryByText('hidden')).not.toBeInTheDocument();
    });

    it('wraps children in a Box when wrapper is true', () => {
        const { container } = render(
            <Transition in wrapper timeout={200} animation="zoom-in-top">
                <span>wrapped</span>
            </Transition>,
        );
        const box = container.querySelector('.miever-box');
        expect(box).toBeInTheDocument();
        expect(box).toHaveTextContent('wrapped');
    });
});
