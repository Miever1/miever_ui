import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.tsx',  // This should be the entry point of your library
      name: 'MieverUI',  // This is the global variable for UMD/IIFE format
      fileName: (format) => `miever-ui.${format}.js`,
      formats: ['es', 'umd'],  // Including UMD format
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        // Define globals for UMD build where external imports are needed
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});