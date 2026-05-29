/**
 * Firestore-Zugriff per REST (Server/Vite-Dev) — ohne schweres Client-SDK.
 */

import {
  deriveTitle,
  fieldAsHtmlContent,
  fieldAsIsoDate,
  fieldAsString,
  type FirestoreFields,
} from './firestoreValue'

export type BlogPostJson = {
  id: string
  title: string
  slug: string
  metaDescription: string
  publishedAt: string
  content?: string
}

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

function mapDocument(
  row: RunQueryRow,
  includeContent: boolean,
): BlogPostJson | null {
  if (!row.document?.fields) return null

  const fields = row.document.fields
  const id = docIdFromName(row.document.name)
  // Slug ist die einzige harte Voraussetzung; ohne ihn fällt er auf die Doc-ID zurück.
  const slug = fieldAsString(fields, 'slug') || id
  if (!slug) return null

  const metaDescription = fieldAsString(
    fields,
    'meta_description',
    'metaDescription',
  )
  // Content für jede Karte parsen, damit ein fehlender Titel daraus abgeleitet werden kann.
  const content = fieldAsHtmlContent(fields, 'content', 'body', 'html')

  const title = deriveTitle({
    title: fieldAsString(fields, 'title'),
    content,
    metaDescription,
    slug,
  })

  const post: BlogPostJson = {
    id,
    title,
    slug,
    metaDescription,
    publishedAt: fieldAsIsoDate(fields, 'published_at', 'publishedAt'),
  }

  if (includeContent) {
    post.content = content
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
      `Firestore-Anfrage fehlgeschlagen (${res.status}): ${body.slice(0, 300)}`,
    )
  }

  const data = (await res.json()) as RunQueryRow[]
  return Array.isArray(data) ? data.filter((row) => row.document?.fields) : []
}

/** Alle Beiträge laden — ohne orderBy (fehlendes published_at würde sonst Docs ausblenden). */
export async function fetchBlogListFromFirestore(): Promise<BlogPostJson[]> {
  const config = getBlogFirestoreConfig()
  if (!config) return []

  const rows = await runQuery({
    from: [{ collectionId: config.collection }],
    limit: 200,
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
