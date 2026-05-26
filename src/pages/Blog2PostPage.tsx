import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BlogProse } from '../components/blog/BlogProse'
import { fetchBlogPostFromApi } from '../lib/blogApi'
import { formatBlogDate } from '../lib/blogPosts'
import { fadeInUp, staggerContainer } from '../lib/motion'
import { canonicalUrl } from '../seo/routeMeta'
import { blog2PostBreadcrumbJsonLd, blogPostingJsonLd } from '../seo/schema'
import { useJsonLd, usePageHead } from '../seo/usePageHead'
import type { BlogPost } from '../types/blog'
import { SITE_NAME } from '../site'

export function Blog2PostPage() {
  const { slug: slugParam } = useParams<{ slug: string }>()
  const slug = slugParam ? decodeURIComponent(slugParam) : ''

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!slug) {
        setNotFound(true)
        setLoading(false)
        return
      }

      try {
        const data = await fetchBlogPostFromApi(slug)
        if (cancelled) return
        if (!data) {
          setNotFound(true)
          setPost(null)
        } else {
          setPost(data)
          setNotFound(false)
        }
        setError(null)
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error
              ? e.message
              : 'Beitrag konnte nicht geladen werden.',
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    setLoading(true)
    setNotFound(false)
    setPost(null)
    void load()

    return () => {
      cancelled = true
    }
  }, [slug])

  const pathname = slug ? `/blog-2/${slug}` : '/blog-2'
  const canonical = canonicalUrl(pathname)

  const pageMeta = useMemo(() => {
    if (!post) return null
    const description =
      post.metaDescription ||
      `${post.title} — Blog von ${SITE_NAME} zu Webdesign, SEO und digitaler Sichtbarkeit in Ansbach und Mittelfranken.`
    return {
      title: `${post.title} | Blog · ${SITE_NAME}`,
      description,
      indexable: true,
      canonical: canonical || undefined,
      ogType: 'article' as const,
    }
  }, [post, canonical])

  usePageHead(
    notFound
      ? {
          title: `Beitrag nicht gefunden | Blog · ${SITE_NAME}`,
          description: `Der angeforderte Blog-Beitrag wurde nicht gefunden. ${SITE_NAME} — Webdesign & SEO in Ansbach.`,
          indexable: false,
        }
      : pageMeta,
  )

  const postingLd = useMemo(
    () => (post ? blogPostingJsonLd(post, pathname) : null),
    [post, pathname],
  )
  const breadcrumbLd = useMemo(
    () => (post ? blog2PostBreadcrumbJsonLd(post.title, pathname) : null),
    [post, pathname],
  )

  useJsonLd('jsonld-blog-posting', postingLd)
  useJsonLd('jsonld-blog2-breadcrumbs', breadcrumbLd)

  return (
    <div>
      <section className="border-b border-gallery-line bg-gallery-surface py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Brotkrumen" className="mb-8 text-sm text-shell-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="transition hover:text-gallery-ink">
                  Start
                </Link>
              </li>
              <li aria-hidden className="text-shell-subtle">
                /
              </li>
              <li>
                <Link to="/blog-2" className="transition hover:text-gallery-ink">
                  Blog 2
                </Link>
              </li>
            </ol>
          </nav>

          {loading && (
            <div className="animate-pulse space-y-4" role="status" aria-live="polite">
              <span className="sr-only">Beitrag wird geladen</span>
              <div className="h-3 w-28 rounded bg-gallery-line" />
              <div className="h-10 w-full max-w-2xl rounded bg-gallery-line" />
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

          {notFound && !loading && (
            <div>
              <h1 className="font-display text-3xl font-semibold text-gallery-ink">
                Beitrag nicht gefunden
              </h1>
              <p className="mt-4 text-sm text-shell-muted">
                Unter diesem Link gibt es keinen veröffentlichten Beitrag.
              </p>
              <Link
                to="/blog-2"
                className="mt-6 inline-flex text-sm font-medium text-gallery-ink underline decoration-gallery-line underline-offset-4"
              >
                Zurück zur Übersicht
              </Link>
            </div>
          )}

          {post && !loading && (
            <motion.header
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.time
                custom={0}
                variants={fadeInUp}
                dateTime={post.publishedAt.toISOString()}
                className="text-xs font-medium uppercase tracking-widest text-shell-subtle"
              >
                {formatBlogDate(post.publishedAt)}
              </motion.time>
              <motion.h1
                custom={1}
                variants={fadeInUp}
                className="mt-4 font-display text-3xl font-semibold tracking-tight text-gallery-ink sm:text-4xl"
              >
                {post.title}
              </motion.h1>
            </motion.header>
          )}
        </div>
      </section>

      {post && !loading && (
        <section className="bg-gallery-bg py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <BlogProse html={post.content} />
            <footer className="mt-12 border-t border-gallery-line pt-8">
              <Link
                to="/blog-2"
                className="mt-6 inline-flex text-sm font-medium text-gallery-ink underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
              >
                ← Alle Beiträge
              </Link>
            </footer>
          </div>
        </section>
      )}
    </div>
  )
}
