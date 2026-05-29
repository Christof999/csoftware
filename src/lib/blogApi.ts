import { normalizeBlogHtml } from './blogContent'
import {
  fetchBlogListDirect,
  fetchBlogPostBySlugDirect,
  isFirestoreClientConfigured,
} from './firestoreBlog'
import type { BlogPost, BlogPostListItem } from '../types/blog'

type ListResponse = {
  posts: BlogPostListItem[]
  generatedAt?: string
}

type PostResponse = {
  post: BlogPost
}

function parseListItem(raw: BlogPostListItem): BlogPostListItem {
  return {
    ...raw,
    publishedAt: new Date(raw.publishedAt),
  }
}

function parsePost(raw: BlogPost & { content?: unknown }): BlogPost {
  return {
    ...raw,
    content: normalizeBlogHtml(raw.content),
    publishedAt: new Date(raw.publishedAt),
  }
}

async function readJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as
      | { error?: unknown }
      | null
    const raw = body?.error
    let message = `Anfrage fehlgeschlagen (${res.status})`
    if (typeof raw === 'string' && raw.trim()) {
      message = raw
    } else if (raw && typeof raw === 'object') {
      // Firestore-/Fremdfehler liefern { error: { message } } — niemals "[object Object]" zeigen.
      const inner = (raw as { message?: unknown }).message
      if (typeof inner === 'string' && inner.trim()) message = inner
    }
    throw new Error(message)
  }
  return res.json() as Promise<T>
}

/** Statisches Build-Manifest (sofort aus dem CDN, ohne Firestore im Browser). */
export async function fetchBlogListManifest(): Promise<BlogPostListItem[] | null> {
  try {
    const res = await fetch('/blog2-list.json', {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const data = (await res.json()) as { posts?: BlogPostListItem[] }
    if (!Array.isArray(data.posts)) return null
    return data.posts.map(parseListItem)
  } catch {
    return null
  }
}

/**
 * Beitragsliste laden. Bevorzugt den direkten Firestore-Lesepfad im Browser
 * (zuverlässig, kein Cold-Start) und fällt auf die Serverless-API zurück.
 */
export async function fetchBlogListFromApi(): Promise<BlogPostListItem[]> {
  if (isFirestoreClientConfigured()) {
    try {
      return await fetchBlogListDirect()
    } catch {
      // Netz-/Berechtigungsproblem → Serverless-API als Fallback versuchen.
    }
  }
  const data = await readJson<ListResponse>('/api/blog')
  return data.posts.map(parseListItem)
}

/**
 * Einzelbeitrag laden. Direkter Firestore-Lesepfad zuerst; ein dort
 * authoritatives "nicht gefunden" (null) wird respektiert. Bei Lesefehler
 * greift die Serverless-API als Fallback.
 */
export async function fetchBlogPostFromApi(slug: string): Promise<BlogPost | null> {
  if (isFirestoreClientConfigured()) {
    try {
      return await fetchBlogPostBySlugDirect(slug)
    } catch {
      // Direkter Lesepfad fehlgeschlagen → Serverless-API als Fallback.
    }
  }
  const data = await readJson<PostResponse>(
    `/api/blog?slug=${encodeURIComponent(slug)}`,
  )
  return parsePost(data.post)
}
