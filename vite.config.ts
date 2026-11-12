import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: 'https://Kukoleva.github.io/remont/',
  plugins: [react(), tailwindcss()],
})
