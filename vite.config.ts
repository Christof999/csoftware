import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const prerenderEntry = path.resolve(__dirname, 'src/prerender.tsx')

/**
 * Nach Rolldown + vite-prerender-plugin bleibt der Node-Event-Loop mitunter aktiv —
 * `vite build` beendet dann nicht, bis extern ein Timeout greift (lokal z. B. hängendes
 * Terminal; auf Vercel: 45-Minuten-Build-Step-Limit). Sauberes Beenden nach dem Client-Build.
 */
function exitAfterProductionBuild(): Plugin {
  return {
    name: 'exit-after-production-build',
    apply: 'build',
    closeBundle: {
      order: 'post',
      sequential: true,
      handler() {
        setImmediate(() => process.exit(0))
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: prerenderEntry,
      additionalPrerenderRoutes: ['/ueber-uns', '/blog', '/blog-2'],
    }),
    exitAfterProductionBuild(),
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
