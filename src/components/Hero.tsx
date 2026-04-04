import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp } from '../lib/motion'
import { HeroShowcase } from './HeroShowcase'

export function Hero() {
  return (
    <section className="border-b border-gallery-line bg-gallery-surface">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="max-w-xl"
          >
            <motion.p
              custom={0}
              variants={fadeInUp}
              className="text-sm font-medium text-shell-muted"
            >
              Websites & einfache digitale Hilfen
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeInUp}
              className="mt-4 font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl sm:leading-[1.12]"
            >
              Eine Website, auf die Sie sich freuen
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-6 text-lg leading-relaxed text-shell-muted"
            >
              Wir gestalten und bauen Ihren Auftritt so, dass Besucher sofort
              verstehen, was Sie tun — und Sie sich beim Anschauen denken:{' '}
              <span className="font-medium text-gallery-ink">
                genau so soll es aussehen.
              </span>
            </motion.p>
            <motion.div
              custom={3}
              variants={fadeInUp}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                to="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
              >
                Unverbindlich anfragen
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/arbeiten"
                className="inline-flex items-center justify-center rounded-lg border border-gallery-line bg-gallery-bg px-5 py-3 text-sm font-medium text-gallery-ink transition hover:border-gallery-line dark:hover:border-stone-600"
              >
                Beispiele ansehen
              </Link>
            </motion.div>
          </motion.div>

          <HeroShowcase />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="mt-16 grid gap-4 border-t border-gallery-line pt-12 sm:grid-cols-3"
        >
          {[
            {
              t: 'Verständlich',
              d: 'Kein Fachchinesisch — wir erklären, was Sinn ergibt.',
            },
            {
              t: 'Übersichtlich',
              d: 'Struktur und Texte, die man beim ersten Lesen erfasst.',
            },
            {
              t: 'Persönlich',
              d: 'Sie sprechen mit Menschen, nicht mit einem Ticketsystem.',
            },
          ].map((item) => (
            <div key={item.t} className="rounded-xl border border-gallery-line bg-gallery-bg p-5">
              <p className="text-sm font-medium text-gallery-ink">{item.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-shell-muted">{item.d}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
