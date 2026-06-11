import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

describe('Pagination Component', () => {
    it('renders the correct number of pages for a small total', () => {
        const { getByText } = render(<Pagination total={30} pageSize={10} />);
        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('2')).toBeInTheDocument();
        expect(getByText('3')).toBeInTheDocument();
    });

    it('marks the current page active', () => {
        const { getByText } = render(<Pagination total={30} pageSize={10} defaultCurrent={2} />);
        expect(getByText('2')).toHaveClass('active');
    });

    it('fires onChange when a page is clicked', () => {
        const onChange = jest.fn();
        const { getByText } = render(<Pagination total={30} pageSize={10} onChange={onChange} />);
        fireEvent.click(getByText('3'));
        expect(onChange).toHaveBeenCalledWith(3);
    });

    it('shows ellipsis for large page counts', () => {
        const { container } = render(<Pagination total={500} pageSize={10} defaultCurrent={6} />);
        expect(container.querySelectorAll('.miever-pagination-ellipsis').length).toBeGreaterThan(0);
    });

    it('disables prev on the first page', () => {
        const { container } = render(<Pagination total={30} pageSize={10} />);
        expect(container.querySelector('.miever-pagination-prev')).toHaveClass('disabled');
    });

    it('renders a page-size selector and reports changes', () => {
        const onPageSizeChange = jest.fn();
        render(
            <Pagination
                total={100}
                pageSize={10}
                pageSizeOptions={[10, 20, 50]}
                onPageSizeChange={onPageSizeChange}
            />
        );
        fireEvent.click(screen.getByText('10 / page'));
        fireEvent.click(screen.getByText('20 / page'));
        expect(onPageSizeChange).toHaveBeenCalledWith(20);
    });
});
