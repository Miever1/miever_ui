import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import Icon from '../Icon';
import { EmptyProps } from './interface';

const prefixCls = getPrefixCls('empty');

/**
 * A placeholder for states with no data, with an optional call to action.
 *
 * ### Usage
 * ```jsx
 * import { Empty, Button } from 'miever_ui';
 *
 * <Empty description="Not enough data yet.">
 *     <Button type="primary">Add your first item</Button>
 * </Empty>
 * ```
 */
const Empty = forwardRef<HTMLDivElement, EmptyProps>(
    ({ icon = 'inbox', image, description = 'No data', children, className, style }, ref) => {
        return (
            <div ref={ref} className={classNames(prefixCls, className)} style={style}>
                <div className={`${prefixCls}-image`}>
                    {image ?? <Icon icon={icon} size="2x" />}
                </div>
                {description && <div className={`${prefixCls}-description`}>{description}</div>}
                {children && <div className={`${prefixCls}-footer`}>{children}</div>}
            </div>
        );
    },
);

Empty.displayName = 'Empty';

export default Empty;
