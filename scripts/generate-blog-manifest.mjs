/**
 * Erzeugt public/blog2-list.json beim Build — Übersicht ohne HTML-Content.
 * Nutzt dieselbe Firestore-REST-Logik wie /api/blog (schneller Erstaufbau).
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

function fieldString(fields, key) {
  const v = fields?.[key]
  return typeof v?.stringValue === 'string' ? v.stringValue.trim() : ''
}

function fieldTimestampIso(fields, key) {
  const v = fields?.[key]
  if (typeof v?.timestampValue === 'string') {
    return new Date(v.timestampValue).toISOString()
  }
  return new Date().toISOString()
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
      .map((row) => {
        const fields = row.document?.fields
        const title = fieldString(fields, 'title')
        const slug = fieldString(fields, 'slug')
        if (!title || !slug) return null
        const name = row.document?.name ?? ''
        const id = name.split('/').pop() ?? ''
        return {
          id,
          title,
          slug,
          metaDescription: fieldString(fields, 'meta_description'),
          publishedAt: fieldTimestampIso(fields, 'published_at'),
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
