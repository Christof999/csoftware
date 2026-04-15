import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp } from '../lib/motion'
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
            Websites · SEO · Media
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeInUp}
            className="mt-7 font-display text-5xl font-semibold tracking-tight text-gallery-ink sm:text-6xl sm:leading-[1.06] lg:text-7xl lg:leading-[1.04]"
          >
            Individuelle Websites –{' '}
            <br className="hidden sm:block" />
            <span className="text-shell-muted">so einzigartig wie Ihr Unternehmen.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 font-display text-xl font-semibold tracking-tight text-gallery-ink sm:text-2xl"
          >
            Von der Idee zur fertigen Website – alles aus einer Hand.
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeInUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-shell-muted"
          >
            Wir entwickeln maßgeschneiderte Websites für Ihr Unternehmen –
            darauf ausgelegt, neue Kunden zu gewinnen. Von der ersten Idee bis
            zur fertigen Umsetzung begleiten wir Sie zuverlässig und sorgen
            dafür, dass Ihr Betrieb online genau so überzeugt wie in der
            Realität.
          </motion.p>

          <motion.div
            custom={4}
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
      </div>
    </section>
  )
}
