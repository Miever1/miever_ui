// .storybook/DocsContainer.js
import React, { useState, useEffect } from 'react';
import { DocsContainer as BaseContainer } from '@storybook/addon-docs';
import { themes } from '@storybook/theming';
import { addons } from '@storybook/preview-api';

export const DocsContainer = (props) => {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const channel = addons.getChannel();
    
    const handleThemeChange = (dark) => {
      setIsDark(dark);
    };
    
    const initialDark = localStorage.getItem('sb-addon-dark-mode') === 'true';
    setIsDark(initialDark);
    
    channel.on('DARK_MODE', handleThemeChange);
    
    return () => {
      channel.removeListener('DARK_MODE', handleThemeChange);
    };
  }, []);
  
  return (
    <BaseContainer
      {...props}
      theme={isDark ? themes.dark : themes.light}
    />
  );
};
