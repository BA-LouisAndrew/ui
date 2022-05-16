import vue from "@vitejs/plugin-vue"
  import { NaiveUiResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"
import { defineConfig } from "vite"
import eslintPlugin from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin(), Components({
    resolvers: [NaiveUiResolver()]
  })],
})