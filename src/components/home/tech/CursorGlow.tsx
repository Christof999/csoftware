import {
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type Props = {
  children: ReactNode
  className?: string
}

/** Sanfter Glow folgt dem Cursor innerhalb des Containers. */
export function CursorGlow({ children, className = '' }: Props) {
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
      className={`relative overflow-hidden ${className}`}
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
      <div className="relative">{children}</div>
    </div>
  )
}
