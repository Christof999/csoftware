import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp, staggerContainer } from '../../lib/motion'

const EXAMPLES = ['Visitenkarte', 'Flyer & Folder', 'Messestand', 'Social-Media-Vorlagen']

export function HomePrint() {
  return (
    <section id="print-media" className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid gap-10 sm:grid-cols-[1fr_2fr] sm:gap-20 sm:items-start"
        >
          <motion.p
            custom={0}
            variants={fadeInUp}
            className="text-xs font-medium uppercase tracking-widest text-shell-muted pt-1"
          >
            Print & Media
          </motion.p>

          <div>
            <motion.p
              custom={1}
              variants={fadeInUp}
              className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-shell-muted"
            >
              <span className="h-px w-8 bg-gallery-line inline-block" aria-hidden />
              Print · Werbemittel · Social Media · Markenidentität
            </motion.p>

            <motion.h2
              custom={2}
              variants={fadeInUp}
              className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12]"
            >
              Ein Erscheinungsbild,{' '}
              <span className="text-shell-muted">das hält.</span>
            </motion.h2>

            <motion.p
              custom={3}
              variants={fadeInUp}
              className="mt-6 text-base leading-relaxed text-shell-muted sm:text-lg"
            >
              Drucksachen und Werbemittel, die visuell zu Ihrer Website passen —
              Farben, Schrift, Tonalität. Alles aus einer Hand.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeInUp}
              className="mt-8 flex flex-wrap gap-2"
            >
              {EXAMPLES.map((ex) => (
                <span
                  key={ex}
                  className="inline-block cursor-default rounded-full border border-gallery-line bg-gallery-bg px-4 py-2 text-xs font-medium text-shell-muted"
                >
                  {ex}
                </span>
              ))}
            </motion.div>

            <motion.div custom={5} variants={fadeInUp} className="mt-8">
              <Link
                to="/leistungen#chapter-03"
                className="inline-flex items-center gap-2 rounded-lg border border-gallery-line bg-gallery-bg px-5 py-2.5 text-sm font-medium text-gallery-ink transition hover:border-stone-400 dark:hover:border-stone-600"
              >
                Mehr zu Print & Media
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
