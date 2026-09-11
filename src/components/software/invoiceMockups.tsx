import { motion } from 'framer-motion'
import {
  Archive,
  AlertCircle,
  Banknote,
  BarChart3,
  Bell,
  Bot,
  CalendarRange,
  Check,
  CheckSquare,
  ClipboardList,
  FileCheck,
  FileText,
  FileType,
  LayoutDashboard,
  List,
  Package,
  PenTool,
  Plus,
  Receipt,
  Search,
  Tag,
  Trash2,
  Truck,
  Upload,
  User,
  Users,
} from 'lucide-react'
import { BrowserChrome } from './chrome'
import { ACCENT_INVOICE, ACCENT_INVOICE_SOFT, EASE_OUT } from './mockupTokens'

/**
 * Nachbau der Oberfläche von „Auftrag & Rechnung“.
 *
 * Aufbau, Menüpunkte, Spaltenüberschriften und die Farben der Status-Abzeichen
 * sind aus dem Programm übernommen; Firmennamen, Kunden, Projekte und Beträge
 * sind erfunden. Die Akzentfarbe wird im Einsatz aus dem Logo des Betriebs
 * abgeleitet — hier steht eine neutrale.
 */

// ─── Gerüst ───────────────────────────────────────────────────────────────────

const NAV = [
  { name: 'Dashboard', Icon: LayoutDashboard },
  { name: 'Artikel', Icon: Package },
  { name: 'Preise', Icon: Tag },
  { name: 'Standardtexte', Icon: FileType },
  { name: 'Briefköpfe', Icon: PenTool },
  { name: 'Kunden', Icon: Users },
  { name: 'Rechnungen', Icon: FileText },
  { name: 'Rechnungsarchiv', Icon: Archive },
  { name: 'Angebote', Icon: FileCheck },
  { name: 'Lieferscheine', Icon: Truck },
  { name: 'Leistungsverzeichnisse', Icon: ClipboardList },
  { name: 'Mahnungen', Icon: AlertCircle },
  { name: 'Buchhaltung', Icon: Receipt },
  { name: 'Aufgaben', Icon: CheckSquare },
  { name: 'Statistiken', Icon: BarChart3 },
  { name: 'KI-Assistent', Icon: Bot },
]

function AppShell({
  active,
  children,
}: {
  active: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 text-[#4a4a4a]">
      {/* Seitenleiste */}
      <nav className="hidden w-[150px] shrink-0 border-r border-[#e5e7eb] bg-white py-2 sm:block lg:w-[172px]">
        <ul className="space-y-px px-1.5">
          {NAV.map((item) => {
            const isActive = item.name === active
            return (
              <li key={item.name}>
                <span
                  className="flex items-center gap-2 rounded-md px-2 py-[5px] text-[10px] leading-tight"
                  style={
                    isActive
                      ? { background: ACCENT_INVOICE_SOFT, color: ACCENT_INVOICE, fontWeight: 600 }
                      : undefined
                  }
                >
                  <item.Icon className="h-3 w-3 shrink-0" aria-hidden />
                  <span className="truncate">{item.name}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="min-w-0 flex-1 p-3 sm:p-4">{children}</div>
    </div>
  )
}

function AppHeader() {
  return (
    <div className="flex items-center justify-between border-b border-[#e5e7eb] bg-white px-3 py-2">
      <div className="flex items-center gap-2">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold text-white"
          style={{ background: ACCENT_INVOICE }}
          aria-hidden
        >
          M
        </span>
        <span className="text-[11px] font-semibold text-[#111827]">Musterbau GmbH</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden items-center gap-1.5 rounded-md border border-[#e5e7eb] px-2 py-1 text-[9px] text-[#9ca3af] sm:flex">
          <Search className="h-2.5 w-2.5" aria-hidden />
          Suchen …
        </span>
        <span className="relative" aria-hidden>
          <Bell className="h-3.5 w-3.5 text-[#4a4a4a]" />
          <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 text-[6px] font-bold text-white">
            3
          </span>
        </span>
        <span className="flex items-center gap-1 text-[9px] text-[#4a4a4a]">
          <User className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:inline">m.keller</span>
        </span>
      </div>
    </div>
  )
}

function PageTitle({ title, sub, action }: { title: string; sub: string; action?: React.ReactNode }) {
  return (
    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
      <div>
        <h3 className="text-[15px] font-bold text-[#111827]">{title}</h3>
        <p className="mt-0.5 text-[10px] text-[#6b7280]">{sub}</p>
      </div>
      {action}
    </div>
  )
}

/** Weiße Karte wie `.card` im Programm. */
function Card({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-lg bg-white p-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] ${className}`}>
      {children}
    </div>
  )
}

// ─── 01 · Dashboard ───────────────────────────────────────────────────────────

const STATS = [
  { name: 'Offene Rechnungen', value: '14', Icon: FileText, color: 'text-red-600', bg: 'bg-red-50' },
  { name: 'Aktive Angebote', value: '9', Icon: FileCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Lieferscheine', value: '5', Icon: Truck, color: 'text-green-600', bg: 'bg-green-50' },
  { name: 'Kunden', value: '212', Icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  { name: 'Artikel', value: '1.840', Icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
  { name: 'Meine Aufgaben', value: '6', Icon: CheckSquare, color: 'text-indigo-600', bg: 'bg-indigo-50', badge: '2' },
]

const REVENUE = [
  { m: 'Dez', v: 48 },
  { m: 'Jan', v: 61 },
  { m: 'Feb', v: 43 },
  { m: 'Mär', v: 72 },
  { m: 'Apr', v: 66 },
  { m: 'Mai', v: 88 },
]

export function InvoiceDashboardMockup() {
  return (
    <BrowserChrome url="rechnungen.musterbau-gmbh.de">
      <AppHeader />
      <AppShell active="Dashboard">
        <PageTitle
          title="Dashboard"
          sub="Übersicht über Ihr Rechnungsprogramm"
          action={
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#e5e7eb] px-2.5 py-1.5 text-[10px] font-medium text-[#4a4a4a]">
              <Upload className="h-3 w-3" aria-hidden />
              Dokumente importieren
            </span>
          }
        />

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: EASE_OUT }}
              className={`flex items-center justify-between rounded-lg p-2.5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] ${s.bg}`}
            >
              <div className="min-w-0">
                <p className="truncate text-[9px] font-medium text-[#4b5563]">{s.name}</p>
                <p className="mt-0.5 text-[16px] font-bold leading-none text-[#111827]">{s.value}</p>
              </div>
              <span className="relative shrink-0">
                <s.Icon className={`h-5 w-5 ${s.color}`} aria-hidden />
                {s.badge ? (
                  <span className="absolute -right-1.5 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[7px] font-bold text-white">
                    {s.badge}
                  </span>
                ) : null}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-2.5 grid gap-2.5 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <p className="text-[10px] font-semibold text-[#111827]">Umsatz — letzte 6 Monate</p>
            {/* Balken und Beschriftung getrennt: eine Prozenthöhe braucht einen
                Elternteil mit fester Höhe, sonst bleibt sie null. */}
            <div className="mt-3 flex h-20 items-end gap-1.5">
              {REVENUE.map((r, i) => (
                <motion.div
                  key={r.m}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${r.v}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.45, ease: EASE_OUT }}
                  className="flex-1 rounded-t-sm"
                  style={{ background: i === REVENUE.length - 1 ? ACCENT_INVOICE : '#a8c8bf' }}
                />
              ))}
            </div>
            <div className="mt-1 flex gap-1.5">
              {REVENUE.map((r) => (
                <span key={r.m} className="flex-1 text-center text-[7px] text-[#9ca3af]">
                  {r.m}
                </span>
              ))}
            </div>
          </Card>

          <Card>
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold text-[#111827]">
              <AlertCircle className="h-3 w-3 text-red-600" aria-hidden />
              Hinweise & Benachrichtigungen
            </p>
            <div className="space-y-1.5">
              <div className="rounded-lg border border-red-200 bg-red-50 p-2">
                <p className="text-[9px] leading-snug text-red-800">
                  <strong>3 Rechnungen</strong> haben das Zahlungsziel überschritten
                </p>
              </div>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-2">
                <p className="text-[9px] leading-snug text-yellow-800">
                  <strong>2 Angebote</strong> laufen in den nächsten 7 Tagen ab
                </p>
              </div>
              <div className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-2">
                <p className="text-[9px] leading-snug text-[#4b5563]">
                  <strong>1 Lieferschein</strong> ist noch nicht abgerechnet
                </p>
              </div>
            </div>
          </Card>
        </div>
      </AppShell>
    </BrowserChrome>
  )
}

// ─── 02 · Rechnungsliste ──────────────────────────────────────────────────────

const BADGE: Record<string, string> = {
  Bezahlt: 'bg-green-100 text-green-800',
  Versendet: 'bg-yellow-100 text-yellow-800',
  Überfällig: 'bg-red-100 text-red-800',
  Entwurf: 'bg-gray-100 text-gray-800',
}

const INVOICES = [
  ['RE-2026-0184', 'Wohnbau Süd GmbH', 'm.keller', '14.05.2026', '28.05.2026', '31.430,76 €', 'Versendet'],
  ['RE-2026-0183', 'A. Weber', 's.brandt', '12.05.2026', '26.05.2026', '4.208,15 €', 'Bezahlt'],
  ['RE-2026-0179', 'Hausverwaltung Ost', 'm.keller', '28.04.2026', '12.05.2026', '9.874,00 €', 'Überfällig'],
  ['RE-2026-0178', 'Gemeinde Musterdorf', 's.brandt', '27.04.2026', '25.05.2026', '18.220,40 €', 'Versendet'],
  ['RE-2026-0176', 'Wohnbau Süd GmbH', 'm.keller', '21.04.2026', '05.05.2026', '2.640,00 €', 'Entwurf'],
]

export function InvoiceListMockup() {
  return (
    <BrowserChrome url="rechnungen.musterbau-gmbh.de/rechnungen">
      <AppHeader />
      <AppShell active="Rechnungen">
        <PageTitle
          title="Rechnungen"
          sub="Bezahlte und stornierte Rechnungen liegen im Archiv"
          action={
            <span
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-white"
              style={{ background: ACCENT_INVOICE }}
            >
              <Plus className="h-3 w-3" aria-hidden />
              Neue Rechnung
            </span>
          }
        />

        <Card className="!p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  {['Rechnungsnummer', 'Kunde', 'Bearbeiter', 'Datum', 'Fälligkeitsdatum'].map((h) => (
                    <th key={h} className="px-2 py-2 text-[9px] font-semibold text-[#374151]">
                      {h}
                    </th>
                  ))}
                  <th className="px-2 py-2 text-right text-[9px] font-semibold text-[#374151]">Betrag</th>
                  <th className="px-2 py-2 text-center text-[9px] font-semibold text-[#374151]">Status</th>
                </tr>
              </thead>
              <tbody>
                {INVOICES.map((row, i) => (
                  <motion.tr
                    key={row[0]}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.3, ease: EASE_OUT }}
                    className="border-b border-[#f3f4f6] last:border-0"
                  >
                    <td className="px-2 py-1.5 text-[10px] font-medium text-[#111827]">{row[0]}</td>
                    <td className="px-2 py-1.5 text-[10px] text-[#4b5563]">{row[1]}</td>
                    <td className="px-2 py-1.5 text-[10px] text-[#9ca3af]">{row[2]}</td>
                    <td className="px-2 py-1.5 text-[10px] tabular-nums text-[#4b5563]">{row[3]}</td>
                    <td className="px-2 py-1.5 text-[10px] tabular-nums text-[#4b5563]">{row[4]}</td>
                    <td className="px-2 py-1.5 text-right text-[10px] font-medium tabular-nums text-[#111827]">
                      {row[5]}
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      <span
                        className={`inline-block rounded-full px-1.5 py-px text-[8px] font-medium ${BADGE[row[6]]}`}
                      >
                        {row[6]}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </AppShell>
    </BrowserChrome>
  )
}

// ─── 03 · Nachkalkulation ─────────────────────────────────────────────────────

const NACHKALK = [
  { name: 'Facharbeiterstunden', unit: 'Std', soll: '120,00', ist: '134,50', diff: '+14,50', extra: false },
  { name: 'Facharbeiter B', unit: 'Std', soll: '40,00', ist: '38,00', diff: '−2,00', extra: false },
  { name: 'Bodenfliesen 60×60', unit: 'm²', soll: '180,00', ist: '186,40', diff: '+6,40', extra: false },
  { name: 'Abdichtung Nassbereich', unit: 'm²', soll: '—', ist: '24,00', diff: 'neu', extra: true },
]

export function NachkalkulationMockup() {
  return (
    <BrowserChrome url="rechnungen.musterbau-gmbh.de/rechnungen/RE-2026-0184">
      <AppHeader />
      <AppShell active="Rechnungen">
        <PageTitle title="Rechnung RE-2026-0184" sub="Wohnbau Süd GmbH · Neubau Ahornweg 12" />

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e5e7eb] pb-2">
            <p className="text-[11px] font-semibold text-[#111827]">Nachkalkulation</p>
            <p className="text-[9px] text-[#6b7280]">
              Soll aus dem Angebot · Ist aus der Zeiterfassung
            </p>
          </div>

          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {[
              { l: 'Soll (Angebot)', v: '24.180,00 €' },
              { l: 'Ist (erfasst)', v: '26.412,40 €' },
              { l: 'Abweichung', v: '+9,2 %' },
            ].map((s) => (
              <div key={s.l} className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-2 py-1.5">
                <p className="text-[8px] uppercase tracking-wide text-[#6b7280]">{s.l}</p>
                <p className="mt-0.5 text-[12px] font-bold tabular-nums text-[#111827]">{s.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 overflow-x-auto">
            <table className="w-full min-w-[380px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  <th className="px-1.5 py-1.5 text-[9px] font-semibold text-[#374151]">Position</th>
                  <th className="px-1.5 py-1.5 text-[9px] font-semibold text-[#374151]">Einheit</th>
                  <th className="px-1.5 py-1.5 text-right text-[9px] font-semibold text-[#374151]">Soll</th>
                  <th className="px-1.5 py-1.5 text-right text-[9px] font-semibold text-[#374151]">Ist</th>
                  <th className="px-1.5 py-1.5 text-right text-[9px] font-semibold text-[#374151]">Δ</th>
                </tr>
              </thead>
              <tbody>
                {NACHKALK.map((row, i) => (
                  <motion.tr
                    key={row.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.3, ease: EASE_OUT }}
                    className="border-b border-[#f3f4f6] last:border-0"
                  >
                    <td className="px-1.5 py-1.5">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-[3px] text-white"
                          style={{ background: ACCENT_INVOICE }}
                          aria-hidden
                        >
                          <Check className="h-2 w-2" />
                        </span>
                        <span className="text-[10px] text-[#111827]">{row.name}</span>
                        {row.extra ? (
                          <span className="rounded-full bg-yellow-100 px-1.5 py-px text-[8px] font-medium text-yellow-800">
                            nur Baustelle
                          </span>
                        ) : null}
                      </span>
                    </td>
                    <td className="px-1.5 py-1.5 text-[10px] text-[#6b7280]">{row.unit}</td>
                    <td className="px-1.5 py-1.5 text-right text-[10px] tabular-nums text-[#6b7280]">
                      {row.soll}
                    </td>
                    <td className="px-1.5 py-1.5 text-right text-[10px] font-medium tabular-nums text-[#111827]">
                      {row.ist}
                    </td>
                    <td className="px-1.5 py-1.5 text-right text-[10px] tabular-nums text-[#6b7280]">
                      {row.diff}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-2 border-t border-[#e5e7eb] pt-2.5">
            <span
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-white"
              style={{ background: ACCENT_INVOICE }}
            >
              <FileText className="h-3 w-3" aria-hidden />
              4 Positionen übernehmen
            </span>
            <span className="text-[9px] text-[#6b7280]">
              Verrechnungssatz 68,00 €/Std · Facharbeiter B 55,80 €/Std · 12 Baustellenfotos
            </span>
          </div>
        </Card>
      </AppShell>
    </BrowserChrome>
  )
}

// ─── 04 · Buchhaltung ─────────────────────────────────────────────────────────

const ACC_STATS = [
  { l: 'Gesamt', v: '128', Icon: FileText, bg: 'bg-blue-100', fg: 'text-blue-600' },
  { l: 'Ausstehend', v: '11', Icon: CalendarRange, bg: 'bg-yellow-100', fg: 'text-yellow-600' },
  { l: 'Bezahlt', v: '114', Icon: Check, bg: 'bg-green-100', fg: 'text-green-600' },
  { l: 'Überfällig', v: '3', Icon: AlertCircle, bg: 'bg-red-100', fg: 'text-red-600' },
]

const INCOMING = [
  ['Baustoffhandel Nord GmbH', '2026-4187', '02.05.2026', '14.06.2026', '1.284,60 €', 'Bezahlt', false],
  ['Werkzeug & Technik AG', '2026-0918', '18.04.2026', '02.05.2026', '412,30 €', 'Überfällig', true],
  ['Fuhrpark Leasing', 'L-55021', '01.05.2026', '15.05.2026', '689,00 €', 'Genehmigt', false],
  ['Entsorgung Mittelfranken', 'EM-2026-77', '05.05.2026', '19.05.2026', '248,90 €', 'Ausstehend', false],
]

const ACC_BADGE: Record<string, string> = {
  Bezahlt: 'bg-green-100 text-green-800',
  Überfällig: 'bg-red-100 text-red-800',
  Genehmigt: 'bg-blue-100 text-blue-800',
  Ausstehend: 'bg-yellow-100 text-yellow-800',
}

export function AccountingMockup() {
  return (
    <BrowserChrome url="rechnungen.musterbau-gmbh.de/buchhaltung">
      <AppHeader />
      <AppShell active="Buchhaltung">
        <PageTitle
          title="Buchhaltung"
          sub="Verwalten Sie eingehende Rechnungen"
          action={
            <div className="flex items-center gap-1.5">
              <div className="flex overflow-hidden rounded-lg border border-[#e5e7eb]">
                {[
                  { l: 'Monate', Icon: CalendarRange, on: false },
                  { l: 'Liste', Icon: List, on: true },
                  { l: 'Bank', Icon: Banknote, on: false },
                ].map((t) => (
                  <span
                    key={t.l}
                    className="flex items-center gap-1 px-2 py-1 text-[9px]"
                    style={
                      t.on
                        ? { background: ACCENT_INVOICE, color: '#fff' }
                        : { background: '#fff', color: '#4b5563' }
                    }
                  >
                    <t.Icon className="h-2.5 w-2.5" aria-hidden />
                    {t.l}
                  </span>
                ))}
              </div>
              <span
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-medium text-white"
                style={{ background: ACCENT_INVOICE }}
              >
                <Plus className="h-3 w-3" aria-hidden />
                Rechnung erfassen
              </span>
            </div>
          }
        />

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ACC_STATS.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: EASE_OUT }}
            >
              <Card className="!p-2.5">
                <div className="flex items-center gap-2">
                  <span className={`rounded-lg p-1.5 ${s.bg}`}>
                    <s.Icon className={`h-3.5 w-3.5 ${s.fg}`} aria-hidden />
                  </span>
                  <div>
                    <p className="text-[9px] text-[#6b7280]">{s.l}</p>
                    <p className="text-[15px] font-bold leading-none text-[#111827]">{s.v}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Eigene Ausgangsrechnung, die im Posteingang gelandet ist */}
        <div className="mt-2.5 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-2.5">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-px h-3 w-3 shrink-0 text-amber-600" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] leading-snug text-amber-900">
                <strong>1 Rechnung aus dem eigenen Haus.</strong> Ausgestellt hat sie die eigene
                Firma, bezahlt wird sie vom Kunden. Sie zählt nicht als offener Posten und geht
                nicht ans Steuerbüro.
              </p>
              <p className="mt-1 flex items-center justify-between gap-2 border-t border-amber-200 pt-1 text-[9px] text-amber-900">
                <span className="min-w-0 truncate">
                  <span className="font-medium">Musterbau GmbH</span>
                  <span className="font-mono text-[8px]"> · RE-2026-0181</span>
                </span>
                <Trash2 className="h-3 w-3 shrink-0 text-red-600" aria-hidden />
              </p>
            </div>
          </div>
        </div>

        <Card className="mt-2.5 !p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  {['Lieferant', 'Rechnungsnr.', 'Datum', 'Fällig'].map((h) => (
                    <th key={h} className="px-2 py-2 text-[9px] font-semibold text-[#374151]">
                      {h}
                    </th>
                  ))}
                  <th className="px-2 py-2 text-right text-[9px] font-semibold text-[#374151]">Betrag</th>
                  <th className="px-2 py-2 text-center text-[9px] font-semibold text-[#374151]">Status</th>
                </tr>
              </thead>
              <tbody>
                {INCOMING.map((row, i) => (
                  <motion.tr
                    key={String(row[1])}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.3, ease: EASE_OUT }}
                    className={`border-b border-[#f3f4f6] last:border-0 ${row[6] ? 'bg-red-50' : ''}`}
                  >
                    <td className="px-2 py-1.5 text-[10px] font-medium text-[#111827]">
                      {row[0]}
                      {row[1] === '2026-4187' ? (
                        <span className="ml-1 rounded-full bg-[#ede9fe] px-1.5 py-px text-[8px] font-medium text-[#5a2fd4]">
                          aus dem Posteingang
                        </span>
                      ) : null}
                    </td>
                    <td className="px-2 py-1.5 font-mono text-[9px] text-[#4b5563]">{row[1]}</td>
                    <td className="px-2 py-1.5 text-[10px] tabular-nums text-[#4b5563]">{row[2]}</td>
                    <td className="px-2 py-1.5 text-[10px] tabular-nums text-[#4b5563]">{row[3]}</td>
                    <td className="px-2 py-1.5 text-right text-[10px] font-medium tabular-nums text-[#111827]">
                      {row[4]}
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      <span
                        className={`inline-block rounded-full px-1.5 py-px text-[8px] font-medium ${ACC_BADGE[String(row[5])]}`}
                      >
                        {row[5]}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </AppShell>
    </BrowserChrome>
  )
}
