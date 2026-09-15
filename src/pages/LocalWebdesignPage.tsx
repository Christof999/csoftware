import { ArrowRight } from 'lucide-react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import {
  getWebdesignLocalByPath,
  WEBDESIGN_LOCAL_PAGES,
} from '../content/webdesignLocal'
import { normalizeRoutePath } from '../seo/routeMeta'
import { SITE_NAME } from '../site'

export function LocalWebdesignPage() {
  const { pathname } = useLocation()
  const page = getWebdesignLocalByPath(normalizeRoutePath(pathname))
  if (!page) return <Navigate to="/leistungen" replace />

  const others = WEBDESIGN_LOCAL_PAGES.filter((item) => item.path !== page.path)

  return (
    <div>
      <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-widest text-shell-muted">
            Webdesign · {page.place}
          </p>
          <h1 className="mt-10 max-w-4xl font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl sm:leading-[1.08] lg:text-6xl">
            {page.h1} — <span className="text-shell-muted">{page.h1Muted}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-shell-muted">
            {page.lead}
          </p>
        </div>
      </section>

      {page.sections.map((section, index) => (
        <section
          key={section.heading}
          className={`border-b border-gallery-line py-16 sm:py-20 ${
            index % 2 === 0 ? 'bg-gallery-bg' : 'bg-gallery-surface'
          }`}
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-4 text-base leading-relaxed text-shell-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      <section className="border-b border-gallery-line bg-gallery-surface py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl">
            {page.pointsHeading}
          </h2>
          <ul className="mt-8 space-y-3">
            {page.points.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-base leading-relaxed text-shell-muted"
              >
                <span
                  className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-shell-subtle"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/referenzen"
              className="inline-flex items-center gap-2 text-sm font-medium text-gallery-ink underline decoration-gallery-line underline-offset-4 hover:decoration-gallery-ink"
            >
              Umgesetzte Websites
            </Link>
            <Link
              to="/leistungen"
              className="inline-flex items-center gap-2 text-sm font-medium text-gallery-ink underline decoration-gallery-line underline-offset-4 hover:decoration-gallery-ink"
            >
              Alle Leistungen
            </Link>
            <Link
              to="/blog/website-handwerk-leistungen-anfrage"
              className="inline-flex items-center gap-2 text-sm font-medium text-gallery-ink underline decoration-gallery-line underline-offset-4 hover:decoration-gallery-ink"
            >
              Website fürs Handwerk
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-gallery-line bg-gallery-bg py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl">
            Häufige Fragen
          </h2>
          <dl className="mt-10 space-y-8">
            {page.faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-display text-lg font-semibold text-gallery-ink">
                  {item.q}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-shell-muted">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-gallery-line bg-gallery-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-gallery-ink">
            Weitere Orte
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {others.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="block rounded-xl border border-gallery-line bg-gallery-bg px-5 py-4 transition hover:border-stone-400 dark:hover:border-stone-600"
                >
                  <p className="font-display text-lg font-semibold text-gallery-ink">
                    {item.breadcrumb}
                  </p>
                  <p className="mt-1 text-sm text-shell-muted">{item.h1Muted}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-stone-950 py-20 sm:py-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-stone-500">
              {SITE_NAME}
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-stone-100 sm:text-3xl">
              Kurz schildern, was Sie brauchen.
            </h2>
            <p className="mt-3 max-w-xl text-base text-stone-400">
              Antwort innerhalb eines Werktags. Erstgespräch kostenlos — in{' '}
              {page.place}, vor Ort oder online.
            </p>
          </div>
          <Link
            to="/kontakt"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-stone-100 px-6 py-3.5 text-sm font-medium text-stone-900 transition hover:bg-white"
          >
            Projekt anfragen
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  )
}
