import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Referenz } from '../../content/referenzen'

export function SitePreview({
  referenz,
  priority = false,
}: {
  referenz: Referenz
  priority?: boolean
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-gallery-line bg-gallery-surface shadow-sm">
      <div className="flex items-center gap-2 border-b border-gallery-line bg-gallery-bg px-3 py-2">
        <div className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-gallery-line" />
          <span className="h-2 w-2 rounded-full bg-gallery-line" />
          <span className="h-2 w-2 rounded-full bg-gallery-line" />
        </div>
        <p className="ml-1 min-w-0 flex-1 truncate rounded border border-gallery-line bg-gallery-surface px-2 py-0.5 text-[10px] text-shell-subtle">
          {referenz.host}
        </p>
      </div>
      <div className="aspect-[16/10] overflow-hidden bg-gallery-bg">
        <img
          src={referenz.image}
          alt={referenz.imageAlt}
          width={1400}
          height={900}
          className="h-full w-full object-cover object-top"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    </div>
  )
}

export function ExternalSiteLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </a>
  )
}
