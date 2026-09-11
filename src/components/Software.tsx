import { motion } from 'framer-motion'
import {
  ArrowRight,
  Banknote,
  Bot,
  Building2,
  CalendarDays,
  Camera,
  Clock,
  Cloud,
  FileSignature,
  FileSpreadsheet,
  Inbox,
  KeyRound,
  Layers,
  Lock,
  Mails,
  Receipt,
  Repeat,
  Scale,
  Search,
  Smartphone,
  Truck,
  WifiOff,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp, staggerContainer } from '../lib/motion'
import { CaseStudyBlock } from './software/CaseStudies'
import { CASE_STUDIES } from './software/caseStudyData'
import {
  AccountingMockup,
  DashboardMockup,
  InboxMockup,
  InvoiceMockup,
  MockupNote,
  TimeTrackingMockup,
} from './software/mockups'
import { SystemFlow } from './software/SystemFlow'

// ─── Daten ────────────────────────────────────────────────────────────────────

type Feature = { Icon: typeof Clock; title: string; text: string }

type Program = {
  id: string
  n: string
  eyebrow: string
  name: string
  claim: string
  lead: string
  forWhom: string
  features: Feature[]
  Mockup: () => React.ReactElement
  note: string
  Secondary?: () => React.ReactElement
  secondaryNote?: string
  bg: string
}

const PROGRAMS: Program[] = [
  {
    id: 'zeiterfassung',
    n: '01',
    eyebrow: 'Arbeitszeit & Projektdoku',
    name: 'Zeiterfassung',
    claim: 'Die Stunde wird dort erfasst, wo sie entsteht.',
    lead:
      'Eine App fürs Handy für alle, die draußen arbeiten — und eine Büroansicht für alle, die daraus Berichte, Löhne und Rechnungen machen müssen. Gestempelt wird auf das Projekt, nicht ins Leere: was dabei verbaut, gefahren und fotografiert wurde, hängt am selben Eintrag.',
    forWhom: 'Handwerk, Bau, Montage, Außendienst — überall dort, wo die Arbeit nicht am Schreibtisch stattfindet.',
    features: [
      {
        Icon: Smartphone,
        title: 'Stempeln in zwei Sekunden',
        text: 'Projekt wählen, einstempeln. Projektwechsel mitten am Tag ist vorgesehen, nicht ein Sonderfall. Als Homescreen-App auf iPhone und Android, ohne App Store.',
      },
      {
        Icon: WifiOff,
        title: 'Funktioniert auch im Funkloch',
        text: 'Fotos und Einträge warten in einer Warteschlange und gehen raus, sobald wieder Netz da ist. Im Keller eines Rohbaus ist das kein Randfall.',
      },
      {
        Icon: Camera,
        title: 'Dokumentation am Eintrag',
        text: 'Fotos, Notizen und Materialmengen hängen am Zeiteintrag — nicht in einer WhatsApp-Gruppe, die in drei Monaten niemand mehr durchsucht.',
      },
      {
        Icon: Scale,
        title: 'Pausen nach Gesetz',
        text: 'Pausen werden nach dem Arbeitszeitgesetz gesetzt, Kommen und Gehen auf ein 15-Minuten-Raster geglättet, regionale Feiertage hinterlegt. Der Nachweis entsteht nebenbei.',
      },
      {
        Icon: CalendarDays,
        title: 'Urlaub, Krank, Überstunden',
        text: 'Urlaub wird in der App beantragt und freigegeben — mit Benachrichtigung aufs Gerät. Überstunden laufen auf einem Monatskonto und lassen sich abfeiern oder auszahlen.',
      },
      {
        Icon: Truck,
        title: 'Fahrzeuge & Material',
        text: 'Wer welchen Wagen gefahren hat und was verbraucht wurde, steht am selben Tag fest — statt am Monatsende rekonstruiert zu werden.',
      },
      {
        Icon: FileSpreadsheet,
        title: 'Berichte, die angenommen werden',
        text: 'Ausführlicher Projektbericht fürs Haus, DATEV-Nachweis der täglichen Arbeitszeit fürs Lohnbüro. Beides als PDF, auf Wunsch automatisch per Mail.',
      },
      {
        Icon: Layers,
        title: 'Übersicht nach Maß',
        text: 'Die Büroansicht wird aus Kacheln zusammengestellt: eingestempelte Mitarbeiter, aktive Projekte, offene Anträge, Live-Aktivitäten — jeder sieht, was er braucht.',
      },
    ],
    Mockup: TimeTrackingMockup,
    note:
      'Nachgebaute Ansichten mit erfundenen Daten — Aufbau und Felder entsprechen dem Programm.',
    Secondary: DashboardMockup,
    secondaryNote: 'Die Büroansicht: Kacheln frei zusammenstellbar.',
    bg: 'bg-gallery-bg',
  },
  {
    id: 'auftrag-rechnung',
    n: '02',
    eyebrow: 'Angebot bis Zahlung',
    name: 'Auftrag & Rechnung',
    claim: 'Ein Beleg entsteht aus dem vorherigen — nicht aus einer Vorlage.',
    lead:
      'Angebot, Lieferschein, Rechnung, Mahnung: jeder Schritt baut auf dem davor auf. Dazu die Gegenrichtung — Eingangsrechnungen, Zahlungen, Bankabgleich und das Monatsbündel fürs Steuerbüro. Beide Seiten im selben Programm, weil sie im Betrieb auch zusammengehören.',
    forWhom: 'Betriebe, die mit Aufmaß, Nachträgen und Teilrechnungen arbeiten — und denen Standardsoftware zu eng oder zu groß ist.',
    features: [
      {
        Icon: FileSignature,
        title: 'Angebot → Lieferschein → Rechnung',
        text: 'Belege lassen sich umwandeln statt abtippen. Positionen mit Variationen, kundenspezifische Preise, Textbausteine und eigene Briefköpfe je Firma.',
      },
      {
        Icon: Receipt,
        title: 'Nachkalkulation Soll/Ist',
        text: 'Das Angebot ist das Soll, die Zeiterfassung liefert das Ist. Abweichungen stehen Zeile für Zeile da — und was zusätzlich verbaut wurde, als eigene Position.',
      },
      {
        Icon: Bot,
        title: 'Eingangsrechnungen lesen lassen',
        text: 'PDF oder Foto hochladen, den Rest macht Texterkennung und KI: Lieferant, Nummer, Beträge, Steuer, Skontofrist, Bankverbindung. Geprüft und freigegeben wird von Hand.',
      },
      {
        Icon: Banknote,
        title: 'Bankabgleich',
        text: 'Kontoauszug einlesen, Umsätze werden Belegen zugeordnet. Denselben Auszug zweimal einzulesen ist harmlos — nichts wird doppelt verbucht.',
      },
      {
        Icon: FileSpreadsheet,
        title: 'Monatsbündel fürs Steuerbüro',
        text: 'Alle Belege eines Monats als ein PDF, auf Knopfdruck verschickt — mit einer Liste dessen, was noch fehlt.',
      },
      {
        Icon: Search,
        title: 'GAEB, Leistungsverzeichnisse, Import',
        text: 'Ausschreibungen im GAEB-Format einlesen, Leistungsverzeichnisse pflegen, Artikel- und Kundenstamm aus bestehenden Listen übernehmen.',
      },
      {
        Icon: Repeat,
        title: 'Mahnwesen & Aufgaben',
        text: 'Offene Posten, Zahlungserinnerungen und Wiedervorlagen laufen mit — inklusive dessen, was daraus an Arbeit folgt.',
      },
      {
        Icon: Building2,
        title: 'Mehrere Firmen unter einem Dach',
        text: 'Getrennte Nummernkreise, Briefköpfe und Auswertungen, wenn im Haus mehr als eine Firma geführt wird.',
      },
    ],
    Mockup: InvoiceMockup,
    note:
      'Die Nachkalkulation: links das Angebot, rechts, was tatsächlich gebraucht wurde.',
    Secondary: AccountingMockup,
    secondaryNote: 'Die Gegenrichtung — Eingangsrechnungen, Skonto, Bankabgleich.',
    bg: 'bg-gallery-surface',
  },
  {
    id: 'posteingang',
    n: '03',
    eyebrow: 'Mail & Belegerfassung',
    name: 'Posteingang',
    claim: 'Post, die sich selbst einsortiert.',
    lead:
      'Mehrere Postfächer laufen in einem Eingang zusammen. Eine KI liest jede Mail samt Anhang, ordnet sie einer festen Kategorie zu und zieht bei Rechnungen die Zahlen heraus. Was in die Buchhaltung gehört, geht von dort automatisch weiter.',
    forWhom: 'Betriebe mit mehreren Mailadressen, bei denen Belege zwischen info@, buchhaltung@ und dem Handy des Chefs verloren gehen.',
    features: [
      {
        Icon: Mails,
        title: 'Alle Postfächer, ein Eingang',
        text: 'Vier Adressen, ein Posteingang — und trotzdem sichtbar, wo eine Mail hereinkam. Geantwortet wird aus demselben Postfach.',
      },
      {
        Icon: Bot,
        title: 'Kategorie statt Freitext',
        text: 'Rechnung, Mahnung, Angebot, Bestellung, Lieferung, Anfrage, Vertrag, Newsletter, Sonstiges. Ein fester Satz — sonst lässt sich nicht filtern und schon gar nicht archivieren.',
      },
      {
        Icon: Inbox,
        title: 'Der Anhang wird mitgelesen',
        text: 'Bei „anbei unsere Rechnung“ steht der Betrag im PDF und in keiner Zeile Mailtext. Anhänge gehen deshalb mit in die Auswertung.',
      },
      {
        Icon: Search,
        title: 'Suchen wie mit Worten',
        text: 'Nicht nur Volltext: „Was ist diesen Monat von der Spedition gekommen?“ ist eine gültige Frage.',
      },
      {
        Icon: KeyRound,
        title: 'Zugangsdaten liegen woanders',
        text: 'Die Postfach-Passwörter stehen nicht in der App, sondern verschlüsselt in einem eigenen Mail-Proxy. Die App kennt nur dessen Adresse und einen eingeschränkten Schlüssel.',
      },
      {
        Icon: Lock,
        title: 'Jeder sieht seinen Eingang',
        text: 'Mehrbenutzer-System mit getrennten Posteingängen und Postfächern. Konten legt ein Administrator an — eine Selbstregistrierung gibt es nicht.',
      },
    ],
    Mockup: InboxMockup,
    note:
      'Oben die Sortierung, unten das, was aus Mail und PDF herausgelesen wurde.',
    bg: 'bg-gallery-bg',
  },
]

const FOUNDATION = [
  {
    Icon: Cloud,
    title: 'Läuft im Browser, auf jedem Gerät',
    text: 'Keine Installation, keine Lizenzschlüssel, kein Server im Keller. Auf dem Handy lässt sich die App auf den Startbildschirm legen und verhält sich wie eine native App.',
  },
  {
    Icon: Lock,
    title: 'Rollen und Rechte',
    text: 'Mitarbeiter sehen ihre eigenen Daten, die Bauleitung ihr Projekt, das Büro alles. Durchgesetzt wird das nicht in der Oberfläche, sondern in der Datenbank.',
  },
  {
    Icon: Scale,
    title: 'Nachvollziehbar statt bequem',
    text: 'Korrekturen an Zeiten tragen Bearbeiter, Zeitpunkt und Grund. Belege werden über ihre Kennung erkannt, nicht über die Reihenfolge — dasselbe zweimal zu schicken bleibt folgenlos.',
  },
  {
    Icon: Building2,
    title: 'Hosting in der EU, Daten bleiben Ihre',
    text: 'Betrieb in europäischen Rechenzentren, Auftragsverarbeitung vertraglich geregelt, Export der eigenen Daten jederzeit möglich. Kein Modell, bei dem die Daten das Druckmittel sind.',
  },
]

const AI_USES = [
  {
    title: 'Wo KI hilft',
    items: [
      'Eine Rechnung im PDF lesen und die Zahlen herausziehen',
      'Mails einsortieren und in einem Satz zusammenfassen',
      'Freitext aus der Baustelle in saubere Positionen bringen',
      'Fragen an den eigenen Datenbestand in normaler Sprache',
    ],
  },
  {
    title: 'Wo sie nichts zu suchen hat',
    items: [
      'Beträge raten, wenn sie im Beleg nicht stehen — lieber ein leeres Feld',
      'Rechnungen freigeben oder Zahlungen auslösen',
      'Arbeitszeiten korrigieren',
      'Alles, wofür am Ende jemand mit Namen geradesteht',
    ],
  },
]

// ─── Seite ────────────────────────────────────────────────────────────────────

export function Software() {
  return (
    <div>
      {/* Kopf */}
      <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <div className="flex items-center gap-4 border-b border-gallery-line pb-8">
              <motion.p
                custom={0}
                variants={fadeInUp}
                className="text-xs font-medium uppercase tracking-widest text-shell-muted"
              >
                Software
              </motion.p>
            </div>

            <motion.h1
              custom={1}
              variants={fadeInUp}
              className="mt-10 max-w-4xl font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl sm:leading-[1.08] lg:text-6xl"
            >
              Programme, die Ihren
              <br />
              <span className="text-shell-muted">Betrieb schon kennen.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-shell-muted"
            >
              Drei Programme für Zeiterfassung, Abrechnung und Posteingang. Einzeln
              einsetzbar — zusammen ergeben sie einen Ablauf, in dem dieselbe Zahl
              nur einmal erfasst wird. Entwickelt im echten Betrieb, nicht am Reißbrett.
            </motion.p>

            <motion.nav
              custom={3}
              variants={fadeInUp}
              className="mt-10 flex flex-wrap gap-2"
              aria-label="Abschnitte"
            >
              {[
                ...PROGRAMS.map((p) => ({ id: p.id, n: p.n, label: p.name })),
                { id: 'symbiose', n: '04', label: 'Zusammenspiel' },
                { id: 'praxis', n: '05', label: 'Praxisbeispiele' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-gallery-line bg-gallery-bg px-4 py-2 text-xs font-medium text-gallery-ink transition hover:border-stone-400 dark:hover:border-stone-600"
                >
                  <span className="font-mono text-shell-subtle">{item.n}</span>
                  {item.label}
                </a>
              ))}
            </motion.nav>
          </motion.div>
        </div>
      </section>

      {/* Programme */}
      {PROGRAMS.map((p, pi) => {
        // Abwechselnd: erste Sektion Ansicht links, zweite rechts, …
        const mockupRight = pi % 2 === 1
        return (
          <section
            key={p.id}
            id={p.id}
            className={`scroll-mt-16 border-b border-gallery-line py-20 sm:py-28 ${p.bg}`}
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={staggerContainer}
              >
                {/* Kopfzeile */}
                <div className="grid gap-8 sm:grid-cols-[1fr_2fr] sm:gap-20 sm:items-start">
                  <div>
                    <motion.p
                      custom={0}
                      variants={fadeInUp}
                      className="font-mono text-xs text-shell-subtle"
                    >
                      {p.n}
                    </motion.p>
                    <motion.p
                      custom={1}
                      variants={fadeInUp}
                      className="mt-2 text-xs font-medium uppercase tracking-widest text-shell-muted"
                    >
                      {p.eyebrow}
                    </motion.p>
                  </div>

                  <div>
                    <motion.h2
                      custom={1}
                      variants={fadeInUp}
                      className="font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12]"
                    >
                      {p.name} —{' '}
                      <span className="text-shell-muted">{p.claim}</span>
                    </motion.h2>

                    <motion.p
                      custom={2}
                      variants={fadeInUp}
                      className="mt-6 text-base leading-relaxed text-shell-muted sm:text-lg"
                    >
                      {p.lead}
                    </motion.p>

                    <motion.p
                      custom={3}
                      variants={fadeInUp}
                      className="mt-5 border-l-2 border-gallery-line pl-4 text-sm leading-relaxed text-shell-subtle"
                    >
                      <span className="font-medium text-shell-muted">Für wen: </span>
                      {p.forWhom}
                    </motion.p>
                  </div>
                </div>

                {/* Ansicht + Funktionen */}
                <div
                  className={`mt-14 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16 ${
                    mockupRight ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <motion.div custom={4} variants={fadeInUp} className="min-w-0">
                    <p.Mockup />
                    <MockupNote>{p.note}</MockupNote>

                    {p.Secondary ? (
                      <div className="mt-8">
                        <p.Secondary />
                        {p.secondaryNote ? <MockupNote>{p.secondaryNote}</MockupNote> : null}
                      </div>
                    ) : null}
                  </motion.div>

                  <motion.div
                    custom={5}
                    variants={fadeInUp}
                    className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
                  >
                    {p.features.map((f) => (
                      <div key={f.title}>
                        <f.Icon className="h-4 w-4 text-shell-subtle" aria-hidden />
                        <p className="mt-3 font-display text-sm font-semibold text-gallery-ink">
                          {f.title}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-shell-muted">
                          {f.text}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        )
      })}

      {/* Zusammenspiel */}
      <section
        id="symbiose"
        className="scroll-mt-16 border-b border-gallery-line bg-gallery-surface py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid gap-10 sm:grid-cols-[1fr_2fr] sm:gap-20 sm:items-start"
          >
            <div>
              <motion.p
                custom={0}
                variants={fadeInUp}
                className="font-mono text-xs text-shell-subtle"
              >
                04
              </motion.p>
              <motion.p
                custom={1}
                variants={fadeInUp}
                className="mt-2 text-xs font-medium uppercase tracking-widest text-shell-muted"
              >
                Zusammenspiel
              </motion.p>
            </div>

            <div>
              <motion.h2
                custom={1}
                variants={fadeInUp}
                className="font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12]"
              >
                Jede Zahl wird einmal erfasst —{' '}
                <span className="text-shell-muted">danach wandert sie nur noch.</span>
              </motion.h2>

              <motion.p
                custom={2}
                variants={fadeInUp}
                className="mt-6 text-base leading-relaxed text-shell-muted sm:text-lg"
              >
                Der teuerste Teil einer Betriebssoftware ist nicht das Programm, sondern
                das Abtippen dazwischen. Die drei Programme reden deshalb miteinander:
                gestempelte Stunden werden zu Rechnungspositionen, eingegangene Mails zu
                Eingangsrechnungen, Eingangsrechnungen zu einem Monatsbündel fürs
                Steuerbüro.
              </motion.p>
            </div>
          </motion.div>

          <div className="mt-14">
            <SystemFlow />
          </div>
        </div>
      </section>

      {/* Praxisbeispiele */}
      <section
        id="praxis"
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
            <div>
              <motion.p
                custom={0}
                variants={fadeInUp}
                className="font-mono text-xs text-shell-subtle"
              >
                05
              </motion.p>
              <motion.p
                custom={1}
                variants={fadeInUp}
                className="mt-2 text-xs font-medium uppercase tracking-widest text-shell-muted"
              >
                Praxisbeispiele
              </motion.p>
            </div>

            <div>
              <motion.h2
                custom={1}
                variants={fadeInUp}
                className="font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12]"
              >
                Drei Abläufe,{' '}
                <span className="text-shell-muted">wie sie tatsächlich laufen.</span>
              </motion.h2>
              <motion.p
                custom={2}
                variants={fadeInUp}
                className="mt-6 text-base leading-relaxed text-shell-muted sm:text-lg"
              >
                Die Betriebe dahinter bleiben ungenannt. Beschrieben ist, was die
                Programme tun — Schritt für Schritt, samt der Vorkehrungen, die man
                erst vermisst, wenn sie fehlen.
              </motion.p>
            </div>
          </motion.div>

          <div className="mt-16 space-y-12 sm:space-y-16">
            {CASE_STUDIES.map((study) => (
              <CaseStudyBlock key={study.id} study={study} />
            ))}
          </div>
        </div>
      </section>

      {/* KI */}
      <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
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
              KI im Betrieb
            </motion.p>

            <div>
              <motion.h2
                custom={1}
                variants={fadeInUp}
                className="font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12]"
              >
                KI dort, wo sie Tipparbeit spart —{' '}
                <span className="text-shell-muted">und nur dort.</span>
              </motion.h2>

              <motion.p
                custom={2}
                variants={fadeInUp}
                className="mt-6 text-base leading-relaxed text-shell-muted sm:text-lg"
              >
                KI ist in diesen Programmen kein Aufkleber. Sie liest Belege, sortiert
                Post und bringt Freitext in Form. Entschieden wird weiterhin von
                Menschen — eine Freigabe, die niemand mehr verantwortet, ist keine
                Zeitersparnis, sondern ein Haftungsrisiko.
              </motion.p>

              <motion.div custom={3} variants={fadeInUp} className="mt-10 grid gap-6 sm:grid-cols-2">
                {AI_USES.map((col) => (
                  <div
                    key={col.title}
                    className="rounded-xl border border-gallery-line bg-gallery-bg p-5"
                  >
                    <p className="text-xs font-medium uppercase tracking-widest text-shell-muted">
                      {col.title}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {col.items.map((i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 text-sm leading-relaxed text-shell-muted"
                        >
                          <span
                            className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-shell-subtle"
                            aria-hidden
                          />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grundlagen */}
      <section className="border-b border-gallery-line bg-gallery-bg py-20 sm:py-28">
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
              Grundlagen
            </motion.p>

            <div>
              <motion.h2
                custom={1}
                variants={fadeInUp}
                className="font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12]"
              >
                Was für alle drei gilt.
              </motion.h2>

              <motion.div
                custom={2}
                variants={fadeInUp}
                className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2"
              >
                {FOUNDATION.map((f) => (
                  <div key={f.title}>
                    <f.Icon className="h-4 w-4 text-shell-subtle" aria-hidden />
                    <p className="mt-3 font-display text-sm font-semibold text-gallery-ink">
                      {f.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-shell-muted">{f.text}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Abschluss */}
      <section className="bg-gallery-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.h2
              custom={0}
              variants={fadeInUp}
              className="font-display text-3xl font-semibold leading-tight tracking-tight text-gallery-ink sm:text-4xl sm:leading-[1.12]"
            >
              Kein Betrieb ist wie der andere.{' '}
              <span className="text-shell-muted">Die Software sollte das abbilden.</span>
            </motion.h2>

            <motion.p
              custom={1}
              variants={fadeInUp}
              className="mt-6 text-base leading-relaxed text-shell-muted sm:text-lg"
            >
              Die Programme sind im laufenden Betrieb entstanden und werden dort weiter
              angepasst. Genau so kommen sie auch zu Ihnen: Wir schauen uns Ihren Ablauf
              an, setzen auf, was passt, und bauen um, was nicht passt. Bestehende
              Software muss dabei nicht weichen — eine Schnittstelle ist oft der
              günstigere Weg als ein Umstieg.
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeInUp}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                to="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-stone-800 active:scale-[0.98] dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
              >
                Ablauf besprechen
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/leistungen"
                className="inline-flex items-center justify-center rounded-lg border border-gallery-line bg-gallery-bg px-6 py-3.5 text-sm font-medium text-gallery-ink transition hover:border-stone-400 active:scale-[0.98] dark:hover:border-stone-600"
              >
                Alle Leistungen
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
