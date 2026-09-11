import { motion, type Variants } from 'framer-motion'
import {
  Camera,
  Check,
  Clock,
  FileText,
  Landmark,
  MapPin,
  Package,
  Paperclip,
  Send,
  Sparkles,
} from 'lucide-react'

/**
 * Anonymisierte Oberflächen-Nachbauten der drei Programme.
 *
 * Bewusst kein Screenshot eines echten Mandanten: Firmennamen, Mitarbeiter,
 * Projekte und Beträge sind erfunden. Aufbau, Felder und Abläufe entsprechen
 * dagegen den tatsächlichen Programmen — sie sind aus deren Datenmodellen
 * abgeleitet (Soll/Ist-Nachkalkulation, DATEV-Kürzel, KI-Kategorien).
 */

// ─── Shared shell ─────────────────────────────────────────────────────────────

export function AppFrame({
  title,
  subtitle,
  children,
  tone = 'light',
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  tone?: 'light' | 'dark'
}) {
  const dark = tone === 'dark'
  return (
    <div
      className={`min-w-0 overflow-hidden rounded-2xl border shadow-soft select-none dark:shadow-softDark ${
        dark
          ? 'border-stone-800 bg-stone-950'
          : 'border-gallery-line bg-gallery-surface'
      }`}
    >
      <div
        className={`flex items-center gap-3 border-b px-4 py-3 ${
          dark ? 'border-stone-800 bg-stone-900/60' : 'border-gallery-line bg-gallery-bg'
        }`}
      >
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-stone-400/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-400/35" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-400/25" />
        </div>
        <div className="min-w-0">
          <p
            className={`truncate text-[11px] font-medium ${
              dark ? 'text-stone-300' : 'text-gallery-ink'
            }`}
          >
            {title}
          </p>
          {subtitle ? (
            <p
              className={`truncate text-[10px] ${
                dark ? 'text-stone-500' : 'text-shell-subtle'
              }`}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  )
}

/** Hinweis, dass die Ansicht nachgebaut und mit Beispieldaten gefüllt ist. */
export function MockupNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-[11px] leading-relaxed text-shell-subtle">{children}</p>
  )
}

/** Kurve wie in `lib/motion` — als Tupel, sonst passt der Typ nicht. */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const rise: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 + i * 0.05, duration: 0.4, ease: EASE_OUT },
  }),
}

// ─── 01 · Zeiterfassung ───────────────────────────────────────────────────────

const RECENT = [
  { day: 'Gestern', project: 'Neubau Ahornweg 12', hours: '8:15' },
  { day: 'Mo, 12.', project: 'Sanierung Marktplatz 4', hours: '7:45' },
  { day: 'Fr, 09.', project: 'Neubau Ahornweg 12', hours: '9:00' },
]

export function TimeTrackingMockup() {
  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)] sm:items-start">
      {/* Mobile: Baustellen-Ansicht */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        custom={0}
        variants={rise}
        className="mx-auto w-full max-w-[220px] overflow-hidden sm:max-w-[180px] rounded-[1.6rem] border-4 border-stone-800 bg-stone-950 shadow-xl dark:border-stone-700"
      >
        <div className="flex items-center justify-between px-3 pb-1 pt-2">
          <span className="text-[9px] font-medium text-stone-500">07:12</span>
          <span className="h-1 w-8 rounded-full bg-stone-700" aria-hidden />
          <span className="text-[9px] text-stone-600">▮▮▮</span>
        </div>

        <div className="px-3 pb-3">
          <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3">
            <p className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-wider text-emerald-400">
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              </span>
              Eingestempelt
            </p>
            <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-stone-50">
              4:38
            </p>
            <p className="mt-0.5 truncate text-[10px] text-stone-400">
              Neubau Ahornweg 12
            </p>
            <p className="mt-2 flex items-center gap-1 text-[9px] text-stone-500">
              <MapPin className="h-2.5 w-2.5" aria-hidden />
              Standort erfasst · Pause 0:30 gesetzt
            </p>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            {[
              { Icon: Camera, label: 'Foto' },
              { Icon: Package, label: 'Material' },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-lg border border-stone-800 bg-stone-900 px-2 py-2"
              >
                <Icon className="h-3 w-3 text-stone-400" aria-hidden />
                <span className="text-[9px] text-stone-400">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-1.5 rounded-lg bg-stone-100 py-2 text-center text-[10px] font-semibold text-stone-900">
            Ausstempeln
          </div>

          <ul className="mt-3 space-y-1.5">
            {RECENT.map((r) => (
              <li
                key={r.day}
                className="flex items-center justify-between gap-2 border-t border-stone-800/80 pt-1.5 text-[9px]"
              >
                <span className="min-w-0">
                  <span className="block text-stone-500">{r.day}</span>
                  <span className="block truncate text-stone-400">{r.project}</span>
                </span>
                <span className="shrink-0 tabular-nums text-stone-300">{r.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Büro: DATEV-Nachweis */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        custom={1}
        variants={rise}
        className="min-w-0"
      >
        <AppFrame
          title="Zeiterfassungsbericht · Mai"
          subtitle="Nachweis der täglichen Arbeitszeit"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[290px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gallery-line text-[9px] uppercase tracking-wider text-shell-subtle">
                  <th className="px-1.5 py-2 font-medium">Tag</th>
                  <th className="px-1.5 py-2 font-medium">Beginn</th>
                  <th className="px-1.5 py-2 font-medium">Ende</th>
                  <th className="px-1.5 py-2 font-medium">Pause</th>
                  <th className="px-1.5 py-2 text-right font-medium">Dauer</th>
                  <th className="px-1.5 py-2 font-medium">*</th>
                </tr>
              </thead>
              <tbody className="text-[11px] tabular-nums text-shell-muted">
                {[
                  ['Mo 06.', '07:02', '16:34', '0:45', '8:47', ''],
                  ['Di 07.', '06:58', '17:10', '1:00', '9:12', ''],
                  ['Mi 08.', '—', '—', '—', '8:00', 'U'],
                  ['Do 09.', '—', '—', '—', '8:00', 'F'],
                  ['Fr 10.', '07:05', '13:20', '0:30', '5:45', 'SU'],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-gallery-line/60 last:border-0">
                    <td className="px-1.5 py-1.5 text-gallery-ink">{row[0]}</td>
                    <td className="px-1.5 py-1.5">{row[1]}</td>
                    <td className="px-1.5 py-1.5">{row[2]}</td>
                    <td className="px-1.5 py-1.5">{row[3]}</td>
                    <td className="px-1.5 py-1.5 text-right font-medium text-gallery-ink">
                      {row[4]}
                    </td>
                    <td className="px-1.5 py-1.5">
                      {row[5] ? (
                        <span className="rounded border border-gallery-line px-1 py-px text-[9px] font-medium text-shell-subtle">
                          {row[5]}
                        </span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-gallery-line bg-gallery-bg px-2.5 py-2 text-[9px] text-shell-subtle">
            <span>U = Urlaub</span>
            <span>K = Krank</span>
            <span>F = Feiertag</span>
            <span>SU = Stundenweise Urlaub</span>
            <span>S = Berufsschule</span>
            <span className="ml-auto font-medium text-gallery-ink">Summe 168:20</span>
          </div>
        </AppFrame>
      </motion.div>
    </div>
  )
}

// ─── 02 · Auftrag & Rechnung ──────────────────────────────────────────────────

const NACHKALK = [
  { name: 'Facharbeiterstunden', unit: 'Std', soll: '120,00', ist: '134,50', diff: '+14,50', extra: false },
  { name: 'Facharbeiter B', unit: 'Std', soll: '40,00', ist: '38,00', diff: '−2,00', extra: false },
  { name: 'Bodenfliesen 60×60', unit: 'm²', soll: '180,00', ist: '186,40', diff: '+6,40', extra: false },
  { name: 'Abdichtung Nassbereich', unit: 'm²', soll: '—', ist: '24,00', diff: 'neu', extra: true },
]

export function InvoiceMockup() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={0}
      variants={rise}
    >
      <AppFrame
        title="Rechnung RE-2026-0184 · Nachkalkulation"
        subtitle="Soll aus dem Angebot · Ist aus der Zeiterfassung"
      >
        <div className="grid grid-cols-3 gap-px border-b border-gallery-line bg-gallery-line">
          {[
            { label: 'Soll (Angebot)', value: '24.180,00 €' },
            { label: 'Ist (erfasst)', value: '26.412,40 €' },
            { label: 'Abweichung', value: '+9,2 %' },
          ].map((s) => (
            <div key={s.label} className="bg-gallery-surface px-3 py-2.5">
              <p className="text-[9px] uppercase tracking-wider text-shell-subtle">
                {s.label}
              </p>
              <p className="mt-0.5 text-[13px] font-semibold tabular-nums text-gallery-ink">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[360px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gallery-line text-[9px] uppercase tracking-wider text-shell-subtle">
                <th className="px-2 py-2 font-medium">Position</th>
                <th className="px-2 py-2 font-medium">Einheit</th>
                <th className="px-2 py-2 text-right font-medium">Soll</th>
                <th className="px-2 py-2 text-right font-medium">Ist</th>
                <th className="px-2 py-2 text-right font-medium">Δ</th>
              </tr>
            </thead>
            <tbody className="text-[11px] text-shell-muted">
              {NACHKALK.map((row, i) => (
                <motion.tr
                  key={row.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.35, ease: EASE_OUT }}
                  className="border-b border-gallery-line/60 last:border-0"
                >
                  <td className="px-2 py-2">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[4px] bg-gallery-ink text-gallery-bg"
                        aria-hidden
                      >
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-gallery-ink">{row.name}</span>
                      {row.extra ? (
                        <span className="rounded-full border border-gallery-line px-1.5 py-px text-[9px] text-shell-subtle">
                          nur Baustelle
                        </span>
                      ) : null}
                    </span>
                  </td>
                  <td className="px-2 py-2">{row.unit}</td>
                  <td className="px-2 py-2 text-right tabular-nums">{row.soll}</td>
                  <td className="px-2 py-2 text-right font-medium tabular-nums text-gallery-ink">
                    {row.ist}
                  </td>
                  <td className="px-2 py-2 text-right tabular-nums">{row.diff}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-gallery-line bg-gallery-bg px-3 py-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-gallery-ink px-3 py-1.5 text-[10px] font-medium text-gallery-bg">
            <FileText className="h-3 w-3" aria-hidden />
            4 Positionen übernehmen
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] text-shell-subtle">
            <Camera className="h-3 w-3" aria-hidden />
            12 Baustellenfotos hinterlegt
          </span>
        </div>
      </AppFrame>
    </motion.div>
  )
}

// ─── 03 · Posteingang ─────────────────────────────────────────────────────────

const MAILS = [
  {
    cat: 'Rechnung',
    from: 'Baustoffhandel Nord GmbH',
    subject: 'Rechnung 2026-4187 zum Auftrag 118',
    summary: 'Materiallieferung Ahornweg, zahlbar bis 14.06., 2 % Skonto bis 31.05.',
    attach: true,
    active: true,
  },
  {
    cat: 'Mahnung',
    from: 'Werkzeug & Technik AG',
    subject: '1. Zahlungserinnerung',
    summary: 'Offene Rechnung 2026-0918 über 412,30 € seit 12 Tagen fällig.',
    attach: true,
    active: false,
  },
  {
    cat: 'Anfrage',
    from: 'A. Weber',
    subject: 'Badsanierung — Termin im Juli?',
    summary: 'Interessent fragt nach Kapazität und grobem Preisrahmen.',
    attach: false,
    active: false,
  },
  {
    cat: 'Newsletter',
    from: 'Fachverband Mitteilungen',
    subject: 'Neues aus der Branche 05/26',
    summary: 'Massenmail ohne persönlichen Bezug.',
    attach: false,
    active: false,
  },
]

export function InboxMockup() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={0}
      variants={rise}
    >
      <AppFrame title="Posteingang · 4 Postfächer" subtitle="Sortiert von der KI">
        <ul className="divide-y divide-gallery-line">
          {MAILS.map((m, i) => (
            <motion.li
              key={m.subject}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 + i * 0.06, duration: 0.35, ease: EASE_OUT }}
              className={`px-3 py-2.5 ${m.active ? 'bg-gallery-bg' : ''}`}
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-gallery-line bg-gallery-surface px-2 py-px text-[9px] font-medium text-shell-muted">
                  {m.cat}
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-gallery-ink">
                  {m.from}
                </span>
                {m.attach ? (
                  <Paperclip className="h-3 w-3 shrink-0 text-shell-subtle" aria-hidden />
                ) : null}
              </div>
              <p className="mt-1 truncate text-[11px] text-shell-muted">{m.subject}</p>
              <p className="mt-0.5 flex items-start gap-1 text-[10px] leading-snug text-shell-subtle">
                <Sparkles className="mt-px h-2.5 w-2.5 shrink-0" aria-hidden />
                <span className="line-clamp-2">{m.summary}</span>
              </p>
            </motion.li>
          ))}
        </ul>

        {/* Was aus der Mail extrahiert wurde */}
        <div className="border-t border-gallery-line bg-gallery-bg px-3 py-3">
          <p className="text-[9px] font-medium uppercase tracking-wider text-shell-subtle">
            Aus Mail und PDF gelesen
          </p>
          <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px] sm:grid-cols-4">
            {[
              ['Lieferant', 'Baustoffhandel Nord'],
              ['Nummer', '2026-4187'],
              ['Betrag', '1.284,60 €'],
              ['Fällig', '14.06.2026'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-shell-subtle">{k}</dt>
                <dd className="mt-px truncate font-medium tabular-nums text-gallery-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2.5 flex items-center gap-1.5 text-[10px] text-shell-muted">
            <Send className="h-3 w-3 shrink-0" aria-hidden />
            An die Buchhaltung übergeben — Status „Ausstehend“
          </p>
        </div>
      </AppFrame>
    </motion.div>
  )
}

// ─── 04 · Buchhaltung / Bankabgleich ──────────────────────────────────────────

export function AccountingMockup() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={0}
      variants={rise}
    >
      <AppFrame title="Buchhaltung · Mai 2026" subtitle="Eingangsrechnungen & Bankabgleich">
        <div className="grid grid-cols-3 gap-px border-b border-gallery-line bg-gallery-line">
          {[
            { label: 'Offen', value: '7.412,80 €' },
            { label: 'Überfällig', value: '1 Beleg' },
            { label: 'Skonto bis 31.05.', value: '25,69 €' },
          ].map((s) => (
            <div key={s.label} className="bg-gallery-surface px-3 py-2.5">
              <p className="text-[9px] uppercase tracking-wider text-shell-subtle">{s.label}</p>
              <p className="mt-0.5 text-[12px] font-semibold tabular-nums text-gallery-ink">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <ul className="divide-y divide-gallery-line text-[11px]">
          {[
            { v: 'Baustoffhandel Nord', n: '2026-4187', a: '1.284,60 €', s: 'Bezahlt', matched: true },
            { v: 'Werkzeug & Technik AG', n: '2026-0918', a: '412,30 €', s: 'Überfällig', matched: false },
            { v: 'Fuhrpark Leasing', n: 'L-55021', a: '689,00 €', s: 'Genehmigt', matched: false },
          ].map((r) => (
            <li key={r.n} className="flex items-center gap-2 px-3 py-2">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-gallery-ink">{r.v}</span>
                <span className="block truncate text-[10px] text-shell-subtle">
                  Nr. {r.n}
                  {r.matched ? ' · Bankumsatz automatisch zugeordnet' : ''}
                </span>
              </span>
              <span className="shrink-0 tabular-nums text-shell-muted">{r.a}</span>
              <span className="shrink-0 rounded-full border border-gallery-line px-2 py-px text-[9px] text-shell-muted">
                {r.s}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-2 border-t border-gallery-line bg-gallery-bg px-3 py-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-gallery-ink px-3 py-1.5 text-[10px] font-medium text-gallery-bg">
            <Landmark className="h-3 w-3" aria-hidden />
            Monatsbündel ans Steuerbüro
          </span>
          <span className="text-[10px] text-shell-subtle">
            18 Belege · 1 Beleg fehlt noch
          </span>
        </div>
      </AppFrame>
    </motion.div>
  )
}

// ─── 05 · Live-Übersicht (Büro) ───────────────────────────────────────────────

const BARS = [38, 62, 48, 81, 56, 70, 44]

export function DashboardMockup() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={0}
      variants={rise}
    >
      <AppFrame title="Übersicht" subtitle="Frei zusammenstellbare Kacheln" tone="dark">
        <div className="space-y-2.5 p-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: 'Eingestempelt', v: '6' },
              { l: 'Aktive Projekte', v: '11' },
              { l: 'Urlaubsanträge', v: '2' },
            ].map((s) => (
              <div key={s.l} className="rounded-lg border border-stone-800 bg-stone-900 p-2.5">
                <p className="text-[9px] uppercase tracking-wider text-stone-500">{s.l}</p>
                <p className="mt-0.5 font-display text-lg font-semibold text-stone-100">
                  {s.v}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-stone-800 bg-stone-900 p-3">
            <p className="mb-3 text-[9px] uppercase tracking-wider text-stone-500">
              Stunden je Wochentag
            </p>
            <div className="flex h-16 items-end gap-1.5">
              {BARS.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.06, ease: EASE_OUT }}
                  className="flex-1 rounded-t-sm"
                  style={{ background: i === 3 ? 'rgb(168 162 158)' : 'rgb(68 64 60)' }}
                />
              ))}
            </div>
          </div>

          <ul className="space-y-1.5">
            {[
              ['07:02', 'M. B. eingestempelt · Ahornweg 12'],
              ['09:41', 'Material gebucht · 24 m² Abdichtung'],
              ['11:15', 'Tagesbericht an die Bauleitung verschickt'],
            ].map(([t, txt]) => (
              <li
                key={t}
                className="flex items-center gap-2 rounded-lg border border-stone-800/70 bg-stone-900/50 px-2.5 py-1.5"
              >
                <Clock className="h-3 w-3 shrink-0 text-stone-600" aria-hidden />
                <span className="shrink-0 text-[9px] tabular-nums text-stone-500">{t}</span>
                <span className="min-w-0 truncate text-[10px] text-stone-400">{txt}</span>
              </li>
            ))}
          </ul>
        </div>
      </AppFrame>
    </motion.div>
  )
}
