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

function parsePost(raw: BlogPost): BlogPost {
  return {
    ...raw,
    content: raw.content ?? '',
    publishedAt: new Date(raw.publishedAt),
  }
}

async function readJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(body?.error ?? `Anfrage fehlgeschlagen (${res.status})`)
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

/** Gecachte Server-API — nur Metadaten, kein HTML-Content. */
export async function fetchBlogListFromApi(): Promise<BlogPostListItem[]> {
  const data = await readJson<ListResponse>('/api/blog')
  return data.posts.map(parseListItem)
}

export async function fetchBlogPostFromApi(slug: string): Promise<BlogPost | null> {
  const data = await readJson<PostResponse>(
    `/api/blog?slug=${encodeURIComponent(slug)}`,
  )
  return parsePost(data.post)
}
