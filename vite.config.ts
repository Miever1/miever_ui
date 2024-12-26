import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: 'dist/types',
      insertTypesEntry: true,
    })
  ] as Plugin[],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'miever_ui',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        return format === 'es' ? 'esm/index.js' : 'cjs/index.js';
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: (assetInfo) => {
          return assetInfo.name === 'style.css'
            ? 'index.css'
            : 'assets/[name][extname]';
        },
      }
    },
    cssCodeSplit: false,
  }
});