import type { BlogPost, BlogPostListItem } from '../types/blog'
import { seoPosts } from '../content/blog/seo-posts.mjs'
import localBlogFile from '../content/blog/local-posts.json' with { type: 'json' }
import { mergeBlogLists } from './blogMerge'

type LocalPostJson = {
  id: string
  slug: string
  title: string
  metaDescription: string
  publishedAt: string
  content: string
}

function asPosts(raw: unknown): LocalPostJson[] {
  if (!raw || typeof raw !== 'object') return []
  const posts = (raw as { posts?: unknown }).posts
  if (!Array.isArray(posts)) return []
  return posts.filter(
    (post): post is LocalPostJson =>
      typeof post === 'object' &&
      post !== null &&
      typeof (post as LocalPostJson).id === 'string' &&
      typeof (post as LocalPostJson).slug === 'string' &&
      typeof (post as LocalPostJson).title === 'string' &&
      typeof (post as LocalPostJson).metaDescription === 'string' &&
      typeof (post as LocalPostJson).publishedAt === 'string' &&
      typeof (post as LocalPostJson).content === 'string',
  )
}

function toBlogPost(post: LocalPostJson): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    metaDescription: post.metaDescription,
    publishedAt: new Date(post.publishedAt),
    content: post.content,
  }
}

/**
 * Programme unter /software plus suchstarke Praxistexte.
 * Unabhängig von Firestore, damit sie auf /blog erscheinen und vorgerendert werden.
 */
export const LOCAL_BLOG_POSTS: BlogPost[] = mergeBlogLists(
  asPosts(localBlogFile).map(toBlogPost),
  (seoPosts as LocalPostJson[]).map(toBlogPost),
)

export function getLocalBlogListItems(): BlogPostListItem[] {
  return LOCAL_BLOG_POSTS.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    metaDescription: post.metaDescription,
    publishedAt: post.publishedAt,
  }))
}

export function getLocalBlogPostBySlug(slug: string): BlogPost | null {
  const normalized = slug.trim()
  if (!normalized) return null
  return LOCAL_BLOG_POSTS.find((post) => post.slug === normalized) ?? null
}
