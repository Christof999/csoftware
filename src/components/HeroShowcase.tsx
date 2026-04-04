import { motion } from 'framer-motion'

/** Einfache „Website in einem Fenster“ — ohne Tech-Sprech, nur ruhige Flächen. */
export function HeroShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="overflow-hidden rounded-xl border border-gallery-line bg-gallery-surface shadow-soft">
        <div className="flex items-center gap-2 border-b border-gallery-line bg-gallery-elevated px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
          <span className="ml-2 flex-1 truncate text-center font-mono text-[10px] text-stone-400">
            ihre-firma.de
          </span>
        </div>

        <div className="bg-white p-4 sm:p-6">
          <div className="mx-auto max-w-md space-y-5">
            <div className="space-y-2 text-center">
              <div className="mx-auto h-2 w-24 rounded-full bg-stone-200" />
              <div className="mx-auto h-2 w-40 rounded-full bg-stone-100" />
            </div>
            <div className="flex justify-center gap-2">
              <span className="h-8 w-20 rounded-md bg-stone-900" />
              <span className="h-8 w-20 rounded-md border border-stone-200 bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[4/3] rounded-lg bg-stone-100" />
              <div className="aspect-[4/3] rounded-lg bg-stone-50 ring-1 ring-stone-100" />
            </div>
            <div className="space-y-2 pt-1">
              <div className="h-2 w-full rounded-full bg-stone-100" />
              <div className="h-2 w-11/12 rounded-full bg-stone-50" />
              <div className="h-2 w-4/5 rounded-full bg-stone-50" />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-stone-400">
        So klar kann Ihre Seite wirken — ruhig, verständlich, professionell.
      </p>
    </motion.div>
  )
}
