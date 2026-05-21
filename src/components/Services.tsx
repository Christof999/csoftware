import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Globe,
  LayoutTemplate,
  LineChart,
  Mail,
  Palette,
  Phone,
  Printer,
  Search,
  Smartphone,
  Target,
  Workflow,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp, staggerContainer } from '../lib/motion'
import { CursorGlow } from './home/tech/CursorGlow'

// ─── Mockup Components ────────────────────────────────────────────────────────

function BrowserMockup() {
  return (
    <div className="rounded-xl border border-gallery-line bg-gallery-surface shadow-xl overflow-hidden select-none">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b border-gallery-line bg-gallery-bg px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="ml-2 flex-1 rounded border border-gallery-line bg-gallery-surface px-3 py-1 text-[11px] text-shell-subtle">
          ihre-website.at
        </div>
      </div>
      {/* Page content */}
      <div className="p-5 space-y-4">
        {/* Navbar */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-14 rounded-sm bg-gallery-ink/20" />
          <div className="flex gap-3">
            {[0, 1, 2].map(i => (
              <div key={i} className="h-2 w-10 rounded-sm bg-gallery-ink/10" />
            ))}
          </div>
        </div>
        {/* Hero block */}
        <div className="rounded-lg bg-gallery-bg p-4 space-y-2.5">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '75%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="h-4 rounded bg-gallery-ink/25"
          />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '56%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
            className="h-4 rounded bg-gallery-ink/18"
          />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '38%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
            className="h-3 rounded bg-gallery-ink/10"
          />
          <div className="pt-1.5 flex gap-2">
            <div className="h-8 w-24 rounded-md bg-gallery-ink/70" />
            <div className="h-8 w-20 rounded-md border border-gallery-line" />
          </div>
        </div>
        {/* Cards row */}
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="rounded-lg border border-gallery-line p-3 space-y-1.5">
              <div className="h-2.5 w-8 rounded bg-gallery-ink/20" />
              <div className="h-2 rounded bg-gallery-ink/10" />
              <div className="h-2 w-3/4 rounded bg-gallery-ink/8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const BAR_HEIGHTS = [42, 68, 54, 88, 60, 74]

function DashboardMockup() {
  return (
    <div className="rounded-xl border border-stone-800 bg-stone-950 shadow-xl overflow-hidden select-none">
      <div className="flex">
        {/* Sidebar */}
        <div className="flex flex-col gap-2 border-r border-stone-800 bg-stone-900/60 p-3 w-12 shrink-0">
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`h-7 w-7 rounded-lg flex items-center justify-center ${
                i === 0 ? 'bg-stone-700/80' : ''
              }`}
            >
              <div className="h-3 w-3 rounded bg-stone-700" />
            </div>
          ))}
        </div>
        {/* Main area */}
        <div className="flex-1 p-4 space-y-3 min-w-0">
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Besucher', val: '2.4k', trend: '+12 %', up: true },
              { label: 'Anfragen', val: '38', trend: '+5 %', up: true },
              { label: 'Absprung', val: '24 %', trend: '−3 %', up: false },
            ].map(s => (
              <div
                key={s.label}
                className="rounded-lg bg-stone-900 border border-stone-800 p-2.5"
              >
                <p className="text-[9px] font-medium uppercase tracking-wider text-stone-500">
                  {s.label}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-stone-100">{s.val}</p>
                <p className={`text-[9px] ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>
                  {s.trend}
                </p>
              </div>
            ))}
          </div>
          {/* Bar chart */}
          <div className="rounded-lg bg-stone-900 border border-stone-800 p-3">
            <p className="text-[9px] uppercase tracking-wider text-stone-500 mb-3">
              Seitenaufrufe / Woche
            </p>
            <div className="flex items-end gap-1 h-16">
              {BAR_HEIGHTS.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
                  className="flex-1 rounded-t-sm"
                  style={{
                    background: i === 3 ? 'rgb(161 161 170)' : 'rgb(63 63 70)',
                  }}
                />
              ))}
            </div>
          </div>
          {/* Progress bars */}
          <div className="rounded-lg bg-stone-900 border border-stone-800 p-3 space-y-2.5">
            {[
              { label: 'Google-Ranking', val: 82 },
              { label: 'Ladezeit-Score', val: 95 },
              { label: 'Mobile Score', val: 90 },
            ].map(p => (
              <div key={p.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-[9px] text-stone-400">{p.label}</span>
                  <span className="text-[9px] font-medium text-stone-300">{p.val}</span>
                </div>
                <div className="h-1 w-full rounded-full bg-stone-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.val}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                    className="h-full rounded-full bg-stone-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const SWATCHES = [
  '#1a1816',
  '#5c5650',
  '#8a847e',
  '#e4e2df',
  '#d6523c',
]

function ConnectorArrow() {
  return (
    <div className="flex flex-1 items-center justify-center min-w-[12px] px-1">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="h-px w-full origin-left bg-gradient-to-r from-gallery-line via-gallery-ink/25 to-gallery-line"
        aria-hidden
      />
      <span className="mx-0.5 shrink-0 text-[10px] text-shell-subtle" aria-hidden>
        ▶
      </span>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.08, ease: 'easeOut' }}
        className="h-px w-full origin-left bg-gradient-to-r from-gallery-line via-gallery-ink/25 to-gallery-line"
        aria-hidden
      />
    </div>
  )
}

function AutomationMockup() {
  return (
    <div className="rounded-xl border border-gallery-line bg-gallery-surface shadow-xl overflow-hidden select-none">
      <div className="flex items-center gap-2 border-b border-gallery-line bg-gallery-bg px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="ml-2 flex-1 rounded border border-gallery-line bg-gallery-surface px-3 py-1 text-[11px] text-shell-subtle">
          automation · entwurf
        </div>
      </div>
      <div className="p-5 space-y-5">
        <p className="text-[10px] font-medium uppercase tracking-widest text-shell-subtle">
          Workflow
        </p>
        {/* Hauptpfad: Eingang → Automation → Ausgang */}
        <div className="flex flex-wrap items-stretch gap-y-3 sm:flex-nowrap">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="flex min-w-[88px] flex-1 flex-col rounded-lg border border-gallery-line bg-gallery-bg p-3"
          >
            <div className="h-2 w-10 rounded-sm bg-gallery-ink/25 mb-2" />
            <div className="h-1.5 w-full rounded-sm bg-gallery-ink/10 mb-1" />
            <div className="h-1.5 w-4/5 rounded-sm bg-gallery-ink/8" />
            <p className="mt-3 text-[9px] font-medium uppercase tracking-wide text-shell-muted">
              E-Mail
            </p>
          </motion.div>
          <ConnectorArrow />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="flex min-w-[100px] flex-[1.15] flex-col rounded-lg border border-gallery-ink/20 bg-gallery-surface p-3 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 min-w-[1.75rem] rounded-md border border-gallery-line bg-gallery-bg flex items-center justify-center px-1">
                <span className="font-mono text-[8px] font-semibold tracking-tight text-gallery-ink leading-none">
                  n8n
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="h-2 w-full rounded-sm bg-gallery-ink/20" />
                <div className="h-1.5 w-2/3 rounded-sm bg-gallery-ink/10" />
              </div>
            </div>
            <div className="rounded border border-dashed border-gallery-line px-2 py-1.5 text-[9px] text-shell-muted leading-snug">
              KI · Regeln · APIs
            </div>
            <p className="mt-2 text-[9px] font-medium uppercase tracking-wide text-shell-muted">
              Automation
            </p>
          </motion.div>
          <ConnectorArrow />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="flex min-w-[88px] flex-1 flex-col rounded-lg border border-gallery-line bg-gallery-bg p-3"
          >
            <div className="h-8 w-full rounded-md bg-gallery-ink/12 mb-2" />
            <div className="h-1.5 w-3/4 rounded-sm bg-gallery-ink/10" />
            <p className="mt-3 text-[9px] font-medium uppercase tracking-wide text-shell-muted">
              Druck / Archiv
            </p>
          </motion.div>
        </div>
        {/* Zweig: Sprache */}
        <div className="flex items-start gap-3 border-t border-gallery-line pt-4">
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="w-28 shrink-0 rounded-lg border border-gallery-line bg-gallery-bg p-3"
          >
            <div className="h-2 w-8 rounded-sm bg-gallery-ink/20 mb-2" />
            <div className="h-6 w-full rounded-md border border-gallery-line bg-gallery-surface" />
            <p className="mt-2 text-[9px] font-medium uppercase tracking-wide text-shell-muted">
              Anruf
            </p>
          </motion.div>
          <div className="flex flex-1 flex-col items-center pt-4 text-shell-subtle">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-px bg-gallery-line"
              aria-hidden
            />
            <span className="text-[9px] mt-1">→ Workflow</span>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.25 }}
            className="flex-1 rounded-lg border border-gallery-line bg-gallery-bg p-3 min-h-[72px]"
          >
            <div className="h-2 w-16 rounded-sm bg-gallery-ink/15 mb-2" />
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-sm bg-gallery-ink/10" />
              <div className="h-1.5 w-5/6 rounded-sm bg-gallery-ink/8" />
            </div>
            <p className="mt-2 text-[9px] font-medium uppercase tracking-wide text-shell-muted">
              CRM / Ticket
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function DesignMockup() {
  return (
    <div className="rounded-xl border border-gallery-line bg-gallery-surface shadow-xl overflow-hidden select-none">
      <div className="p-6 space-y-6">
        {/* Color palette */}
        <div>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-shell-subtle">
            Farbpalette
          </p>
          <div className="flex gap-2.5">
            {SWATCHES.map((color, i) => (
              <motion.div
                key={color}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 320, damping: 22 }}
                className="h-10 w-10 rounded-full border border-gallery-line shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="border-t border-gallery-line pt-5">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-shell-subtle">
            Typografie
          </p>
          <p className="font-display text-3xl font-semibold tracking-tight text-gallery-ink leading-none">
            Aa
          </p>
          <p className="mt-2 font-display text-base font-medium text-gallery-ink">
            Überschrift — klar & modern
          </p>
          <p className="mt-1 text-sm leading-relaxed text-shell-muted">
            Fließtext — gut lesbar auf allen Geräten.
          </p>
        </div>

        {/* Print layouts */}
        <div className="border-t border-gallery-line pt-5">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-shell-subtle">
            Drucksachen
          </p>
          <div className="flex gap-3 items-start">
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="w-36 rounded-lg border border-gallery-line bg-gallery-bg p-4 shadow-sm"
            >
              <div className="h-2.5 w-14 rounded bg-gallery-ink/30 mb-2" />
              <div className="h-1.5 w-20 rounded bg-gallery-ink/15 mb-1.5" />
              <div className="h-1.5 w-12 rounded bg-gallery-ink/12" />
            </motion.div>
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="w-28 rounded-lg border border-stone-700 bg-stone-900 p-4 shadow-sm"
            >
              <div className="h-2.5 w-10 rounded bg-white/25 mb-2" />
              <div className="h-1.5 w-16 rounded bg-white/15 mb-1.5" />
              <div className="h-1.5 w-8 rounded bg-white/12" />
              <div className="mt-4 h-8 w-full rounded bg-white/8" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHAPTERS = [
  {
    id: 'chapter-01',
    n: '01',
    eyebrow: 'Web & Sichtbarkeit',
    title: 'Ihr Auftritt — gefunden, verstanden, gebucht.',
    lead: 'Eine Website, die konvertiert: klare Struktur, saubere Technik, SEO-Grundlagen — und auf Wunsch Google Ads mit messbarem Tracking.',
    uses: ['Unternehmenswebsite', 'Landingpage', 'Lokale SEO', 'Google Ads'],
    features: [
      {
        Icon: LayoutTemplate,
        title: 'Webdesign & Struktur',
        text: 'Durchdachter Seitenaufbau, schnelle Ladezeiten, responsiv auf allen Geräten.',
      },
      {
        Icon: Search,
        title: 'SEO & Auffindbarkeit',
        text: 'Technische Basis, relevante Inhalte und Metadaten — damit Google versteht, worum es bei Ihnen geht.',
      },
      {
        Icon: Target,
        title: 'Google Ads & Tracking',
        text: 'Kampagnen strukturieren, Conversion-Ziele einrichten, Budget sinnvoll einsetzen.',
      },
      {
        Icon: Smartphone,
        title: 'Mobile & Performance',
        text: 'Core Web Vitals im Blick — weil Ladezeit direkt Ranking und Absprungrate beeinflusst.',
      },
    ],
    Mockup: BrowserMockup,
    bg: 'bg-gallery-bg',
  },
  {
    id: 'chapter-02',
    n: '02',
    eyebrow: 'Digitale Lösungen',
    title: 'Wenn Standard-Software nicht reicht.',
    lead: 'Individuelle Web-Apps, die genau das abbilden, was Ihr Betrieb braucht — vom internen Tool bis zur kundenseitigen Oberfläche.',
    uses: ['Buchungssystem', 'internes Dashboard', 'Kunden-Portal', 'Prozessautomatisierung'],
    features: [
      {
        Icon: LineChart,
        title: 'Dashboards & Übersichten',
        text: 'Kennzahlen, Status, Auswertungen — immer aktuell, ohne manuellen Aufwand.',
      },
      {
        Icon: Workflow,
        title: 'Prozesse digitalisieren',
        text: 'Abläufe, die heute noch per E-Mail oder Tabelle laufen, lassen sich schlanker und fehlerfreier abbilden.',
      },
      {
        Icon: Globe,
        title: 'Maßgeschneidert, nicht überdimensioniert',
        text: 'Kein monolithisches CMS: wir bauen genau das, was wirklich gebraucht wird.',
      },
    ],
    Mockup: DashboardMockup,
    bg: 'bg-gallery-surface',
  },
  {
    id: 'chapter-03',
    n: '03',
    eyebrow: 'Media & Print',
    title: 'Ein Erscheinungsbild, das hält.',
    lead: 'Drucksachen und Werbemittel, die visuell zu Ihrer Website passen — Farben, Schrift, Tonalität. Alles aus einer Hand.',
    uses: ['Visitenkarte', 'Flyer & Folder', 'Messestand', 'Social-Media-Vorlagen'],
    features: [
      {
        Icon: Printer,
        title: 'Print & Werbemittel',
        text: 'Flyer, Folder, Plakate, Angebotsvorlagen — druckfertig, abgestimmt auf Ihr Erscheinungsbild.',
      },
      {
        Icon: Palette,
        title: 'Konsistente Marke',
        text: 'Schrift, Farben und Bildsprache einheitlich führen — online wie offline erkennbar.',
      },
    ],
    Mockup: DesignMockup,
    bg: 'bg-gallery-bg',
  },
  {
    id: 'chapter-04',
    n: '04',
    eyebrow: 'Automatisierung & KI',
    title: 'Wiederkehrende Aufgaben — zuverlässig im Hintergrund.',
    lead:
      'Wir verbinden Postfach, Telefonie, CRM, Shop oder Drucker mit Automatisierungs-Tools wie n8n und sinnvollen KI-Bausteinen: weniger Copy-and-Paste, weniger Fehler, mehr Zeit fürs Kerngeschäft — für KMU, Handwerk und Dienstleister in Mittelfranken.',
    uses: [
      'E-Mail-Kategorisierung & Belege',
      'KI-Telefonassistent',
      'Rechnungs-Workflow & automatischer Druck',
      'n8n-Workflows & Schnittstellen',
    ],
    features: [
      {
        Icon: Bot,
        title: 'KI-gestützte Schritte',
        text: 'Anfragen klassifizieren, Freitexte strukturieren oder Voicemails auswerten — mit klaren Regeln und menschlicher Freigabe, wo es nötig ist.',
      },
      {
        Icon: Phone,
        title: 'Voice & Erreichbarkeit',
        text: 'Telefonassistent, Weiterleitung nach Thema oder Brücke ins Ticketsystem — damit Anrufe nicht in der Mailbox hängen bleiben.',
      },
      {
        Icon: Mail,
        title: 'Postfach & Dokumente',
        text: 'E-Mails nach Absender oder Inhalt sortieren, PDF-Rechnungen erkennen und automatisch drucken oder ins Archiv legen.',
      },
      {
        Icon: Workflow,
        title: 'n8n & Integrationen',
        text: 'Stabile Workflows zwischen Google Workspace, Microsoft 365, ERP/Shop und APIs — dokumentiert, testbar und wartbar.',
      },
    ],
    Mockup: AutomationMockup,
    bg: 'bg-gallery-surface',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export function Services() {
  return (
    <div>
      {/* Page header */}
      <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="flex items-center gap-4 border-b border-gallery-line pb-8">
              <motion.p
                custom={0}
                variants={fadeInUp}
                className="text-xs font-medium uppercase tracking-widest text-shell-muted"
              >
                Leistungen
              </motion.p>
            </div>

            <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
              <motion.h1
                custom={1}
                variants={fadeInUp}
                className="font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl lg:text-6xl"
              >
                Was wir für Sie
                <br />
                <span className="text-shell-muted">umsetzen können.</span>
              </motion.h1>

              <motion.nav
                custom={2}
                variants={fadeInUp}
                className="flex flex-wrap gap-2 sm:justify-end"
                aria-label="Kapitel"
              >
                {CHAPTERS.map(ch => (
                  <a
                    key={ch.id}
                    href={`#${ch.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-gallery-line bg-gallery-bg px-4 py-2 text-xs font-medium text-gallery-ink transition hover:border-stone-400 dark:hover:border-stone-600"
                  >
                    <span className="font-mono text-shell-subtle">{ch.n}</span>
                    {ch.eyebrow}
                  </a>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapters */}
      {CHAPTERS.map((ch, ci) => {
        const mockupRight = ci % 2 === 0
        return (
          <section
            key={ch.id}
            id={ch.id}
            className={`border-b border-gallery-line ${ch.bg} py-20 sm:py-28`}
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
              {/* Chapter header */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={staggerContainer}
              >
                <div className="flex items-center gap-4 border-b border-gallery-line pb-8">
                  <motion.span
                    custom={0}
                    variants={fadeInUp}
                    className="font-mono text-xs text-shell-subtle"
                  >
                    {ch.n}
                  </motion.span>
                  <motion.p
                    custom={0}
                    variants={fadeInUp}
                    className="text-xs font-medium uppercase tracking-widest text-shell-muted"
                  >
                    {ch.eyebrow}
                  </motion.p>
                </div>
                <motion.h2
                  custom={1}
                  variants={fadeInUp}
                  className="mt-10 max-w-xl font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl"
                >
                  {ch.title}
                </motion.h2>
                <motion.p
                  custom={2}
                  variants={fadeInUp}
                  className="mt-4 max-w-xl text-base leading-relaxed text-shell-muted"
                >
                  {ch.lead}
                </motion.p>
                <motion.div
                  custom={3}
                  variants={fadeInUp}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {ch.uses.map(u => (
                    <span
                      key={u}
                      className="inline-block cursor-default rounded-full border border-gallery-line bg-gallery-bg px-3 py-1 text-xs font-medium text-shell-muted"
                    >
                      {u}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Split: Mockup + Feature cards */}
              <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={mockupRight ? 'lg:order-last' : ''}
                >
                  <ch.Mockup />
                </motion.div>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={staggerContainer}
                  className="space-y-3"
                >
                  {ch.features.map((f, fi) => (
                    <motion.li key={f.title} custom={fi} variants={fadeInUp}>
                      <CursorGlow className="rounded-xl border border-gallery-line bg-gallery-surface">
                        <div className="flex gap-5 px-6 py-5">
                          <span className="mt-0.5 shrink-0 text-gallery-ink">
                            <f.Icon
                              className="h-5 w-5"
                              strokeWidth={1.5}
                              aria-hidden
                            />
                          </span>
                          <div>
                            <p className="font-display text-sm font-semibold text-gallery-ink">
                              {f.title}
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-shell-muted">
                              {f.text}
                            </p>
                          </div>
                        </div>
                      </CursorGlow>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </section>
        )
      })}

      {/*
       * AEO-Block ohne Framer-Motion-Wrapper: Definitionen, Vergleich und
       * Longtail-Inhalte müssen im prerenderten HTML sichtbar sein
       * (kein opacity:0 / kein whileInView), damit KI-/SEO-Crawler den Text
       * ohne JS-Ausführung lesen.
       */}
      <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-14">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl">
                Webdesign in Ansbach und Mittelfranken
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-shell-muted">
                <strong className="font-medium text-gallery-ink">Webdesign</strong> ist
                mehr als eine schöne Oberfläche: Es verbindet klare Botschaften, schnelle
                Ladezeiten und eine Struktur, mit der Besucherinnen und Besucher sofort
                verstehen, was Sie anbieten und wie sie Kontakt aufnehmen. Für Betriebe
                in Ansbach, Rothenburg, Weißenburg und der weiteren Region Mittelfranken
                ist ein professioneller Auftritt oft der erste „Berührungspunkt" mit
                Neukundinnen — analog zu Schaufenster und Aushang, nur digital.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-shell-muted">
                <strong className="font-medium text-gallery-ink">Eine Web-App</strong>{' '}
                ist eine webbasierte Anwendung mit Logik und Daten: z. B. Buchungen,
                interne Übersichten oder Formularketten, die über den Browser laufen und
                auf Servern gespeichert werden. Typische Websites informieren und
                verweisen auf Kontakt; Web-Apps erledigen wiederkehrende Arbeitsschritte
                digital und sparen Zeit — besonders dort, wo Tabellen und E-Mail-Pingpong
                heute noch den Alltag bestimmen.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-gallery-ink sm:text-2xl">
                Was kostet Webdesign in Ansbach?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-shell-muted">
                Es gibt keine pauschale „Preisliste", die für jeden passt: Umfang,
                Pflegebedarf, Schnittstellen und rechtliche Anforderungen variieren stark.
                Orientierung geben wir im Erstgespräch mit einer nachvollziehbaren
                Einschätzung — von schlanker Landingpage bis zu mehrsprachiger
                Unternehmenswebsite. Wichtig ist: Sie erhalten keine versteckten Pakete,
                sondern eine Aufteilung, die zu Ihren Prioritäten passt (Launch zuerst,
                Erweiterungen später).
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-gallery-ink sm:text-2xl">
                Lokale SEO Ansbach: worum geht es?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-shell-muted">
                Bei <strong className="font-medium text-gallery-ink">lokaler SEO</strong>{' '}
                geht es darum, dass Menschen in Ihrer Region Sie finden, wenn sie z. B.
                „Handwerker Website Ansbach" oder „Dienstleister Mittelfranken" suchen.
                Dazu gehören konsistente Unternehmensdaten (Name, Adresse, Telefon),
                verständliche Seitentexte und eine technisch saubere Website. Ein
                gepflegtes Google-Unternehmensprofil verstärkt das Signal zusätzlich — wir
                helfen bei der Abstimmung von Website und lokalem Auftritt.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-gallery-ink sm:text-2xl">
                Business Automation mit n8n und KI — wofür eignet sich das?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-shell-muted">
                <strong className="font-medium text-gallery-ink">Business Automation</strong>{' '}
                bedeutet: wiederkehrende Schritte im Betrieb laufen ohne ständiges
                Nachklicken — z. B. wenn eine Rechnung als PDF eintrifft, automatisch
                kategorisiert, abgelegt und zum Drucker geschickt wird, oder wenn ein{' '}
                <strong className="font-medium text-gallery-ink">KI-Telefonassistent</strong>{' '}
                Standardfragen beantwortet und komplexe Fälle an Ihr Team übergibt. Mit
                Tools wie <strong className="font-medium text-gallery-ink">n8n</strong>{' '}
                lassen sich E-Mail, Kalender, Cloud-Speicher und Branchensoftware zuverlässig
                verknüpfen; KI ergänzt dort, wo flexible Text- oder Bildauswertung nötig ist —
                immer im Rahmen von Datenschutz und nachvollziehbaren Regeln.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-gallery-ink sm:text-2xl">
                Website vs. Web-App: Wann macht was Sinn?
              </h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[280px] border-collapse text-left text-sm text-shell-muted">
                  <caption className="sr-only">
                    Vergleich Website und Web-App für KMU
                  </caption>
                  <thead>
                    <tr className="border-b border-gallery-line">
                      <th className="py-3 pr-4 font-display font-semibold text-gallery-ink">
                        Kriterium
                      </th>
                      <th className="py-3 pr-4 font-display font-semibold text-gallery-ink">
                        Website
                      </th>
                      <th className="py-3 font-display font-semibold text-gallery-ink">
                        Web-App
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gallery-line">
                      <th className="py-3 pr-4 align-top font-medium text-gallery-ink">
                        Hauptziel
                      </th>
                      <td className="py-3 pr-4 align-top">
                        Informieren, Vertrauen aufbauen, Kontakt & Anfragen
                      </td>
                      <td className="py-3 align-top">
                        Prozesse abbilden, Daten erfassen, Rollen & Logik
                      </td>
                    </tr>
                    <tr className="border-b border-gallery-line">
                      <th className="py-3 pr-4 align-top font-medium text-gallery-ink">
                        Typische Nutzerin
                      </th>
                      <td className="py-3 pr-4 align-top">
                        Interessentinnen, die sich orientieren möchten
                      </td>
                      <td className="py-3 align-top">
                        Team, Kundinnen oder Partner mit wiederkehrenden Aufgaben
                      </td>
                    </tr>
                    <tr className="border-b border-gallery-line">
                      <th className="py-3 pr-4 align-top font-medium text-gallery-ink">
                        Beispiel
                      </th>
                      <td className="py-3 pr-4 align-top">
                        Leistungsseiten, Referenzen, Kontaktformular
                      </td>
                      <td className="py-3 align-top">
                        Buchungsstrecke, internes Dashboard, Kundenportal
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3 pr-4 align-top font-medium text-gallery-ink">
                        Wann lohnt es sich?
                      </th>
                      <td className="py-3 pr-4 align-top">
                        Wenn Sichtbarkeit und Glaubwürdigkeit im Vordergrund stehen
                      </td>
                      <td className="py-3 align-top">
                        Wenn derselbe Ablauf oft digital wiederholt werden soll
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-gallery-ink sm:text-2xl">
                Website erstellen lassen Mittelfranken — worauf achten?
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-shell-muted">
                <li>
                  <strong className="font-medium text-gallery-ink">Ziele klären:</strong>{' '}
                  Anrufe, Termine, Bewerbungen oder Downloads — eine Seite kann nicht
                  alles gleich stark priorisieren.
                </li>
                <li>
                  <strong className="font-medium text-gallery-ink">Inhalte früh denken:</strong>{' '}
                  Texte und Bilder brauchen oft länger als das Layout; wer früh liefert,
                  startet schneller.
                </li>
                <li>
                  <strong className="font-medium text-gallery-ink">Technik &amp; Pflege:</strong>{' '}
                  SSL, Backups und Updates gehören dazu — wir setzen auf wartbare
                  Standards statt undokumentierter Einmallösungen.
                </li>
                <li>
                  <strong className="font-medium text-gallery-ink">Messbarkeit:</strong>{' '}
                  Für Kampagnen und SEO hilft sauberes Tracking — natürlich
                  datenschutzkonform und mit Ihrer Einwilligung, wo nötig.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dark CTA */}
      <section className="bg-stone-950 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <motion.p
                custom={0}
                variants={fadeInUp}
                className="text-xs font-medium uppercase tracking-widest text-stone-500"
              >
                Jetzt starten
              </motion.p>
              <motion.h2
                custom={1}
                variants={fadeInUp}
                className="mt-4 font-display text-2xl font-semibold tracking-tight text-stone-100 sm:text-3xl"
              >
                Bereit, wenn Sie es sind.
              </motion.h2>
              <motion.p
                custom={2}
                variants={fadeInUp}
                className="mt-3 text-base text-stone-400"
              >
                Schreiben Sie uns — wir melden uns innerhalb eines Werktags.
              </motion.p>
            </div>
            <motion.div custom={3} variants={fadeInUp} className="shrink-0">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 rounded-lg bg-stone-100 px-6 py-3.5 text-sm font-medium text-stone-900 transition hover:bg-white"
              >
                Unverbindlich anfragen
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
