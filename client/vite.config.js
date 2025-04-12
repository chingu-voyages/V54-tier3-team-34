import process from "node:process";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(function ({ mode }) {
  const devConfig = {};

  if (mode == "development") {
    const { SERVER_PORT } = loadEnv(mode, process.cwd(), "");
    devConfig.server = {
      proxy: { "/api/v1": { target: `http://localhost:${SERVER_PORT}/` } },
    };
  }

  return { plugins: [react(), tailwindcss()], ...devConfig };
});
