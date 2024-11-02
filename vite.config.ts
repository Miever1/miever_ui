import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.tsx', // Your library entry file
      name: 'MieverUI', // Your library name
      fileName: (format) => `miever-ui.${format}.js`, // Output file name
      formats: ['es', 'umd'], // Output formats
    },
    rollupOptions: {
      // External dependencies that shouldn't be bundled into your library
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  optimizeDeps: {
    include: ['storybook'], // Include Storybook dependencies if required
  },
  resolve: {
    alias: {
      // Add any path aliases if needed
      // '@components': '/src/components',
      // '@utils': '/src/utils',
    },
  },
  root: './', // Set root if necessary
  mode: process.env.NODE_ENV || 'development', // Set the environment mode
});