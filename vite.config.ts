import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Enables opening dist/index.html directly via file://
  server: {
    host: true,
    port: 3000,
    open: false,
    allowedHosts: true,
  },
});
