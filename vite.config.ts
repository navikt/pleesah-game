import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: "/kubernetes/",
    server: {
      proxy: {
        "/kubernetes/api/havnesjef": {
          target: env.HAVNESJEF_URL || "http://localhost:8080",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => {
            const { searchParams } = new URL(path, "http://localhost");
            const team = encodeURIComponent(searchParams.get("team") ?? "");
            const hex = searchParams.get("hex");
            const hexParam = hex ? `?hex=${encodeURIComponent(hex)}` : "";
            return `/api/v1/team/${team}/create${hexParam}`;
          },
        },
      },
    },
  };
});
