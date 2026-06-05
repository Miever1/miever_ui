import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Box from './Box';

describe('Box Component', () => {
    it('renders a div with the base class and children', () => {
        const { getByText } = render(<Box>content</Box>);
        const node = getByText('content');
        expect(node).toBeInTheDocument();
        expect(node.tagName).toBe('DIV');
        expect(node).toHaveClass('miever-box');
    });

    it('merges a custom className', () => {
        const { getByText } = render(<Box className="extra">x</Box>);
        expect(getByText('x')).toHaveClass('miever-box', 'extra');
    });

    it('only sets display:flex when flexBox is enabled', () => {
        const { getByText, rerender } = render(
            <Box flexBox direction="column" justifyContent="center" alignItems="center">
                flex
            </Box>,
        );
        const node = getByText('flex');
        expect(node).toHaveStyle({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        });

        rerender(<Box>block</Box>);
        expect(getByText('block').style.display).toBe('');
    });

    it('resolves numeric width/height to pixels', () => {
        const { getByText } = render(
            <Box width={200} height={100}>
                size
            </Box>,
        );
        expect(getByText('size')).toHaveStyle({ width: '200px', height: '100px' });
    });

    it('passes through string dimensions verbatim', () => {
        const { getByText } = render(<Box width="50%">pct</Box>);
        expect(getByText('pct')).toHaveStyle({ width: '50%' });
    });

    it('resolves a numeric padding via the 4px scale', () => {
        const { getByText } = render(<Box padding={2}>pad</Box>);
        expect(getByText('pad')).toHaveStyle({ padding: '8px' });
    });

    it('applies paddingX / paddingY when padding is not set', () => {
        const { getByText } = render(
            <Box paddingX={3} paddingY={1}>
                axes
            </Box>,
        );
        expect(getByText('axes')).toHaveStyle({
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '4px',
            paddingBottom: '4px',
        });
    });

    it('spreads arbitrary props (role, id, data-*) onto the element', () => {
        const { getByRole } = render(
            <Box role="listbox" id="box-id" data-testid="box">
                spread
            </Box>,
        );
        const node = getByRole('listbox');
        expect(node).toHaveAttribute('id', 'box-id');
        expect(node).toHaveAttribute('data-testid', 'box');
    });

    it('forwards a ref to the root element', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Box ref={ref}>ref</Box>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});
