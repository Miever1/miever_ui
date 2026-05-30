import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { RowContext } from './RowContext';
import { RowProps } from './interface';

const prefixCls = getPrefixCls('row');

const JUSTIFY_MAP: Record<string, string> = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    'space-between': 'space-between',
    'space-around': 'space-around',
};

const ALIGN_MAP: Record<string, string> = {
    top: 'flex-start',
    middle: 'center',
    bottom: 'flex-end',
    stretch: 'stretch',
};

/**
 * Row is a 24-column flexbox grid container. Pair it with `Col`.
 *
 * ### Usage
 * ```jsx
 * import { Row, Col } from 'miever_ui';
 *
 * <Row gutter={16}>
 *   <Col span={12}>Left</Col>
 *   <Col span={12}>Right</Col>
 * </Row>
 * ```
 */
const Row: FunctionComponent<RowProps> = ({
    gutter = 0,
    justify,
    align,
    wrap = true,
    children,
    className,
    style,
}) => {
    const rowStyle: React.CSSProperties = {
        justifyContent: justify ? JUSTIFY_MAP[justify] : undefined,
        alignItems: align ? ALIGN_MAP[align] : undefined,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        marginLeft: gutter ? -gutter / 2 : undefined,
        marginRight: gutter ? -gutter / 2 : undefined,
        rowGap: gutter || undefined,
        ...style,
    };

    return (
        <RowContext.Provider value={{ gutter }}>
            <div className={classNames(prefixCls, className)} style={rowStyle}>
                {children}
            </div>
        </RowContext.Provider>
    );
};

Row.displayName = 'Row';

export default Row;
