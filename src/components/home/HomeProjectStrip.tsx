import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import { fadeInUp, staggerContainer } from '../../lib/motion'

export function HomeProjectStrip() {
  const featured = projects.slice(0, 4)

  return (
    <section className="border-b border-gallery-line bg-gallery-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <motion.p
              custom={0}
              variants={fadeInUp}
              className="text-sm font-medium text-shell-muted"
            >
              Ausgewählte Arbeiten
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl"
            >
              Was möglich ist
            </motion.h2>
          </div>
          <motion.div custom={2} variants={fadeInUp}>
            <Link
              to="/arbeiten"
              className="inline-flex items-center gap-1 text-sm font-medium text-gallery-ink underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
            >
              Alle Beispiele
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featured.map((p, i) => (
            <motion.li key={p.slug} custom={i} variants={fadeInUp}>
              <Link
                to={`/arbeiten/${p.slug}`}
                className="group flex h-full flex-col rounded-xl border border-gallery-line bg-gallery-surface p-5 shadow-card transition hover:border-stone-300 dark:hover:border-stone-600"
              >
                <span className="text-[11px] font-medium uppercase tracking-wide text-shell-muted">
                  {p.kind}
                </span>
                <span className="mt-2 font-display text-lg font-semibold text-gallery-ink group-hover:underline decoration-2 underline-offset-2">
                  {p.title}
                </span>
                <span className="mt-2 flex-1 text-sm text-shell-muted">
                  {p.subtitle}
                </span>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-gallery-ink">
                  Ansehen
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
