import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => ({
  // GitHub Pages 部署在子路径下，构建时必须带 base，否则线上白屏
  base: command === 'build' ? '/yimeng-red-platform/' : '/',
  plugins: [vue()],
  server: {
    port: 5173,
    open: true
  }
}))
