/**
 * Erzeugt public/blog2-list.json beim Build.
 * Logik analog api/lib/firestoreValue.ts (ohne orderBy — alle Docs mit title+slug).
 */
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.resolve(__dirname, '../public/blog2-list.json')

function envFirst(...keys) {
  for (const key of keys) {
    const v = process.env[key]
    if (typeof v === 'string' && v.trim()) return v.trim()
  }
  return ''
}

function parseValue(value) {
  if (!value) return undefined
  if (value.nullValue !== undefined) return null
  if (typeof value.stringValue === 'string') return value.stringValue
  if (typeof value.integerValue === 'string') return value.integerValue
  if (typeof value.doubleValue === 'number') return value.doubleValue
  if (typeof value.timestampValue === 'string') return new Date(value.timestampValue)
  if (value.mapValue?.fields) {
    const out = {}
    for (const [k, v] of Object.entries(value.mapValue.fields)) {
      out[k] = parseValue(v)
    }
    return out
  }
  return undefined
}

function fieldString(fields, ...names) {
  for (const name of names) {
    const raw = parseValue(fields?.[name])
    if (typeof raw === 'string') return raw.trim()
    if (typeof raw === 'number') return String(raw)
  }
  return ''
}

function fieldIso(fields, ...names) {
  for (const name of names) {
    const raw = parseValue(fields?.[name])
    if (raw instanceof Date && !Number.isNaN(raw.getTime())) return raw.toISOString()
    if (typeof raw === 'string' || typeof raw === 'number') {
      const d = new Date(raw)
      if (!Number.isNaN(d.getTime())) return d.toISOString()
    }
    if (raw && typeof raw === 'object' && typeof raw.seconds === 'number') {
      return new Date(raw.seconds * 1000).toISOString()
    }
  }
  return new Date(0).toISOString()
}

async function runQuery(projectId, apiKey, collection) {
  const url = new URL(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`,
  )
  url.searchParams.set('key', apiKey)

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: collection }],
        limit: 200,
      },
    }),
  })

  if (!res.ok) {
    throw new Error(`Firestore ${res.status}: ${(await res.text()).slice(0, 200)}`)
  }

  return res.json()
}

async function main() {
  const projectId = envFirst('VITE_FIREBASE_PROJECT_ID', 'FIREBASE_PROJECT_ID')
  const apiKey = envFirst('VITE_FIREBASE_API_KEY', 'FIREBASE_API_KEY')
  const collection =
    envFirst('VITE_FIRESTORE_BLOG_COLLECTION', 'FIRESTORE_BLOG_COLLECTION') ||
    'articles'

  await mkdir(path.dirname(outPath), { recursive: true })

  if (!projectId || !apiKey) {
    console.warn('[blog-manifest] Firebase-Env fehlt — leeres Manifest.')
    await writeFile(
      outPath,
      JSON.stringify({ posts: [], generatedAt: new Date().toISOString() }),
    )
    return
  }

  try {
    const rows = await runQuery(projectId, apiKey, collection)
    const posts = (Array.isArray(rows) ? rows : [])
      .filter((row) => row.document?.fields)
      .map((row) => {
        const fields = row.document.fields
        const title = fieldString(fields, 'title')
        const slug = fieldString(fields, 'slug')
        if (!title || !slug) return null
        const name = row.document.name ?? ''
        return {
          id: name.split('/').pop() ?? '',
          title,
          slug,
          metaDescription: fieldString(fields, 'meta_description', 'metaDescription'),
          publishedAt: fieldIso(fields, 'published_at', 'publishedAt'),
        }
      })
      .filter(Boolean)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )

    await writeFile(
      outPath,
      JSON.stringify({
        posts,
        generatedAt: new Date().toISOString(),
      }),
    )
    console.log(`[blog-manifest] ${posts.length} Beiträge → public/blog2-list.json`)
  } catch (e) {
    console.warn('[blog-manifest] Fehler:', e instanceof Error ? e.message : e)
    await writeFile(
      outPath,
      JSON.stringify({ posts: [], generatedAt: new Date().toISOString() }),
    )
  }
}

main()
