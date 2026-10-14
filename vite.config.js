import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set VITE_BASE_PATH to "/<repository-name>/" for GitHub Pages project sites.
// The default "./" uses relative asset paths and works from any sub-path.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/velvet-gallery/',
  plugins: [react()],
});
