import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/kubernetes/",
  server: {
    proxy: {
      "/kubernetes/api/havnesjef": {
        target: process.env.HAVNESJEF_URL || "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/kubernetes\/api\/havnesjef\/serviceRunning/, "/api/v1/service/status"),
      },
    },
  },
});
