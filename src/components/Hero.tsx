import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp } from '../lib/motion'
import { TiltCard } from './home/tech/TiltCard'

export function Hero() {
  return (
    <section className="border-b border-gallery-line bg-gallery-surface overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="max-w-4xl"
        >
          <motion.p
            custom={0}
            variants={fadeInUp}
            className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-shell-muted"
          >
            <span className="h-px w-8 bg-shell-subtle inline-block" aria-hidden />
            Websites · Sichtbarkeit · Media
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeInUp}
            className="mt-7 font-display text-5xl font-semibold tracking-tight text-gallery-ink sm:text-6xl sm:leading-[1.06] lg:text-7xl lg:leading-[1.04]"
          >
            Eine Website,{' '}
            <br className="hidden sm:block" />
            <span className="text-shell-muted">auf die Sie sich freuen.</span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-8 max-w-xl text-lg leading-relaxed text-shell-muted"
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
            >
              Unverbindlich anfragen
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              to="/leistungen"
              className="inline-flex items-center justify-center rounded-lg border border-gallery-line bg-gallery-bg px-6 py-3.5 text-sm font-medium text-gallery-ink transition hover:border-stone-400 dark:hover:border-stone-600"
            >
              Leistungen ansehen
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-20 grid gap-4 border-t border-gallery-line pt-14 sm:grid-cols-3"
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
            <TiltCard key={item.t} className="bg-gallery-bg">
              <div className="p-6">
                <p className="text-sm font-semibold text-gallery-ink">{item.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-shell-muted">
                  {item.d}
                </p>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
