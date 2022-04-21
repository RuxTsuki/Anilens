import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        nested: "./src/components/popup/Popup.tsx",
      },
      /* output: {
        entryFileNames: chunkInfo => {
          return `${chunkInfo.name}.js`
        }
      }, */
    },
  },
});
