import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../lib/motion'

const EXAMPLES = [
  'Zeiterfassungsapp',
  'Auftragsmanagement',
  'E-Mail Automation (N8N)',
]

export function HomeManifesto() {
  return (
    <section className="bg-stone-950 py-20 sm:py-28">
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
            className="text-xs font-medium uppercase tracking-widest text-stone-500 pt-1"
          >
            Zusätzliche Leistungen
          </motion.p>

          <div>
            <motion.p
              custom={1}
              variants={fadeInUp}
              className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-stone-500"
            >
              <span className="h-px w-8 bg-stone-700 inline-block" aria-hidden />
              Web Apps · Prozessautomationen · Prozessabbildungen
            </motion.p>

            <motion.h2
              custom={2}
              variants={fadeInUp}
              className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-stone-100 sm:text-4xl sm:leading-[1.12]"
            >
              Ideen umsetzen.{' '}
              <span className="text-stone-500">Probleme lösen.</span>{' '}
              Alltag erleichtern.
            </motion.h2>

            <motion.p
              custom={3}
              variants={fadeInUp}
              className="mt-6 text-base leading-relaxed text-stone-400 sm:text-lg"
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
                  className="inline-block cursor-default rounded-full border border-stone-700 bg-stone-900 px-4 py-2 text-xs font-medium text-stone-400"
                >
                  {ex}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
