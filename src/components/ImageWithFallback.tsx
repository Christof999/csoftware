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
        className={`flex h-full w-full flex-col items-center justify-center bg-zinc-900 px-4 text-center ${className ?? ''}`}
      >
        <p className="text-xs font-medium text-zinc-500">Screenshot folgt</p>
        <p className="mt-2 max-w-[14rem] text-[11px] leading-snug text-zinc-600">
          PNG in{' '}
          <span className="font-mono text-zinc-500">public/project-screenshots/…</span>{' '}
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
