import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeInUp, staggerContainer } from '../lib/motion'
import {
  SITE_EMAIL,
  SITE_EMAIL_MAILTO,
  SITE_GOOGLE_BUSINESS_URL,
  SITE_LOCALITY,
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_POSTAL_CODE,
  SITE_STREET,
} from '../site'
import { CursorGlow } from '../components/home/tech/CursorGlow'

export function AboutPage() {
  return (
    <div>
      <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p
              custom={0}
              variants={fadeInUp}
              className="text-xs font-medium uppercase tracking-widest text-shell-muted"
            >
              Über uns
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeInUp}
              className="mt-6 font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl"
            >
              Wer hinter {SITE_NAME} steht
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-6 text-base leading-relaxed text-shell-muted"
            >
              {SITE_NAME} ist die Einzelunternehmung von Christof Sörgel — mit Sitz in
              Merkendorf und Fokus auf Kunden in Ansbach, Mittelfranken und der Region.
              Websites, Web-Apps und Print entstehen bei uns aus einer Hand: klar
              strukturiert, technisch solide und ohne unnötigen Ballast.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-gallery-line bg-gallery-bg py-20 sm:py-28">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
          >
            <motion.h2
              custom={0}
              variants={fadeInUp}
              className="font-display text-2xl font-semibold text-gallery-ink"
            >
              Christof Sörgel — Inhaber & Ansprechpartner
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeInUp}
              className="mt-4 text-sm leading-relaxed text-shell-muted"
            >
              Ich begleite Unternehmen dabei, online und offline professionell
              aufzutreten: von der ersten Struktur-Idee über Design und Umsetzung bis
              zum Launch und kleineren Anpassungen danach. Technisch setze ich auf
              moderne Web-Standards (u. a. React, TypeScript, schnelles Hosting), bei
              Print und Corporate Design auf konsistente Markenführung. Besonders
              gerne arbeite ich mit Handwerk, Dienstleistern und kleineren Teams
              zusammen, die eine verlässliche Partnerin oder einen verlässlichen
              Partner für digitale Themen suchen — ohne Agentur-Pathos, dafür mit
              direkter Kommunikation.
            </motion.p>
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-4 text-sm leading-relaxed text-shell-muted"
            >
              Für Suchmaschinen und KI-gestützte Systeme ist es wichtig, wer ein
              Angebot verantwortet: Hier finden Sie die Kurzfassung zu Person, Ort und
              Arbeitsweise — ergänzend zu den Pflichtangaben im{' '}
              <Link
                to="/impressum"
                className="underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
              >
                Impressum
              </Link>
              .
            </motion.p>
          </motion.article>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
          >
            <motion.h2
              custom={0}
              variants={fadeInUp}
              className="font-display text-2xl font-semibold text-gallery-ink"
            >
              Kontakt & Standort
            </motion.h2>
            <motion.div custom={1} variants={fadeInUp} className="mt-6">
              <CursorGlow className="rounded-xl border border-gallery-line bg-gallery-surface">
                <div className="space-y-4 px-6 py-6 text-sm leading-relaxed text-shell-muted">
                  <p>
                    <span className="font-medium text-gallery-ink">
                      {SITE_NAME}
                    </span>
                    <br />
                    Christof Sörgel
                    <br />
                    {SITE_STREET}
                    <br />
                    {SITE_POSTAL_CODE} {SITE_LOCALITY}
                  </p>
                  <p>
                    Telefon:{' '}
                    <a
                      href={SITE_PHONE_TEL}
                      className="font-medium text-gallery-ink underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
                    >
                      {SITE_PHONE_DISPLAY}
                    </a>
                    <br />
                    E-Mail:{' '}
                    <a
                      href={SITE_EMAIL_MAILTO}
                      className="font-medium text-gallery-ink underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
                    >
                      {SITE_EMAIL}
                    </a>
                  </p>
                  {SITE_GOOGLE_BUSINESS_URL ? (
                    <p>
                      <a
                        href={SITE_GOOGLE_BUSINESS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gallery-ink underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
                      >
                        Google-Unternehmensprofil (Maps)
                      </a>
                    </p>
                  ) : null}
                </div>
              </CursorGlow>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
          >
            <motion.h2
              custom={0}
              variants={fadeInUp}
              className="font-display text-2xl font-semibold text-gallery-ink"
            >
              Projekt besprechen?
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeInUp}
              className="mt-4 text-sm leading-relaxed text-shell-muted"
            >
              Schreiben Sie uns über das Formular — wir melden uns in der Regel
              innerhalb eines Werktags.
            </motion.p>
            <motion.div custom={2} variants={fadeInUp} className="mt-6">
              <Link
                to="/kontakt"
                className="inline-flex rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
              >
                Zur Kontaktseite
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
