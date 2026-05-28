import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CookieBanner } from './components/CookieBanner'
import { DocumentMeta } from './components/DocumentMeta'
import { Layout } from './components/Layout'
import { ContactPage } from './pages/ContactPage'
import { DatenschutzPage } from './pages/DatenschutzPage'
import { HomePage } from './pages/HomePage'
import { ImpressumPage } from './pages/ImpressumPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AboutPage } from './pages/AboutPage'
import { BlogPage } from './pages/BlogPage'
import { ServicesPage } from './pages/ServicesPage'

const Blog2Page = lazy(() =>
  import('./pages/Blog2Page').then((m) => ({ default: m.Blog2Page })),
)
const Blog2PostPage = lazy(() =>
  import('./pages/Blog2PostPage').then((m) => ({ default: m.Blog2PostPage })),
)

function BlogRouteFallback() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <p className="text-sm text-shell-muted" role="status">
        Blog wird geladen …
      </p>
    </div>
  )
}

export default function App() {
  return (
    <>
      <DocumentMeta />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="leistungen" element={<ServicesPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route
            path="blog-2"
            element={
              <Suspense fallback={<BlogRouteFallback />}>
                <Blog2Page />
              </Suspense>
            }
          />
          <Route
            path="blog-2/:slug"
            element={
              <Suspense fallback={<BlogRouteFallback />}>
                <Blog2PostPage />
              </Suspense>
            }
          />
          <Route path="kontakt" element={<ContactPage />} />
          <Route path="ueber-uns" element={<AboutPage />} />
          <Route path="impressum" element={<ImpressumPage />} />
          <Route path="datenschutz" element={<DatenschutzPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <CookieBanner />
    </>
  )
}
