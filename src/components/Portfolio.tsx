import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../lib/motion'

type Project = {
  title: string
  category: string
  description: string
  tags: string[]
  snippet: 'erp' | 'time' | 'web'
}

const projects: Project[] = [
  {
    title: 'Elektro Schmidt — Auftragsübersicht',
    category: 'Individuelle Software',
    description:
      'Dashboard für laufende Aufträge und Material — damit das Team den Überblick behält, ohne Excel-Wirrwarr.',
    tags: ['ERP', 'Übersicht', 'Team'],
    snippet: 'erp',
  },
  {
    title: 'Tischlerei Bergmann — Zeiten & Einsätze',
    category: 'Zeiterfassung',
    description:
      'Erfassung pro Baustelle mit klaren Summen — weniger Rückfragen, saubere Abrechnung.',
    tags: ['Zeiten', 'Baustelle', 'Reporting'],
    snippet: 'time',
  },
  {
    title: 'Sanitär & Heizung Weber — Neuer Auftritt',
    category: 'Web & Landing',
    description:
      'Klare Leistungsseiten, starke Fotos, schneller Kontaktweg — mehr Anfragen aus der Region.',
    tags: ['Webdesign', 'SEO', 'Kontakt'],
    snippet: 'web',
  },
]

function ErpSnippet() {
  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/90 p-3 text-left shadow-inner">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wide text-craft-500">
          Aufträge
        </span>
        <span className="rounded-full bg-forest-600/30 px-2 py-0.5 text-[10px] font-medium text-forest-400">
          Live
        </span>
      </div>
      <div className="space-y-2">
        {[
          { name: 'Neubau Musterweg', status: 'In Arbeit', pct: 68 },
          { name: 'Bad Renovierung', status: 'Material', pct: 42 },
          { name: 'Wartung Industrie', status: 'Geplant', pct: 15 },
        ].map((row) => (
          <div
            key={row.name}
            className="rounded-lg border border-white/5 bg-craft-950/60 px-2 py-1.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[11px] font-medium text-craft-100">
                {row.name}
              </span>
              <span className="shrink-0 text-[10px] text-craft-500">
                {row.status}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-tech-500 to-forest-500"
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TimeSnippet() {
  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/90 p-3 text-left shadow-inner">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wide text-craft-500">
          Heute
        </span>
        <span className="text-[10px] text-tech-400">08:42 h</span>
      </div>
      <div className="space-y-2">
        {[
          { t: '07:30–11:15', place: 'Baustelle Nord', h: '3:45' },
          { t: '12:00–15:10', place: 'Werkstatt', h: '3:10' },
        ].map((row) => (
          <div
            key={row.t}
            className="flex items-center justify-between gap-2 rounded-lg border border-white/5 bg-craft-950/60 px-2 py-1.5"
          >
            <div className="min-w-0">
              <p className="text-[10px] text-craft-500">{row.t}</p>
              <p className="truncate text-[11px] text-craft-100">{row.place}</p>
            </div>
            <span className="shrink-0 rounded-md bg-navy-800/80 px-1.5 py-0.5 font-mono text-[10px] text-gold-400">
              {row.h}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between rounded-lg border border-dashed border-white/10 px-2 py-1.5">
        <span className="text-[10px] text-craft-500">Summe Woche</span>
        <span className="font-mono text-[11px] text-white">36:20 h</span>
      </div>
    </div>
  )
}

function WebSnippet() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-navy-900/80 to-craft-950/90 text-left shadow-inner">
      <div className="border-b border-white/5 bg-white/5 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-forest-400/80" />
          <span className="ml-2 truncate text-[10px] text-craft-500">
            ihr-handwerk.de
          </span>
        </div>
      </div>
      <div className="p-3">
        <div className="mb-2 h-16 rounded-lg bg-gradient-to-br from-navy-700/50 to-forest-900/40" />
        <div className="mb-2 h-2 w-3/4 rounded bg-white/10" />
        <div className="mb-3 h-2 w-1/2 rounded bg-white/5" />
        <div className="flex gap-2">
          <span className="h-7 flex-1 rounded-md bg-tech-500/30" />
          <span className="h-7 w-14 rounded-md border border-white/10" />
        </div>
      </div>
    </div>
  )
}

function Snippet({ type }: { type: Project['snippet'] }) {
  if (type === 'erp') return <ErpSnippet />
  if (type === 'time') return <TimeSnippet />
  return <WebSnippet />
}

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="scroll-mt-24 border-b border-white/5 bg-[#141414] py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            custom={0}
            variants={fadeInUp}
            className="text-sm font-semibold uppercase tracking-widest text-tech-400"
          >
            Referenzen
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Ausgewählte Projekte
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 text-lg text-craft-300"
          >
            Beispiele, wie komplexe Informationen ruhig und übersichtlich wirken
            — statt laut und unübersichtlich.
          </motion.p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <motion.li
              key={project.title}
              custom={i}
              variants={fadeInUp}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-craft-950/80 shadow-lg shadow-black/30 transition hover:border-tech-500/30 hover:shadow-tech-900/20"
            >
              <div className="border-b border-white/5 bg-navy-950/50 p-4">
                <Snippet type={project.snippet} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-gold-400/90">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-craft-400">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-craft-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-craft-500">
                  Case Study folgt
                  <ExternalLink className="h-4 w-4 opacity-70" aria-hidden />
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
