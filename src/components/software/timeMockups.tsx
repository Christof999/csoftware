import { motion } from 'framer-motion'
import { Menu, Moon } from 'lucide-react'
import { BrowserChrome, PhoneChrome } from './chrome'
import { ACCENT_TIME, ACCENT_TIME_SOFT, EASE_OUT } from './mockupTokens'

/**
 * Nachbau der Oberfläche der Zeiterfassung.
 *
 * Die Baustellen-Ansicht folgt dem Aufbau der App: Kopf mit Logo, Zeile
 * „Angemeldet als“, Überstundenkonto, Statuskarte mit farbigem Streifen und
 * großer Uhr, Abwesenheitsknöpfe, darunter das Ausstempel-Formular mit
 * Pflichtfeld für die Pause. Namen, Projekte und Zeiten sind erfunden.
 */

// ─── Baustelle ────────────────────────────────────────────────────────────────

export function TimeTrackingPhoneMockup() {
  return (
    <PhoneChrome>
      <div className="bg-[#f9fafb] pb-3">
        {/* Kopf */}
        <div className="border-b border-[#f3f4f6] bg-white px-3 pb-2.5 pt-2 text-center shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
          <span
            className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold text-white shadow-[0_2px_8px_rgba(15,23,42,0.08)]"
            style={{ background: ACCENT_TIME }}
            aria-hidden
          >
            M
          </span>
          <p className="mt-1.5 text-[11px] font-bold leading-tight tracking-tight text-[#1f2937]">
            Musterbau GmbH Zeiterfassung
          </p>
          <p className="text-[8px] font-medium text-[#9ca3af]">Mitarbeiter-Zeiterfassung</p>
        </div>

        <div className="space-y-2 px-2.5 pt-2.5">
          {/* Angemeldet als */}
          <div className="rounded-lg border border-[#f3f4f6] bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between gap-1.5">
              <Menu className="h-3 w-3 shrink-0 text-[#6b7280]" aria-hidden />
              <p className="min-w-0 flex-1 truncate text-center text-[9px] text-[#6b7280]">
                Angemeldet als: <strong className="text-[#1f2937]">M. Berger</strong>
              </p>
              <Moon className="h-3 w-3 shrink-0 text-[#6b7280]" aria-hidden />
            </div>
            <p className="mt-1 text-center text-[9px] text-[#6b7280]">
              Überstundenkonto: <strong className="text-[#1f2937]">12:30 h</strong>
            </p>
          </div>

          {/* Status */}
          <div className="relative overflow-hidden rounded-xl border border-[#f3f4f6] bg-white px-3 py-4 text-center shadow-[0_6px_16px_rgba(15,23,42,0.10)]">
            <span
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: `linear-gradient(180deg, ${ACCENT_TIME} 0%, #8e2d38 100%)` }}
              aria-hidden
            />
            <p className="text-[8px] font-medium uppercase tracking-[0.05em] text-[#9ca3af]">
              Status:{' '}
              <span className="inline-flex items-center gap-1 font-semibold text-[#15803d]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#15803d]" aria-hidden />
                Eingestempelt
              </span>
            </p>
            <p className="mt-3 text-[34px] font-bold leading-none tracking-[-0.03em] tabular-nums text-[#1f2937]">
              4:38
            </p>
          </div>

          {/* Abwesenheit */}
          <div className="grid grid-cols-2 gap-1.5">
            {['Krank', 'Schule / HWK'].map((b) => (
              <span
                key={b}
                className="rounded-lg border border-[#e5e7eb] bg-white py-1.5 text-center text-[9px] font-medium text-[#4b5563]"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Ausstempeln */}
          <div className="rounded-xl border border-[#f3f4f6] bg-white p-2.5 shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
            <p className="text-[9px] font-bold text-[#1f2937]">Aktives Projekt</p>
            <div
              className="mt-1.5 rounded-lg px-2 py-1.5"
              style={{ background: ACCENT_TIME_SOFT }}
            >
              <p className="truncate text-[10px] font-bold text-[#1f2937]">Neubau Ahornweg 12</p>
              <p className="truncate text-[8px] text-[#6b7280]">Kunde: Wohnbau Süd GmbH</p>
              <p className="truncate text-[8px] text-[#6b7280]">Adresse: Ahornweg 12, Musterdorf</p>
            </div>
            <p className="mt-1.5 text-[8px] text-[#6b7280]">Eingestempelt seit: 07:04 Uhr</p>

            <label className="mt-2 block text-[8px] font-medium text-[#4b5563]">
              Pausenzeit gesamt (Minuten) <span className="text-[#b91c1c]">*</span>
            </label>
            <div className="mt-1 rounded-md border border-[#e5e7eb] bg-white px-2 py-1 text-[10px] text-[#1f2937]">
              30
            </div>
            <p className="mt-1 text-[7px] leading-snug text-[#9ca3af]">
              Pflichtangabe zum Ausstempeln. Ohne Pause: <strong>0</strong> eintragen.
            </p>

            <div className="mt-2 space-y-1">
              <span className="block rounded-lg border border-[#e5e7eb] bg-white py-1.5 text-center text-[9px] font-medium text-[#4b5563]">
                Projekt wechseln
              </span>
              <span className="block rounded-lg border border-[#e5e7eb] bg-white py-1.5 text-center text-[9px] font-medium text-[#4b5563]">
                Dokumentation hinzufügen
              </span>
              <span
                className="block rounded-lg py-1.5 text-center text-[9px] font-semibold text-white"
                style={{ background: ACCENT_TIME }}
              >
                Ausstempeln
              </span>
            </div>
          </div>
        </div>
      </div>
    </PhoneChrome>
  )
}

// ─── Büro ─────────────────────────────────────────────────────────────────────

const TABS = [
  'Übersicht',
  'Mitarbeiter',
  'Projekte',
  'Kunden',
  'Material',
  'Nachkalkulation',
  'Urlaub',
  'Zeiterfassungsbericht',
  'DATEV',
]

function AdminShell({ active, children }: { active: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between border-b border-[#e5e7eb] bg-white px-3 py-2">
        <div className="flex items-center gap-2">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-bold text-white"
            style={{ background: ACCENT_TIME }}
            aria-hidden
          >
            M
          </span>
          <span className="text-[11px] font-semibold text-[#111827]">Verwaltung</span>
        </div>
        <span className="text-[9px] text-[#6b7280]">Mai 2026</span>
      </div>
      <div className="flex gap-1 overflow-x-auto border-b border-[#e5e7eb] bg-white px-2 py-1.5">
        {TABS.map((t) => (
          <span
            key={t}
            className="shrink-0 rounded-md px-2 py-1 text-[9px] font-medium"
            style={
              t === active
                ? { background: ACCENT_TIME, color: '#fff' }
                : { color: '#6b7280' }
            }
          >
            {t}
          </span>
        ))}
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}

const DATEV_ROWS: [string, string, string, string, string, string][] = [
  ['Mo 04.', '07:00', '16:30', '0:45', '8:45', ''],
  ['Di 05.', '07:00', '17:15', '1:00', '9:15', ''],
  ['Mi 06.', '—', '—', '—', '8:00', 'U'],
  ['Do 07.', '—', '—', '—', '8:00', 'F'],
  ['Fr 08.', '07:00', '13:15', '0:30', '5:45', 'SU'],
  ['Mo 11.', '—', '—', '—', '8:00', 'S'],
]

export function DatevReportMockup() {
  return (
    <BrowserChrome url="zeiterfassung.musterbau-gmbh.de/verwaltung">
      <AdminShell active="DATEV">
        <div className="rounded-lg bg-white p-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-[#e5e7eb] pb-2">
            <div>
              <p className="text-[12px] font-bold text-[#111827]">
                Nachweis der täglichen Arbeitszeit
              </p>
              <p className="mt-0.5 text-[9px] text-[#6b7280]">
                M. Berger · Mai 2026 · eine Zeile je Kalendertag
              </p>
            </div>
            <span
              className="rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-white"
              style={{ background: ACCENT_TIME }}
            >
              Als PDF ans Lohnbüro
            </span>
          </div>

          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[330px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  {['Tag', 'Beginn', 'Ende', 'Pause'].map((h) => (
                    <th key={h} className="px-1.5 py-1.5 text-[9px] font-semibold text-[#374151]">
                      {h}
                    </th>
                  ))}
                  <th className="px-1.5 py-1.5 text-right text-[9px] font-semibold text-[#374151]">
                    Dauer
                  </th>
                  <th className="px-1.5 py-1.5 text-[9px] font-semibold text-[#374151]">*</th>
                </tr>
              </thead>
              <tbody>
                {DATEV_ROWS.map((row, i) => (
                  <motion.tr
                    key={row[0]}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3, ease: EASE_OUT }}
                    className="border-b border-[#f3f4f6] last:border-0"
                  >
                    <td className="px-1.5 py-1.5 text-[10px] font-medium text-[#111827]">{row[0]}</td>
                    <td className="px-1.5 py-1.5 text-[10px] tabular-nums text-[#4b5563]">{row[1]}</td>
                    <td className="px-1.5 py-1.5 text-[10px] tabular-nums text-[#4b5563]">{row[2]}</td>
                    <td className="px-1.5 py-1.5 text-[10px] tabular-nums text-[#4b5563]">{row[3]}</td>
                    <td className="px-1.5 py-1.5 text-right text-[10px] font-semibold tabular-nums text-[#111827]">
                      {row[4]}
                    </td>
                    <td className="px-1.5 py-1.5">
                      {row[5] ? (
                        <span className="rounded border border-[#e5e7eb] bg-[#f9fafb] px-1 py-px text-[8px] font-medium text-[#4b5563]">
                          {row[5]}
                        </span>
                      ) : null}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 border-t border-[#e5e7eb] pt-2 text-[8px] text-[#6b7280]">
            <span>K = Krank</span>
            <span>U = Urlaub</span>
            <span>F = Feiertag</span>
            <span>SU = Stundenweise Urlaub</span>
            <span>S = Berufsschule</span>
            <span className="ml-auto text-[10px] font-bold text-[#111827]">Summe 168:20</span>
          </div>
        </div>
      </AdminShell>
    </BrowserChrome>
  )
}

// ─── Büro: Übersicht ──────────────────────────────────────────────────────────

const TILES = [
  { l: 'Eingestempelte Mitarbeiter', v: '6' },
  { l: 'Aktive Projekte', v: '11' },
  { l: 'Mitarbeiter gesamt', v: '24' },
  { l: 'Heutige Arbeitsstunden', v: '47:15' },
  { l: 'Offene Urlaubsanträge', v: '2' },
]

const ACTIVITY: [string, string][] = [
  ['07:02', 'M. Berger eingestempelt · Neubau Ahornweg 12'],
  ['08:14', 'S. Kraus eingestempelt · Sanierung Marktplatz 4'],
  ['09:41', 'Material gebucht · 24 m² Abdichtung Nassbereich'],
  ['11:15', 'Tagesbericht an die Bauleitung verschickt'],
  ['12:30', 'Urlaubsantrag von T. Ritter · 3 Tage'],
]

export function TimeAdminOverviewMockup() {
  return (
    <BrowserChrome url="zeiterfassung.musterbau-gmbh.de/verwaltung">
      <AdminShell active="Übersicht">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {TILES.map((t, i) => (
            <motion.div
              key={t.l}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: EASE_OUT }}
              className="rounded-lg bg-white p-2.5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
            >
              <p className="text-[8px] uppercase leading-tight tracking-wide text-[#9ca3af]">
                {t.l}
              </p>
              <p className="mt-1 text-[17px] font-bold leading-none text-[#111827]">{t.v}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-2.5 grid gap-2.5 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-lg bg-white p-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <p className="text-[10px] font-semibold text-[#111827]">Live-Aktivitäten</p>
            <ul className="mt-2 space-y-1">
              {ACTIVITY.map(([t, txt]) => (
                <li
                  key={t}
                  className="flex items-center gap-2 rounded-md border border-[#f3f4f6] bg-[#f9fafb] px-2 py-1.5"
                >
                  <span className="shrink-0 text-[8px] tabular-nums text-[#9ca3af]">{t}</span>
                  <span className="min-w-0 truncate text-[9px] text-[#4b5563]">{txt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-white p-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <p className="text-[10px] font-semibold text-[#111827]">Offene Urlaubsanträge</p>
            <ul className="mt-2 space-y-1.5">
              {[
                ['T. Ritter', '13.–15.07.', '3 Tage'],
                ['S. Kraus', '04.–15.08.', '10 Tage'],
              ].map(([n, d, x]) => (
                <li
                  key={n}
                  className="rounded-md border border-[#e5e7eb] px-2 py-1.5"
                >
                  <p className="flex items-center justify-between text-[9px] text-[#111827]">
                    <span className="font-medium">{n}</span>
                    <span className="tabular-nums text-[#6b7280]">{d}</span>
                  </p>
                  <p className="mt-1 flex items-center justify-between gap-2">
                    <span className="text-[8px] text-[#9ca3af]">{x}</span>
                    <span className="flex gap-1">
                      <span className="rounded bg-[#dcfce7] px-1.5 py-px text-[8px] font-medium text-[#15803d]">
                        Genehmigen
                      </span>
                      <span className="rounded bg-[#fee2e2] px-1.5 py-px text-[8px] font-medium text-[#b91c1c]">
                        Ablehnen
                      </span>
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AdminShell>
    </BrowserChrome>
  )
}
