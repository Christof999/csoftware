import { motion } from 'framer-motion'
import { useTheme } from '../theme/useTheme'

/** Vollständige Mini-Website (Skincare, beige) — wirkt wie echte Referenz, unabhängig vom Seiten-Theme. */
export function HeroShowcase() {
  const { theme } = useTheme()
  const chromeBg =
    theme === 'dark'
      ? 'border-zinc-700/80 bg-zinc-900/95'
      : 'border-gallery-line bg-gallery-elevated'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        className={`overflow-hidden rounded-xl border shadow-soft dark:shadow-softDark ${chromeBg}`}
      >
        <div
          className={`flex items-center gap-2 border-b px-3 py-2.5 ${
            theme === 'dark' ? 'border-zinc-700/60' : 'border-gallery-line'
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${theme === 'dark' ? 'bg-zinc-600' : 'bg-stone-300'}`}
          />
          <span
            className={`h-2.5 w-2.5 rounded-full ${theme === 'dark' ? 'bg-zinc-600' : 'bg-stone-300'}`}
          />
          <span
            className={`h-2.5 w-2.5 rounded-full ${theme === 'dark' ? 'bg-zinc-600' : 'bg-stone-300'}`}
          />
          <span
            className={`ml-2 flex-1 truncate text-center font-mono text-[10px] ${
              theme === 'dark' ? 'text-zinc-500' : 'text-stone-400'
            }`}
          >
            lumen-skin.de
          </span>
        </div>

        {/* Mini-Website: festes warmes Beige — „echte“ Marken-Seite */}
        <div className="bg-[#f5f0e8] text-[#3d3830]">
          <header className="border-b border-[#e8dfd4] px-4 py-3 sm:px-5">
            <div className="mx-auto flex max-w-[520px] items-center justify-between gap-3">
              <span className="font-showcase text-lg font-semibold tracking-tight text-[#2c2825] sm:text-xl">
                Lumen
              </span>
              <nav className="hidden gap-4 text-[11px] font-medium uppercase tracking-[0.12em] text-[#6b6560] sm:flex">
                <span className="cursor-default">Shop</span>
                <span className="cursor-default">Routine</span>
                <span className="cursor-default">Über uns</span>
              </nav>
              <span className="rounded-full border border-[#e0d5c8] bg-white/60 px-2.5 py-1 text-[10px] font-medium text-[#5c564f]">
                DE
              </span>
            </div>
          </header>

          <section className="px-4 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-8">
            <div className="mx-auto max-w-[520px] text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8a8279]">
                Neue Kollektion
              </p>
              <h2 className="mt-3 font-showcase text-2xl font-semibold leading-tight tracking-tight text-[#1f1c19] sm:text-[1.65rem]">
                Haut, die sich gut anfühlt — jeden Tag.
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-[#6b6560]">
                Sanfte Pflege mit wenigen, sorgfältig gewählten Inhaltsstoffen.
                Ohne Schnickschnack — nur das, was Ihre Haut wirklich braucht.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full bg-[#2c2825] px-4 py-2 text-[12px] font-medium text-[#f5f0e8]">
                  Kollektion entdecken
                </span>
                <span className="rounded-full border border-[#cfc4b8] bg-white/70 px-4 py-2 text-[12px] font-medium text-[#3d3830]">
                  Beratung
                </span>
              </div>
            </div>

            <div className="mx-auto mt-8 grid max-w-[520px] grid-cols-3 gap-2 sm:gap-3">
              {[
                { name: 'Serum', price: '42 €', swatch: 'bg-[#ddc4b0]' },
                { name: 'Creme', price: '38 €', swatch: 'bg-[#d4c4b4]' },
                { name: 'Reiniger', price: '28 €', swatch: 'bg-[#e5ddd3]' },
              ].map((p) => (
                <article
                  key={p.name}
                  className="overflow-hidden rounded-xl border border-[#e8dfd4] bg-white/80 shadow-sm"
                >
                  <div className={`aspect-square ${p.swatch}`} />
                  <div className="p-2.5 sm:p-3">
                    <p className="text-[11px] font-medium text-[#2c2825]">{p.name}</p>
                    <p className="mt-0.5 text-[11px] text-[#8a8279]">{p.price}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-6 max-w-[520px] rounded-xl border border-[#e8dfd4] bg-white/50 px-4 py-3 text-center">
              <p className="text-[11px] text-[#6b6560]">
                Kostenloser Versand ab 50 € · 30 Tage Rückgabe
              </p>
            </div>
          </section>

          <footer className="border-t border-[#e8dfd4] px-4 py-3">
            <div className="mx-auto flex max-w-[520px] flex-wrap items-center justify-between gap-2 text-[10px] text-[#8a8279]">
              <span>© Lumen Skin</span>
              <span className="flex gap-3">
                <span>Impressum</span>
                <span>Datenschutz</span>
              </span>
            </div>
          </footer>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-stone-500 dark:text-stone-400">
        So setzen wir ruhige Marken-Auftritte um — mit Ihren Inhalten.
      </p>
    </motion.div>
  )
}
