import type { RouteMeta } from './routeMeta'
import { SITE_NAME, siteOgImageUrl } from '../site'
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToHomeJsonLd,
  organizationWebsiteGraph,
} from './schema'

/** Für vite-prerender-plugin `head.elements` (Props nur Strings). */
export type HeadElement = {
  type: string
  props: Record<string, string>
  children?: string
}

export function buildPrerenderHeadElements(
  meta: RouteMeta,
  canonical: string,
  pathname: string,
): HeadElement[] {
  const robots = meta.indexable
    ? 'index,follow,max-image-preview:large'
    : 'noindex,nofollow'

  const ogImage = siteOgImageUrl()

  const elements: HeadElement[] = [
    { type: 'meta', props: { name: 'description', content: meta.description } },
    { type: 'meta', props: { name: 'robots', content: robots } },
    {
      type: 'meta',
      props: { name: 'twitter:card', content: 'summary_large_image' },
    },
    { type: 'meta', props: { name: 'twitter:title', content: meta.title } },
    {
      type: 'meta',
      props: { name: 'twitter:description', content: meta.description },
    },
    { type: 'meta', props: { property: 'og:type', content: 'website' } },
    { type: 'meta', props: { property: 'og:title', content: meta.title } },
    {
      type: 'meta',
      props: { property: 'og:description', content: meta.description },
    },
    { type: 'meta', props: { property: 'og:site_name', content: SITE_NAME } },
    { type: 'meta', props: { property: 'og:locale', content: 'de_DE' } },
  ]

  if (ogImage) {
    elements.push({
      type: 'meta',
      props: { property: 'og:image', content: ogImage },
    })
    elements.push({
      type: 'meta',
      props: { name: 'twitter:image', content: ogImage },
    })
  }

  if (canonical) {
    elements.push({ type: 'link', props: { rel: 'canonical', href: canonical } })
    elements.push({
      type: 'meta',
      props: { property: 'og:url', content: canonical },
    })
  }

  elements.push({
    type: 'script',
    props: { type: 'application/ld+json', id: 'jsonld-organization' },
    children: JSON.stringify(organizationWebsiteGraph()),
  })

  const crumbs = breadcrumbJsonLd(pathname)
  if (crumbs) {
    elements.push({
      type: 'script',
      props: { type: 'application/ld+json', id: 'jsonld-breadcrumbs' },
      children: JSON.stringify(crumbs),
    })
  }

  const faq = faqPageJsonLd(pathname)
  if (faq) {
    elements.push({
      type: 'script',
      props: { type: 'application/ld+json', id: 'jsonld-faq' },
      children: JSON.stringify(faq),
    })
  }

  const howTo = howToHomeJsonLd(pathname)
  if (howTo) {
    elements.push({
      type: 'script',
      props: { type: 'application/ld+json', id: 'jsonld-howto' },
      children: JSON.stringify(howTo),
    })
  }

  return elements
}
