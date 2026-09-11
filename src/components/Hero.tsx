import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeInUp } from '../lib/motion'
import { HeroChromeCta } from './home/HeroChromeCta'
import { HeroGeometry } from './home/tech/HeroGeometry'

export function Hero() {
  return (
    <section className="relative border-b border-gallery-line bg-gallery-surface overflow-hidden">
      <HeroGeometry />
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
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
            Software · Automatisierung · KI · Websites · Media
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeInUp}
            className="mt-7 font-display text-5xl font-semibold tracking-tight text-gallery-ink sm:text-6xl sm:leading-[1.06] lg:text-7xl lg:leading-[1.04]"
          >
            Abläufe, die sich{' '}
            <br className="hidden sm:block" />
            <span className="text-shell-muted">weitgehend selbst erledigen.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 font-display text-xl font-semibold tracking-tight text-gallery-ink sm:text-2xl"
          >
            Eigene Programme für Zeiterfassung, Abrechnung und Posteingang, KI und
            Automatisierung dort, wo sie Tipparbeit sparen — und Websites, die dazu
            passen.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <HeroChromeCta to="/kontakt" />
            <Link
              to="/software"
              className="inline-flex items-center justify-center rounded-lg border border-gallery-line bg-gallery-bg px-6 py-3.5 text-sm font-medium text-gallery-ink transition hover:border-stone-400 active:scale-[0.98] dark:hover:border-stone-600"
            >
              Software ansehen
            </Link>
            <Link
              to="/leistungen"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3.5 text-sm font-medium text-shell-muted transition hover:text-gallery-ink"
            >
              Alle Leistungen
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
