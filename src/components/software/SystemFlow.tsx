import { motion } from 'framer-motion'
import {
  ArrowDown,
  Banknote,
  Clock,
  FileSpreadsheet,
  HardHat,
  Inbox,
  Mail,
  Receipt,
  UserRound,
} from 'lucide-react'
import { fadeInUp, staggerContainer } from '../../lib/motion'

/**
 * Der Datenfluss zwischen den drei Programmen — von oben nach unten gelesen.
 * Bewusst als HTML-Fluss und nicht als SVG: so bleibt er auf dem Handy
 * lesbar, statt auf Briefmarkengröße zu schrumpfen.
 */

const SOURCES = [
  {
    Icon: Mail,
    label: 'Postfächer',
    text: 'Lieferanten, Rechnungen, Mahnungen, Kundenanfragen',
  },
  {
    Icon: HardHat,
    label: 'Baustelle & Außendienst',
    text: 'Stunden, Material, Fotos, Fahrzeuge — vom Handy',
  },
]

const STAGE_ONE = [
  {
    Icon: Inbox,
    name: 'Posteingang',
    role: 'liest, sortiert, erkennt',
    points: [
      'Mail und PDF-Anhang werden gemeinsam ausgewertet',
      'Feste Kategorien statt Freitext — Rechnung, Mahnung, Anfrage …',
      'Lieferant, Nummer, Betrag, Fälligkeit werden herausgezogen',
    ],
    out: 'Rechnungsdaten + Beleg',
  },
  {
    Icon: Clock,
    name: 'Zeiterfassung',
    role: 'erfasst, dokumentiert, prüft',
    points: [
      'Ein- und Ausstempeln aufs Projekt, auch ohne Empfang',
      'Pausen nach Arbeitszeitgesetz, Feiertage regional hinterlegt',
      'Material, Fotos und Notizen hängen am Zeiteintrag',
    ],
    out: 'Ist-Stunden + Ist-Material',
  },
]

const OUTPUTS = [
  { Icon: UserRound, label: 'Kunde', text: 'Angebot, Lieferschein, Rechnung — mit Beleglage dahinter' },
  { Icon: Banknote, label: 'Bank', text: 'Kontoauszug einlesen, Zahlungen den Belegen zuordnen' },
  { Icon: FileSpreadsheet, label: 'Steuer- & Lohnbüro', text: 'Monatsbündel und Arbeitszeitnachweise auf Knopfdruck' },
]

function Connector({ labels }: { labels: string[] }) {
  return (
    <div className="flex flex-col items-center gap-2 py-5" aria-hidden>
      <span className="h-6 w-px bg-gallery-line" />
      <div className="flex flex-wrap justify-center gap-2">
        {labels.map((l) => (
          <span
            key={l}
            className="rounded-full border border-gallery-line bg-gallery-surface px-3 py-1 text-[11px] font-medium text-shell-muted"
          >
            {l}
          </span>
        ))}
      </div>
      <ArrowDown className="h-4 w-4 text-shell-subtle" />
    </div>
  )
}

export function SystemFlow() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
    >
      {/* Eingänge */}
      <motion.div custom={0} variants={fadeInUp} className="grid gap-3 sm:grid-cols-2">
        {SOURCES.map((s) => (
          <div
            key={s.label}
            className="flex items-start gap-3 rounded-xl border border-dashed border-gallery-line px-4 py-3"
          >
            <s.Icon className="mt-0.5 h-4 w-4 shrink-0 text-shell-subtle" aria-hidden />
            <div>
              <p className="text-sm font-medium text-gallery-ink">{s.label}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-shell-muted">{s.text}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div custom={1} variants={fadeInUp}>
        <Connector labels={['kommt herein']} />
      </motion.div>

      {/* Stufe 1 */}
      <motion.div custom={2} variants={fadeInUp} className="grid gap-4 sm:grid-cols-2">
        {STAGE_ONE.map((p) => (
          <div
            key={p.name}
            className="flex flex-col rounded-2xl border border-gallery-line bg-gallery-surface p-5 shadow-card"
          >
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gallery-line bg-gallery-bg">
                <p.Icon className="h-4 w-4 text-gallery-ink" aria-hidden />
              </span>
              <div>
                <p className="font-display text-base font-semibold tracking-tight text-gallery-ink">
                  {p.name}
                </p>
                <p className="text-[11px] text-shell-subtle">{p.role}</p>
              </div>
            </div>
            <ul className="mt-4 flex-1 space-y-2">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-2 text-xs leading-relaxed text-shell-muted">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-shell-subtle" aria-hidden />
                  {pt}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-gallery-line pt-3 text-[11px] font-medium text-gallery-ink">
              gibt weiter: <span className="font-normal text-shell-muted">{p.out}</span>
            </p>
          </div>
        ))}
      </motion.div>

      <motion.div custom={3} variants={fadeInUp}>
        <Connector labels={['Eingangsrechnungen', 'Soll/Ist je Projekt']} />
      </motion.div>

      {/* Stufe 2 */}
      <motion.div
        custom={4}
        variants={fadeInUp}
        className="rounded-2xl border border-gallery-line bg-gallery-elevated p-5 shadow-card sm:p-6"
      >
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gallery-line bg-gallery-surface">
            <Receipt className="h-4 w-4 text-gallery-ink" aria-hidden />
          </span>
          <div>
            <p className="font-display text-base font-semibold tracking-tight text-gallery-ink">
              Auftrag & Rechnung
            </p>
            <p className="text-[11px] text-shell-subtle">führt zusammen und rechnet ab</p>
          </div>
        </div>
        <div className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {[
            'Angebot, Lieferschein und Rechnung bauen aufeinander auf',
            'Nachkalkulation stellt Angebot und tatsächlichen Aufwand gegenüber',
            'Eingangsrechnungen mit Skonto, Fälligkeit und Freigabe',
            'Bankumsätze werden Belegen zugeordnet — doppelt geht nicht',
          ].map((t) => (
            <p key={t} className="flex gap-2 text-xs leading-relaxed text-shell-muted">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-shell-subtle" aria-hidden />
              {t}
            </p>
          ))}
        </div>
      </motion.div>

      <motion.div custom={5} variants={fadeInUp}>
        <Connector labels={['geht hinaus']} />
      </motion.div>

      {/* Ausgänge */}
      <motion.div custom={6} variants={fadeInUp} className="grid gap-3 sm:grid-cols-3">
        {OUTPUTS.map((o) => (
          <div
            key={o.label}
            className="flex items-start gap-3 rounded-xl border border-dashed border-gallery-line px-4 py-3"
          >
            <o.Icon className="mt-0.5 h-4 w-4 shrink-0 text-shell-subtle" aria-hidden />
            <div>
              <p className="text-sm font-medium text-gallery-ink">{o.label}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-shell-muted">{o.text}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
