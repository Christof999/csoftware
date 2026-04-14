import { motion } from 'framer-motion'
import {
  ArrowRight,
  Globe,
  LayoutTemplate,
  LineChart,
  Palette,
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
