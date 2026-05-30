import { ReactNode } from 'react';

export type MessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';

export interface MessageOptions {
    /** Message content. */
    content: ReactNode;
    /** Auto-dismiss delay in milliseconds. Use 0 to keep it until closed. */
    duration?: number;
    /** Called when the message is removed. */
    onClose?: () => void;
}

export interface MessageItem extends Required<Pick<MessageOptions, 'content'>> {
    id: number;
    type: MessageType;
    duration: number;
    onClose?: () => void;
}

export type MessageInput = ReactNode | MessageOptions;

export interface MessageApi {
    success: (input: MessageInput, duration?: number) => () => void;
    info: (input: MessageInput, duration?: number) => () => void;
    warning: (input: MessageInput, duration?: number) => () => void;
    error: (input: MessageInput, duration?: number) => () => void;
    loading: (input: MessageInput, duration?: number) => () => void;
    /** Remove all visible messages. */
    destroy: () => void;
}
