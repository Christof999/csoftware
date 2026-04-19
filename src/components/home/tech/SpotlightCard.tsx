import {
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useRef,
} from 'react'

type Props = {
  title?: string
  description?: string
  /** Wenn gesetzt, wird dieser Inhalt statt Titel/Text gerendert (z. B. ganze Sektionen). */
  children?: ReactNode
  className?: string
  /** Standard: nur bei title/description */
  showDemoLabel?: boolean
}

/** Radialer Spotlight folgt der Maus — auf der ganzen Seite wiederverwendbar. */
export function SpotlightCard({
  title,
  description,
  children,
  className = '',
  showDemoLabel = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    el.style.setProperty('--sx', `${x}%`)
    el.style.setProperty('--sy', `${y}%`)
  }, [])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--sx', '50%')
    el.style.setProperty('--sy', '50%')
  }, [])

  const hasDefaultCopy = Boolean(title && description)

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        {
          '--sx': '50%',
          '--sy': '50%',
        } as CSSProperties
      }
      className={`group relative overflow-hidden rounded-2xl border border-gallery-line bg-gallery-surface ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(600px circle at var(--sx) var(--sy), rgba(120, 113, 108, 0.12), transparent 40%)',
        }}
        aria-hidden
      />
      <div className="relative">
        {children ? (
          children
        ) : (
          <>
            {showDemoLabel && hasDefaultCopy ? (
              <p className="text-[11px] font-medium uppercase tracking-wider text-shell-muted">
                Interaktion
              </p>
            ) : null}
            {title ? (
              <h3 className="mt-2 font-display text-base font-semibold text-gallery-ink">
                {title}
              </h3>
            ) : null}
            {description ? (
              <p className="mt-2 text-sm leading-relaxed text-shell-muted">
                {description}
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
