import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../../lib/motion'
import type { CaseStudy } from './caseStudyData'

export function CaseStudyBlock({ study }: { study: CaseStudy }) {
  return (
    <motion.article
      id={study.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
      className="scroll-mt-24 border-t border-gallery-line pt-12 first:border-0 first:pt-0 sm:pt-16 sm:first:pt-0"
    >
      <div className="grid gap-10 sm:grid-cols-[1fr_2fr] sm:gap-20 sm:items-start">
        <div className="sm:sticky sm:top-24">
          <motion.p
            custom={0}
            variants={fadeInUp}
            className="font-mono text-xs text-shell-subtle"
          >
            Fall {study.n}
          </motion.p>
          <motion.p
            custom={1}
            variants={fadeInUp}
            className="mt-2 text-xs font-medium uppercase tracking-widest text-shell-muted"
          >
            {study.scope}
          </motion.p>
          <motion.div custom={2} variants={fadeInUp} className="mt-4 flex flex-wrap gap-1.5">
            {study.programs.map((p) => (
              <span
                key={p}
                className="rounded-full border border-gallery-line bg-gallery-surface px-2.5 py-1 text-[11px] font-medium text-shell-muted"
              >
                {p}
              </span>
            ))}
          </motion.div>
        </div>

        <div>
          <motion.h3
            custom={1}
            variants={fadeInUp}
            className="font-display text-2xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-3xl sm:leading-[1.15]"
          >
            {study.title}
          </motion.h3>

          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-5 border-l-2 border-gallery-line pl-4 text-base leading-relaxed text-shell-muted"
          >
            {study.situation}
          </motion.p>

          <motion.ol custom={3} variants={fadeInUp} className="mt-8 space-y-6">
            {study.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gallery-line bg-gallery-surface font-mono text-[10px] text-shell-muted"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold text-gallery-ink">
                    {s.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-shell-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </motion.ol>

          <motion.div
            custom={4}
            variants={fadeInUp}
            className="mt-8 rounded-xl border border-gallery-line bg-gallery-surface p-5"
          >
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-shell-muted">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Die Details, die niemand sieht
            </p>
            <ul className="mt-4 space-y-2">
              {study.safeguards.map((s) => (
                <li key={s} className="flex gap-2.5 text-sm leading-relaxed text-shell-muted">
                  <span
                    className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-shell-subtle"
                    aria-hidden
                  />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.p
            custom={5}
            variants={fadeInUp}
            className="mt-6 font-display text-lg font-medium leading-relaxed tracking-tight text-gallery-ink"
          >
            {study.result}
          </motion.p>
        </div>
      </div>
    </motion.article>
  )
}
