import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <p className="text-sm text-gallery-muted">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-gallery-ink">
        Seite nicht gefunden
      </h1>
      <p className="mt-3 text-sm text-gallery-muted">
        Diese Adresse gibt es hier nicht.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block text-sm font-medium text-gallery-ink underline decoration-stone-300 underline-offset-4 hover:decoration-gallery-ink"
      >
        Zur Startseite
      </Link>
    </div>
  )
}
