import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import svgLoader from "vite-svg-loader";
import Checker from "vite-plugin-checker";

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
