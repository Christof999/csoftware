import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp, staggerContainer } from '../../lib/motion'

const EXAMPLES = ['Unternehmenswebsite', 'Landingpage', 'Lokale SEO', 'Google Ads']

export function HomeWebsites() {
  return (
    <section
      id="websites"
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
            Websites
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
              Webdesign · SEO · Google Ads · Performance
            </motion.p>

            <motion.h2
              custom={2}
              variants={fadeInUp}
              className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12] dark:text-stone-100"
            >
              Individuelle Websites –{' '}
              <span className="text-shell-muted dark:text-stone-500">
                so einzigartig wie Ihr Unternehmen.
              </span>
            </motion.h2>

            <motion.p
              custom={3}
              variants={fadeInUp}
              className="mt-6 text-base font-medium leading-relaxed text-gallery-ink sm:text-lg dark:text-stone-200"
            >
              Von der Idee zur fertigen Website – alles aus einer Hand.
            </motion.p>

            <motion.p
              custom={4}
              variants={fadeInUp}
              className="mt-4 text-base leading-relaxed text-shell-muted sm:text-lg dark:text-stone-400"
            >
              Wir entwickeln maßgeschneiderte Websites für Ihr Unternehmen – darauf
              ausgelegt, neue Kunden zu gewinnen. Von der ersten Idee bis zur
              fertigen Umsetzung begleiten wir Sie zuverlässig und sorgen dafür,
              dass Ihr Betrieb online genau so überzeugt wie in der Realität.
            </motion.p>

            <motion.div
              custom={5}
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

            <motion.div custom={6} variants={fadeInUp} className="mt-8">
              <Link
                to="/leistungen#chapter-01"
                className="inline-flex items-center gap-2 rounded-lg border border-gallery-line bg-gallery-bg px-5 py-2.5 text-sm font-medium text-gallery-ink transition hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-500 dark:hover:text-white"
              >
                Mehr zu Websites
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
