import { createContext, useContext } from 'react';

/** The two built-in color schemes. */
export type ThemeMode = 'light' | 'dark';

export interface ConfigContextValue {
    /** The currently active theme. */
    theme: ThemeMode;
    /** Switch the active theme (no-op outside a ConfigProvider). */
    setTheme: (theme: ThemeMode) => void;
}

export const ConfigContext = createContext<ConfigContextValue>({
    theme: 'light',
    setTheme: () => {
        /* no-op default — used when no ConfigProvider is mounted */
    },
});

/**
 * Read the active theme and a setter from the nearest {@link ConfigProvider}.
 *
 * @example
 * const { theme, setTheme } = useTheme();
 * <Switch checked={theme === 'dark'} onChange={(d) => setTheme(d ? 'dark' : 'light')} />
 */
export const useTheme = (): ConfigContextValue => useContext(ConfigContext);
