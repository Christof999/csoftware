import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <p className="text-sm text-zinc-500">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-white">
        Seite nicht gefunden
      </h1>
      <p className="mt-3 text-sm text-zinc-500">
        Diese Adresse gibt es hier nicht.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block text-sm font-medium text-indigo-300 underline decoration-indigo-500/40 underline-offset-4 hover:text-indigo-200"
      >
        Zur Startseite
      </Link>
    </div>
  )
}
