import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { HashScroller } from './HashScroller'
import { ScrollToTop } from './ScrollToTop'
import { ThemeToggle } from './ThemeToggle'

// ─── Nav data ────────────────────────────────────────────────────────────────

const nav = [
  {
    to: '/',
    label: 'Übersicht',
    n: '01',
    end: true,
    subs: [
      { label: 'Websites',           to: '/#websites' },
      { label: 'Web Apps',           to: '/#webapps' },
      { label: 'Print & Media',      to: '/#print-media' },
      { label: 'Ihre Vorteile',      to: '/#ihre-vorteile' },
      { label: 'Unser Versprechen',  to: '/#unser-versprechen' },
      { label: 'Ablauf',             to: '/#ablauf' },
      { label: 'Leistungsfeld',      to: '/#leistungsfeld' },
    ],
  },
  {
    to: '/leistungen',
    label: 'Leistungen',
    n: '02',
    end: false,
    subs: [] as { label: string; to: string }[],
  },
  {
    to: '/kontakt',
    label: 'Kontakt',
    n: '03',
    end: false,
    subs: [] as { label: string; to: string }[],
  },
]

// ─── Layout ──────────────────────────────────────────────────────────────────

export function Layout() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function close() {
    setOpen(false)
    setExpanded(null)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function toggle() {
    if (open) {
      close()
    } else {
      setOpen(true)
      setExpanded(null)
    }
  }

  function toggleExpand(key: string) {
    setExpanded((prev) => (prev === key ? null : key))
  }

  return (
    <div className="min-h-screen bg-gallery-bg">
      <ScrollToTop />
      <HashScroller />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 border-b transition-colors ${
          scrolled
            ? 'border-gallery-line bg-gallery-surface/95 backdrop-blur-md'
            : 'border-transparent bg-gallery-bg/90 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLink
            to="/"
            className="font-display text-[15px] font-semibold tracking-tight text-gallery-ink"
            onClick={close}
          >
            Csoftware
          </NavLink>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gallery-line text-gallery-ink transition hover:bg-gallery-bg"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="nav-panel"
              aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute"
                  >
                    <X className="h-[18px] w-[18px]" aria-hidden />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -45, scale: 0.5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute"
                  >
                    <Menu className="h-[18px] w-[18px]" aria-hidden />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Slide-over ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-stone-950/30 backdrop-blur-sm"
              onClick={close}
              aria-hidden
            />

            {/* Panel */}
            <motion.aside
              key="panel"
              id="nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ x: '100%' }}
              animate={{
                x: 0,
                transition: { type: 'spring', damping: 28, stiffness: 260 },
              }}
              exit={{
                x: '100%',
                transition: { duration: 0.22, ease: 'easeIn' },
              }}
              className="fixed inset-y-0 right-0 z-[60] flex w-80 flex-col bg-gallery-surface shadow-2xl"
            >
              {/* Panel header */}
              <div className="flex h-14 shrink-0 items-center justify-between border-b border-gallery-line px-5">
                <NavLink
                  to="/"
                  onClick={close}
                  className="font-display text-[15px] font-semibold tracking-tight text-gallery-ink"
                >
                  Csoftware
                </NavLink>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gallery-line text-gallery-ink transition hover:bg-gallery-bg"
                  aria-label="Menü schließen"
                >
                  <X className="h-[18px] w-[18px]" aria-hidden />
                </button>
              </div>

              {/* Nav */}
              <nav className="flex-1 overflow-y-auto p-3" aria-label="Navigation">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.08, duration: 0.22, ease: 'easeOut' }}
                  >
                    {/* Main item */}
                    {item.subs.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.to)}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition-colors hover:bg-gallery-bg"
                      >
                        <span className="font-display text-lg font-semibold text-gallery-ink">
                          {item.label}
                        </span>
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs text-shell-subtle">{item.n}</span>
                          <motion.span
                            animate={{ rotate: expanded === item.to ? 180 : 0 }}
                            transition={{ duration: 0.22 }}
                            className="text-shell-subtle"
                          >
                            <ChevronDown className="h-4 w-4" aria-hidden />
                          </motion.span>
                        </div>
                      </button>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={close}
                        className="flex items-center justify-between rounded-xl px-4 py-3.5 transition-colors hover:bg-gallery-bg"
                      >
                        <span className="font-display text-lg font-semibold text-gallery-ink">
                          {item.label}
                        </span>
                        <span className="font-mono text-xs text-shell-subtle">{item.n}</span>
                      </Link>
                    )}

                    {/* Sub-items */}
                    <AnimatePresence initial={false}>
                      {expanded === item.to && (
                        <motion.div
                          key="subs"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <ul className="mb-1 ml-4 space-y-0.5 border-l border-gallery-line pl-4">
                            {item.subs.map((sub, si) => (
                              <motion.li
                                key={sub.label}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: si * 0.045,
                                  duration: 0.18,
                                  ease: 'easeOut',
                                }}
                              >
                                <Link
                                  to={sub.to}
                                  onClick={close}
                                  className="block rounded-lg px-3 py-2.5 text-sm text-shell-muted transition-colors hover:bg-gallery-bg hover:text-gallery-ink"
                                >
                                  {sub.label}
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <div className="shrink-0 border-t border-gallery-line p-4">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.22, ease: 'easeOut' }}
                >
                  <Link
                    to="/kontakt"
                    onClick={close}
                    className="block rounded-xl bg-stone-900 px-4 py-3.5 text-center text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                  >
                    Unverbindlich anfragen
                  </Link>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Page ───────────────────────────────────────────────────────────── */}
      <main>
        <Outlet />
      </main>

      <footer className="border-t border-gallery-line bg-gallery-surface py-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-medium text-gallery-ink">Csoftware</p>
            <p className="mt-1 text-sm text-shell-muted">
              Websites & digitale Lösungen — klar, direkt, für Sie gebaut.
            </p>
          </div>
          <p className="text-xs text-stone-400 dark:text-stone-500">
            © {new Date().getFullYear()} Csoftware
          </p>
        </div>
      </footer>
    </div>
  )
}
