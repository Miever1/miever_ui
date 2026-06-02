import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { ThemeMode } from './context';

export interface ConfigProviderProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /**
     * Controlled theme. When provided, the provider reflects this value and
     * leaves state management to the parent.
     */
    theme?: ThemeMode;
    /**
     * Initial theme for uncontrolled usage.
     * @default 'light'
     */
    defaultTheme?: ThemeMode;
    /** Called whenever the active theme changes (uncontrolled or via setTheme). */
    onThemeChange?: (theme: ThemeMode) => void;
    /**
     * CSS custom-property overrides applied to the wrapper, letting you retheme
     * the subtree without touching SCSS, e.g.
     * `{ '--color-border-focus': '#ff5c00', '--radius-md': '0' }`.
     */
    tokens?: Record<`--${string}`, string>;
    /** Additional class on the wrapper element. */
    className?: string;
    /** Inline styles merged after the token overrides. */
    style?: CSSProperties;
    children?: ReactNode;
}
