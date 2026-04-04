import {
  type CSSProperties,
  type MouseEvent,
  useCallback,
  useRef,
  useState,
} from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Sanfter Glow folgt dem Cursor innerhalb der Karte (wie viele moderne UIs). */
export function CursorGlowDemo() {
  const wrap = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const [on, setOn] = useState(false)

  const move = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduced) return
      const el = wrap.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      el.style.setProperty('--cx', `${x}px`)
      el.style.setProperty('--cy', `${y}px`)
    },
    [reduced],
  )

  return (
    <div
      ref={wrap}
      onMouseMove={move}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={
        {
          '--cx': '50%',
          '--cy': '50%',
        } as CSSProperties
      }
      className="relative overflow-hidden rounded-2xl border border-gallery-line bg-gallery-surface p-6"
    >
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: on ? 1 : 0,
            background:
              'radial-gradient(280px circle at var(--cx) var(--cy), rgba(28, 25, 23, 0.06), transparent 55%)',
          }}
          aria-hidden
        />
      )}
      <div className="relative">
        <p className="text-[11px] font-medium uppercase tracking-wider text-shell-muted">
          Cursor
        </p>
        <h3 className="mt-2 font-display text-base font-semibold text-gallery-ink">
          Licht folgt der Maus
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-shell-muted">
          Ein dezenter Schein unterstreicht, wo Nutzer hinsehen — reines CSS &
          React, ohne schwere Bibliotheken.
        </p>
      </div>
    </div>
  )
}
