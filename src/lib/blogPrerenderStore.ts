/**
 * Build-Zeit-Speicher für Blog-Daten.
 *
 * Nur `src/prerender.tsx` befüllt diesen Speicher (aus `.blog-prerender.json`).
 * Dadurch rendern `/blog` und `/blog/:slug` beim Build echtes HTML statt eines
 * Ladezustands — entscheidend, weil Crawler sonst nur die Skeleton-Ansicht und
 * (über den SPA-Fallback) fremde Meta-Tags sehen.
 *
 * Im Browser bleibt der Speicher leer: `getPrerenderedList()` /
 * `getPrerenderedPost()` liefern dort `null`, das Laufzeitverhalten
 * (Firestore bzw. /api/blog) ändert sich nicht.
 */
import type { BlogPost, BlogPostListItem } from '../types/blog'

type PrerenderBlogData = {
  list: BlogPostListItem[]
  bySlug: Map<string, BlogPost>
}

/**
 * Ablage auf `globalThis`: Prerender-Entry und App-Chunk sind getrennte Bundles,
 * ein Modul-lokaler Zwischenspeicher könnte dabei doppelt existieren.
 */
const STORE_KEY = '__blogPrerenderData__'

type GlobalWithStore = typeof globalThis & {
  [STORE_KEY]?: PrerenderBlogData
}

export function seedPrerenderedBlogPosts(posts: BlogPost[]): void {
  // Ohne Beiträge (z. B. Build ohne Firebase-Env) bleibt der Speicher leer:
  // /blog rendert dann den Ladezustand statt „keine Beiträge vorhanden“.
  if (posts.length === 0) return

  const bySlug = new Map<string, BlogPost>()
  for (const post of posts) {
    if (post.slug) bySlug.set(post.slug, post)
  }
  ;(globalThis as GlobalWithStore)[STORE_KEY] = {
    bySlug,
    list: posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      metaDescription: post.metaDescription,
      publishedAt: post.publishedAt,
    })),
  }
}

function readStore(): PrerenderBlogData | null {
  return (globalThis as GlobalWithStore)[STORE_KEY] ?? null
}

/** Beitrag für den Prerender — `null` im Browser und für unbekannte Slugs. */
export function getPrerenderedPost(slug: string): BlogPost | null {
  if (!slug) return null
  return readStore()?.bySlug.get(slug) ?? null
}

/** Beitragsliste für den Prerender — `null` im Browser. */
export function getPrerenderedList(): BlogPostListItem[] | null {
  return readStore()?.list ?? null
}
