import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Alias shadcn-style "@/..." -> "src/..." (relative imports tetap berfungsi)
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
