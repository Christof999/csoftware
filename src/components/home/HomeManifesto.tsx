import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp, staggerContainer } from '../../lib/motion'

const EXAMPLES = [
  'Zeiterfassungsapp',
  'Auftragsmanagement',
  'E-Mail Automation (N8N)',
]

export function HomeManifesto() {
  return (
    <section
      id="webapps"
      className="bg-gallery-surface py-20 sm:py-28 dark:bg-stone-950"
    >
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
            className="pt-1 text-xs font-medium uppercase tracking-widest text-shell-muted dark:text-stone-500"
          >
            Web Apps
          </motion.p>

          <div>
            <motion.p
              custom={1}
              variants={fadeInUp}
              className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-shell-muted dark:text-stone-500"
            >
              <span
                className="inline-block h-px w-8 bg-gallery-line dark:bg-stone-700"
                aria-hidden
              />
              Web Apps · Prozessautomationen · Prozessabbildungen
            </motion.p>

            <motion.h2
              custom={2}
              variants={fadeInUp}
              className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12] dark:text-stone-100"
            >
              Ideen umsetzen.{' '}
              <span className="text-shell-muted dark:text-stone-500">Probleme lösen.</span>{' '}
              Alltag erleichtern.
            </motion.h2>

            <motion.p
              custom={3}
              variants={fadeInUp}
              className="mt-6 text-base leading-relaxed text-shell-muted sm:text-lg dark:text-stone-400"
            >
              Wir verwandeln Ihre Ideen in funktionierende Lösungen — und
              räumen die digitalen Stolpersteine aus dem Weg, die den
              Arbeitsalltag bremsen. Das Ergebnis: ein Auftritt und Tools,
              die einfach funktionieren. Ohne Frust, ohne Umwege.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeInUp}
              className="mt-8 flex flex-wrap gap-2"
            >
              {EXAMPLES.map((ex) => (
                <span
                  key={ex}
                  className="inline-block cursor-default rounded-full border border-gallery-line bg-gallery-bg px-4 py-2 text-xs font-medium text-shell-muted dark:border-stone-700 dark:bg-stone-900 dark:text-stone-400"
                >
                  {ex}
                </span>
              ))}
            </motion.div>

            <motion.div custom={5} variants={fadeInUp} className="mt-8">
              <Link
                to="/leistungen#chapter-02"
                className="inline-flex items-center gap-2 rounded-lg border border-gallery-line bg-gallery-bg px-5 py-2.5 text-sm font-medium text-gallery-ink transition hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-500 dark:hover:text-white"
              >
                Mehr zu Web Apps
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
