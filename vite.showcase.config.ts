import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'src/showcase'),
  // Not dist/ — that is the committed library build consumers install from GitHub.
  build: {
    outDir: resolve(__dirname, 'showcase-dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      'glass-design-system': resolve(__dirname, 'src/index.ts'),
    },
  },
});
