import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const prerenderEntry = path.resolve(__dirname, 'src/prerender.tsx')

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: prerenderEntry,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        /** react-router in eigenem Chunk, damit Client nicht den Prerender-Entry (react-dom/server) mitlädt. */
        manualChunks(id) {
          const norm = id.split(path.sep).join('/')
          if (
            norm.includes('node_modules/react-router/') &&
            !norm.includes('node_modules/react-router-dom/')
          ) {
            return 'react-router'
          }
          return undefined
        },
      },
    },
  },
})
