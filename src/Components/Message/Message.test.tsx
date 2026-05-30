import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageNotice from './Message';
import { message } from './api';
import { MessageItem } from './interface';

const makeItem = (over: Partial<MessageItem> = {}): MessageItem => ({
    id: 1,
    type: 'success',
    content: 'Hello',
    duration: 3000,
    ...over,
});

describe('MessageNotice (presentational)', () => {
    it('renders content and the type class', () => {
        const { getByText, container } = render(<MessageNotice item={makeItem()} />);
        expect(getByText('Hello')).toBeInTheDocument();
        expect(container.querySelector('.miever-message-success')).toBeInTheDocument();
    });

    it('marks the loading icon as spinning', () => {
        const { container } = render(
            <MessageNotice item={makeItem({ type: 'loading', content: 'Loading' })} />
        );
        expect(container.querySelector('.miever-message-icon.spin')).toBeInTheDocument();
    });
});

describe('message API (integration)', () => {
    afterEach(async () => {
        message.destroy();
        await waitFor(() => {
            expect(document.body.textContent).not.toContain('Saved');
        });
    });

    it('mounts a portal and shows a success message', async () => {
        message.success('Saved');
        await waitFor(() => {
            expect(document.querySelector('.miever-message-root')).toBeInTheDocument();
            expect(document.body.textContent).toContain('Saved');
        });
    });

    it('auto-dismisses after the duration', async () => {
        message.info('Saved', 50);
        await waitFor(() => expect(document.body.textContent).toContain('Saved'));
        await waitFor(() => expect(document.body.textContent).not.toContain('Saved'), {
            timeout: 2000,
        });
    });

    it('returns a manual close function', async () => {
        const close = message.loading('Saved', 0);
        await waitFor(() => expect(document.body.textContent).toContain('Saved'));
        close();
        await waitFor(() => expect(document.body.textContent).not.toContain('Saved'));
    });
});
