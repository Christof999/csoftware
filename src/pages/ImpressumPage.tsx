import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../lib/motion'
import { SITE_EMAIL, SITE_EMAIL_MAILTO, SITE_NAME } from '../site'

export function ImpressumPage() {
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
              Rechtliches
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeInUp}
              className="mt-6 font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl"
            >
              Impressum
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-6 text-sm text-shell-muted"
            >
              Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-gallery-bg py-20 sm:py-28">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          <LegalBlock title="Diensteanbieter">
            <p>
              Christof Sörgel
              <br />
              Heglau 32
              <br />
              91732 Merkendorf
              <br />
              Deutschland
            </p>
          </LegalBlock>

          <LegalBlock title="Kontakt">
            <p>
              Telefon:{' '}
              <a
                href="tel:+491732387757"
                className="underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
              >
                0173 2387757
              </a>
              <br />
              E-Mail:{' '}
              <a
                href={SITE_EMAIL_MAILTO}
                className="underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
              >
                {SITE_EMAIL}
              </a>
            </p>
          </LegalBlock>

          <LegalBlock title="Umsatzsteuer">
            <p>
              Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine
              Umsatzsteuer ausgewiesen. Eine Umsatzsteuer-Identifikationsnummer
              nach § 27 a UStG wird daher nicht vergeben.
            </p>
          </LegalBlock>

          <LegalBlock title="Redaktionell verantwortlich">
            <p>
              Christof Sörgel
              <br />
              Heglau 32
              <br />
              91732 Merkendorf
            </p>
          </LegalBlock>

          <LegalBlock title="EU-Streitschlichtung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .
              <br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </LegalBlock>

          <LegalBlock title="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
            <p>
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </LegalBlock>

          <LegalBlock title="Haftung für Inhalte">
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen.
            </p>
            <p className="mt-4">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>
          </LegalBlock>

          <LegalBlock title="Haftung für Links">
            <p>
              Unser Angebot enthält ggf. Links zu externen Websites Dritter,
              auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir
              für diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
              überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar.
            </p>
            <p className="mt-4">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
              jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
              zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
              derartige Links umgehend entfernen.
            </p>
          </LegalBlock>

          <LegalBlock title="Urheberrecht">
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten,
              nicht kommerziellen Gebrauch gestattet.
            </p>
            <p className="mt-4">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
              wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
              werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
              trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
              bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
              von Rechtsverletzungen werden wir derartige Inhalte umgehend
              entfernen.
            </p>
          </LegalBlock>

          <p className="pt-6 text-xs text-shell-subtle">
            {SITE_NAME} · Stand: {new Date().toLocaleDateString('de-DE')}
          </p>
        </div>
      </section>
    </div>
  )
}

function LegalBlock({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <h2 className="font-display text-lg font-semibold text-gallery-ink">
        {title}
      </h2>
      <div className="mt-3 text-sm leading-relaxed text-shell-muted">
        {children}
      </div>
    </motion.div>
  )
}
