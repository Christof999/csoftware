import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Portfolio } from './components/Portfolio'
import { Services } from './components/Services'

const navLinks = [
  { href: '#leistungen', label: 'Leistungen' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
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
    <div className="min-h-screen bg-craft-950">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-craft-950/90 shadow-lg shadow-black/20 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#hero"
            className="font-display text-lg font-semibold tracking-tight text-white"
          >
            Csoftware
          </a>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Hauptnavigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-craft-300 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-600"
            >
              Kontakt
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-white/15 p-2 text-craft-100 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden />
            ) : (
              <Menu className="h-6 w-6" aria-hidden />
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
              transition={{ duration: 0.25 }}
              className="border-t border-white/10 bg-craft-950/95 backdrop-blur-md md:hidden"
            >
              <nav
                className="flex flex-col gap-1 px-4 py-4"
                aria-label="Mobile Navigation"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-3 text-base font-medium text-craft-100 hover:bg-white/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#kontakt"
                  className="mt-2 rounded-lg bg-navy-700 px-3 py-3 text-center text-base font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Kontakt aufnehmen
                </a>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Contact />
      </main>

      <footer className="border-t border-white/10 bg-[#101010] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <div>
            <p className="font-display text-base font-semibold text-white">
              Csoftware
            </p>
            <p className="mt-1 text-sm text-craft-500">
              Web & Software für Handwerksbetriebe.
            </p>
          </div>
          <p className="text-xs text-craft-600">
            © {new Date().getFullYear()} Csoftware. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  )
}
