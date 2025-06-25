import type { Preview } from "@storybook/react";
import { themes } from '@storybook/theming';
import { addons } from '@storybook/preview-api';
import { DocsContainer } from './DocsContainer';

const channel = addons.getChannel();

// Set background color for both body and document element
const setBackgroundColor = (isDark: boolean) => {
  const backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
  document.body.style.backgroundColor = backgroundColor;
  document.documentElement.style.backgroundColor = backgroundColor;
};

// Get current dark mode state from localStorage
const getCurrentDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('sb-addon-dark-mode') === 'true';
};

// Listen for dark mode toggle events
channel.on('DARK_MODE', (isDark: boolean) => {
  setBackgroundColor(isDark);
});

// Initialize background color on page load
if (typeof window !== 'undefined') {
  // Delay execution to ensure DOM is loaded
  window.addEventListener('DOMContentLoaded', () => {
    const isDark = getCurrentDarkMode();
    setBackgroundColor(isDark);
  });
}

const preview: Preview = {
  parameters: {
    // Configure storybook-dark-mode plugin
    darkMode: {
      classTarget: 'html',
      current: 'light',
      dark: { ...themes.dark },
      light: { ...themes.light },
      stylePreview: true
    },
    // Configure controls addon for component props
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Configure documentation settings
    docs: {
      autodocs: true,
      container: DocsContainer // Use custom docs container for theme switching
    },
    // Configure story sorting in sidebar
    options: {
      storySort: {
        order: ['Welcome', '*'],
      },
    }
  },
};

export default preview;
