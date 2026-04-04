import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ImageWithFallback } from './ImageWithFallback'
import { projects, screenshotUrl } from '../data/projects'
import { fadeInUp, staggerContainer } from '../lib/motion'

export function Portfolio() {
  return (
    <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            custom={0}
            variants={fadeInUp}
            className="text-xs font-medium uppercase tracking-[0.2em] text-gallery-muted"
          >
            Arbeiten
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-gallery-ink sm:text-4xl"
          >
            Galerie
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 text-lg text-stone-600"
          >
            Ausgewählte Projekte — Klick öffnet die Detailseite mit Screenshots.
          </motion.p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="mt-16 grid gap-8 sm:grid-cols-2"
        >
          {projects.map((project, i) => {
            const thumb = project.screenshots[0]
            return (
              <motion.li key={project.slug} custom={i} variants={fadeInUp}>
                <Link
                  to={`/arbeiten/${project.slug}`}
                  className="group block overflow-hidden border border-gallery-line bg-gallery-bg transition hover:border-stone-300"
                >
                  <div className="aspect-[16/10] bg-stone-100">
                    <ImageWithFallback
                      src={screenshotUrl(project.slug, thumb)}
                      alt={project.title}
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 border-t border-gallery-line bg-gallery-surface p-5">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gallery-muted">
                        {project.kind}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-gallery-ink">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-stone-600">
                        {project.subtitle}
                      </p>
                    </div>
                    <span className="mt-1 shrink-0 text-gallery-muted transition group-hover:text-gallery-ink">
                      <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                    </span>
                  </div>
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
