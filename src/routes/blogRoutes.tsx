/*
 * Die Routen entstehen über eine Factory (`preloadableRoute`) — Fast Refresh
 * erkennt sie deshalb nicht als Komponenten-Exporte. Betrifft nur den
 * Dev-Server (Modul lädt bei Änderung komplett neu).
 */
/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense, type ComponentType, type ReactElement } from 'react'

type RouteLoader = () => Promise<{ default: ComponentType }>
type PreloadableRoute = (() => ReactElement) & { preload: () => Promise<void> }

function BlogRouteFallback() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <p className="text-sm text-shell-muted" role="status">
        Blog wird geladen …
      </p>
    </div>
  )
}

/**
 * Route, die im Browser nachgeladen wird (Code-Splitting) und beim
 * Build-Prerender über `preload()` vorab geladen werden kann.
 *
 * Ohne Preload enthält das statische HTML für /blog und /blog/:slug nur den
 * Ladezustand: Der Server-Renderer löst `React.lazy` nicht auf und schiebt den
 * Inhalt der Suspense-Grenze hinter die Shell. Nach `preload()` entfällt die
 * Grenze komplett und die Seite landet vollständig im ausgelieferten HTML.
 */
function preloadableRoute(load: RouteLoader): PreloadableRoute {
  const Lazy = lazy(load)
  let Preloaded: ComponentType | null = null

  const RouteComponent = () => {
    if (Preloaded) {
      const Component = Preloaded
      return <Component />
    }
    return (
      <Suspense fallback={<BlogRouteFallback />}>
        <Lazy />
      </Suspense>
    )
  }

  RouteComponent.preload = async () => {
    Preloaded = (await load()).default
  }

  return RouteComponent
}

export const BlogRoute = preloadableRoute(() =>
  import('../pages/BlogPage').then((m) => ({ default: m.BlogPage })),
)

export const BlogPostRoute = preloadableRoute(() =>
  import('../pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })),
)
