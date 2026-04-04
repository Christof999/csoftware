import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp, staggerContainer } from '../../lib/motion'

export function HomeCta() {
  return (
    <section className="bg-gallery-ink py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="grid gap-10 sm:grid-cols-2 sm:items-end"
        >
          <div>
            <motion.p
              custom={0}
              variants={fadeInUp}
              className="text-xs font-medium uppercase tracking-widest text-stone-500"
            >
              Nächster Schritt
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-stone-100 sm:text-4xl"
            >
              Bereit für den{' '}
              <span className="text-stone-500">nächsten Schritt?</span>
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-5 text-base leading-relaxed text-stone-400"
            >
              Erzählen Sie uns kurz von Ihrem Vorhaben — wir melden uns mit
              einem konkreten Vorschlag.
            </motion.p>
          </div>
          <motion.div
            custom={3}
            variants={fadeInUp}
            className="sm:text-right"
          >
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-100 px-6 py-3.5 text-sm font-medium text-stone-900 transition hover:bg-white"
            >
              Projekt anfragen
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
