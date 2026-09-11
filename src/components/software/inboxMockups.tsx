import { motion } from 'framer-motion'
import { Folder, Inbox, Paperclip, Search, Send, Sparkles } from 'lucide-react'
import { BrowserChrome } from './chrome'
import { ACCENT_MAIL, ACCENT_MAIL_SOFT, EASE_OUT } from './mockupTokens'

/**
 * Nachbau der Oberfläche des Posteingangs.
 *
 * Aufbau wie im Programm: Ordner links, darüber Suche mit KI-Schalter,
 * Kategorie-Chips mit Anzahl, darunter je Mail eine Karte — Betreff als
 * Überschrift, darunter eine Zeile aus Absender und Abzeichen (Kategorie,
 * Priorität, Postfach, Betrag), dann die Zusammenfassung der KI.
 * Absender, Betreffs und Beträge sind erfunden.
 */

const FOLDERS = ['Posteingang', 'Buchhaltung', 'Kunden', 'Lieferanten', 'Erledigt']

const CATEGORIES: [string, number, boolean][] = [
  ['Alle', 142, false],
  ['Rechnung', 38, true],
  ['Mahnung', 3, false],
  ['Angebot', 11, false],
  ['Bestellung', 7, false],
  ['Lieferung', 9, false],
  ['Anfrage', 21, false],
  ['Vertrag', 4, false],
  ['Newsletter', 49, false],
]

type Mail = {
  subject: string
  from: string
  category: string
  priority?: string
  mailbox: string
  amount?: string
  summary: string
  attachments?: string
  unread?: boolean
}

const MAILS: Mail[] = [
  {
    subject: 'Rechnung 2026-4187 zum Auftrag 118',
    from: 'Baustoffhandel Nord GmbH <buchhaltung@baustoff-nord.example>',
    category: 'Rechnung',
    priority: 'hoch',
    mailbox: 'buchhaltung@',
    amount: '1.284,60 €',
    summary:
      'Materiallieferung für Ahornweg 12. Zahlbar bis 14.06.2026, 2 % Skonto bei Zahlung bis 31.05.2026. Rechnungsbetrag steht im angehängten PDF, nicht im Mailtext.',
    attachments: '1 Anhang',
    unread: true,
  },
  {
    subject: '1. Zahlungserinnerung',
    from: 'Werkzeug & Technik AG <mahnwesen@werkzeug-technik.example>',
    category: 'Mahnung',
    priority: 'hoch',
    mailbox: 'info@',
    amount: '412,30 €',
    summary:
      'Rechnung 2026-0918 ist seit 12 Tagen fällig. Bitte um Ausgleich innerhalb von 7 Tagen, sonst Mahngebühren.',
    attachments: '1 Anhang',
    unread: true,
  },
  {
    subject: 'Badsanierung — Termin im Juli?',
    from: 'A. Weber <a.weber@example.de>',
    category: 'Anfrage',
    mailbox: 'info@',
    summary:
      'Interessent fragt nach freien Kapazitäten im Juli und einem groben Preisrahmen für ein Bad mit 9 m².',
  },
  {
    subject: 'Neues aus der Branche 05/26',
    from: 'Fachverband Mitteilungen <news@fachverband.example>',
    category: 'Newsletter',
    mailbox: 'info@',
    summary: 'Massenmail ohne persönlichen Bezug.',
  },
]

function Pill({
  children,
  tone = 'accent',
}: {
  children: React.ReactNode
  tone?: 'accent' | 'muted' | 'prio'
}) {
  const style =
    tone === 'accent'
      ? { background: ACCENT_MAIL_SOFT, color: '#5a2fd4' }
      : tone === 'prio'
        ? { background: 'rgba(225, 29, 72, 0.10)', color: '#be123c' }
        : { background: 'rgba(15, 15, 20, 0.06)', color: '#5c5c5f' }
  return (
    <span
      className="inline-block shrink-0 rounded-full px-1.5 py-px text-[8px] font-medium"
      style={style}
    >
      {children}
    </span>
  )
}

export function InboxMockup() {
  return (
    <BrowserChrome url="posteingang.musterbau-gmbh.de">
      <div className="flex min-w-0 bg-[#f9f9fa]">
        {/* Ordner */}
        <nav className="hidden w-[118px] shrink-0 border-r border-[rgba(15,15,20,0.08)] bg-white p-2 sm:block">
          <p className="px-1.5 pb-1.5 text-[8px] font-semibold uppercase tracking-wide text-[#5c5c5f]">
            Ordner
          </p>
          <ul className="space-y-px">
            {FOLDERS.map((f, i) => (
              <li key={f}>
                <span
                  className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-[9px]"
                  style={
                    i === 0
                      ? { background: ACCENT_MAIL_SOFT, color: '#5a2fd4', fontWeight: 600 }
                      : { color: '#5c5c5f' }
                  }
                >
                  {i === 0 ? (
                    <Inbox className="h-2.5 w-2.5 shrink-0" aria-hidden />
                  ) : (
                    <Folder className="h-2.5 w-2.5 shrink-0" aria-hidden />
                  )}
                  <span className="truncate">{f}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2.5 border-t border-[rgba(15,15,20,0.08)] px-1.5 pt-2 text-[8px] font-semibold uppercase tracking-wide text-[#5c5c5f]">
            Postfächer
          </p>
          <ul className="mt-1 space-y-px">
            {['info@', 'buchhaltung@', 'einkauf@', 'chef@'].map((m) => (
              <li key={m} className="truncate px-1.5 py-0.5 text-[9px] text-[#5c5c5f]">
                {m}
              </li>
            ))}
          </ul>
        </nav>

        {/* Liste */}
        <div className="min-w-0 flex-1 p-2.5">
          {/* Suche */}
          <div className="flex items-center gap-1.5">
            <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-xl border border-[rgba(15,15,20,0.08)] bg-white px-2 py-1.5 text-[9px] text-[#9a9aa0]">
              <Search className="h-2.5 w-2.5 shrink-0" aria-hidden />
              Was ist diesen Monat von der Spedition gekommen?
            </span>
            <span
              className="flex shrink-0 items-center gap-1 rounded-xl px-2 py-1.5 text-[9px] font-semibold text-white"
              style={{ background: ACCENT_MAIL }}
            >
              <Sparkles className="h-2.5 w-2.5" aria-hidden />
              KI-Suche
            </span>
          </div>

          {/* Kategorien */}
          <div className="mt-2 flex flex-wrap gap-1">
            {CATEGORIES.map(([label, count, on]) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[8px] font-medium"
                style={
                  on
                    ? { background: ACCENT_MAIL, borderColor: ACCENT_MAIL, color: '#fff' }
                    : { background: '#fff', borderColor: 'rgba(15,15,20,0.08)', color: '#5c5c5f' }
                }
              >
                {label}
                <span className="opacity-60">{count}</span>
              </span>
            ))}
          </div>

          {/* Mails */}
          <ul className="mt-2 space-y-1.5">
            {MAILS.map((m, i) => (
              <motion.li
                key={m.subject}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.35, ease: EASE_OUT }}
                className="rounded-xl bg-white p-2.5 shadow-[0_1px_2px_rgba(15,15,20,0.04)]"
                style={
                  m.unread
                    ? { borderLeft: `3px solid ${ACCENT_MAIL}` }
                    : { borderLeft: '3px solid transparent' }
                }
              >
                <p className="truncate text-[11px] font-semibold text-[#111111]">{m.subject}</p>
                <p className="mt-1 flex flex-wrap items-center gap-1">
                  <span className="min-w-0 max-w-full truncate text-[9px] text-[#5c5c5f]">
                    {m.from}
                  </span>
                  <Pill>{m.category}</Pill>
                  {m.priority ? <Pill tone="prio">{m.priority}</Pill> : null}
                  <Pill tone="muted">{m.mailbox}</Pill>
                  {m.amount ? <Pill>{m.amount}</Pill> : null}
                  {m.attachments ? (
                    <span className="inline-flex shrink-0 items-center gap-0.5 text-[8px] text-[#9a9aa0]">
                      <Paperclip className="h-2 w-2" aria-hidden />
                      {m.attachments}
                    </span>
                  ) : null}
                </p>
                <p className="mt-1.5 rounded-lg bg-[#f1f1f3] px-2 py-1.5 text-[9px] leading-snug text-[#3c3c40]">
                  {m.summary}
                </p>
              </motion.li>
            ))}
          </ul>

          {/* Übergabe */}
          <div
            className="mt-2 rounded-xl border p-2.5"
            style={{ borderColor: ACCENT_MAIL, background: ACCENT_MAIL_SOFT }}
          >
            <p className="text-[8px] font-semibold uppercase tracking-wide text-[#5a2fd4]">
              Aus Mail und PDF gelesen
            </p>
            <dl className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-4">
              {[
                ['Lieferant', 'Baustoffhandel Nord GmbH'],
                ['Rechnungsnr.', '2026-4187'],
                ['Betrag', '1.284,60 €'],
                ['Fällig', '14.06.2026'],
              ].map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="text-[8px] text-[#5c5c5f]">{k}</dt>
                  <dd className="truncate text-[9px] font-semibold tabular-nums text-[#111111]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 flex items-center gap-1.5 text-[9px] text-[#3c3c40]">
              <Send className="h-2.5 w-2.5 shrink-0" aria-hidden />
              An die Buchhaltung übergeben — Eingangsrechnung im Status „Ausstehend“
            </p>
          </div>
        </div>
      </div>
    </BrowserChrome>
  )
}
