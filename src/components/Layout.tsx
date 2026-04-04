import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { ScrollToTop } from './ScrollToTop'

const nav = [
  { to: '/', label: 'Start', end: true },
  { to: '/leistungen', label: 'Leistungen' },
  { to: '/arbeiten', label: 'Arbeiten' },
  { to: '/kontakt', label: 'Kontakt' },
]

function linkClass(isActive: boolean) {
  return [
    'text-sm transition-colors',
    isActive
      ? 'font-medium text-gallery-ink'
      : 'text-gallery-muted hover:text-gallery-ink',
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

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <div className="min-h-screen bg-gallery-bg">
      <ScrollToTop />
      <header
        className={`sticky top-0 z-50 border-b transition-colors ${
          scrolled
            ? 'border-gallery-line bg-gallery-surface/90 backdrop-blur-md'
            : 'border-transparent bg-gallery-bg/80 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLink
            to="/"
            className="font-display text-[15px] font-semibold tracking-tight text-gallery-ink"
          >
            Csoftware
          </NavLink>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Hauptnavigation"
          >
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
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gallery-line p-2 text-gallery-ink md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-gallery-line bg-gallery-surface md:hidden"
            >
              <nav
                className="flex flex-col px-4 py-3"
                aria-label="Mobile Navigation"
              >
                {nav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      [
                        'rounded-md px-3 py-3 text-base',
                        isActive
                          ? 'bg-stone-100 font-medium text-gallery-ink'
                          : 'text-gallery-muted hover:bg-stone-50 hover:text-gallery-ink',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-gallery-line bg-gallery-surface py-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-medium text-gallery-ink">Csoftware</p>
            <p className="mt-1 text-sm text-gallery-muted">
              Web & Software für Handwerksbetriebe.
            </p>
          </div>
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} Csoftware
          </p>
        </div>
      </footer>
    </div>
  )
}
