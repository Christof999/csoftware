import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const prerenderEntry = path.resolve(__dirname, 'src/prerender.tsx')

/**
 * Nach Rolldown + vite-prerender-plugin bleibt der Node-Event-Loop mitunter aktiv —
 * `vite build` beendet dann nicht, bis extern ein Timeout greift (lokal z. B. hängendes
 * Terminal; auf Vercel: 45-Minuten-Build-Step-Limit). Sauberes Beenden nach dem Client-Build.
 */
/** Lokal: /api/blog wie auf Vercel (Firestore REST, ohne Client-SDK). */
function blogApiDevPlugin(): Plugin {
  return {
    name: 'blog-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url !== '/api/blog') return next()

        const env = loadEnv(server.config.mode, process.cwd(), '')
        for (const [key, value] of Object.entries(env)) {
          if (process.env[key] === undefined) process.env[key] = value
        }

        try {
          const { fetchBlogListFromFirestore, fetchBlogPostBySlugFromFirestore } =
            await import('./api/lib/blogFirestore.ts')

          const reqUrl = new URL(req.url ?? '/api/blog', 'http://localhost')
          const slug = reqUrl.searchParams.get('slug') ?? undefined

          res.setHeader('Content-Type', 'application/json; charset=utf-8')

          if (slug) {
            const post = await fetchBlogPostBySlugFromFirestore(slug)
            if (!post) {
              res.statusCode = 404
              res.end(JSON.stringify({ error: 'Beitrag nicht gefunden' }))
              return
            }
            res.end(JSON.stringify({ post }))
            return
          }

          const posts = await fetchBlogListFromFirestore()
          res.end(
            JSON.stringify({
              posts,
              generatedAt: new Date().toISOString(),
            }),
          )
        } catch (e) {
          res.statusCode = 500
          res.end(
            JSON.stringify({
              error: e instanceof Error ? e.message : 'Unbekannter Fehler',
            }),
          )
        }
      })
    },
  }
}

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
    blogApiDevPlugin(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: prerenderEntry,
      additionalPrerenderRoutes: ['/ueber-uns', '/blog'],
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
