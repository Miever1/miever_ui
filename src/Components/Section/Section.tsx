import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { Title, Text } from '../Typography/Typography';
import Divider from '../Divider';
import { SectionProps } from './interface';

const prefixCls = getPrefixCls('section');

/**
 * Section is a page block with an optional title, subtitle and divider — used
 * to give long pages (like a personal homepage) consistent vertical rhythm.
 *
 * ### Usage
 * ```jsx
 * import { Section } from 'miever_ui';
 *
 * <Section title="My Skills" subtitle="What I work with" align="center" divider>
 *   <SkillsGrid />
 * </Section>
 * ```
 */
const Section = forwardRef<HTMLElement, SectionProps>(({
    title,
    subtitle,
    align = 'left',
    titleLevel = 3,
    divider = false,
    children,
    className,
    style,
}, ref) => {
    const hasHeader = title !== undefined || subtitle !== undefined;

    return (
        <section ref={ref} className={classNames(prefixCls, className)} style={style}>
            {hasHeader && (
                <header className={`${prefixCls}-header`}>
                    {title !== undefined && (
                        <Title level={titleLevel} type="primary" align={align} className={`${prefixCls}-title`}>
                            {title}
                        </Title>
                    )}
                    {subtitle !== undefined && (
                        <Text type="secondary" align={align} className={`${prefixCls}-subtitle`}>
                            {subtitle}
                        </Text>
                    )}
                    {divider && <Divider />}
                </header>
            )}
            <div className={`${prefixCls}-body`}>{children}</div>
        </section>
    );
});

Section.displayName = 'Section';

export default Section;
