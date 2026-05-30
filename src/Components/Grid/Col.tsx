import React, { FunctionComponent, useContext } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { RowContext } from './RowContext';
import { ColProps } from './interface';

const prefixCls = getPrefixCls('col');
const TOTAL_COLUMNS = 24;

/**
 * Col is a cell within a `Row`. `span` is out of 24.
 *
 * ### Usage
 * ```jsx
 * <Row gutter={16}>
 *   <Col span={8}>1/3</Col>
 *   <Col span={16}>2/3</Col>
 * </Row>
 * ```
 */
const Col: FunctionComponent<ColProps> = ({
    span = TOTAL_COLUMNS,
    offset = 0,
    children,
    className,
    style,
}) => {
    const { gutter } = useContext(RowContext);

    const colStyle: React.CSSProperties = {
        flex: `0 0 ${(span / TOTAL_COLUMNS) * 100}%`,
        maxWidth: `${(span / TOTAL_COLUMNS) * 100}%`,
        marginLeft: offset ? `${(offset / TOTAL_COLUMNS) * 100}%` : undefined,
        paddingLeft: gutter ? gutter / 2 : undefined,
        paddingRight: gutter ? gutter / 2 : undefined,
        ...style,
    };

    return (
        <div className={classNames(prefixCls, className)} style={colStyle}>
            {children}
        </div>
    );
};

Col.displayName = 'Col';

export default Col;
