import React, { FunctionComponent, useContext } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { useBreakpoint } from '../../Utils/useBreakpoint';
import { BREAKPOINT_KEYS, Breakpoint } from '../../Designs/breakpoints';
import { RowContext } from './RowContext';
import { ColProps } from './interface';

const prefixCls = getPrefixCls('col');
const TOTAL_COLUMNS = 24;

/**
 * Col is a cell within a `Row`. `span` is out of 24, and can be overridden at
 * each breakpoint with the `xs`–`xxl` props.
 *
 * ### Usage
 * ```jsx
 * <Row gutter={16}>
 *   <Col span={24} md={12} lg={8}>responsive cell</Col>
 * </Row>
 * ```
 */
const Col: FunctionComponent<ColProps> = ({
    span = TOTAL_COLUMNS,
    offset = 0,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    children,
    className,
    style,
}) => {
    const { gutter } = useContext(RowContext);
    const { breakpoint } = useBreakpoint();

    // Resolve the effective span: start from the base `span`, then apply the
    // largest matching breakpoint override at or below the current width.
    const responsive: Record<Breakpoint, number | undefined> = { xs, sm, md, lg, xl, xxl };
    let effectiveSpan = span;
    for (const key of BREAKPOINT_KEYS) {
        if (responsive[key] !== undefined) {
            effectiveSpan = responsive[key] as number;
        }
        if (key === breakpoint) break;
    }

    const colStyle: React.CSSProperties = {
        flex: `0 0 ${(effectiveSpan / TOTAL_COLUMNS) * 100}%`,
        maxWidth: `${(effectiveSpan / TOTAL_COLUMNS) * 100}%`,
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
