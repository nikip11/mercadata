import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import svgLoader from "vite-svg-loader";
import Checker from "vite-plugin-checker";
import pkg from "./package.json";

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    Checker({
      typescript: true,
      vueTsc: true,
      enableBuild: true,
      overlay: {
        initialIsOpen: false,
      },
    }),
  ],
  define: {
    "import.meta.env.VITE_APP_NAME": JSON.stringify(pkg.name),
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(pkg.version),
    "import.meta.env.VITE_APP_DESCRIPTION": JSON.stringify(pkg.description),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});
