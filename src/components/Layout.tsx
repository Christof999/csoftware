import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useCookieConsent } from '../consent/useCookieConsent'
import { SITE_GOOGLE_BUSINESS_URL, SITE_NAME, SITE_SAME_AS } from '../site'
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
      { label: 'Software',           to: '/#software' },
      { label: 'Automatisierung',    to: '/#automatisierung' },
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
    to: '/software',
    label: 'Software',
    n: '02',
    end: false,
    subs: [
      { label: 'Zeiterfassung',      to: '/software#zeiterfassung' },
      { label: 'Auftrag & Rechnung', to: '/software#auftrag-rechnung' },
      { label: 'Posteingang',        to: '/software#posteingang' },
      { label: 'Zusammenspiel',      to: '/software#symbiose' },
      { label: 'Praxisbeispiele',    to: '/software#praxis' },
    ],
  },
  {
    to: '/leistungen',
    label: 'Leistungen',
    n: '03',
    end: false,
    subs: [] as { label: string; to: string }[],
  },
  {
    to: '/blog',
    label: 'Blog',
    n: '04',
    end: false,
    subs: [] as { label: string; to: string }[],
  },
  {
    to: '/ueber-uns',
    label: 'Über uns',
    n: '05',
    end: false,
    subs: [] as { label: string; to: string }[],
  },
  {
    to: '/kontakt',
    label: 'Kontakt',
    n: '06',
    end: false,
    subs: [] as { label: string; to: string }[],
  },
]

function socialLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '')
    if (host.includes('linkedin')) return 'LinkedIn'
    if (host.includes('instagram')) return 'Instagram'
    if (host.includes('xing')) return 'Xing'
    if (host.includes('facebook')) return 'Facebook'
    return host
  } catch {
    return 'Profil'
  }
}

// ─── Layout ──────────────────────────────────────────────────────────────────

export function Layout() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const { openBanner } = useCookieConsent()

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
    requestAnimationFrame(() => menuButtonRef.current?.focus())
  }

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const firstFocusable = panel?.querySelector<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    )
    firstFocusable?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(el => !el.hasAttribute('disabled'))
      if (focusables.length === 0) return
      const first = focusables[0]!
      const last = focusables[focusables.length - 1]!
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
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
      <a
        href="#main-content"
        className="pointer-events-none fixed left-4 top-0 z-[100] -translate-y-full rounded-b-lg bg-gallery-ink px-4 py-2 text-sm text-gallery-bg shadow-lg transition-transform focus:pointer-events-auto focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-stone-400"
      >
        Zum Inhalt springen
      </a>
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
            {SITE_NAME}
          </NavLink>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gallery-line text-gallery-ink transition hover:bg-gallery-bg"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="nav-panel"
              aria-haspopup="menu"
              aria-label={open ? 'Menü schließen' : 'Hauptmenü öffnen'}
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
              ref={panelRef}
              key="panel"
              id="nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Hauptmenü"
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
                  {SITE_NAME}
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
              <nav className="flex-1 overflow-y-auto p-3" aria-label="Hauptnavigation">
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
                        aria-expanded={expanded === item.to}
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
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="border-t border-gallery-line bg-gallery-surface py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-gallery-ink">{SITE_NAME}</p>
              <p className="mt-1 text-sm text-shell-muted">
                Software, Automatisierung und Websites — klar, direkt, für Sie gebaut.
              </p>
            </div>
            <nav
              aria-label="Seiten und Profile"
              className="flex flex-col gap-3 text-xs text-shell-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2"
            >
              <Link
                to="/software"
                className="transition hover:text-gallery-ink"
              >
                Software
              </Link>
              <Link
                to="/ueber-uns"
                className="transition hover:text-gallery-ink"
              >
                Über uns
              </Link>
              {SITE_GOOGLE_BUSINESS_URL ? (
                <a
                  href={SITE_GOOGLE_BUSINESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-gallery-ink"
                >
                  Google Business
                </a>
              ) : null}
              {SITE_SAME_AS.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-gallery-ink"
                >
                  {socialLabel(url)}
                </a>
              ))}
            </nav>
          </div>
          <nav
            aria-label="Rechtliche Hinweise"
            className="flex flex-col gap-3 border-t border-gallery-line pt-8 text-xs text-shell-muted sm:flex-row sm:items-center sm:gap-6"
          >
            <Link
              to="/impressum"
              className="transition hover:text-gallery-ink"
            >
              Impressum
            </Link>
            <Link
              to="/datenschutz"
              className="transition hover:text-gallery-ink"
            >
              Datenschutz
            </Link>
            <button
              type="button"
              onClick={openBanner}
              className="text-left transition hover:text-gallery-ink"
            >
              Cookie-Einstellungen
            </button>
            <span className="hidden sm:inline text-shell-subtle">·</span>
            <span>© {new Date().getFullYear()} {SITE_NAME}</span>
          </nav>
        </div>
      </footer>
    </div>
  )
}
