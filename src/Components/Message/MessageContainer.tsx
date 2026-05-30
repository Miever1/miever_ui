import React, { useEffect, useState } from 'react';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import MessageNotice from './Message';
import { MessageItem } from './interface';

const prefixCls = getPrefixCls('message');

export interface MessageContainerHandle {
    add: (item: MessageItem) => void;
    remove: (id: number) => void;
    clear: () => void;
}

interface MessageContainerProps {
    onReady: (handle: MessageContainerHandle) => void;
}

/** The portal-mounted container that renders and manages the message stack. */
const MessageContainer: React.FC<MessageContainerProps> = ({ onReady }) => {
    const [items, setItems] = useState<MessageItem[]>([]);

    useEffect(() => {
        onReady({
            add: (item) => setItems((prev) => [...prev, item]),
            remove: (id) =>
                setItems((prev) => {
                    const target = prev.find((i) => i.id === id);
                    target?.onClose?.();
                    return prev.filter((i) => i.id !== id);
                }),
            clear: () => setItems([]),
        });
        // onReady is stable (set once by the singleton). Intentionally run once.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`${prefixCls}`}>
            {items.map((item) => (
                <MessageNotice key={item.id} item={item} />
            ))}
        </div>
    );
};

MessageContainer.displayName = 'MessageContainer';

export default MessageContainer;
