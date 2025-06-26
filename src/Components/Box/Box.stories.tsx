import React, { useState, useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Box from './Box';
import { BoxProps } from './interface';

const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  });

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'data-theme' &&
            mutation.target === document.documentElement) {
          const newIsDark = document.documentElement.getAttribute('data-theme') === 'dark';
          setIsDark(newIsDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
};

const getThemeStyles = (isDark: boolean) => {
  return {
    container: {
      background: isDark ? '#2a2a2a' : '#f9f9f9',
      border: `1px solid ${isDark ? '#404040' : '#ccc'}`,
      color: isDark ? '#ffffff' : '#000000',
      borderRadius: '8px',
      boxShadow: isDark 
        ? '0 2px 5px rgba(0, 0, 0, 0.3)' 
        : '0 2px 5px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    },
    flexContainer: {
      background: isDark ? '#1e1e1e' : '#f0f0f0',
      border: `2px dashed ${isDark ? '#555' : '#ddd'}`,
      borderRadius: '8px',
      boxShadow: isDark 
        ? '0 4px 12px rgba(0, 0, 0, 0.4)' 
        : '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    },
    child: (index: number) => {
      const colors = ['#0CC0DF', '#12aa9c', '#20c997'];
      return {
        background: colors[index % colors.length],
        padding: '16px',
        color: '#fff',
        borderRadius: '4px',
        boxShadow: isDark 
          ? '0px 4px 10px rgba(0, 0, 0, 0.3)' 
          : '0px 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
      };
    },
    paddingExample: {
      background: isDark ? '#2a2a2a' : '#f9f9f9',
      border: `1px solid ${isDark ? '#404040' : '#ddd'}`,
      color: isDark ? '#ffffff' : '#000000',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
    },
    dynamicContainer: {
      background: isDark ? '#1a2332' : '#e6f7ff',
      border: `1px solid ${isDark ? '#2d3748' : '#91d5ff'}`,
      borderRadius: '8px',
      boxShadow: isDark 
        ? '0px 4px 12px rgba(0, 0, 0, 0.4)' 
        : '0px 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    },
  };
};

export default {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    flexBox: {
      control: { type: 'boolean' },
      description: 'If true, the box will behave as a flex container.',
    },
    direction: {
      control: { type: 'select' },
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: 'Defines the direction of the flex container (e.g., "row", "column").',
    },
    justifyContent: {
      control: { type: 'select' },
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
      description: 'Aligns items along the main axis (e.g., "flex-start", "center").',
    },
    alignItems: {
      control: { type: 'select' },
      options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
      description: 'Aligns items along the cross axis (e.g., "stretch", "center").',
    },
    width: {
      control: { type: 'text' },
      description: 'Specifies the width of the box (e.g., "100%", "200px").',
    },
    height: {
      control: { type: 'text' },
      description: 'Specifies the height of the box (e.g., "100px", "auto").',
    },
    padding: {
      control: { type: 'text' },
      description: 'Sets the padding of the box (e.g., "sm", "md", "lg").',
    },
    paddingX: {
      control: { type: 'text' },
      description: 'Sets the horizontal padding (left and right).',
    },
    paddingY: {
      control: { type: 'text' },
      description: 'Sets the vertical padding (top and bottom).',
    },
    className: {
      control: { type: 'text' },
      description: 'Custom class names for styling.',
    },
    style: {
      control: 'object',
      description: 'Additional inline styles for customization.',
    },
  },
} as Meta;

// Default Template
const Template: StoryFn<BoxProps> = (args) => {
  const isDark = useTheme();
  const styles = getThemeStyles(isDark);
  
  return (
    <Box 
      {...args} 
      style={{
        ...styles.container,
        ...args.style,
      }}
    >
      This is a Box
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  width: '200px',
  height: '100px',
  padding: '16px',
};

// Flexbox Example with Theme Support
export const FlexboxExample = () => {
  const isDark = useTheme();
  const styles = getThemeStyles(isDark);
  
  return (
    <Box
      flexBox
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{
        width: '100%',
        height: '200px',
        padding: '16px',
        ...styles.flexContainer,
      }}
    >
      {['Child 1', 'Child 2', 'Child 3'].map((text, index) => (
        <Box
          key={index}
          style={{
            ...styles.child(index),
            margin: '0 8px',
          }}
        >
          {text}
        </Box>
      ))}
    </Box>
  );
};
FlexboxExample.storyName = 'Flexbox Layout Example';

// Padding Variations with Theme Support
export const PaddingVariations = () => {
  const isDark = useTheme();
  const styles = getThemeStyles(isDark);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {['xs', 'sm', 'lg'].map((size) => (
        <Box 
          key={size}
          padding={size} 
          style={styles.paddingExample}
        >
          Padding {size.toUpperCase()}
        </Box>
      ))}
    </div>
  );
};
PaddingVariations.storyName = 'Padding Variations';

// Dynamic Flexbox with Theme Support
export const DynamicFlexbox = () => {
  const isDark = useTheme();
  const styles = getThemeStyles(isDark);
  
  return (
    <Box
      flexBox
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      height="150px"
      style={{
        padding: '16px',
        ...styles.dynamicContainer,
      }}
    >
      {[0, 1, 2].map((index) => (
        <Box 
          key={index}
          style={{ 
            width: '50px', 
            height: '50px', 
            ...styles.child(index),
            margin: 0,
            padding: 0,
          }} 
        />
      ))}
    </Box>
  );
};
DynamicFlexbox.storyName = 'Dynamic Flexbox Example';
