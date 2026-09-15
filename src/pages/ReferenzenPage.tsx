import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ExternalSiteLink, SitePreview } from '../components/referenzen/SitePreview'
import { REFERENZEN } from '../content/referenzen'
import { fadeInUp, staggerContainer } from '../lib/motion'

export function ReferenzenPage() {
  return (
    <div>
      <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <div className="flex items-center gap-4 border-b border-gallery-line pb-8">
              <motion.p
                custom={0}
                variants={fadeInUp}
                className="text-xs font-medium uppercase tracking-widest text-shell-muted"
              >
                Referenzen
              </motion.p>
            </div>

            <motion.h1
              custom={1}
              variants={fadeInUp}
              className="mt-10 max-w-4xl font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl sm:leading-[1.08] lg:text-6xl"
            >
              Umgesetzte Websites,{' '}
              <span className="text-shell-muted">die sich aufrufen lassen.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-shell-muted"
            >
              Drei Projekte aus der Praxis: eine Glaserei und ein Forstbetrieb in
              Merkendorf, dazu eine Vermittlung für Handwerksbetriebe. Keine
              Mockups — die Adressen funktionieren.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {REFERENZEN.map((r, index) => (
        <section
          key={r.id}
          id={r.id}
          className={`scroll-mt-16 border-b border-gallery-line py-20 sm:py-28 ${
            index % 2 === 0 ? 'bg-gallery-bg' : 'bg-gallery-surface'
          }`}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block min-w-0"
              >
                <SitePreview referenz={r} priority={index === 0} />
                <span className="sr-only">{r.name} in neuem Tab öffnen</span>
              </a>

              <div>
                <p className="font-mono text-xs text-shell-subtle">{r.n}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-widest text-shell-muted">
                  {r.location}
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12]">
                  {r.name}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-shell-muted sm:text-lg">
                  {r.lead}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {r.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-gallery-line bg-gallery-surface px-3 py-1 text-[11px] font-medium text-shell-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <ul className="mt-8 space-y-2.5">
                  {r.done.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-shell-muted"
                    >
                      <span
                        className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-shell-subtle"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <ExternalSiteLink
                  href={r.url}
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                >
                  {r.host} öffnen
                </ExternalSiteLink>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-gallery-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12]">
            Der nächste Auftritt muss nicht wie der letzte sein.{' '}
            <span className="text-shell-muted">Er muss zu Ihrem Betrieb passen.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-shell-muted sm:text-lg">
            Website, lokale Auffindbarkeit oder ein Verzeichnis mit mehreren
            Gewerken — wir schauen uns an, was Sie brauchen, und bauen das.
            Nicht das Raster einer Baukasten-Vorlage.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-stone-800 active:scale-[0.98] dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
            >
              Projekt anfragen
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              to="/leistungen"
              className="inline-flex items-center justify-center rounded-lg border border-gallery-line bg-gallery-bg px-6 py-3.5 text-sm font-medium text-gallery-ink transition hover:border-stone-400 active:scale-[0.98] dark:hover:border-stone-600"
            >
              Leistungen
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
