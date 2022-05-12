import { defineConfig, UserConfig } from "vite";
import { relative, dirname, resolve } from "path";

import react from "@vitejs/plugin-react";

export const sharedConfig: UserConfig = {
  //root: 'src',
  resolve: {
    alias: [
      {
        //"~/": `${r("src")}/`,
        //"@": "src",
        find: "@",
        replacement: "/src",
      },
    ],
  },
  plugins: [
    react(),
    // https://github.com/antfu/unplugin-vue-components
    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`
        );
      },
    },
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  ...sharedConfig,
  plugins: [react()],
  build: {
    outDir: "./dist",
    emptyOutDir: false,
    sourcemap: false,
  },
});

//build: {
// rollupOptions: {
/* input: {
        main: "./index.html",
        nested: "./src/components/popup/Popup.tsx",
      }, */
/* output: {
        entryFileNames: chunkInfo => {
          return `${chunkInfo.name}.js`
        }
      }, */
// },
//  },
