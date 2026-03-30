import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/slides/%E3%83%A1%E3%82%B9%E3%82%AC%E3%82%AD%E3%81%A8%E5%AD%A6%E3%81%B6GitHub%E5%85%A5%E9%96%80%E8%AC%9B%E5%BA%A7/docs/',
  plugins: [react()],
  build: {
    outDir: '../docs',
  },
})
