import { Route, Routes } from 'react-router-dom'
import { CookieBanner } from './components/CookieBanner'
import { DocumentMeta } from './components/DocumentMeta'
import { Layout } from './components/Layout'
import { ContactPage } from './pages/ContactPage'
import { LocalWebdesignPage } from './pages/LocalWebdesignPage'
import { DatenschutzPage } from './pages/DatenschutzPage'
import { HomePage } from './pages/HomePage'
import { ImpressumPage } from './pages/ImpressumPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AboutPage } from './pages/AboutPage'
import { ReferenzenPage } from './pages/ReferenzenPage'
import { ServicesPage } from './pages/ServicesPage'
import { SoftwarePage } from './pages/SoftwarePage'
import { BlogPostRoute, BlogRoute } from './routes/blogRoutes'

export default function App() {
  return (
    <>
      <DocumentMeta />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="leistungen" element={<ServicesPage />} />
          <Route path="webdesign-ansbach" element={<LocalWebdesignPage />} />
          <Route path="webdesign-merkendorf" element={<LocalWebdesignPage />} />
          <Route path="webdesign-mittelfranken" element={<LocalWebdesignPage />} />
          <Route path="referenzen" element={<ReferenzenPage />} />
          <Route path="software" element={<SoftwarePage />} />
          <Route path="blog" element={<BlogRoute />} />
          <Route path="blog/:slug" element={<BlogPostRoute />} />
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
