import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../lib/motion'
import { useCookieConsent } from '../consent/useCookieConsent'
import { SITE_EMAIL, SITE_EMAIL_MAILTO, SITE_NAME } from '../site'

export function DatenschutzPage() {
  const { revoke } = useCookieConsent()

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
              Datenschutzerklärung
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-6 text-sm text-shell-muted"
            >
              Informationen zur Verarbeitung personenbezogener Daten nach
              Art. 13/14 DSGVO.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-gallery-bg py-20 sm:py-28">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          <LegalBlock title="1. Verantwortlicher">
            <p>
              Verantwortlich im Sinne der DSGVO und anderer nationaler
              Datenschutzgesetze sowie sonstiger datenschutzrechtlicher
              Bestimmungen ist:
            </p>
            <p className="mt-4">
              Christof Sörgel
              <br />
              Heglau 32
              <br />
              91732 Merkendorf
              <br />
              Telefon: 0173 2387757
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

          <LegalBlock title="2. Grundsätzliches">
            <p>
              Wir verarbeiten personenbezogene Daten nur, soweit es für die
              Bereitstellung einer funktionsfähigen Website sowie unserer
              Inhalte und Leistungen erforderlich ist. Die Verarbeitung
              erfolgt regelmäßig nur nach Einwilligung (Art. 6 Abs. 1 lit. a
              DSGVO), zur Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO), zur
              Erfüllung rechtlicher Verpflichtungen (Art. 6 Abs. 1 lit. c
              DSGVO) oder auf Basis berechtigter Interessen (Art. 6 Abs. 1
              lit. f DSGVO).
            </p>
          </LegalBlock>

          <LegalBlock title="3. Hosting (Vercel)">
            <p>
              Diese Website wird bei Vercel Inc. (440 N Barranca Ave #4133,
              Covina, CA 91723, USA) gehostet. Beim Aufruf der Website
              übermittelt Ihr Browser technisch notwendige Daten an den
              Server, die in Server-Logfiles gespeichert werden können:
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5">
              <li>IP-Adresse des anfragenden Geräts</li>
              <li>Datum und Uhrzeit der Anfrage</li>
              <li>Aufgerufene URL / übertragene Datenmenge</li>
              <li>HTTP-Status / Referrer</li>
              <li>User-Agent (Browser, Betriebssystem)</li>
            </ul>
            <p className="mt-4">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an einer technisch fehlerfreien und sicheren
              Bereitstellung der Website). Eine Übermittlung in die USA kann
              nicht ausgeschlossen werden. Vercel ist unter dem EU-US Data
              Privacy Framework zertifiziert. Weitere Informationen:{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
              >
                vercel.com/legal/privacy-policy
              </a>
              .
            </p>
          </LegalBlock>

          <LegalBlock title="4. Kontaktformular & E-Mail-Kontakt">
            <p>
              Wenn Sie uns über das Kontaktformular oder per E-Mail eine
              Nachricht senden, verarbeiten wir die angegebenen Daten (Name,
              ggf. Firma, E-Mail-Adresse, Nachrichtentext), um Ihre Anfrage
              zu beantworten. Die Daten werden per SMTP an das Postfach{' '}
              {SITE_EMAIL} bei unserem E-Mail-Provider{' '}
              <strong>checkdomain GmbH</strong> (An der Halde 1, 23554
              Lübeck) übertragen und dort gespeichert.
            </p>
            <p className="mt-4">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung oder
              Erfüllung eines Vertrags) sowie Art. 6 Abs. 1 lit. f DSGVO
              (Beantwortung nicht vertragsbezogener Anfragen).
            </p>
            <p className="mt-4">
              Wir speichern Ihre Anfrage, bis der Zweck der Verarbeitung
              entfallen ist oder Sie deren Löschung verlangen — sofern keine
              gesetzlichen Aufbewahrungspflichten (z. B. aus HGB oder AO)
              entgegenstehen.
            </p>
            <p className="mt-4">
              Zum Schutz vor automatisierten Spam-Anfragen verwendet das
              Formular ein unsichtbares „Honeypot"-Feld sowie eine
              IP-basierte Ratenbegrenzung; IP-Adressen werden dabei nicht
              dauerhaft gespeichert.
            </p>
          </LegalBlock>

          <LegalBlock title="5. Cookies & lokaler Speicher">
            <p>
              Diese Website setzt grundsätzlich keine Tracking- oder
              Marketing-Cookies. Im lokalen Speicher des Browsers
              (localStorage) werden lediglich technisch notwendige oder
              funktionale Einstellungen abgelegt:
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5">
              <li>
                <strong>sorgel-design-theme</strong> — merkt sich Ihre
                Einstellung für hellen oder dunklen Modus.
              </li>
              <li>
                <strong>sorgel-design-consent</strong> — speichert Ihre
                Entscheidung zum Cookie-Hinweis, damit dieser nicht bei jedem
                Besuch erneut angezeigt wird.
              </li>
            </ul>
            <p className="mt-4">
              Diese Einträge werden ausschließlich in Ihrem Browser
              gespeichert und nicht an uns übertragen. Sie können sie
              jederzeit in den Browser-Einstellungen löschen.
            </p>
            <p className="mt-6">
              <button
                type="button"
                onClick={revoke}
                className="inline-flex items-center gap-2 rounded-lg border border-gallery-line bg-gallery-surface px-4 py-2 text-xs font-medium text-gallery-ink transition hover:border-stone-400 dark:hover:border-stone-600"
              >
                Cookie-Einstellungen zurücksetzen
              </button>
            </p>
          </LegalBlock>

          <LegalBlock title="6. Google Fonts (extern)">
            <p>
              Diese Website nutzt den Schriftart-Dienst{' '}
              <strong>Google Fonts</strong> der Google Ireland Limited
              (Gordon House, Barrow Street, Dublin 4, Irland). Die Schriftart
              „Inter" wird nur geladen, nachdem Sie dem entsprechenden
              Hinweis zugestimmt haben. Ohne Ihre Zustimmung wird auf eine
              lokale System-Schrift ausgewichen und es werden keine Daten an
              Google übertragen.
            </p>
            <p className="mt-4">
              Nach erteilter Einwilligung werden beim Laden der Schrift Ihre
              IP-Adresse sowie Informationen zu Browser und Betriebssystem an
              Server von Google übertragen. Eine Übermittlung in die USA
              kann nicht ausgeschlossen werden. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. a DSGVO (Einwilligung); Sie können diese
              jederzeit über den Button oben unter „Cookies & lokaler
              Speicher" widerrufen.
            </p>
            <p className="mt-4">
              Weitere Informationen:{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
              >
                policies.google.com/privacy
              </a>
              .
            </p>
          </LegalBlock>

          <LegalBlock title="7. Verschlüsselung (TLS/SSL)">
            <p>
              Diese Website nutzt aus Sicherheitsgründen eine TLS/SSL-
              Verschlüsselung. Sie erkennen eine verschlüsselte Verbindung
              daran, dass die Adresszeile des Browsers mit „https://"
              beginnt und das Schloss-Symbol angezeigt wird.
            </p>
          </LegalBlock>

          <LegalBlock title="8. Ihre Rechte">
            <p>
              Sie haben uns gegenüber folgende Rechte hinsichtlich Ihrer
              personenbezogenen Daten:
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
              <li>
                Recht, eine erteilte Einwilligung jederzeit mit Wirkung für
                die Zukunft zu widerrufen (Art. 7 Abs. 3 DSGVO)
              </li>
            </ul>
            <p className="mt-4">
              Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an{' '}
              <a
                href={SITE_EMAIL_MAILTO}
                className="underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
              >
                {SITE_EMAIL}
              </a>
              .
            </p>
          </LegalBlock>

          <LegalBlock title="9. Beschwerderecht bei der Aufsichtsbehörde">
            <p>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
              über die Verarbeitung Ihrer personenbezogenen Daten zu
              beschweren. Zuständig für Merkendorf (Bayern) ist:
            </p>
            <p className="mt-4">
              Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)
              <br />
              Promenade 18, 91522 Ansbach
              <br />
              <a
                href="https://www.lda.bayern.de"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
              >
                www.lda.bayern.de
              </a>
            </p>
          </LegalBlock>

          <LegalBlock title="10. Änderungen dieser Datenschutzerklärung">
            <p>
              Wir passen diese Datenschutzerklärung an, wenn sich die
              Rechtslage oder die von uns eingesetzten Dienste ändern. Es
              gilt jeweils die auf dieser Seite abrufbare Fassung.
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
