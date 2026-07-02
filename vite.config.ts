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
            const { pathname, searchParams } = new URL(
              path,
              "http://localhost",
            );
            const team = encodeURIComponent(searchParams.get("team") ?? "");

            let rewritten;
            if (pathname.endsWith("/next-task")) {
              const task = encodeURIComponent(searchParams.get("task") ?? "");
              rewritten = `/api/v1/team/${team}/next-task?task=${task}`;
            } else if (pathname.endsWith("/serviceRunning")) {
              const service = encodeURIComponent(
                searchParams.get("service") ?? "",
              );
              rewritten = `/api/v1/service/status?team=${team}&service=${service}`;
            } else {
              const hex = searchParams.get("hex");
              const hexParam = hex ? `?hex=${encodeURIComponent(hex)}` : "";
              rewritten = `/api/v1/team/${team}/create${hexParam}`;
            }

            console.log(`[havnesjef-proxy] ${path} -> ${rewritten}`);
            return rewritten;
          },
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              console.log(
                `[havnesjef-proxy] -> ${proxyReq.method} ${env.HAVNESJEF_URL || "http://localhost:8080"}${proxyReq.path}`,
              );
            });
            proxy.on("proxyRes", (proxyRes, req) => {
              console.log(
                `[havnesjef-proxy] <- ${proxyRes.statusCode} ${req.method} ${req.url}`,
              );
            });
            proxy.on("error", (err, req) => {
              console.error(
                `[havnesjef-proxy] FEIL for ${req.method} ${req.url}:`,
                err.message,
              );
            });
          },
        },
      },
    },
  };
});
