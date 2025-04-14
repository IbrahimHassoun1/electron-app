import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
    alias: {
      electron: 'electron',
    }
  },
  define: {
    'process.env': {}}, // helps avoid some Vite/electron weirdness
    build: {
      rollupOptions: {
        external: ['electron', 'fs', 'path', 'os'], // 👈 mark Node modules as external
      },
      target: 'node14', // or current
    },
})
