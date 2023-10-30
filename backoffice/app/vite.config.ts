import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4173,
    ...(process.env.VITE_HOST && {host: process.env.VITE_HOST}),
  },
  plugins: [react()],
});
