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
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-200"
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
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-indigo-300/90"
          >
            {project.kind}
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeInUp}
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            {project.title}
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-2 text-lg text-zinc-400"
          >
            {project.subtitle}
          </motion.p>
          <motion.p
            custom={3}
            variants={fadeInUp}
            className="mt-6 text-base leading-relaxed text-zinc-500"
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
              className="overflow-hidden rounded-xl border border-white/[0.08] bg-gallery-elevated shadow-panel"
            >
              <div className="aspect-[16/10] bg-zinc-900">
                <ImageWithFallback
                  src={screenshotUrl(project.slug, file)}
                  alt={`${project.title} — ${file}`}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <p className="border-t border-white/[0.06] px-3 py-2 text-xs text-zinc-500">
                {file}
              </p>
            </motion.li>
          ))}
        </ul>
        <p className="mt-8 text-center text-xs text-zinc-600">
          Bilder ablegen unter{' '}
          <code className="rounded-md border border-white/[0.08] bg-black/40 px-1.5 py-0.5 font-mono text-[11px] text-zinc-400">
            public/project-screenshots/{project.slug}/
          </code>
        </p>
      </motion.div>
    </article>
  )
}
