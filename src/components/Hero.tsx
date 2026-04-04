import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp } from '../lib/motion'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-gallery-line bg-gallery-bg">
      <div
        className="pointer-events-none absolute inset-0 bg-gallery-dots [background-size:20px_20px] opacity-[0.55]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="max-w-2xl"
        >
          <motion.p
            custom={0}
            variants={fadeInUp}
            className="text-xs font-medium uppercase tracking-[0.25em] text-gallery-muted"
          >
            Handwerk & Digital
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeInUp}
            className="mt-5 font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl"
          >
            Ruhige Oberflächen.
            <br />
            Klare Wirkung.
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600"
          >
            Websites und Software für den Mittelstand — weniger Lärm, mehr
            Struktur: Sichtbarkeit für Kundinnen und Kunden, Ordnung in
            Aufträgen und Zeiten.
          </motion.p>
          <motion.div
            custom={3}
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gallery-ink bg-gallery-ink px-5 py-2.5 text-sm font-medium text-gallery-surface transition hover:bg-stone-800"
            >
              Kontakt
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              to="/arbeiten"
              className="inline-flex items-center justify-center rounded-md border border-gallery-line bg-gallery-surface px-5 py-2.5 text-sm font-medium text-gallery-ink transition hover:border-stone-300"
            >
              Arbeiten ansehen
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-20 grid gap-px bg-gallery-line sm:grid-cols-3"
        >
          {[
            {
              t: 'Sichtbarkeit',
              d: 'Auftritt, der Vertrauen schafft — ohne Schnickschnack.',
            },
            {
              t: 'Prozesse',
              d: 'Zeiten und Aufträge dort, wo das Team sie wiederfindet.',
            },
            {
              t: 'Partnerschaft',
              d: 'Gespräch auf Augenhöhe — ohne Technik-Vokabular.',
            },
          ].map((item) => (
            <div
              key={item.t}
              className="bg-gallery-surface p-6 sm:p-8"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-gallery-muted">
                {item.t}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                {item.d}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
