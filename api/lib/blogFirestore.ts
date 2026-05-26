/**
 * Firestore-Zugriff per REST (Server/Vite-Dev) — ohne schweres Client-SDK.
 * Liest öffentliche Blog-Dokumente; Security Rules müssen read erlauben.
 */

export type BlogPostJson = {
  id: string
  title: string
  slug: string
  metaDescription: string
  publishedAt: string
  content?: string
}

type FirestoreValue = {
  stringValue?: string
  timestampValue?: string
}

type FirestoreFields = Record<string, FirestoreValue>

type RunQueryRow = {
  document?: {
    name?: string
    fields?: FirestoreFields
  }
}

function envFirst(...keys: string[]): string {
  for (const key of keys) {
    const v = process.env[key]
    if (typeof v === 'string' && v.trim().length > 0) return v.trim()
  }
  return ''
}

export function getBlogFirestoreConfig(): {
  projectId: string
  apiKey: string
  collection: string
} | null {
  const projectId = envFirst('VITE_FIREBASE_PROJECT_ID', 'FIREBASE_PROJECT_ID')
  const apiKey = envFirst('VITE_FIREBASE_API_KEY', 'FIREBASE_API_KEY')
  const collection = envFirst(
    'VITE_FIRESTORE_BLOG_COLLECTION',
    'FIRESTORE_BLOG_COLLECTION',
  ) || 'articles'

  if (!projectId || !apiKey) return null
  return { projectId, apiKey, collection }
}

function docIdFromName(name: string | undefined): string {
  if (!name) return ''
  const parts = name.split('/')
  return parts[parts.length - 1] ?? ''
}

function fieldString(fields: FirestoreFields | undefined, key: string): string {
  const v = fields?.[key]
  return typeof v?.stringValue === 'string' ? v.stringValue.trim() : ''
}

function fieldTimestampIso(
  fields: FirestoreFields | undefined,
  key: string,
): string {
  const v = fields?.[key]
  if (typeof v?.timestampValue === 'string' && v.timestampValue.length > 0) {
    return new Date(v.timestampValue).toISOString()
  }
  return new Date().toISOString()
}

function mapDocument(
  row: RunQueryRow,
  includeContent: boolean,
): BlogPostJson | null {
  const fields = row.document?.fields
  const title = fieldString(fields, 'title')
  const slug = fieldString(fields, 'slug')
  if (!title || !slug) return null

  const post: BlogPostJson = {
    id: docIdFromName(row.document?.name),
    title,
    slug,
    metaDescription: fieldString(fields, 'meta_description'),
    publishedAt: fieldTimestampIso(fields, 'published_at'),
  }

  if (includeContent) {
    post.content = fieldString(fields, 'content')
  }

  return post
}

async function runQuery(
  structuredQuery: Record<string, unknown>,
): Promise<RunQueryRow[]> {
  const config = getBlogFirestoreConfig()
  if (!config) {
    throw new Error('Firebase nicht konfiguriert (PROJECT_ID / API_KEY fehlen).')
  }

  const url = new URL(
    `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents:runQuery`,
  )
  url.searchParams.set('key', config.apiKey)

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ structuredQuery }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(
      `Firestore-Anfrage fehlgeschlagen (${res.status}): ${body.slice(0, 200)}`,
    )
  }

  const data = (await res.json()) as RunQueryRow[]
  return Array.isArray(data) ? data : []
}

export async function fetchBlogListFromFirestore(): Promise<BlogPostJson[]> {
  const config = getBlogFirestoreConfig()
  if (!config) return []

  const rows = await runQuery({
    from: [{ collectionId: config.collection }],
    select: {
      fields: [
        { fieldPath: 'title' },
        { fieldPath: 'slug' },
        { fieldPath: 'meta_description' },
        { fieldPath: 'published_at' },
      ],
    },
    orderBy: [
      {
        field: { fieldPath: 'published_at' },
        direction: 'DESCENDING',
      },
    ],
    limit: 100,
  })

  return rows
    .map((row) => mapDocument(row, false))
    .filter((p): p is BlogPostJson => p !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
}

export async function fetchBlogPostBySlugFromFirestore(
  slug: string,
): Promise<BlogPostJson | null> {
  const config = getBlogFirestoreConfig()
  if (!config) return null

  const normalized = slug.trim()
  if (!normalized) return null

  const rows = await runQuery({
    from: [{ collectionId: config.collection }],
    where: {
      fieldFilter: {
        field: { fieldPath: 'slug' },
        op: 'EQUAL',
        value: { stringValue: normalized },
      },
    },
    limit: 1,
  })

  const fromQuery = rows
    .map((row) => mapDocument(row, true))
    .find((p): p is BlogPostJson => p !== null)

  if (fromQuery) return fromQuery

  const docUrl = new URL(
    `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents/${config.collection}/${encodeURIComponent(normalized)}`,
  )
  docUrl.searchParams.set('key', config.apiKey)

  const res = await fetch(docUrl.toString())
  if (!res.ok) return null

  const doc = (await res.json()) as RunQueryRow['document']
  return mapDocument({ document: doc }, true)
}
