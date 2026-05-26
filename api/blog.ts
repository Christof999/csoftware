import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  fetchBlogListFromFirestore,
  fetchBlogPostBySlugFromFirestore,
  getBlogFirestoreConfig,
} from './lib/blogFirestore'

const LIST_CACHE = 'public, s-maxage=300, stale-while-revalidate=3600'
const POST_CACHE = 'public, s-maxage=600, stale-while-revalidate=86400'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!getBlogFirestoreConfig()) {
    return res.status(503).json({
      error: 'Firebase nicht konfiguriert',
    })
  }

  const slugParam = req.query.slug
  const slug =
    typeof slugParam === 'string'
      ? slugParam
      : Array.isArray(slugParam)
        ? slugParam[0]
        : undefined

  try {
    if (slug) {
      const post = await fetchBlogPostBySlugFromFirestore(slug)
      if (!post) {
        return res.status(404).json({ error: 'Beitrag nicht gefunden' })
      }
      res.setHeader('Cache-Control', POST_CACHE)
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      return res.status(200).json({ post })
    }

    const posts = await fetchBlogListFromFirestore()
    res.setHeader('Cache-Control', LIST_CACHE)
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    return res.status(200).json({
      posts,
      generatedAt: new Date().toISOString(),
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unbekannter Fehler'
    return res.status(500).json({ error: message })
  }
}
