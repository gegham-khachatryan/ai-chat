import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  preview: {
    port: 3100,
    host: true,
    strictPort: true
  },
  server: {
    port: 3100,
    host: true,
    strictPort: true,
    origin: 'http://0.0.0.0:3100'
  }
});
