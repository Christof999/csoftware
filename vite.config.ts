import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const prerenderEntry = path.resolve(__dirname, 'src/prerender.tsx')
/** Von scripts/generate-blog-manifest.mjs vor `vite build` geschrieben. */
const blogPrerenderDataPath = path.resolve(__dirname, '.blog-prerender.json')

type BlogPrerenderPost = {
  id: string
  slug: string
  title: string
  metaDescription?: string
  publishedAt: string
  content?: string
}

function readBlogPrerenderPosts(): BlogPrerenderPost[] {
  if (!existsSync(blogPrerenderDataPath)) return []
  try {
    const raw: unknown = JSON.parse(readFileSync(blogPrerenderDataPath, 'utf-8'))
    const posts = (raw as { posts?: unknown })?.posts
    if (!Array.isArray(posts)) return []
    return posts.filter(
      (p): p is BlogPrerenderPost =>
        typeof (p as BlogPrerenderPost)?.slug === 'string' &&
        (p as BlogPrerenderPost).slug.length > 0,
    )
  } catch {
    return []
  }
}

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

const BLOG_DATA_ID = 'virtual:blog-prerender-data'
const BLOG_DATA_RESOLVED = '\0virtual:blog-prerender-data'

/** Stellt die Build-Zeit-Blogdaten ausschließlich dem Prerender-Entry bereit. */
function blogPrerenderDataPlugin(): Plugin {
  return {
    name: 'blog-prerender-data',
    resolveId(id) {
      return id === BLOG_DATA_ID ? BLOG_DATA_RESOLVED : undefined
    },
    load(id) {
      if (id !== BLOG_DATA_RESOLVED) return undefined
      return `export const posts = ${JSON.stringify(readBlogPrerenderPosts())}\n`
    },
  }
}

/**
 * Erzeugt `dist/app.html` als SPA-Fallback (vercel.json → rewrites).
 *
 * Ohne diese Datei liefert Vercel für jede nicht vorgerenderte URL die
 * Startseite `index.html` aus — inklusive deren `<link rel="canonical">` auf
 * `/`. Google wertet solche Seiten dann als „Alternative Seite mit richtigem
 * kanonischem Tag“ und indexiert sie nicht. Das Shell-HTML enthält deshalb
 * weder Canonical noch Startseiten-Meta/-Inhalt; Titel, Description und
 * Canonical setzt die App zur Laufzeit.
 *
 * Bewusst **kein** noindex: Beiträge, die nach dem letzten Build in Firestore
 * erscheinen, werden über diesen Fallback ausgeliefert und müssen indexierbar
 * bleiben.
 */
function spaFallbackShellPlugin(): Plugin {
  return {
    name: 'spa-fallback-shell',
    apply: 'build',
    closeBundle: {
      sequential: true,
      handler() {
        const outDir = path.resolve(__dirname, 'dist')
        const indexPath = path.join(outDir, 'index.html')
        if (!existsSync(indexPath)) return

        const source = readFileSync(indexPath, 'utf-8')
        const headEnd = source.indexOf('</head>')
        const bodyStart = source.indexOf('<body')
        if (headEnd === -1 || bodyStart === -1) {
          throw new Error('[spa-fallback-shell] Unerwartetes index.html (head/body fehlt).')
        }

        // Genau die Tags entfernen, die buildPrerenderHeadElements() pro Route
        // anhängt. Asset-Tags (script/modulepreload/stylesheet), Favicon,
        // Viewport und theme-color bleiben unangetastet.
        const head = source
          .slice(0, headEnd)
          .replace(/[ \t]*<meta\s+name="(description|robots|twitter:[^"]*)"[^>]*>\n?/g, '')
          .replace(/[ \t]*<meta\s+property="og:[^"]*"[^>]*>\n?/g, '')
          .replace(/[ \t]*<link\s+rel="canonical"[^>]*>\n?/g, '')
          .replace(
            /[ \t]*<script\s+type="application\/ld\+json"[\s\S]*?<\/script>\n?/g,
            '',
          )
          .replace(/<title>[\s\S]*?<\/title>/, '<title>SØRGEL-design</title>')

        const body = source.slice(bodyStart)
        const rootStart = body.indexOf('<div id="root">')
        const rootEnd = body.lastIndexOf('</div>')
        if (rootStart === -1 || rootEnd <= rootStart) {
          throw new Error('[spa-fallback-shell] #root im index.html nicht gefunden.')
        }

        const shell =
          head +
          source.slice(headEnd, bodyStart) +
          body.slice(0, rootStart) +
          '<div id="root"></div>' +
          body.slice(rootEnd + '</div>'.length)

        const leftovers = [
          'rel="canonical"',
          'name="description"',
          'name="robots"',
          'property="og:',
          'application/ld+json',
        ].filter((needle) => shell.includes(needle))
        if (leftovers.length > 0) {
          throw new Error(
            `[spa-fallback-shell] Routen-Meta im Fallback verblieben: ${leftovers.join(', ')}`,
          )
        }

        writeFileSync(path.join(outDir, 'app.html'), shell)
        console.log('[spa-fallback-shell] dist/app.html geschrieben (ohne Canonical)')
      },
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
    blogPrerenderDataPlugin(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: prerenderEntry,
      additionalPrerenderRoutes: [
        '/ueber-uns',
        '/software',
        '/blog',
        // Jeder Beitrag als eigene statische Seite — sonst greift der
        // SPA-Fallback und Google sieht kein beitragsspezifisches Canonical.
        ...readBlogPrerenderPosts().map(
          (post) => `/blog/${encodeURIComponent(post.slug)}`,
        ),
      ],
    }),
    spaFallbackShellPlugin(),
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
