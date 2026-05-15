import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  Cookie,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  type ConsentCategory,
  type ConsentPreferences,
} from '../consent/consentContext'
import { useCookieConsent } from '../consent/useCookieConsent'
import { usePrefersReducedMotion } from './home/tech/usePrefersReducedMotion'

// ─── Dienst-Katalog ──────────────────────────────────────────────────────────
// Alle „Dienste", für die wir Einwilligung einholen oder die wir aus
// Transparenzgründen auflisten. Wenn später Analytics, Ads o.ä. dazukommt,
// hier erweitern — Banner und Datenschutz-Seite bleiben konsistent.

type ServiceInfo = {
  id: string
  category: ConsentCategory
  name: string
  purpose: string
  provider: string
  providerCountry: string
  transferToThirdCountry: boolean
  legalBasis: string
  duration: string
  cookies?: string[]
}

const CATEGORIES: Array<{
  key: ConsentCategory
  label: string
  description: string
  required: boolean
  services: ServiceInfo[]
}> = [
  {
    key: 'necessary',
    label: 'Notwendig',
    description:
      'Für den Betrieb der Seite zwingend erforderlich. Werden ohne Ihre Einwilligung gesetzt (Art. 6 Abs. 1 lit. f DSGVO).',
    required: true,
    services: [
      {
        id: 'consent-store',
        category: 'necessary',
        name: 'Einwilligungs-Speicher',
        purpose:
          'Speichert Ihre Cookie-Entscheidung, damit dieser Hinweis nicht bei jedem Besuch erneut angezeigt wird.',
        provider: 'Eigene Website (localStorage)',
        providerCountry: 'Lokal im Browser',
        transferToThirdCountry: false,
        legalBasis: 'Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)',
        duration: 'Bis zur Löschung durch Sie oder 12 Monate',
        cookies: ['sorgel-design-consent'],
      },
      {
        id: 'theme-store',
        category: 'necessary',
        name: 'Hell-/Dunkel-Modus',
        purpose:
          'Speichert Ihre Präferenz für helles oder dunkles Erscheinungsbild.',
        provider: 'Eigene Website (localStorage)',
        providerCountry: 'Lokal im Browser',
        transferToThirdCountry: false,
        legalBasis: 'Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)',
        duration: 'Bis zur Löschung durch Sie',
        cookies: ['sorgel-design-theme'],
      },
      {
        id: 'contact-ratelimit',
        category: 'necessary',
        name: 'Kontaktformular-Schutz',
        purpose:
          'Technischer Schutz vor Spam: IP-basierte Ratenbegrenzung und Honeypot-Feld beim Absenden des Kontaktformulars.',
        provider: 'Eigene Serverless-Function auf Vercel',
        providerCountry: 'EU (Frankfurt) / USA',
        transferToThirdCountry: true,
        legalBasis: 'Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)',
        duration: 'IP nur flüchtig im Arbeitsspeicher, max. 60 Sekunden',
      },
    ],
  },
  {
    key: 'fonts',
    label: 'Externe Schriften',
    description:
      'Lädt die Schriftart „Inter" von Google Fonts. Ohne Zustimmung wird die System-Schrift Ihres Geräts verwendet.',
    required: false,
    services: [
      {
        id: 'google-fonts',
        category: 'fonts',
        name: 'Google Fonts',
        purpose: 'Einheitliche und lesbare Typografie („Inter").',
        provider: 'Google Ireland Limited',
        providerCountry: 'Irland / USA',
        transferToThirdCountry: true,
        legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)',
        duration: 'Während des Seitenbesuchs (Browser-Cache)',
      },
    ],
  },
  {
    key: 'embeds',
    label: 'Blog-Einbettung (Soro)',
    description:
      'Lädt auf der Seite „Blog“ das eingebettete Blog-Widget von Soro (TrySoro). Ohne Zustimmung wird kein Skript von app.trysoro.com geladen.',
    required: false,
    services: [
      {
        id: 'soro-blog-embed',
        category: 'embeds',
        name: 'Soro Blog Embed',
        purpose:
          'Anzeige des Blog-Inhalts und des zugehörigen Widgets (Script von app.trysoro.com) auf der Seite /blog.',
        provider: 'Soro / TrySoro (Betreiber laut Anbieter-Datenschutzhinweis, z. B. Digimeri OÜ, Estland)',
        providerCountry: 'Estland / ggf. weitere Rechenzentren weltweit',
        transferToThirdCountry: true,
        legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)',
        duration: 'Sitzungs- bzw. anbieterabhängig; siehe Anbieter-Hinweis',
      },
    ],
  },
  {
    key: 'camera',
    label: 'Gerätekamera (Startseite)',
    description:
      'Erlaubt auf der Startseite einen Live-Spiegel-Effekt auf dem Button „Unverbindlich anfragen“. Enthalten in „Alle akzeptieren“; Ihr Browser fragt danach gesondert nach Kamera-Zugriff. Es wird nichts aufgezeichnet oder übertragen — nur die lokale Vorschau im Browser.',
    required: false,
    services: [
      {
        id: 'hero-chrome-camera',
        category: 'camera',
        name: 'Kamera-Vorschau (Chrome-Button)',
        purpose:
          'Optionaler Zugriff auf die Gerätekamera ausschließlich für einen visuellen Spiegel-/Metall-Effekt auf dem primären Call-to-Action der Startseite. Keine Speicherung, kein Versand des Bildes an unsere Server.',
        provider: 'Eigene Website (Browser getUserMedia)',
        providerCountry: 'Lokal im Browser',
        transferToThirdCountry: false,
        legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)',
        duration: 'Nur während der aktiven Seitenansicht; kein Cookie — Einstellung in sorgel-design-consent',
      },
    ],
  },
]

// ─── Banner ──────────────────────────────────────────────────────────────────

export function CookieBanner() {
  const { isBannerOpen, preferences, acceptAll, rejectAll, save } =
    useCookieConsent()

  return (
    <AnimatePresence>
      {isBannerOpen && (
        <BannerContent
          preferences={preferences}
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
          onSave={save}
        />
      )}
    </AnimatePresence>
  )
}

/**
 * Lokale Ansicht und Prefs gehören zum Banner selbst. Sobald der Banner
 * geschlossen wird, wird die Komponente unmountet – beim erneuten Öffnen
 * startet sie mit frischen Initialwerten aus der aktuell gespeicherten
 * Einwilligung. So brauchen wir keinen useEffect-Sync.
 */
function BannerContent({
  preferences,
  onAcceptAll,
  onRejectAll,
  onSave,
}: {
  preferences: ConsentPreferences
  onAcceptAll: () => void
  onRejectAll: () => void
  onSave: (p: ConsentPreferences) => void
}) {
  const reduced = usePrefersReducedMotion()
  const [view, setView] = useState<'summary' | 'settings'>('summary')
  const [localPrefs, setLocalPrefs] = useState<ConsentPreferences>(preferences)

  function togglePref(key: ConsentCategory) {
    setLocalPrefs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex justify-center px-3 pb-3 sm:pb-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.96 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
          transition: reduced
            ? { duration: 0.15 }
            : { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 },
        }}
        exit={{ y: 40, opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
        layout
        className="pointer-events-auto relative w-full max-w-3xl overflow-hidden rounded-2xl border border-gallery-line bg-gallery-surface/95 shadow-2xl backdrop-blur-xl"
      >
        <AuroraBackdrop reduced={reduced} />
        <FloatingPolygons reduced={reduced} />

        <AnimatePresence mode="wait" initial={false}>
          {view === 'summary' ? (
            <SummaryView
              key="summary"
              reduced={reduced}
              onAcceptAll={onAcceptAll}
              onRejectAll={onRejectAll}
              onOpenSettings={() => setView('settings')}
            />
          ) : (
            <SettingsView
              key="settings"
              reduced={reduced}
              prefs={localPrefs}
              onToggle={togglePref}
              onBack={() => setView('summary')}
              onSave={() => onSave(localPrefs)}
              onAcceptAll={onAcceptAll}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// ─── Views ───────────────────────────────────────────────────────────────────

function SummaryView({
  reduced,
  onAcceptAll,
  onRejectAll,
  onOpenSettings,
}: {
  reduced: boolean
  onAcceptAll: () => void
  onRejectAll: () => void
  onOpenSettings: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-7"
    >
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -18, scale: 0.8 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
        transition={{ delay: 0.12, duration: 0.5, ease: 'easeOut' }}
        className="relative hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gallery-line bg-gallery-bg text-gallery-ink sm:flex"
        aria-hidden
      >
        <Cookie className="h-6 w-6" strokeWidth={1.5} />
        {!reduced && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-xl"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(28,25,23,0.00)',
                '0 0 0 6px rgba(28,25,23,0.06)',
                '0 0 0 0 rgba(28,25,23,0.00)',
              ],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>

      <div className="flex flex-col gap-5">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.35 }}
            className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-shell-subtle"
          >
            Hinweis · Privatsphäre
          </motion.p>
          <motion.h2
            id="cookie-title"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-1.5 font-display text-lg font-semibold tracking-tight text-gallery-ink sm:text-xl"
          >
            Nur das Nötigste — Sie entscheiden.
          </motion.h2>
          <motion.p
            id="cookie-desc"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.4 }}
            className="mt-2 text-sm leading-relaxed text-shell-muted"
          >
            Wir nutzen kein werbliches Tracking. Für die Schrift „Inter" (Google
            Fonts), optional für den Blog ein eingebettetes Widget von Soro sowie
            optional die Gerätekamera für einen Spiegel-Effekt auf der Startseite —
            jeweils nur mit Ihrer Zustimmung über diesen Hinweis. Bei Fonts und Blog
            kann Ihre IP-Adresse u. a. an Anbieter in Drittländern (z. B. USA)
            übertragen werden. Ohne Zustimmung zur Schrift nutzen wir die
            System-Schrift; ohne Blog-Zustimmung bleibt der Blog-Bereich ohne Soro.
            Wenn Sie der Kamera-Einwilligung zustimmen (über „Alle akzeptieren“ oder
            in den Einstellungen), fragt Ihr Browser beim Besuch der Startseite{' '}
            <strong className="font-medium text-gallery-ink">gesondert</strong> nach
            Zugriff auf die Kamera — dort können Sie erlauben oder ablehnen; ohne
            Browser-Erlaubnis bleibt der Button in reiner Chrom-Optik ohne Livebild.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.4 }}
            className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-shell-subtle"
          >
            <Link
              to="/datenschutz"
              className="underline decoration-gallery-line underline-offset-4 transition hover:text-gallery-ink hover:decoration-gallery-ink"
            >
              Datenschutzerklärung
            </Link>
            <Link
              to="/impressum"
              className="underline decoration-gallery-line underline-offset-4 transition hover:text-gallery-ink hover:decoration-gallery-ink"
            >
              Impressum
            </Link>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <button
            type="button"
            onClick={onAcceptAll}
            autoFocus
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            <ShieldCheck className="h-4 w-4" strokeWidth={2} aria-hidden />
            Alle akzeptieren
            {!reduced && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/25 dark:bg-stone-900/20"
                style={{ filter: 'blur(12px)' }}
                initial={{ x: '-100%' }}
                animate={{ x: '300%' }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.8,
                }}
              />
            )}
          </button>
          <button
            type="button"
            onClick={onRejectAll}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gallery-line bg-gallery-bg px-5 py-2.5 text-sm font-medium text-gallery-ink transition hover:border-stone-400 dark:hover:border-stone-600"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            Alle ablehnen
          </button>
          <button
            type="button"
            onClick={onOpenSettings}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-shell-muted transition hover:text-gallery-ink"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            Einstellungen
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

function SettingsView({
  reduced,
  prefs,
  onToggle,
  onBack,
  onSave,
  onAcceptAll,
}: {
  reduced: boolean
  prefs: ConsentPreferences
  onToggle: (c: ConsentCategory) => void
  onBack: () => void
  onSave: () => void
  onAcceptAll: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative p-6 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4 border-b border-gallery-line pb-5">
        <div>
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-shell-subtle">
            Hinweis · Privatsphäre
          </p>
          <h2 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-gallery-ink sm:text-xl">
            Datenschutz-Einstellungen
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-shell-muted">
            Wählen Sie selbst, welche Dienste geladen werden. Ihre Auswahl
            können Sie jederzeit über die Datenschutzerklärung widerrufen.
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          aria-label="Zurück zur Übersicht"
          className="shrink-0 rounded-lg border border-gallery-line bg-gallery-bg p-2 text-shell-muted transition hover:border-stone-400 hover:text-gallery-ink dark:hover:border-stone-600"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <ul className="my-5 max-h-[60vh] space-y-2 overflow-y-auto pr-1">
        {CATEGORIES.map((cat, i) => (
          <CategoryRow
            key={cat.key}
            index={i}
            reduced={reduced}
            categoryKey={cat.key}
            label={cat.label}
            description={cat.description}
            required={cat.required}
            enabled={prefs[cat.key]}
            onToggle={() => onToggle(cat.key)}
            services={cat.services}
          />
        ))}
      </ul>

      <div className="flex flex-col gap-2 border-t border-gallery-line pt-5 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
        >
          <ShieldCheck className="h-4 w-4" strokeWidth={2} aria-hidden />
          Auswahl speichern
        </button>
        <button
          type="button"
          onClick={onAcceptAll}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gallery-line bg-gallery-bg px-5 py-2.5 text-sm font-medium text-gallery-ink transition hover:border-stone-400 dark:hover:border-stone-600"
        >
          Alle akzeptieren
        </button>
      </div>
    </motion.div>
  )
}

// ─── Category row ───────────────────────────────────────────────────────────

function CategoryRow({
  index,
  reduced,
  categoryKey,
  label,
  description,
  required,
  enabled,
  onToggle,
  services,
}: {
  index: number
  reduced: boolean
  categoryKey: ConsentCategory
  label: string
  description: string
  required: boolean
  enabled: boolean
  onToggle: () => void
  services: ServiceInfo[]
}) {
  const [expanded, setExpanded] = useState(false)
  const panelId = `cookie-cat-${categoryKey}`

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduced
          ? { duration: 0 }
          : { delay: 0.08 + index * 0.05, duration: 0.35, ease: 'easeOut' }
      }
      className="overflow-hidden rounded-xl border border-gallery-line bg-gallery-bg/60"
    >
      <div className="flex items-start gap-4 px-4 py-4 sm:px-5">
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
          aria-controls={panelId}
          className="flex flex-1 items-start gap-3 text-left"
        >
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="mt-0.5 text-shell-muted"
            aria-hidden
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold text-gallery-ink">
              {label}
              {required && (
                <span className="ml-2 rounded-full border border-gallery-line bg-gallery-surface px-2 py-0.5 align-middle font-mono text-[10px] font-medium uppercase tracking-wider text-shell-muted">
                  immer aktiv
                </span>
              )}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-shell-muted">
              {description}
            </p>
          </div>
        </button>
        <Toggle
          enabled={required ? true : enabled}
          disabled={required}
          onToggle={onToggle}
          label={`${label} aktivieren`}
        />
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-gallery-line bg-gallery-surface/70"
          >
            <ul className="divide-y divide-gallery-line">
              {services.map(s => (
                <li key={s.id} className="px-4 py-4 sm:px-5">
                  <p className="font-display text-sm font-semibold text-gallery-ink">
                    {s.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-shell-muted">
                    {s.purpose}
                  </p>
                  <dl className="mt-3 grid gap-x-4 gap-y-1.5 text-xs text-shell-muted sm:grid-cols-[140px_1fr]">
                    <dt className="font-medium text-shell-subtle">Anbieter</dt>
                    <dd>{s.provider}</dd>
                    <dt className="font-medium text-shell-subtle">Standort</dt>
                    <dd>
                      {s.providerCountry}
                      {s.transferToThirdCountry && (
                        <span className="ml-2 rounded-sm bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                          Drittlandübermittlung möglich
                        </span>
                      )}
                    </dd>
                    <dt className="font-medium text-shell-subtle">Rechtsgrundlage</dt>
                    <dd>{s.legalBasis}</dd>
                    <dt className="font-medium text-shell-subtle">Speicherdauer</dt>
                    <dd>{s.duration}</dd>
                    {s.cookies && s.cookies.length > 0 && (
                      <>
                        <dt className="font-medium text-shell-subtle">Einträge</dt>
                        <dd className="font-mono text-[11px] text-gallery-ink">
                          {s.cookies.join(', ')}
                        </dd>
                      </>
                    )}
                  </dl>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

// ─── Toggle ─────────────────────────────────────────────────────────────────

function Toggle({
  enabled,
  disabled,
  onToggle,
  label,
}: {
  enabled: boolean
  disabled?: boolean
  onToggle: () => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      disabled={disabled}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gallery-bg ${
        enabled
          ? 'border-transparent bg-stone-900 dark:bg-stone-100'
          : 'border-gallery-line bg-gallery-surface'
      } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={`inline-block h-5 w-5 transform rounded-full shadow-md ${
          enabled
            ? 'translate-x-[22px] bg-white dark:bg-stone-900'
            : 'translate-x-0.5 bg-gallery-ink/80'
        }`}
      />
    </button>
  )
}

// ─── Dekor ──────────────────────────────────────────────────────────────────

function AuroraBackdrop({ reduced }: { reduced: boolean }) {
  if (reduced) return null
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full opacity-60 mix-blend-multiply blur-3xl dark:mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle, rgba(120,113,108,0.35), rgba(120,113,108,0) 70%)',
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full opacity-50 mix-blend-multiply blur-3xl dark:mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle, rgba(87,83,78,0.30), rgba(87,83,78,0) 70%)',
        }}
        animate={{ x: [0, -30, 10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  )
}

function FloatingPolygons({ reduced }: { reduced: boolean }) {
  if (reduced) return null
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: '900px' }}
    >
      <Polygon
        className="absolute -right-6 -top-6 h-24 w-24 sm:h-28 sm:w-28"
        shape="triangle"
        duration={18}
        delay={0}
      />
      <Polygon
        className="absolute left-2 top-10 hidden h-16 w-16 sm:block"
        shape="square"
        duration={22}
        delay={1.5}
      />
      <Polygon
        className="absolute right-16 bottom-0 hidden h-14 w-14 sm:block"
        shape="hexagon"
        duration={14}
        delay={0.7}
      />
    </div>
  )
}

function Polygon({
  className,
  shape,
  duration,
  delay,
}: {
  className?: string
  shape: 'triangle' | 'square' | 'hexagon'
  duration: number
  delay: number
}) {
  const clipPath =
    shape === 'triangle'
      ? 'polygon(50% 0%, 100% 100%, 0% 100%)'
      : shape === 'hexagon'
        ? 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)'
        : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'

  return (
    <motion.div
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        clipPath,
        background:
          'linear-gradient(135deg, rgba(28,25,23,0.10), rgba(28,25,23,0.04) 60%, rgba(28,25,23,0) 100%)',
        border: '1px solid rgba(28,25,23,0.08)',
      }}
      animate={{
        rotateX: [0, 360],
        rotateY: [0, -360],
        rotateZ: [0, 180],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}
