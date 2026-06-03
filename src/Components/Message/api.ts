import React from 'react';
import { createRoot, Root } from 'react-dom/client';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import MessageContainer, { MessageContainerHandle } from './MessageContainer';
import { MessageApi, MessageInput, MessageItem, MessageOptions, MessageType } from './interface';

const prefixCls = getPrefixCls('message');

let handle: MessageContainerHandle | null = null;
let root: Root | null = null;
let seed = 0;

const ensureContainer = () => {
    if (handle || typeof document === 'undefined') return;
    const mount = document.createElement('div');
    mount.className = `${prefixCls}-root`;
    document.body.appendChild(mount);
    root = createRoot(mount);
    root.render(
        React.createElement(MessageContainer, {
            onReady: (h: MessageContainerHandle) => {
                handle = h;
            },
        })
    );
};

const isMessageOptions = (input: MessageInput): input is MessageOptions =>
    typeof input === 'object' && input !== null && 'content' in input;

const normalize = (input: MessageInput, duration?: number): MessageOptions =>
    isMessageOptions(input) ? input : { content: input, duration };

const open = (type: MessageType, input: MessageInput, duration?: number): (() => void) => {
    ensureContainer();
    const opts = normalize(input, duration);
    const id = ++seed;
    const resolvedDuration = opts.duration ?? (type === 'loading' ? 0 : 3000);
    const item: MessageItem = {
        id,
        type,
        content: opts.content,
        duration: resolvedDuration,
        onClose: opts.onClose,
    };

    // Defer until the container handle is ready (first call mounts it async).
    const push = () => {
        if (!handle) {
            setTimeout(push, 16);
            return;
        }
        handle.add(item);
        if (resolvedDuration > 0) {
            setTimeout(() => handle?.remove(id), resolvedDuration);
        }
    };
    push();

    return () => handle?.remove(id);
};

export const message: MessageApi = {
    success: (input, duration) => open('success', input, duration),
    info: (input, duration) => open('info', input, duration),
    warning: (input, duration) => open('warning', input, duration),
    error: (input, duration) => open('error', input, duration),
    loading: (input, duration) => open('loading', input, duration),
    destroy: () => handle?.clear(),
};

export default message;
