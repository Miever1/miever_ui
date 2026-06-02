import React, {
    CSSProperties,
    forwardRef,
    useCallback,
    useMemo,
    useState,
} from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../../Utils/getPrefixCls';
import { ConfigContext, ThemeMode } from './context';
import { ConfigProviderProps } from './interface';

const prefixCls = getPrefixCls('config-provider');

/**
 * Scopes a theme and design-token overrides to its subtree, and exposes the
 * active theme through the {@link useTheme} hook.
 *
 * The wrapper carries a `data-theme` attribute, so the library's CSS custom
 * properties cascade to every descendant — wrap your whole app to theme it
 * globally, or wrap a section to retheme just that part. Per-token overrides
 * are applied as inline custom properties on the same element.
 *
 * ### Usage
 * ```jsx
 * import { ConfigProvider, useTheme } from 'miever_ui';
 *
 * <ConfigProvider defaultTheme="dark" tokens={{ '--color-border-focus': '#ff5c00' }}>
 *   <App />
 * </ConfigProvider>
 * ```
 */
const ConfigProvider = forwardRef<HTMLDivElement, ConfigProviderProps>(
    (
        {
            theme: controlledTheme,
            defaultTheme = 'light',
            onThemeChange,
            tokens,
            className,
            style,
            children,
            ...restProps
        },
        ref,
    ) => {
        const [uncontrolledTheme, setUncontrolledTheme] =
            useState<ThemeMode>(defaultTheme);

        const isControlled = controlledTheme !== undefined;
        const theme = isControlled ? controlledTheme : uncontrolledTheme;

        const setTheme = useCallback(
            (next: ThemeMode) => {
                if (!isControlled) {
                    setUncontrolledTheme(next);
                }
                onThemeChange?.(next);
            },
            [isControlled, onThemeChange],
        );

        const contextValue = useMemo(
            () => ({ theme, setTheme }),
            [theme, setTheme],
        );

        // Token overrides are plain CSS custom properties; merge them ahead of
        // any explicit inline styles so callers can still override.
        const mergedStyle = useMemo<CSSProperties>(
            () => ({ ...(tokens as CSSProperties | undefined), ...style }),
            [tokens, style],
        );

        return (
            <ConfigContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={classNames(prefixCls, className)}
                    data-theme={theme}
                    style={mergedStyle}
                    {...restProps}
                >
                    {children}
                </div>
            </ConfigContext.Provider>
        );
    },
);

ConfigProvider.displayName = 'ConfigProvider';

export default ConfigProvider;
