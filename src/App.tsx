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
import { ServicesPage } from './pages/ServicesPage'

const BlogPage = lazy(() =>
  import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })),
)
const BlogPostPage = lazy(() =>
  import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })),
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
          <Route
            path="blog"
            element={
              <Suspense fallback={<BlogRouteFallback />}>
                <BlogPage />
              </Suspense>
            }
          />
          <Route
            path="blog/:slug"
            element={
              <Suspense fallback={<BlogRouteFallback />}>
                <BlogPostPage />
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
