import { type MouseEvent, type ReactNode, useCallback, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type Props = {
  title?: string
  description?: string
  children?: ReactNode
  className?: string
}

const MAX = 7

/** 3D-Tilt per Maus — CSS transform, kein WebGL. */
export function TiltCard({
  title,
  description,
  children,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduced) return
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(900px) rotateY(${px * MAX * 2}deg) rotateX(${-py * MAX * 2}deg) scale3d(1.01,1.01,1)`
    },
    [reduced],
  )

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform =
      'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: reduced ? undefined : 'transform 0.15s ease-out',
      }}
      className={`rounded-2xl border border-gallery-line bg-gallery-elevated shadow-card will-change-transform ${className}`}
    >
      {children ?? (
        <div className="p-6">
          <p className="text-[11px] font-medium uppercase tracking-wider text-shell-muted">
            Bewegung
          </p>
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
        </div>
      )}
    </div>
  )
}
