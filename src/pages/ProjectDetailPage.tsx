import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ImageWithFallback } from '../components/ImageWithFallback'
import { getProjectBySlug, screenshotUrl } from '../data/projects'
import { fadeInUp, staggerContainer } from '../lib/motion'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return <NotFoundPage />
  }

  return (
    <article className="pb-24 pt-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/arbeiten"
          className="inline-flex items-center gap-2 text-sm text-gallery-muted transition hover:text-gallery-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Alle Arbeiten
        </Link>

        <motion.header
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mt-8"
        >
          <motion.p
            custom={0}
            variants={fadeInUp}
            className="text-xs font-medium uppercase tracking-[0.2em] text-gallery-muted"
          >
            {project.kind}
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeInUp}
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-gallery-ink sm:text-4xl"
          >
            {project.title}
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-2 text-lg text-gallery-muted"
          >
            {project.subtitle}
          </motion.p>
          <motion.p
            custom={3}
            variants={fadeInUp}
            className="mt-6 text-base leading-relaxed text-stone-600"
          >
            {project.summary}
          </motion.p>
        </motion.header>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8"
      >
        <ul className="grid gap-6 sm:grid-cols-2">
          {project.screenshots.map((file, i) => (
            <motion.li
              key={file}
              custom={i}
              variants={fadeInUp}
              className="overflow-hidden rounded-lg border border-gallery-line bg-gallery-surface shadow-sm"
            >
              <div className="aspect-[16/10] bg-stone-100">
                <ImageWithFallback
                  src={screenshotUrl(project.slug, file)}
                  alt={`${project.title} — ${file}`}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <p className="border-t border-gallery-line px-3 py-2 text-xs text-gallery-muted">
                {file}
              </p>
            </motion.li>
          ))}
        </ul>
        <p className="mt-8 text-center text-xs text-stone-400">
          Bilder ablegen unter{' '}
          <code className="rounded bg-stone-100 px-1.5 py-0.5 text-[11px] text-stone-600">
            public/project-screenshots/{project.slug}/
          </code>
        </p>
      </motion.div>
    </article>
  )
}
