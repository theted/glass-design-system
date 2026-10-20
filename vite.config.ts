import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs, so dist/glass.css points at dist/fonts/ wherever the
  // package is installed.
  base: './',
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/client'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'glass.css';
          if (assetInfo.name?.endsWith('.woff2')) return 'fonts/[name][extname]';
          return assetInfo.name ?? 'asset';
        },
      },
    },
    cssCodeSplit: false,
  },
});
