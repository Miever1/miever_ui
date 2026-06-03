import React from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Icon from '../Icon';
import { MessageItem, MessageType } from './interface';

const prefixCls = getPrefixCls('message');

const ICON_MAP: Record<MessageType, string> = {
    success: 'circle-check',
    info: 'circle-info',
    warning: 'triangle-exclamation',
    error: 'circle-xmark',
    loading: 'spinner',
};

/** A single message notice. Rendered by the Message container. */
const MessageNotice: React.FC<{ item: MessageItem }> = ({ item }) => (
    <div className={classNames(`${prefixCls}-notice`, `${prefixCls}-${item.type}`)} role="status">
        <span className={classNames(`${prefixCls}-icon`, { spin: item.type === 'loading' })}>
            <Icon icon={ICON_MAP[item.type] as never} />
        </span>
        <span className={`${prefixCls}-content`}>{item.content}</span>
    </div>
);

MessageNotice.displayName = 'MessageNotice';

export default MessageNotice;
