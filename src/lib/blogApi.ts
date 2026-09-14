import { normalizeBlogHtml } from './blogContent'
import { mergeBlogLists } from './blogMerge'
import {
  fetchBlogListDirect,
  fetchBlogPostBySlugDirect,
  isFirestoreClientConfigured,
} from './firestoreBlog'
import {
  getLocalBlogListItems,
  getLocalBlogPostBySlug,
} from './localBlogPosts'
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
  const local = getLocalBlogListItems()
  try {
    const res = await fetch('/blog2-list.json', {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return local.length > 0 ? local : null
    const data = (await res.json()) as { posts?: BlogPostListItem[] }
    if (!Array.isArray(data.posts)) return local.length > 0 ? local : null
    return mergeBlogLists(data.posts.map(parseListItem), local)
  } catch {
    return local.length > 0 ? local : null
  }
}

/**
 * Beitragsliste laden. Bevorzugt den direkten Firestore-Lesepfad im Browser
 * (zuverlässig, kein Cold-Start) und fällt auf die Serverless-API zurück.
 */
export async function fetchBlogListFromApi(): Promise<BlogPostListItem[]> {
  const local = getLocalBlogListItems()
  if (isFirestoreClientConfigured()) {
    try {
      return mergeBlogLists(await fetchBlogListDirect(), local)
    } catch {
      // Netz-/Berechtigungsproblem → Serverless-API als Fallback versuchen.
    }
  }
  try {
    const data = await readJson<ListResponse>('/api/blog')
    return mergeBlogLists(data.posts.map(parseListItem), local)
  } catch (e) {
    if (local.length > 0) return local
    throw e
  }
}

/**
 * Einzelbeitrag laden. Direkter Firestore-Lesepfad zuerst; fehlt der Slug
 * dort, greifen die lokalen Software-Beiträge. Bei Lesefehler versucht
 * die Serverless-API den Fallback.
 */
export async function fetchBlogPostFromApi(slug: string): Promise<BlogPost | null> {
  const local = getLocalBlogPostBySlug(slug)

  if (isFirestoreClientConfigured()) {
    try {
      const remote = await fetchBlogPostBySlugDirect(slug)
      if (remote) return remote
      if (local) return local
      return null
    } catch {
      // Direkter Lesepfad fehlgeschlagen → Serverless-API als Fallback.
    }
  }

  try {
    const data = await readJson<PostResponse>(
      `/api/blog?slug=${encodeURIComponent(slug)}`,
    )
    return parsePost(data.post)
  } catch (e) {
    if (local) return local
    throw e
  }
}
