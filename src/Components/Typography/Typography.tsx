import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { LinkProps, ParagraphProps, TextProps, TitleProps } from './interface';

const prefixCls = getPrefixCls('typography');

type SharedFlags = Pick<
    TextProps,
    'type' | 'align' | 'strong' | 'italic' | 'delete' | 'underline' | 'disabled'
>;

const sharedClasses = (flags: SharedFlags) => ({
    [`${prefixCls}-${flags.type}`]: flags.type,
    [`${prefixCls}-align-${flags.align}`]: flags.align,
    [`${prefixCls}-strong`]: flags.strong,
    [`${prefixCls}-italic`]: flags.italic,
    [`${prefixCls}-delete`]: flags.delete,
    [`${prefixCls}-underline`]: flags.underline,
    [`${prefixCls}-disabled`]: flags.disabled,
});

/** A heading (h1–h5). */
const Title = forwardRef<HTMLHeadingElement, TitleProps>(({
    level = 1,
    type,
    align,
    italic,
    delete: del,
    underline,
    disabled,
    children,
    className,
    style,
}, ref) => {
    const Tag = `h${level}` as React.ElementType;
    const classes = classNames(
        prefixCls,
        `${prefixCls}-title`,
        className,
        sharedClasses({ type, align, italic, delete: del, underline, disabled })
    );
    return (
        <Tag ref={ref} className={classes} style={style}>
            {children}
        </Tag>
    );
});
Title.displayName = 'Typography.Title';

/** Inline text. */
const Text = forwardRef<HTMLSpanElement, TextProps>(({
    type,
    align,
    strong,
    italic,
    delete: del,
    underline,
    disabled,
    children,
    className,
    style,
}, ref) => {
    const classes = classNames(
        prefixCls,
        `${prefixCls}-text`,
        className,
        sharedClasses({ type, align, strong, italic, delete: del, underline, disabled })
    );
    return (
        <span ref={ref} className={classes} style={style}>
            {children}
        </span>
    );
});
Text.displayName = 'Typography.Text';

/** A block of text. */
const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({
    type,
    align,
    strong,
    italic,
    delete: del,
    underline,
    disabled,
    children,
    className,
    style,
}, ref) => {
    const classes = classNames(
        prefixCls,
        `${prefixCls}-paragraph`,
        className,
        sharedClasses({ type, align, strong, italic, delete: del, underline, disabled })
    );
    return (
        <p ref={ref} className={classes} style={style}>
            {children}
        </p>
    );
});
Paragraph.displayName = 'Typography.Paragraph';

/** An anchor styled to match the typography scale. */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
    type,
    align,
    strong,
    italic,
    delete: del,
    underline,
    disabled,
    children,
    className,
    style,
    ...restProps
}, ref) => {
    const classes = classNames(
        prefixCls,
        `${prefixCls}-link`,
        className,
        sharedClasses({ type, align, strong, italic, delete: del, underline, disabled })
    );
    return (
        <a
            ref={ref}
            className={classes}
            style={style}
            aria-disabled={disabled}
            {...restProps}
        >
            {children}
        </a>
    );
});
Link.displayName = 'Typography.Link';

const Typography = { Title, Text, Paragraph, Link };

export { Title, Text, Paragraph, Link };
export default Typography;
