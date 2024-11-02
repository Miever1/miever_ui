import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),  // Set the main entry point
      name: 'miever_ui',
      fileName: (format) => `index.${format}.js`,       // Output file name
      formats: ['es', 'cjs']                            // Output as ES and CommonJS modules
    },
    rollupOptions: {
      external: ['react', 'react-dom'],                 // Treat `react` and `react-dom` as external dependencies
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    outDir: 'dist',                                     // Output directory
    emptyOutDir: true                                   // Clean the output directory before building
  }
});