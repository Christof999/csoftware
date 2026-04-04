import { useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
}

export function ImageWithFallback({ src, alt, className }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center bg-stone-100 px-4 text-center ${className ?? ''}`}
      >
        <p className="text-xs font-medium text-stone-500">Platzhalter</p>
        <p className="mt-2 max-w-[14rem] text-[11px] leading-snug text-stone-400">
          PNG in{' '}
          <span className="font-mono text-stone-500">public/project-screenshots/…</span>{' '}
          ablegen.
        </p>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
