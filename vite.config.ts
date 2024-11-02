// Example of dynamically setting the entry based on an environment variable
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const component = process.env.COMPONENT;  // Set this environment variable in your script

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: `src/${component}.tsx`,
      name: component,
      fileName: (format) => `${component}.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});