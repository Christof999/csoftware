import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatBlogDate } from '../../lib/blogPosts'
import { getLocalBlogListItems } from '../../lib/localBlogPosts'
import { fadeInUp, staggerContainer } from '../../lib/motion'

const TEASER = getLocalBlogListItems().slice(0, 3)

export function HomeBlog() {
  if (TEASER.length === 0) return null

  return (
    <section
      id="blog"
      className="scroll-mt-16 border-b border-gallery-line bg-gallery-surface py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid gap-10 sm:grid-cols-[1fr_2fr] sm:items-start sm:gap-20"
        >
          <motion.p
            custom={0}
            variants={fadeInUp}
            className="pt-1 text-xs font-medium uppercase tracking-widest text-shell-muted"
          >
            Blog
          </motion.p>
          <div>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12]"
            >
              Praxistexte —{' '}
              <span className="text-shell-muted">nicht als Magazin verkleidet.</span>
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-6 text-base leading-relaxed text-shell-muted sm:text-lg"
            >
              Website fürs Handwerk, E-Rechnung, Zeiterfassung. Beiträge, die eine
              Suche beantworten — und auf die Programme und Referenzen zeigen, die
              dahinterstehen.
            </motion.p>
          </div>
        </motion.div>

        <ul className="mt-14 divide-y divide-gallery-line border-y border-gallery-line">
          {TEASER.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/blog/${post.slug}`}
                className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <span className="font-display text-lg font-semibold tracking-tight text-gallery-ink transition hover:text-stone-600 dark:hover:text-stone-300">
                  {post.title}
                </span>
                <time
                  dateTime={post.publishedAt.toISOString()}
                  className="shrink-0 font-mono text-[11px] text-shell-subtle"
                >
                  {formatBlogDate(post.publishedAt)}
                </time>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-gallery-line bg-gallery-bg px-5 py-2.5 text-sm font-medium text-gallery-ink transition hover:border-stone-400 active:scale-[0.99] dark:hover:border-stone-600"
          >
            Alle Beiträge
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
