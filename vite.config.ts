import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Check for a specific component to build, or set it to null to build all components
const component = process.env.COMPONENT || null;

function getComponentEntries() {
  const componentsDir = path.resolve(__dirname, 'src/Components');
  const entries = {};

  if (component) {
    // Build only the specified component
    const entryPath = path.join(componentsDir, component, 'index.tsx');
    if (fs.existsSync(entryPath)) {
      entries[component] = entryPath;
    } else {
      console.warn(`Component ${component} not found at ${entryPath}`);
    }
  } else {
    // Build all components
    fs.readdirSync(componentsDir).forEach(name => {
      const entryPath = path.join(componentsDir, name, 'index.tsx');
      if (fs.existsSync(entryPath)) {
        entries[name] = entryPath;
      }
    });
  }

  return entries;
}

const entries = getComponentEntries();

// Define Vite configuration
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: entries,
      output: {
        entryFileNames: '[name]/index.js', // Each component will have its own folder with an index.js
        format: 'es'                       // Export as ES module
      },
      external: ['react', 'react-dom'],
    },
    lib: {
      entry: entries,
      name: component || 'Library',
      formats: ['es'],
      fileName: () => 'index.js'           // Use index.js for consistency in each component folder
    },
    outDir: 'dist',                        // Output all files to dist
    emptyOutDir: true
  }
});