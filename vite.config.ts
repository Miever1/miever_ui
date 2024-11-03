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
        if (format === 'es') {
          return 'esm/index.js';
        } else if (format === 'cjs') {
          return 'cjs/index.js';
        }
        return 'index.js';
      }
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'index.css';
          }
          return 'assets/[name][extname]';
        },
      }
    },
    cssCodeSplit: false,
  }
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist/vite',
//     lib: {
//       name: 'miever_ui',
//       entry: path.resolve(__dirname, 'src/index.tsx'),
//       formats: ['es', 'cjs'],
//       fileName: (format) => `index.${format}.js`,
//     },
//     rollupOptions: {
//       external: ['react', 'react-dom'],
//       output: {
//         globals: {
//                  react: 'React',
//                 'react-dom': 'ReactDOM'
//                },

//         entryFileNames: '[name].js',
//         assetFileNames: (assetInfo) => {
//           if (assetInfo.name === 'style.css') {
//             return 'index.css';
//           }
//           return 'assets/[name][extname]';
//         },
//       },
//     },
//     cssCodeSplit: false,
//   },
// });