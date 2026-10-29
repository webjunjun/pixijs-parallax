import { defineConfig } from 'vite'

// base './'：构建产物用相对路径，GitHub Pages 子路径（/pixijs-parallax/）下也能正常加载
export default defineConfig({
  base: './',
})
