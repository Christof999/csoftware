import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { REFERENZEN } from '../../content/referenzen'
import { fadeInUp, staggerContainer } from '../../lib/motion'
import { ExternalSiteLink, SitePreview } from '../referenzen/SitePreview'

export function HomeReferenzen() {
  return (
    <section
      id="referenzen"
      className="scroll-mt-16 border-b border-gallery-line bg-gallery-bg py-20 sm:py-28"
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
            className="pt-1 text-xs font-medium uppercase tracking-widest text-shell-muted"
          >
            Referenzen
          </motion.p>

          <div>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12]"
            >
              Websites, die online stehen —{' '}
              <span className="text-shell-muted">nicht nur im Entwurf.</span>
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-6 text-base leading-relaxed text-shell-muted sm:text-lg"
            >
              Drei Auftritte aus der Region und darüber hinaus: Glaserei,
              Forstbetrieb, Handwerkervermittlung. Gebaut, erreichbar, mit
              dem, was der jeweilige Betrieb wirklich anbietet.
            </motion.p>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {REFERENZEN.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <Link to={`/referenzen#${r.id}`} className="block">
                <SitePreview referenz={r} priority={i === 0} />
              </Link>
              <p className="mt-4 font-mono text-[11px] text-shell-subtle">{r.n}</p>
              <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-gallery-ink">
                <Link to={`/referenzen#${r.id}`} className="transition hover:text-stone-600 dark:hover:text-stone-300">
                  {r.name}
                </Link>
              </h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-shell-muted">
                {r.location}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-shell-muted">{r.claim}</p>
              <ExternalSiteLink
                href={r.url}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gallery-ink underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
              >
                {r.host}
              </ExternalSiteLink>
            </motion.article>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/referenzen"
            className="inline-flex items-center gap-2 rounded-lg border border-gallery-line bg-gallery-surface px-5 py-2.5 text-sm font-medium text-gallery-ink transition hover:border-stone-400 active:scale-[0.99] dark:hover:border-stone-600"
          >
            Alle Referenzen
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
