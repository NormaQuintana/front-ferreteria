import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/validar': {
        target: 'http://localhost:7890',
        changeOrigin: true,
        secure: false,
      },
    },
    port: 5173,
    host: "0.0.0.0",
  },
});



