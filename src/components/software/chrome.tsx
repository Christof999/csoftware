import { motion } from 'framer-motion'
import { EASE_OUT } from './mockupTokens'

/**
 * Rahmen und Bausteine für die nachgebauten Programm-Ansichten.
 *
 * Die Ansichten behalten bewusst ihre eigenen Farben (weiß, grau-50,
 * Akzentfarbe) — auch im dunklen Seitenmodus. Ein Screenshot dreht sich ja
 * auch nicht mit dem Seitenthema; nur der Rahmen darum passt sich an.
 *
 * Die Akzentfarbe ist je Programm eine andere, weil sie im echten Einsatz aus
 * dem Logo des Betriebs abgeleitet wird. Firmennamen, Logos, Mitarbeiter,
 * Projekte und Beträge in diesen Ansichten sind erfunden.
 */

/** Fensterrahmen mit Adresszeile — für die Büro-Ansichten. */
export function BrowserChrome({
  url,
  children,
}: {
  url: string
  children: React.ReactNode
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-gallery-line bg-white shadow-soft dark:border-stone-700 dark:shadow-softDark">
      <div className="flex items-center gap-2 border-b border-[#e5e7eb] bg-[#f3f4f6] px-3 py-2">
        <div className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#d1d5db]" />
          <span className="h-2 w-2 rounded-full bg-[#d1d5db]" />
          <span className="h-2 w-2 rounded-full bg-[#d1d5db]" />
        </div>
        <div className="ml-1 min-w-0 flex-1 truncate rounded border border-[#e5e7eb] bg-white px-2 py-0.5 text-[10px] text-[#9ca3af]">
          {url}
        </div>
      </div>
      <div className="min-w-0 bg-[#f9fafb]">{children}</div>
      {/* Auf dem Handy ist das eine Büro-Ansicht in Taschenformat — Tabellen
          darin lassen sich schieben. Ohne Hinweis probiert das niemand. */}
      <p className="border-t border-[#e5e7eb] bg-[#f3f4f6] px-3 py-1.5 text-center text-[9px] text-[#9ca3af] sm:hidden">
        Büro-Ansicht — seitlich scrollbar
      </p>
    </div>
  )
}

/** Telefonrahmen — für die Ansicht auf der Baustelle. */
export function PhoneChrome({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[230px] overflow-hidden rounded-[1.8rem] border-[5px] border-[#1f2937] bg-white shadow-xl ${className}`}
    >
      <div className="flex items-center justify-between bg-white px-4 pb-0.5 pt-2">
        <span className="text-[9px] font-semibold text-[#111827]">11:42</span>
        <span className="h-1.5 w-10 rounded-full bg-[#1f2937]" aria-hidden />
        <span className="text-[9px] text-[#6b7280]">▮▮</span>
      </div>
      {children}
    </div>
  )
}

/** Hinweis unter einer Ansicht. */
export function MockupNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-[11px] leading-relaxed text-shell-subtle">{children}</p>
}

/** Blendet eine Ansicht beim Scrollen ein. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.45, ease: EASE_OUT }}
      className={`min-w-0 ${className}`}
    >
      {children}
    </motion.div>
  )
}
