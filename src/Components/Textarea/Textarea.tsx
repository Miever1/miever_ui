import React, { forwardRef, useId } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { NativeTextareaProps } from './interface';

const prefixCls = getPrefixCls('textarea');

/**
 * A multi-line text field for collecting longer user input.
 * Forwards its ref to the underlying `<textarea>` element.
 *
 * ### Usage
 * ```jsx
 * import { Textarea } from 'miever_ui';
 *
 * <Textarea label="Notes" rows={6} placeholder="Paste text here…" />
 * ```
 */
const Textarea = forwardRef<HTMLTextAreaElement, NativeTextareaProps>(
    ({ className, disabled, style, label, resizable = true, id, rows = 4, ...restProps }, ref) => {
        const generatedId = useId();
        const textareaId = id ?? (label ? generatedId : undefined);

        const field = (
            <textarea
                ref={ref}
                id={textareaId}
                rows={rows}
                disabled={disabled}
                className={classNames(`${prefixCls}-inner`, !label && className, {
                    [`${prefixCls}-no-resize`]: !resizable,
                    disabled,
                })}
                style={label ? undefined : style}
                {...restProps}
            />
        );

        if (!label) return field;

        return (
            <div className={classNames(`${prefixCls}-field`, className)} style={style}>
                <label className={`${prefixCls}-label`} htmlFor={textareaId}>
                    {label}
                </label>
                {field}
            </div>
        );
    },
);

Textarea.displayName = 'Textarea';

export default Textarea;
