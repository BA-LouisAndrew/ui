/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"
import { defineConfig } from "vite"
import eslintPlugin from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: resolve(__dirname, "./src/components")
    }
  },
  plugins: [
    vue(),
    eslintPlugin(),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    coverage:{
      reporter:["text", "json", "html"] 
    }
  },
})
