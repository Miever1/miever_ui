import React, { useEffect } from 'react';
import type { Preview } from "@storybook/react";
import { themes } from '@storybook/theming';
import { addons } from '@storybook/preview-api';
import { DocsContainer } from './DocsContainer';

const channel = addons.getChannel();

const getThemeFromDOM = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const htmlClass = document.documentElement.className;
  return htmlClass.includes('dark');
};

const syncThemeToDataAttribute = () => {
  const isDark = getThemeFromDOM();
  const theme = isDark ? 'dark' : 'light';
  const backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
  
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  document.documentElement.style.backgroundColor = backgroundColor;
  document.body.style.backgroundColor = backgroundColor;
  
  const storyRoot = document.querySelector('#storybook-root');
  if (storyRoot) {
    storyRoot.setAttribute('data-theme', theme);
  }
  
  return isDark;
};

const ThemeWrapper = ({ children }) => {
  const [isDark, setIsDark] = React.useState(() => getThemeFromDOM());
  
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'class' &&
            mutation.target === document.documentElement) {
          
          const newIsDark = getThemeFromDOM();
          if (newIsDark !== isDark) {
            setIsDark(newIsDark);
            syncThemeToDataAttribute();
          }
        }
      });
    });
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    syncThemeToDataAttribute();
    
    return () => observer.disconnect();
  }, [isDark]);

  const theme = isDark ? 'dark' : 'light';
  return (
    <div data-theme={theme}>
      {children}
    </div>
  );
};

const withTheme = (StoryFn) => {
  return (
    <ThemeWrapper>
      <StoryFn />
    </ThemeWrapper>
  );
};

channel.on('DARK_MODE', () => {
  syncThemeToDataAttribute();
});

if (typeof window !== 'undefined') {
  syncThemeToDataAttribute();
  
  window.addEventListener('DOMContentLoaded', () => {
    syncThemeToDataAttribute();
  });
}

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    darkMode: {
      classTarget: 'html',
      current: getThemeFromDOM() ? 'dark' : 'light',
      dark: { ...themes.dark },
      light: { ...themes.light },
      stylePreview: true
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autodocs: true,
      container: DocsContainer
    },
    options: {
      storySort: {
        order: ['Welcome', '*'],
      },
    }
  },
};

export default preview;
