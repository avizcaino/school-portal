import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    ...(process.env.VITE_HOST && { host: process.env.VITE_HOST }),
  },
  plugins: [react()],
});
