import packageJson from "./package.json";

import { defineConfig } from "vite";
import { sharedConfig } from "./vite.config";

export default defineConfig({
  ...sharedConfig,
  build: {
    outDir: "./dist/contentScripts",
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: false,
    lib: {
      entry: "src/contentScripts/index.tsx",
      name: packageJson.name,
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "index.global.js",
        extend: true,
      },
    },
  },
  plugins: [...sharedConfig.plugins!],
});
