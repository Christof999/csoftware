import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { ConsentProvider } from './consent/ConsentProvider'
import { ThemeProvider } from './theme/ThemeProvider'

/** Build-Zeit-Prerender (vite-prerender-plugin): statisches HTML pro Route für Crawler. */
export async function prerender(data: { url: string }) {
  const [{ parseLinks }, { getRouteMeta, canonicalUrl }, { buildPrerenderHeadElements }, { default: App }] =
    await Promise.all([
      import('vite-prerender-plugin/parse'),
      import('./seo/routeMeta'),
      import('./seo/prerenderHead'),
      // dynamisch, damit App nicht im Client-Entry-Bundle landet
      import('./App.tsx'),
    ])

  const pathname = data.url.replace(/\/$/, '') || '/'
  const meta = getRouteMeta(pathname)
  const canonical = canonicalUrl(pathname)

  const html = renderToString(
    <StrictMode>
      <StaticRouter location={pathname}>
        <ThemeProvider>
          <ConsentProvider>
            <App />
          </ConsentProvider>
        </ThemeProvider>
      </StaticRouter>
    </StrictMode>,
  )

  const links = parseLinks(html)

  return {
    html,
    links: new Set(links),
    head: {
      lang: 'de-DE',
      title: meta.title,
      elements: new Set(
        buildPrerenderHeadElements(meta, canonical, pathname),
      ),
    },
  }
}
