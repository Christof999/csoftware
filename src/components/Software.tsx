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
  FileStack,
  Inbox,
  KeyRound,
  Layers,
  Lock,
  Mails,
  Receipt,
  Repeat,
  Ruler,
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
import { MockupNote, Reveal } from './software/chrome'
import {
  AccountingMockup,
  InvoiceDashboardMockup,
  InvoiceListMockup,
  NachkalkulationMockup,
} from './software/invoiceMockups'
import { InboxMockup } from './software/inboxMockups'
import {
  DatevReportMockup,
  TimeAdminOverviewMockup,
  TimeTrackingPhoneMockup,
} from './software/timeMockups'
import { SystemFlow } from './software/SystemFlow'

// ─── Daten ────────────────────────────────────────────────────────────────────

type Feature = { Icon: typeof Clock; title: string; text: string }

type View = { Mockup: () => React.ReactElement; note: string; narrow?: boolean }

/**
 * Eine schmale Ansicht (das Telefon) steht neben der nächsten, statt allein
 * eine ganze Zeile zu belegen und rechts Leere zu lassen.
 */
function groupViews(views: View[]): View[][] {
  const rows: View[][] = []
  for (let i = 0; i < views.length; i += 1) {
    const next = views[i + 1]
    if (views[i].narrow && next) {
      rows.push([views[i], next])
      i += 1
    } else {
      rows.push([views[i]])
    }
  }
  return rows
}

type Program = {
  id: string
  n: string
  eyebrow: string
  name: string
  claim: string
  lead: string
  forWhom: string
  views: View[]
  features: Feature[]
  /** Nur beim Rechnungsprogramm: was alles im Menü steht. */
  modules?: { group: string; items: string[] }[]
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
    forWhom:
      'Handwerk, Bau, Montage, Außendienst — überall dort, wo die Arbeit nicht am Schreibtisch stattfindet.',
    views: [
      {
        Mockup: TimeTrackingPhoneMockup,
        note: 'Auf der Baustelle: Status, laufende Zeit und das Ausstempeln mit Pflichtfeld für die Pause.',
        narrow: true,
      },
      {
        Mockup: TimeAdminOverviewMockup,
        note: 'Im Büro: wer eingestempelt ist, was heute passiert ist, welche Anträge offen sind.',
      },
      {
        Mockup: DatevReportMockup,
        note: 'Zum Monatsende: der Nachweis der täglichen Arbeitszeit im DATEV-Format — Abwesenheitstage mit Kürzel und Regelarbeitszeit.',
      },
    ],
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
        text: 'Pausen werden nach dem Arbeitszeitgesetz gesetzt, Kommen und Gehen auf ein 15-Minuten-Raster geglättet, regionale Feiertage hinterlegt.',
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
    bg: 'bg-gallery-bg',
  },
  {
    id: 'auftrag-rechnung',
    n: '02',
    eyebrow: 'Angebot bis Zahlung',
    name: 'Auftrag & Rechnung',
    claim: 'Der ganze kaufmännische Teil, in eine Richtung und zurück.',
    lead:
      'Hier läuft der kaufmännische Teil des Betriebs zusammen. In eine Richtung: Angebot, Lieferschein, Rechnung, Mahnung — jeder Beleg entsteht aus dem davor, keiner wird abgetippt. In die andere Richtung: Eingangsrechnungen, Zahlungen, Bankabgleich und das Monatsbündel fürs Steuerbüro. Dazwischen die Nachkalkulation, die beide Seiten mit der Zeiterfassung verbindet.',
    forWhom:
      'Betriebe, die mit Aufmaß, Nachträgen und Teilrechnungen arbeiten — und denen Standardsoftware zu eng oder zu groß ist.',
    views: [
      {
        Mockup: InvoiceDashboardMockup,
        note: 'Der Einstieg: offene Posten, ablaufende Angebote, eigene Aufgaben, Umsatz der letzten sechs Monate.',
      },
      {
        Mockup: InvoiceListMockup,
        note: 'Ausgangsrechnungen mit Bearbeiter, Fälligkeit und Status. Bezahltes und Storniertes wandert ins Archiv, damit die Arbeitsliste kurz bleibt.',
      },
      {
        Mockup: NachkalkulationMockup,
        note: 'Die Nachkalkulation in der Rechnung: Soll aus dem Angebot, Ist aus der Zeiterfassung — angehakt und übernommen.',
      },
      {
        Mockup: AccountingMockup,
        note: 'Die Gegenrichtung: Eingangsrechnungen mit Skonto und Fälligkeit, Bankabgleich, und der Hinweis auf eine eigene Rechnung, die hier nicht hingehört.',
      },
    ],
    features: [
      {
        Icon: FileSignature,
        title: 'Angebot → Lieferschein → Rechnung',
        text: 'Belege lassen sich umwandeln statt abtippen. Positionen per Drag-and-drop sortieren, Zwischenüberschriften, Textbausteine, kundenspezifische Preise und eigene Briefköpfe je Firma.',
      },
      {
        Icon: Receipt,
        title: 'Nachkalkulation Soll/Ist',
        text: 'Das Angebot ist das Soll, die Zeiterfassung liefert das Ist. Abweichungen stehen Zeile für Zeile da; Azubi-Stunden laufen über einen eigenen Verrechnungssatz, nicht über den Facharbeitersatz.',
      },
      {
        Icon: Bot,
        title: 'Eingangsrechnungen lesen lassen',
        text: 'PDF oder Foto hochladen, den Rest machen Texterkennung und KI: Lieferant, Nummer, Netto, Steuer, Skontofrist, IBAN. Geprüft und freigegeben wird von Hand.',
      },
      {
        Icon: Banknote,
        title: 'Bankabgleich',
        text: 'Kontoauszug einlesen, Umsätze werden Belegen zugeordnet. Denselben Auszug zweimal einzulesen ist harmlos — nichts wird doppelt verbucht, bestätigte Zuordnungen bleiben.',
      },
      {
        Icon: FileSpreadsheet,
        title: 'Monatsbündel fürs Steuerbüro',
        text: 'Alle Belege eines Monats als ein PDF, auf Knopfdruck gebaut und verschickt — mit einer Liste dessen, was noch fehlt. Zweimal verschicken verhindert das Programm.',
      },
      {
        Icon: Ruler,
        title: 'GAEB & Leistungsverzeichnisse',
        text: 'Ausschreibungen im GAEB-Format einlesen, Leistungsverzeichnisse pflegen und daraus Angebote bauen — statt Positionen aus einem PDF abzuschreiben.',
      },
      {
        Icon: Repeat,
        title: 'Mahnwesen, Zahlungen, Aufgaben',
        text: 'Offene Posten, Zahlungseingänge, Mahnstufen und Wiedervorlagen laufen mit — inklusive der Aufgaben, die daraus für einzelne Mitarbeiter entstehen.',
      },
      {
        Icon: FileStack,
        title: 'Import statt Nacherfassung',
        text: 'Artikel, Kunden und ganze Altbestände an Dokumenten lassen sich übernehmen. Der Umstieg beginnt nicht bei null.',
      },
      {
        Icon: Search,
        title: 'Suche und Assistent',
        text: 'Eine Suche über alle Belege, Kunden und Artikel — und ein KI-Assistent, der Fragen an den eigenen Datenbestand in normaler Sprache beantwortet.',
      },
      {
        Icon: Building2,
        title: 'Mehrere Firmen unter einem Dach',
        text: 'Getrennte Nummernkreise, Briefköpfe und Auswertungen, wenn im Haus mehr als eine Firma geführt wird.',
      },
    ],
    modules: [
      {
        group: 'Verkauf',
        items: ['Angebote', 'Lieferscheine', 'Rechnungen', 'Rechnungsarchiv', 'Mahnungen', 'Zahlungen'],
      },
      {
        group: 'Stammdaten',
        items: ['Artikel & Variationen', 'Kundenpreise', 'Kunden', 'Kategorien', 'Standardtexte', 'Briefköpfe'],
      },
      {
        group: 'Kalkulation',
        items: ['Leistungsverzeichnisse', 'GAEB-Import', 'Nachkalkulation Soll/Ist'],
      },
      {
        group: 'Buchhaltung',
        items: ['Eingangsrechnungen', 'Belegerkennung', 'Bankabgleich', 'Monatsbündel Steuerbüro'],
      },
      {
        group: 'Organisation',
        items: ['Aufgaben', 'Benachrichtigungen', 'Statistiken', 'KI-Assistent', 'Import'],
      },
    ],
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
    forWhom:
      'Betriebe mit mehreren Mailadressen, bei denen Belege zwischen info@, buchhaltung@ und dem Handy des Chefs verloren gehen.',
    views: [
      {
        Mockup: InboxMockup,
        note: 'Ordner und Postfächer links, Kategorien als Filter, je Mail eine Karte mit Abzeichen und der Zusammenfassung der KI. Unten das, was aus Mail und PDF herausgelesen und weitergereicht wurde.',
      },
    ],
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
                  className="inline-flex items-center gap-2 rounded-full border border-gallery-line bg-gallery-bg px-4 py-2 text-xs font-medium text-gallery-ink transition hover:border-stone-400 active:scale-[0.98] dark:hover:border-stone-600"
                >
                  <span className="font-mono text-shell-subtle">{item.n}</span>
                  {item.label}
                </a>
              ))}
            </motion.nav>

            <motion.p
              custom={4}
              variants={fadeInUp}
              className="mt-8 max-w-2xl border-l-2 border-gallery-line pl-4 text-sm leading-relaxed text-shell-subtle"
            >
              Die Ansichten auf dieser Seite sind nachgebaut: Aufbau, Menüs, Spalten und
              Abzeichen entsprechen den Programmen, die Daten darin sind erfunden. Die
              Akzentfarbe und das Logo kommen im Einsatz aus dem Erscheinungsbild des
              Betriebs — hier stehen neutrale.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Programme */}
      {PROGRAMS.map((p) => (
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
              className="grid gap-8 sm:grid-cols-[1fr_2fr] sm:gap-20 sm:items-start"
            >
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
                  {p.name} — <span className="text-shell-muted">{p.claim}</span>
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
            </motion.div>

            {/* Ansichten über die volle Breite */}
            <div className="mt-14 space-y-10">
              {groupViews(p.views).map((row, ri) => (
                <Reveal key={ri} delay={ri === 0 ? 0 : 0.05}>
                  <div
                    className={
                      row.length === 2
                        ? 'grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:items-start'
                        : ''
                    }
                  >
                    {row.map((v, vi) => (
                      <div
                        key={vi}
                        className={v.narrow ? 'mx-auto w-full max-w-[260px]' : 'min-w-0'}
                      >
                        <v.Mockup />
                        <MockupNote>{v.note}</MockupNote>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Funktionen */}
            <Reveal delay={0.05}>
              <div className="mt-16 grid gap-x-10 gap-y-8 border-t border-gallery-line pt-12 sm:grid-cols-2 lg:grid-cols-3">
                {p.features.map((f) => (
                  <div key={f.title}>
                    <f.Icon className="h-4 w-4 text-shell-subtle" aria-hidden />
                    <p className="mt-3 font-display text-sm font-semibold text-gallery-ink">
                      {f.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-shell-muted">{f.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Was im Menü steht */}
            {p.modules ? (
              <Reveal delay={0.05}>
                <div className="mt-12 rounded-2xl border border-gallery-line bg-gallery-bg p-6 sm:p-8">
                  <p className="text-xs font-medium uppercase tracking-widest text-shell-muted">
                    Was im Menü steht
                  </p>
                  <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
                    {p.modules.map((m) => (
                      <div key={m.group}>
                        <p className="font-display text-sm font-semibold text-gallery-ink">
                          {m.group}
                        </p>
                        <ul className="mt-2.5 space-y-1.5">
                          {m.items.map((i) => (
                            <li
                              key={i}
                              className="flex gap-2 text-sm leading-snug text-shell-muted"
                            >
                              <span
                                className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-shell-subtle"
                                aria-hidden
                              />
                              {i}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>
      ))}

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
