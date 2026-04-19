import { AnimatePresence, motion } from 'framer-motion'
import { Cookie, ShieldCheck, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCookieConsent } from '../consent/useCookieConsent'
import { usePrefersReducedMotion } from './home/tech/usePrefersReducedMotion'

/**
 * Dezenter Consent-Dialog — optisch an Hero/Slideover angelehnt:
 * Glasmorphismus, rotierende Geometrie, langsamer Aurora-Glow.
 * Erscheint nur solange `decision === 'pending'`.
 */
export function CookieBanner() {
  const { decision, accept, essentialOnly } = useCookieConsent()
  const reduced = usePrefersReducedMotion()
  const open = decision === 'pending'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex justify-center px-3 pb-3 sm:pb-6"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
        >
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.96 }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              transition: reduced
                ? { duration: 0.15 }
                : { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 },
            }}
            exit={{ y: 40, opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
            className="pointer-events-auto relative w-full max-w-4xl overflow-hidden rounded-2xl border border-gallery-line bg-gallery-surface/95 shadow-2xl backdrop-blur-xl"
          >
            <AuroraBackdrop reduced={reduced} />
            <FloatingPolygons reduced={reduced} />

            <div className="relative grid gap-6 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:p-7">
              {/* Icon */}
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -18, scale: 0.8 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
                transition={{ delay: 0.12, duration: 0.5, ease: 'easeOut' }}
                className="relative hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gallery-line bg-gallery-bg text-gallery-ink sm:flex"
                aria-hidden
              >
                <Cookie className="h-6 w-6" strokeWidth={1.5} />
                {!reduced && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-xl"
                    initial={{ boxShadow: '0 0 0 0 rgba(28,25,23,0)' }}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(28,25,23,0.00)',
                        '0 0 0 6px rgba(28,25,23,0.06)',
                        '0 0 0 0 rgba(28,25,23,0.00)',
                      ],
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </motion.div>

              {/* Text */}
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.35 }}
                  className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-shell-subtle"
                >
                  Hinweis · Privatsphäre
                </motion.p>
                <motion.h2
                  id="cookie-title"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="mt-1.5 font-display text-lg font-semibold tracking-tight text-gallery-ink sm:text-xl"
                >
                  Nur das Nötigste — Sie entscheiden.
                </motion.h2>
                <motion.p
                  id="cookie-desc"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26, duration: 0.4 }}
                  className="mt-2 text-sm leading-relaxed text-shell-muted"
                >
                  Diese Seite nutzt kein Tracking. Für eine schönere Typografie
                  laden wir die Schriftart{' '}
                  <span className="font-medium text-gallery-ink">Inter</span>{' '}
                  von Google Fonts nach — nur mit Ihrer Zustimmung. Ohne
                  Zustimmung verwenden wir die System-Schrift Ihres Geräts.{' '}
                  <Link
                    to="/datenschutz"
                    className="whitespace-nowrap underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
                  >
                    Details in der Datenschutzerklärung
                  </Link>
                  .
                </motion.p>
              </div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                className="flex flex-col gap-2 sm:items-end"
              >
                <button
                  type="button"
                  onClick={accept}
                  autoFocus
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                >
                  <ShieldCheck className="h-4 w-4" strokeWidth={2} aria-hidden />
                  Zustimmen & fortfahren
                  {!reduced && (
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/25 dark:bg-stone-900/20"
                      style={{ filter: 'blur(12px)' }}
                      initial={{ x: '-100%' }}
                      animate={{ x: '300%' }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.8,
                      }}
                    />
                  )}
                </button>
                <button
                  type="button"
                  onClick={essentialOnly}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gallery-line bg-gallery-bg px-5 py-2.5 text-sm font-medium text-gallery-ink transition hover:border-stone-400 dark:hover:border-stone-600"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  Nur Notwendiges
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Sanfter Aurora-Farbverlauf, der langsam über den Hintergrund wandert. */
function AuroraBackdrop({ reduced }: { reduced: boolean }) {
  if (reduced) return null
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full opacity-60 mix-blend-multiply blur-3xl dark:mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle, rgba(120,113,108,0.35), rgba(120,113,108,0) 70%)',
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full opacity-50 mix-blend-multiply blur-3xl dark:mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle, rgba(87,83,78,0.30), rgba(87,83,78,0) 70%)',
        }}
        animate={{ x: [0, -30, 10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  )
}

/**
 * Kleine, CSS-basierte 3D-Polygone — passend zum HeroGeometry-Stil, aber
 * deutlich günstiger (kein Canvas / keine RAF-Loop).
 */
function FloatingPolygons({ reduced }: { reduced: boolean }) {
  if (reduced) return null
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: '900px' }}
    >
      <Polygon
        className="absolute -right-6 -top-6 h-24 w-24 sm:h-28 sm:w-28"
        shape="triangle"
        duration={18}
        delay={0}
      />
      <Polygon
        className="absolute left-2 top-10 hidden h-16 w-16 sm:block"
        shape="square"
        duration={22}
        delay={1.5}
      />
      <Polygon
        className="absolute right-16 bottom-0 hidden h-14 w-14 sm:block"
        shape="hexagon"
        duration={14}
        delay={0.7}
      />
    </div>
  )
}

function Polygon({
  className,
  shape,
  duration,
  delay,
}: {
  className?: string
  shape: 'triangle' | 'square' | 'hexagon'
  duration: number
  delay: number
}) {
  const clipPath =
    shape === 'triangle'
      ? 'polygon(50% 0%, 100% 100%, 0% 100%)'
      : shape === 'hexagon'
        ? 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)'
        : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'

  return (
    <motion.div
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        clipPath,
        background:
          'linear-gradient(135deg, rgba(28,25,23,0.10), rgba(28,25,23,0.04) 60%, rgba(28,25,23,0) 100%)',
        border: '1px solid rgba(28,25,23,0.08)',
      }}
      animate={{
        rotateX: [0, 360],
        rotateY: [0, -360],
        rotateZ: [0, 180],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}
