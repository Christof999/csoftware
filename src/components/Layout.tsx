import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { ScrollToTop } from './ScrollToTop'
import { ThemeToggle } from './ThemeToggle'

const nav = [
  { to: '/', label: 'Start', end: true, n: '01' },
  { to: '/leistungen', label: 'Leistungen', n: '02' },
  { to: '/kontakt', label: 'Kontakt', n: '03' },
]

function linkClass(isActive: boolean) {
  return [
    'text-sm transition-colors',
    isActive
      ? 'font-medium text-gallery-ink'
      : 'text-shell-muted hover:text-gallery-ink',
  ].join(' ')
}

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while panel is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const close = () => setMobileOpen(false)

  return (
    <div className="min-h-screen bg-gallery-bg">
      <ScrollToTop />

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
          >
            Csoftware
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Hauptnavigation">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => linkClass(isActive)}
              >
                {item.label}
              </NavLink>
            ))}
            <ThemeToggle />
            <NavLink
              to="/kontakt"
              className="rounded-lg bg-stone-900 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
            >
              Kontakt
            </NavLink>
          </nav>

          {/* Mobile burger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gallery-line text-gallery-ink transition hover:bg-gallery-bg"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
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

      {/* ── Mobile slide-over ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Blurry backdrop — sits below the sticky header */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-stone-950/30 backdrop-blur-sm md:hidden"
              onClick={close}
              aria-hidden
            />

            {/* Slide-over panel */}
            <motion.aside
              key="panel"
              id="mobile-menu"
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
              className="fixed inset-y-0 right-0 z-[60] flex w-72 flex-col bg-gallery-surface shadow-2xl md:hidden"
            >
              {/* Panel header row */}
              <div className="flex h-14 shrink-0 items-center justify-between border-b border-gallery-line px-5">
                <span className="font-display text-[15px] font-semibold tracking-tight text-gallery-ink">
                  Csoftware
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gallery-line text-gallery-ink transition hover:bg-gallery-bg"
                  aria-label="Menü schließen"
                >
                  <X className="h-[18px] w-[18px]" aria-hidden />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1 p-3" aria-label="Mobile Navigation">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055 + 0.1, duration: 0.22, ease: 'easeOut' }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={close}
                      className={({ isActive }) =>
                        [
                          'flex items-baseline justify-between rounded-xl px-4 py-4 transition-colors',
                          isActive
                            ? 'bg-gallery-bg text-gallery-ink'
                            : 'text-shell-muted hover:bg-gallery-bg hover:text-gallery-ink',
                        ].join(' ')
                      }
                    >
                      <span className="font-display text-lg font-semibold">{item.label}</span>
                      <span className="font-mono text-xs text-shell-subtle">{item.n}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <div className="mt-auto border-t border-gallery-line p-4">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26, duration: 0.22, ease: 'easeOut' }}
                >
                  <NavLink
                    to="/kontakt"
                    onClick={close}
                    className="block rounded-xl bg-stone-900 px-4 py-3.5 text-center text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                  >
                    Unverbindlich anfragen
                  </NavLink>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Page content ───────────────────────────────────────────────────── */}
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
