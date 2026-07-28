import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BlogListSkeleton } from '../components/blog/BlogListSkeleton'
import {
  fetchBlogListFromApi,
  fetchBlogListManifest,
} from '../lib/blogApi'
import { formatBlogDate } from '../lib/blogPosts'
import { getPrerenderedList } from '../lib/blogPrerenderStore'
import { fadeInUp, staggerContainer } from '../lib/motion'
import type { BlogPostListItem } from '../types/blog'
import { SITE_NAME } from '../site'

export function BlogPage() {
  // Beim Build-Prerender steht die Liste synchron bereit, damit /blog echte
  // Links auf /blog/:slug ausliefert (interne Verlinkung für Crawler).
  const prerenderedPosts = getPrerenderedList()

  const [posts, setPosts] = useState<BlogPostListItem[]>(prerenderedPosts ?? [])
  const [loading, setLoading] = useState(prerenderedPosts === null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const manifest = await fetchBlogListManifest()
      if (cancelled) return

      if (manifest && manifest.length > 0) {
        setPosts(manifest)
        setLoading(false)
      }

      try {
        const fresh = await fetchBlogListFromApi()
        if (!cancelled) {
          setPosts(fresh)
          setError(null)
        }
      } catch (e) {
        if (!cancelled && (!manifest || manifest.length === 0)) {
          setError(
            e instanceof Error
              ? e.message
              : 'Beiträge konnten nicht geladen werden.',
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const showSkeleton = loading && posts.length === 0

  return (
    <div>
      <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p
              custom={0}
              variants={fadeInUp}
              className="text-xs font-medium uppercase tracking-widest text-shell-muted"
            >
              Insights
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeInUp}
              className="mt-6 font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl"
            >
              Blog
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-6 text-base leading-relaxed text-shell-muted"
            >
              Neuigkeiten zu Webdesign, SEO und digitalen Themen aus der Praxis von{' '}
              {SITE_NAME}.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-gallery-bg py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {showSkeleton && (
            <div role="status" aria-live="polite">
              <span className="sr-only">Beiträge werden geladen</span>
              <BlogListSkeleton />
            </div>
          )}

          {error && (
            <div
              className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-5 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100"
              role="alert"
            >
              {error}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <p className="text-sm text-shell-muted" role="status">
              Noch keine veröffentlichten Beiträge in der Datenbank.
            </p>
          )}

          {posts.length > 0 && (
            <ul className="divide-y divide-gallery-line border-y border-gallery-line">
              {posts.map((post, index) => (
                <motion.li
                  key={post.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.25 }}
                  className="py-8 first:pt-0 last:pb-0"
                >
                  <article>
                    <time
                      dateTime={post.publishedAt.toISOString()}
                      className="text-xs font-medium uppercase tracking-widest text-shell-subtle"
                    >
                      {formatBlogDate(post.publishedAt)}
                    </time>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-gallery-ink">
                      <Link
                        to={`/blog/${encodeURIComponent(post.slug)}`}
                        className="transition hover:text-stone-600 dark:hover:text-stone-300"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {post.metaDescription ? (
                      <p className="mt-3 text-sm leading-relaxed text-shell-muted">
                        {post.metaDescription}
                      </p>
                    ) : null}
                    <Link
                      to={`/blog/${encodeURIComponent(post.slug)}`}
                      className="mt-4 inline-flex text-sm font-medium text-gallery-ink underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
                    >
                      Weiterlesen
                    </Link>
                  </article>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
