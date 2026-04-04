import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp, staggerContainer } from '../../lib/motion'
import { SpotlightCard } from './tech/SpotlightCard'

export function HomeCta() {
  return (
    <section className="bg-gallery-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-0" showDemoLabel={false}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="px-6 py-10 text-center sm:px-10"
          >
            <motion.h2
              custom={0}
              variants={fadeInUp}
              className="font-display text-xl font-semibold text-gallery-ink sm:text-2xl"
            >
              Bereit für den nächsten Schritt?
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeInUp}
              className="mx-auto mt-3 max-w-lg text-sm text-shell-muted sm:text-base"
            >
              Erzählen Sie uns kurz von Ihrem Vorhaben — wir melden uns mit einem
              konkreten Vorschlag.
            </motion.p>
            <motion.div custom={2} variants={fadeInUp} className="mt-8">
              <Link
                to="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
              >
                Projekt anfragen
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </motion.div>
        </SpotlightCard>
      </div>
    </section>
  )
}
