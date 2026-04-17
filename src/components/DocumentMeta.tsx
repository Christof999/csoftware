import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_NAME_ASCII,
  SITE_ORIGIN,
  SITE_TAGLINE,
} from '../site'

const ROUTE_META: Record<string, { title: string; description?: string }> = {
  '/': {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  },
  '/leistungen': {
    title: `Leistungen — Webdesign, Web-Apps, SEO & Print | ${SITE_NAME}`,
    description: `${SITE_NAME}: Leistungen rund um Websites, Web-Apps, SEO, Google Ads und Print & Media — klar strukturiert, aus einer Hand.`,
  },
  '/kontakt': {
    title: `Kontakt & Projekt anfragen | ${SITE_NAME}`,
    description: `Kontakt zu ${SITE_NAME}: Projekt anfragen, Erstgespräch und Rückmeldung — unverbindlich und direkt.`,
  },
}

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaByProperty(prop: string, content: string) {
  let el = document.querySelector(
    `meta[property="${prop}"]`,
  ) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', prop)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLinkRel(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function DocumentMeta() {
  const { pathname } = useLocation()
  const isKnown =
    pathname === '/' || pathname === '/leistungen' || pathname === '/kontakt'
  const route = isKnown
    ? (ROUTE_META[pathname] ?? ROUTE_META['/']!)
    : {
        title: `Seite nicht gefunden | ${SITE_NAME}`,
        description: `Die Seite wurde nicht gefunden. ${SITE_DESCRIPTION}`,
      }
  const title = route.title
  const description = route.description ?? SITE_DESCRIPTION
  const canonical =
    SITE_ORIGIN ? `${SITE_ORIGIN}${pathname === '/' ? '' : pathname}` : ''

  useEffect(() => {
    document.title = title
    setMetaByName('description', description)
    setMetaByName('robots', isKnown ? 'index,follow' : 'noindex,nofollow')
    if (canonical) {
      setLinkRel('canonical', canonical)
      setMetaByProperty('og:url', canonical)
    }
    setMetaByProperty('og:title', title)
    setMetaByProperty('og:description', description)
    setMetaByProperty('og:type', 'website')
    setMetaByName('twitter:card', 'summary_large_image')
    setMetaByName('twitter:title', title)
    setMetaByName('twitter:description', description)
  }, [title, description, canonical, isKnown])

  useEffect(() => {
    if (!SITE_ORIGIN) return

    const scriptId = 'jsonld-organization'
    const existing = document.getElementById(scriptId)
    if (existing) existing.remove()

    const orgId = `${SITE_ORIGIN}/#organization`
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': orgId,
          name: SITE_NAME,
          alternateName: [
            SITE_NAME_ASCII,
            'Sorgel Design',
            'SØRGEL Design',
          ],
          url: SITE_ORIGIN,
          email: SITE_EMAIL,
          description: SITE_DESCRIPTION,
          knowsAbout: [
            'Webdesign',
            'Suchmaschinenoptimierung',
            'Google Ads',
            'Web-Apps',
            'Printdesign',
            'Corporate Design',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_ORIGIN}/#website`,
          url: SITE_ORIGIN,
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          inLanguage: 'de-DE',
          publisher: { '@id': orgId },
        },
      ],
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [])

  return null
}
