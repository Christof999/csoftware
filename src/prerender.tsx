import { StrictMode, type ReactElement } from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { posts as blogPrerenderPosts } from 'virtual:blog-prerender-data'
import { ConsentProvider } from './consent/ConsentProvider'
import { ThemeProvider } from './theme/ThemeProvider'
import { normalizeBlogHtml } from './lib/blogContent'
import { getPrerenderedPost, seedPrerenderedBlogPosts } from './lib/blogPrerenderStore'
import type { BlogPost } from './types/blog'

/**
 * Blog-Daten aus `.blog-prerender.json` (Build-Zeit) einmalig bereitstellen.
 * Dadurch rendern `/blog` und `/blog/:slug` echtes HTML inklusive Inhalt.
 */
let seeded = false
function seedBlogPostsOnce(): void {
  if (seeded) return
  seeded = true

  const posts: BlogPost[] = blogPrerenderPosts.map((raw) => ({
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    metaDescription: raw.metaDescription ?? '',
    publishedAt: new Date(raw.publishedAt),
    content: normalizeBlogHtml(raw.content),
  }))

  seedPrerenderedBlogPosts(posts)
}

/** Noch nicht aufgelöste Suspense-Grenze im Stream-Output. */
const PENDING_BOUNDARY = '<!--$?-->'

async function renderOnce(element: ReactElement): Promise<string> {
  const errors: unknown[] = []
  const stream = await renderToReadableStream(element, {
    onError(error) {
      errors.push(error)
    },
  })

  await stream.allReady
  const html = await new Response(stream).text()

  if (errors.length > 0) {
    throw errors[0] instanceof Error ? errors[0] : new Error(String(errors[0]))
  }

  return html
}

/**
 * Rendert den kompletten Baum zu HTML — inklusive der per `React.lazy`
 * geladenen Blog-Routen.
 *
 * `renderToString` bricht an Suspense-Grenzen ab und liefert nur den Fallback
 * („Blog wird geladen …“); Crawler sähen für /blog und /blog/:slug also leere
 * Seiten. Ist eine Route beim ersten Durchlauf noch nicht geladen, schreibt
 * React zudem einen Platzhalter (`<!--$?-->`) plus nachgereichtes Fragment —
 * ebenfalls unbrauchbar als statisches HTML.
 *
 * Nach dem ersten Durchlauf sind die lazy-Module aufgelöst und im Modul-Cache;
 * der nächste Durchlauf rendert sie direkt. Bleibt danach ein Platzhalter
 * übrig, bricht der Build ab, statt stillschweigend leere Seiten auszuliefern.
 */
async function renderFully(element: ReactElement): Promise<string> {
  let html = ''
  for (let attempt = 0; attempt < 3; attempt += 1) {
    html = await renderOnce(element)
    if (!html.includes(PENDING_BOUNDARY)) return html
  }
  throw new Error(
    '[prerender] Suspense-Grenze blieb ungelöst — die Seite würde nur den Ladezustand ausliefern.',
  )
}

/** Build-Zeit-Prerender (vite-prerender-plugin): statisches HTML pro Route für Crawler. */
export async function prerender(data: { url: string }) {
  const [
    { parseLinks },
    { blogPostRouteMeta, getRouteMeta, canonicalUrl, isBlogPostPath },
    { buildPrerenderHeadElements },
    { blogPostBreadcrumbJsonLd, blogPostingJsonLd },
    { BlogPostRoute, BlogRoute },
    { default: App },
  ] = await Promise.all([
    import('vite-prerender-plugin/parse'),
    import('./seo/routeMeta'),
    import('./seo/prerenderHead'),
    import('./seo/schema'),
    import('./routes/blogRoutes'),
    // dynamisch, damit App nicht im Client-Entry-Bundle landet
    import('./App.tsx'),
  ])

  seedBlogPostsOnce()
  // Ohne Preload rendert React für /blog und /blog/:slug nur den Ladezustand.
  await Promise.all([BlogRoute.preload(), BlogPostRoute.preload()])

  const pathname = data.url.replace(/\/$/, '') || '/'
  const canonical = canonicalUrl(pathname)

  // Für /blog/:slug zählen Titel, Description und JSON-LD des Beitrags —
  // nicht die generische Blog-Meta.
  const post = isBlogPostPath(pathname)
    ? getPrerenderedPost(decodeURIComponent(pathname.slice('/blog/'.length)))
    : null

  const meta = post ? blogPostRouteMeta(post) : getRouteMeta(pathname)

  const jsonLd: { id: string; data: object }[] = []
  if (post) {
    const posting = blogPostingJsonLd(post, pathname)
    if (posting) jsonLd.push({ id: 'jsonld-blog-posting', data: posting })
    const crumbs = blogPostBreadcrumbJsonLd(post.title, pathname)
    if (crumbs) jsonLd.push({ id: 'jsonld-blog-breadcrumbs', data: crumbs })
  }

  const html = await renderFully(
    <StrictMode>
      <StaticRouter location={pathname}>
        <ThemeProvider>
          <ConsentProvider>
            <App />
          </ConsentProvider>
        </ThemeProvider>
      </StaticRouter>
    </StrictMode>,
  )

  const links = parseLinks(html)

  return {
    html,
    links: new Set(links),
    head: {
      lang: 'de-DE',
      title: meta.title,
      elements: new Set(
        buildPrerenderHeadElements(meta, canonical, pathname, {
          ogType: post ? 'article' : 'website',
          jsonLd,
        }),
      ),
    },
  }
}
