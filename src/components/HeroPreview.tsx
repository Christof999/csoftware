import { motion } from 'framer-motion'

type Card = { id: string; label: string; tag: string; active?: boolean }

const columns: { title: string; tint: string; cards: Card[] }[] = [
  {
    title: 'Backlog',
    tint: 'border-zinc-700/80 bg-zinc-900/40',
    cards: [
      { id: 'CS-104', label: 'Landing — Inhalte', tag: 'Content' },
      { id: 'CS-112', label: 'API — Auth Flow', tag: 'Backend' },
    ],
  },
  {
    title: 'In Arbeit',
    tint: 'border-indigo-500/25 bg-indigo-950/20',
    cards: [
      { id: 'CS-98', label: 'Dashboard — KPIs', tag: 'Frontend', active: true },
    ],
  },
  {
    title: 'Review',
    tint: 'border-zinc-700/80 bg-zinc-900/40',
    cards: [{ id: 'CS-87', label: 'Release v1.2', tag: 'Ship' }],
  },
]

export function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        className="pointer-events-none absolute -inset-4 rounded-[28px] bg-indigo-500/15 blur-3xl"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80 shadow-panel ring-1 ring-white/[0.06] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          </div>
          <span className="font-mono text-[11px] text-zinc-500">csoftware / produkt</span>
          <span className="w-16" />
        </div>
        <div className="grid gap-0 sm:grid-cols-3">
          {columns.map((col) => (
            <div
              key={col.title}
              className={`border-b border-white/[0.06] sm:border-b-0 sm:border-r sm:border-white/[0.06] last:border-r-0 ${col.tint}`}
            >
              <div className="border-b border-white/[0.05] px-3 py-2.5">
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                  {col.title}
                </p>
              </div>
              <div className="space-y-2 p-3">
                {col.cards.map((c) => (
                  <div
                    key={c.id}
                    className={`rounded-lg border px-2.5 py-2 ${
                      c.active
                        ? 'border-indigo-500/35 bg-indigo-500/10 shadow-[0_0_0_1px_rgba(99,102,241,0.2)]'
                        : 'border-white/[0.06] bg-black/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-zinc-500">{c.id}</span>
                      <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] text-zinc-400">
                        {c.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[12px] font-medium leading-snug text-zinc-200">
                      {c.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.06] bg-black/25 px-4 py-2.5">
          <p className="text-center font-mono text-[10px] text-zinc-500">
            Fokus · klare Oberfläche · schnelle Entscheidungen
          </p>
        </div>
      </div>
    </motion.div>
  )
}
