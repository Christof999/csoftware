import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ImageWithFallback } from './ImageWithFallback'
import { projects, screenshotUrl } from '../data/projects'
import { fadeInUp, staggerContainer } from '../lib/motion'

export function Portfolio() {
  return (
    <section className="border-b border-white/[0.06] bg-gallery-surface py-20 sm:py-24">
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
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-indigo-300/90"
          >
            Arbeiten
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Ausgewählte Projekte
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 text-lg text-zinc-400"
          >
            Klick öffnet Details und Screenshots — ruhig präsentiert, wie in
            einer Galerie.
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
                  className="group block overflow-hidden rounded-2xl border border-white/[0.08] bg-gallery-elevated/60 shadow-panel transition hover:border-indigo-500/25 hover:shadow-glow"
                >
                  <div className="aspect-[16/10] bg-zinc-900">
                    <ImageWithFallback
                      src={screenshotUrl(project.slug, thumb)}
                      alt={project.title}
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 border-t border-white/[0.06] bg-gallery-bg/40 p-5 backdrop-blur-sm">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                        {project.kind}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-white">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-zinc-400">
                        {project.subtitle}
                      </p>
                    </div>
                    <span className="mt-1 shrink-0 text-zinc-500 transition group-hover:text-indigo-300">
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
