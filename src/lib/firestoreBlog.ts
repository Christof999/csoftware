/**
 * Direkter Firestore-REST-Zugriff aus dem Browser (öffentlicher Web-API-Key).
 * Dient als zuverlässiger Lesepfad für den Blog — unabhängig von der
 * Serverless-Function /api/blog. Nutzt dieselbe robuste Parsing-Logik.
 */
import type { BlogPost, BlogPostListItem } from '../types/blog'

type FirestoreValue = {
  stringValue?: string
  integerValue?: string
  doubleValue?: number
  booleanValue?: boolean
  timestampValue?: string
  nullValue?: null
  mapValue?: { fields?: Record<string, FirestoreValue> }
  arrayValue?: { values?: FirestoreValue[] }
}
type FirestoreFields = Record<string, FirestoreValue>
type FirestoreDocument = { name?: string; fields?: FirestoreFields }
type RunQueryRow = { document?: FirestoreDocument }

function parseValue(value: FirestoreValue | undefined): unknown {
  if (!value) return undefined
  if (value.nullValue !== undefined) return null
  if (typeof value.stringValue === 'string') return value.stringValue
  if (typeof value.integerValue === 'string') return value.integerValue
  if (typeof value.doubleValue === 'number') return value.doubleValue
  if (typeof value.booleanValue === 'boolean') return value.booleanValue
  if (typeof value.timestampValue === 'string') return new Date(value.timestampValue)
  if (value.mapValue?.fields) {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value.mapValue.fields)) out[k] = parseValue(v)
    return out
  }
  if (value.arrayValue?.values) return value.arrayValue.values.map((v) => parseValue(v))
  return undefined
}

function pick(fields: FirestoreFields | undefined, ...names: string[]): FirestoreValue | undefined {
  if (!fields) return undefined
  for (const name of names) if (fields[name] !== undefined) return fields[name]
  return undefined
}

function fieldString(fields: FirestoreFields | undefined, ...names: string[]): string {
  const raw = parseValue(pick(fields, ...names))
  if (typeof raw === 'string') return raw.trim()
  if (typeof raw === 'number' || typeof raw === 'boolean') return String(raw)
  return ''
}

function fieldIsoDate(fields: FirestoreFields | undefined, ...names: string[]): string {
  const raw = parseValue(pick(fields, ...names))
  if (raw instanceof Date && !Number.isNaN(raw.getTime())) return raw.toISOString()
  if (typeof raw === 'string' || typeof raw === 'number') {
    const d = new Date(raw)
    if (!Number.isNaN(d.getTime())) return d.toISOString()
  }
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>
    if (typeof o.seconds === 'number') return new Date(o.seconds * 1000).toISOString()
  }
  return new Date(0).toISOString()
}

function isUnusable(value: string): boolean {
  const t = value.trim()
  return t === '' || t === '[object Object]' || t === 'undefined' || t === 'null'
}

const CONTENT_KEYS = ['html', 'content', 'body', 'text', 'markdown', 'md', 'value', 'rendered']

function deepFind(value: unknown, depth = 0): string {
  if (depth > 6) return ''
  if (typeof value === 'string') return isUnusable(value) ? '' : value
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item && typeof item === 'object') {
          const b = item as Record<string, unknown>
          if (typeof b.html === 'string' && !isUnusable(b.html)) return b.html
          if (typeof b.text === 'string' && !isUnusable(b.text)) return `<p>${b.text}</p>`
        }
        return deepFind(item, depth + 1)
      })
      .filter(Boolean)
      .join('\n')
  }
  if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>
    for (const key of CONTENT_KEYS) {
      if (typeof o[key] === 'string' && !isUnusable(o[key] as string)) return o[key] as string
    }
    if (Array.isArray(o.blocks)) {
      const fromBlocks = deepFind(o.blocks, depth + 1)
      if (fromBlocks) return fromBlocks
    }
    for (const nested of Object.values(o)) {
      if (nested && typeof nested === 'object') {
        const found = deepFind(nested, depth + 1)
        if (found) return found
      }
    }
  }
  return ''
}

function fieldHtml(fields: FirestoreFields | undefined, ...names: string[]): string {
  const raw = parseValue(pick(fields, ...names))
  if (typeof raw === 'string') {
    const value = raw.trim()
    if (isUnusable(value)) return ''
    if ((value.startsWith('{') && value.endsWith('}')) || (value.startsWith('[') && value.endsWith(']'))) {
      try {
        const fromJson = deepFind(JSON.parse(value))
        if (fromJson) return fromJson
      } catch {
        /* kein JSON */
      }
    }
    return raw
  }
  return deepFind(raw)
}

function htmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function titleFromSlug(slug: string): string {
  const words = slug.trim().replace(/[-_/]+/g, ' ').replace(/\s+/g, ' ').trim()
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : ''
}

function deriveTitle(opts: { title?: string; content?: string; meta?: string; slug?: string }): string {
  if (opts.title?.trim()) return opts.title.trim()
  if (opts.content) {
    const heading = opts.content.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/i)
    if (heading) {
      const text = htmlToText(heading[1])
      if (text) return text.slice(0, 120)
    }
    const plain = htmlToText(opts.content)
    if (plain) return (plain.split(/(?<=[.!?])\s/)[0] ?? plain).slice(0, 120).trim()
  }
  if (opts.meta?.trim()) {
    const m = opts.meta.trim()
    return (m.split(/(?<=[.!?])\s/)[0] ?? m).slice(0, 120).trim()
  }
  return titleFromSlug(opts.slug ?? '') || 'Beitrag'
}

function docId(name: string | undefined): string {
  if (!name) return ''
  const parts = name.split('/')
  return parts[parts.length - 1] ?? ''
}

function getConfig(): { projectId: string; apiKey: string; collection: string } | null {
  const env = import.meta.env ?? {}
  const projectId = env.VITE_FIREBASE_PROJECT_ID?.trim()
  const apiKey = env.VITE_FIREBASE_API_KEY?.trim()
  const collection = env.VITE_FIRESTORE_BLOG_COLLECTION?.trim() || 'articles'
  if (!projectId || !apiKey) return null
  return { projectId, apiKey, collection }
}

/** Ob ein direkter Firestore-Lesepfad im Browser konfiguriert ist. */
export function isFirestoreClientConfigured(): boolean {
  return getConfig() !== null
}

async function runQuery(
  config: { projectId: string; apiKey: string },
  structuredQuery: Record<string, unknown>,
): Promise<RunQueryRow[]> {
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
    throw new Error(`Firestore ${res.status}: ${body.slice(0, 200)}`)
  }
  const data = (await res.json()) as RunQueryRow[]
  return Array.isArray(data) ? data.filter((row) => row.document?.fields) : []
}

function toListItem(doc: FirestoreDocument): BlogPostListItem | null {
  if (!doc.fields) return null
  const id = docId(doc.name)
  const slug = fieldString(doc.fields, 'slug') || id
  if (!slug) return null
  const content = fieldHtml(doc.fields, 'content', 'body', 'html')
  const metaDescription = fieldString(doc.fields, 'meta_description', 'metaDescription')
  return {
    id,
    slug,
    metaDescription,
    title: deriveTitle({ title: fieldString(doc.fields, 'title'), content, meta: metaDescription, slug }),
    publishedAt: new Date(fieldIsoDate(doc.fields, 'published_at', 'publishedAt')),
  }
}

/** Liste direkt aus Firestore (ohne HTML-Content). Wirft bei Netz-/Konfig-Fehler. */
export async function fetchBlogListDirect(): Promise<BlogPostListItem[]> {
  const config = getConfig()
  if (!config) throw new Error('Firestore-Client nicht konfiguriert')
  const rows = await runQuery(config, {
    from: [{ collectionId: config.collection }],
    limit: 200,
  })
  return rows
    .map((row) => (row.document ? toListItem(row.document) : null))
    .filter((p): p is BlogPostListItem => p !== null)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

/** Einzelbeitrag direkt aus Firestore (inkl. Content). null = nicht gefunden. */
export async function fetchBlogPostBySlugDirect(slug: string): Promise<BlogPost | null> {
  const config = getConfig()
  if (!config) throw new Error('Firestore-Client nicht konfiguriert')
  const normalized = slug.trim()
  if (!normalized) return null

  const rows = await runQuery(config, {
    from: [{ collectionId: config.collection }],
    where: {
      fieldFilter: { field: { fieldPath: 'slug' }, op: 'EQUAL', value: { stringValue: normalized } },
    },
    limit: 1,
  })

  let doc = rows.find((row) => row.document?.fields)?.document

  if (!doc) {
    // Fallback: Dokument-ID == Slug
    const docUrl = new URL(
      `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents/${config.collection}/${encodeURIComponent(normalized)}`,
    )
    docUrl.searchParams.set('key', config.apiKey)
    const res = await fetch(docUrl.toString())
    if (!res.ok) return null
    doc = (await res.json()) as FirestoreDocument
  }

  if (!doc?.fields) return null
  const item = toListItem(doc)
  if (!item) return null
  return { ...item, content: fieldHtml(doc.fields, 'content', 'body', 'html') }
}
