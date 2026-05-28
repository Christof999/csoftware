export function BlogListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ul className="divide-y divide-gallery-line border-y border-gallery-line" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="animate-pulse py-8 first:pt-0 last:pb-0">
          <div className="h-3 w-24 rounded bg-gallery-line" />
          <div className="mt-4 h-7 w-full max-w-md rounded bg-gallery-line" />
          <div className="mt-3 h-4 w-full rounded bg-gallery-line/80" />
          <div className="mt-2 h-4 w-5/6 rounded bg-gallery-line/60" />
        </li>
      ))}
    </ul>
  )
}
