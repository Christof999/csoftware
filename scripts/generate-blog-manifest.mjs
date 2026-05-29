/**
 * Erzeugt public/blog2-list.json beim Build.
 * Logik analog api/lib/firestoreValue.ts (ohne orderBy — alle Docs mit title+slug).
 */
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.resolve(__dirname, '../public/blog2-list.json')
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml')

/** Statische Routen für die sitemap.xml (konsistent mit dem Router). */
const STATIC_ROUTES = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/leistungen', changefreq: 'monthly', priority: '0.9' },
  { loc: '/kontakt', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog', changefreq: 'daily', priority: '0.8' },
  { loc: '/ueber-uns', changefreq: 'monthly', priority: '0.75' },
  { loc: '/impressum', changefreq: 'yearly', priority: '0.3' },
  { loc: '/datenschutz', changefreq: 'yearly', priority: '0.3' },
]

function envFirst(...keys) {
  for (const key of keys) {
    const v = process.env[key]
    if (typeof v === 'string' && v.trim()) return v.trim()
  }
  return ''
}

function siteOrigin() {
  const raw = envFirst('VITE_SITE_URL', 'SITE_URL') || 'https://www.soergel-design.de'
  return raw.replace(/\/+$/, '')
}

/** Erzeugt sitemap.xml mit statischen Routen + allen Blog-Beiträgen (für Google). */
function buildSitemap(posts, origin) {
  const entries = STATIC_ROUTES.map(
    (r) =>
      `  <url>\n    <loc>${origin}${r.loc}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
  )
  for (const p of posts) {
    if (!p?.slug) continue
    const day = String(p.publishedAt || '').slice(0, 10)
    const lastmod = /^\d{4}-\d{2}-\d{2}$/.test(day) ? `\n    <lastmod>${day}</lastmod>` : ''
    entries.push(
      `  <url>\n    <loc>${origin}/blog/${encodeURIComponent(p.slug)}</loc>${lastmod}\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
    )
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`
}

async function writeSitemap(posts) {
  try {
    await writeFile(sitemapPath, buildSitemap(posts, siteOrigin()))
    console.log(
      `[blog-manifest] sitemap.xml: ${STATIC_ROUTES.length} statische + ${posts.length} Blog-URLs`,
    )
  } catch (e) {
    console.warn('[blog-manifest] sitemap-Fehler:', e instanceof Error ? e.message : e)
  }
}

function parseValue(value) {
  if (!value) return undefined
  if (value.nullValue !== undefined) return null
  if (typeof value.stringValue === 'string') return value.stringValue
  if (typeof value.integerValue === 'string') return value.integerValue
  if (typeof value.doubleValue === 'number') return value.doubleValue
  if (typeof value.timestampValue === 'string') return new Date(value.timestampValue)
  if (typeof value.booleanValue === 'boolean') return value.booleanValue
  if (value.mapValue?.fields) {
    const out = {}
    for (const [k, v] of Object.entries(value.mapValue.fields)) {
      out[k] = parseValue(v)
    }
    return out
  }
  if (value.arrayValue?.values) {
    return value.arrayValue.values.map((v) => parseValue(v))
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

function isUnusable(value) {
  const t = String(value).trim()
  return t === '' || t === '[object Object]' || t === 'undefined' || t === 'null'
}

const CONTENT_KEYS = ['html', 'content', 'body', 'text', 'markdown', 'md', 'value', 'rendered']

function deepFindContent(value, depth = 0) {
  if (depth > 6) return ''
  if (typeof value === 'string') return isUnusable(value) ? '' : value
  if (Array.isArray(value)) {
    return value.map((v) => deepFindContent(v, depth + 1)).filter(Boolean).join('\n')
  }
  if (value && typeof value === 'object') {
    for (const key of CONTENT_KEYS) {
      if (typeof value[key] === 'string' && !isUnusable(value[key])) return value[key]
    }
    for (const nested of Object.values(value)) {
      if (nested && typeof nested === 'object') {
        const found = deepFindContent(nested, depth + 1)
        if (found) return found
      }
    }
  }
  return ''
}

function fieldContent(fields, ...names) {
  for (const name of names) {
    const raw = parseValue(fields?.[name])
    const found = deepFindContent(raw)
    if (found) return found
  }
  return ''
}

function htmlToText(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function titleFromSlug(slug) {
  const words = slug.trim().replace(/[-_/]+/g, ' ').replace(/\s+/g, ' ').trim()
  if (!words) return ''
  return words.charAt(0).toUpperCase() + words.slice(1)
}

function deriveTitle({ title, content, metaDescription, slug }) {
  if (title && title.trim()) return title.trim()
  if (content) {
    const heading = content.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/i)
    if (heading) {
      const text = htmlToText(heading[1])
      if (text) return text.slice(0, 120)
    }
    const plain = htmlToText(content)
    if (plain) return (plain.split(/(?<=[.!?])\s/)[0] ?? plain).slice(0, 120).trim()
  }
  if (metaDescription && metaDescription.trim()) {
    const m = metaDescription.trim()
    return (m.split(/(?<=[.!?])\s/)[0] ?? m).slice(0, 120).trim()
  }
  return titleFromSlug(slug) || 'Beitrag'
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
    await writeSitemap([])
    return
  }

  try {
    const rows = await runQuery(projectId, apiKey, collection)
    const posts = (Array.isArray(rows) ? rows : [])
      .filter((row) => row.document?.fields)
      .map((row) => {
        const fields = row.document.fields
        const name = row.document.name ?? ''
        const id = name.split('/').pop() ?? ''
        const slug = fieldString(fields, 'slug') || id
        if (!slug) return null
        const metaDescription = fieldString(fields, 'meta_description', 'metaDescription')
        const content = fieldContent(fields, 'content', 'body', 'html')
        const title = deriveTitle({
          title: fieldString(fields, 'title'),
          content,
          metaDescription,
          slug,
        })
        return {
          id,
          title,
          slug,
          metaDescription,
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
    await writeSitemap(posts)
  } catch (e) {
    console.warn('[blog-manifest] Fehler:', e instanceof Error ? e.message : e)
    await writeFile(
      outPath,
      JSON.stringify({ posts: [], generatedAt: new Date().toISOString() }),
    )
    await writeSitemap([])
  }
}

main()
