import { motion } from 'framer-motion'
import { ArrowRight, Clock, Inbox, Receipt } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp, staggerContainer } from '../../lib/motion'

const PROGRAMS = [
  {
    Icon: Clock,
    to: '/software#zeiterfassung',
    name: 'Zeiterfassung',
    text: 'Stempeln aufs Projekt, Material und Fotos am Eintrag, Berichte fürs Lohnbüro.',
  },
  {
    Icon: Receipt,
    to: '/software#auftrag-rechnung',
    name: 'Auftrag & Rechnung',
    text: 'Angebot bis Zahlung, Nachkalkulation Soll/Ist, Buchhaltung und Bankabgleich.',
  },
  {
    Icon: Inbox,
    to: '/software#posteingang',
    name: 'Posteingang',
    text: 'Mehrere Postfächer, von KI sortiert — Belege gehen direkt in die Buchhaltung.',
  },
]

export function HomeSoftware() {
  return (
    <section
      id="software"
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
            Software
          </motion.p>

          <div>
            <motion.p
              custom={1}
              variants={fadeInUp}
              className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-shell-muted"
            >
              <span className="inline-block h-px w-8 bg-gallery-line" aria-hidden />
              Eigene Programme · KI · Schnittstellen
            </motion.p>

            <motion.h2
              custom={2}
              variants={fadeInUp}
              className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12]"
            >
              Software für den Betrieb —{' '}
              <span className="text-shell-muted">nicht von der Stange.</span>
            </motion.h2>

            <motion.p
              custom={3}
              variants={fadeInUp}
              className="mt-6 text-base leading-relaxed text-shell-muted sm:text-lg"
            >
              Drei Programme für Zeiterfassung, Abrechnung und Posteingang — im
              laufenden Betrieb entstanden und dort täglich im Einsatz. Einzeln
              einsetzbar, zusammen ein Ablauf, in dem dieselbe Zahl nur einmal
              erfasst wird.
            </motion.p>

            <motion.div custom={4} variants={fadeInUp} className="mt-9 grid gap-3 sm:grid-cols-3">
              {PROGRAMS.map((p) => (
                <Link
                  key={p.name}
                  to={p.to}
                  className="group rounded-xl border border-gallery-line bg-gallery-surface p-4 transition hover:border-stone-400 active:scale-[0.99] dark:hover:border-stone-600"
                >
                  <p.Icon className="h-4 w-4 text-shell-subtle" aria-hidden />
                  <p className="mt-3 font-display text-sm font-semibold text-gallery-ink">
                    {p.name}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-shell-muted">{p.text}</p>
                </Link>
              ))}
            </motion.div>

            <motion.div custom={5} variants={fadeInUp} className="mt-8">
              <Link
                to="/software"
                className="inline-flex items-center gap-2 rounded-lg border border-gallery-line bg-gallery-surface px-5 py-2.5 text-sm font-medium text-gallery-ink transition hover:border-stone-400 active:scale-[0.99] dark:hover:border-stone-600"
              >
                Programme & Praxisbeispiele ansehen
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
