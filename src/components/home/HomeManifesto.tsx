import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../lib/motion'

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
            Unser Ansatz
          </motion.p>
          <div>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-display text-3xl font-semibold leading-tight tracking-tight text-stone-100 sm:text-4xl sm:leading-[1.12]"
            >
              Ideen umsetzen.{' '}
              <span className="text-stone-500">Probleme lösen.</span>{' '}
              Alltag erleichtern.
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-6 text-base leading-relaxed text-stone-400 sm:text-lg"
            >
              Wir verwandeln Ihre Ideen in funktionierende Lösungen — und
              räumen die digitalen Stolpersteine aus dem Weg, die den
              Arbeitsalltag bremsen. Das Ergebnis: ein Auftritt und Tools,
              die einfach funktionieren. Ohne Frust, ohne Umwege.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
