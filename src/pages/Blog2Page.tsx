import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fadeInUp, staggerContainer } from '../lib/motion'
import { fetchBlogPosts, formatBlogDate } from '../lib/blogPosts'
import { isFirebaseConfigured } from '../lib/firebase'
import type { BlogPost } from '../types/blog'
import { SITE_NAME } from '../site'

export function Blog2Page() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!isFirebaseConfigured()) {
        if (!cancelled) {
          setError(
            'Firebase ist noch nicht konfiguriert. Bitte VITE_FIREBASE_* in der Build-Umgebung setzen.',
          )
          setLoading(false)
        }
        return
      }

      try {
        const data = await fetchBlogPosts()
        if (!cancelled) {
          setPosts(data)
          setError(null)
        }
      } catch (e) {
        if (!cancelled) {
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
              Blog 2 · Test
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeInUp}
              className="mt-6 font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl"
            >
              Blog aus Firebase
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-6 text-base leading-relaxed text-shell-muted"
            >
              Täglich veröffentlichte Beiträge zu Webdesign, SEO und digitaler
              Sichtbarkeit — direkt aus der Firebase-Datenbank von {SITE_NAME}.
              Diese Seite dient zum Testen der Integration; der bestehende Blog
              unter{' '}
              <Link
                to="/blog"
                className="font-medium text-gallery-ink underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
              >
                /blog
              </Link>{' '}
              bleibt unverändert.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-gallery-bg py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <p className="text-sm text-shell-muted" role="status">
              Beiträge werden geladen …
            </p>
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

          {!loading && !error && posts.length > 0 && (
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
                        to={`/blog-2/${encodeURIComponent(post.slug)}`}
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
                      to={`/blog-2/${encodeURIComponent(post.slug)}`}
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
