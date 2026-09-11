import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_GOOGLE_BUSINESS_URL,
  SITE_LOCALITY,
  SITE_NAME,
  SITE_NAME_ASCII,
  SITE_ORIGIN,
  SITE_POSTAL_CODE,
  SITE_REGION_CODE,
  SITE_COUNTRY,
  SITE_PHONE_TEL,
  SITE_SAME_AS,
  SITE_STREET,
  siteOgImageUrl,
} from '../site'
import { CONTACT_FAQ_ITEMS } from './contactFaq'
import { HOME_PROCESS_STEPS } from './homeProcessSteps'
import type { BlogPost } from '../types/blog'
import { isKnownPath, normalizeRoutePath } from './routeMeta'

const TEL_E164 = SITE_PHONE_TEL.replace(/^tel:/, '')

/** Ungefähre Koordinaten Standort Merkendorf (Heglau) — für LocalBusiness geo */
const GEO_LATITUDE = 49.2047
const GEO_LONGITUDE = 10.6819

export function breadcrumbJsonLd(pathname: string): object | null {
  const path = normalizeRoutePath(pathname)
  if (!SITE_ORIGIN || !isKnownPath(path)) return null

  const items: { name: string; url: string }[] = [
    { name: 'Start', url: `${SITE_ORIGIN}/` },
  ]
  if (path === '/leistungen') {
    items.push({ name: 'Leistungen', url: `${SITE_ORIGIN}/leistungen` })
  } else if (path === '/software') {
    items.push({ name: 'Software', url: `${SITE_ORIGIN}/software` })
  } else if (path === '/blog') {
    items.push({ name: 'Blog', url: `${SITE_ORIGIN}/blog` })
  } else if (path === '/kontakt') {
    items.push({ name: 'Kontakt', url: `${SITE_ORIGIN}/kontakt` })
  } else if (path === '/ueber-uns') {
    items.push({ name: 'Über uns', url: `${SITE_ORIGIN}/ueber-uns` })
  } else if (path === '/impressum') {
    items.push({ name: 'Impressum', url: `${SITE_ORIGIN}/impressum` })
  } else if (path === '/datenschutz') {
    items.push({ name: 'Datenschutz', url: `${SITE_ORIGIN}/datenschutz` })
  }

  if (items.length <= 1) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

function sameAsUrls(): string[] {
  const out = [...SITE_SAME_AS]
  if (
    SITE_GOOGLE_BUSINESS_URL &&
    !out.some((u) => u === SITE_GOOGLE_BUSINESS_URL)
  ) {
    out.push(SITE_GOOGLE_BUSINESS_URL)
  }
  return out
}

export function faqPageJsonLd(pathname: string): object | null {
  if (!SITE_ORIGIN || normalizeRoutePath(pathname) !== '/kontakt') return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CONTACT_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function howToHomeJsonLd(pathname: string): object | null {
  if (!SITE_ORIGIN || normalizeRoutePath(pathname) !== '/') return null

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Von der Idee bis zur fertigen Website',
    description:
      'So begleiten wir Ihr Webprojekt: Kennenlernen, Konzept, Design, Umsetzung und Launch — in fünf klaren Schritten.',
    totalTime: 'P4W',
    step: HOME_PROCESS_STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

export function blogPostBreadcrumbJsonLd(
  postTitle: string,
  pathname: string,
): object | null {
  const path = normalizeRoutePath(pathname)
  if (!SITE_ORIGIN || !path.startsWith('/blog/')) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Start',
        item: `${SITE_ORIGIN}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_ORIGIN}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: postTitle,
        item: `${SITE_ORIGIN}${path}`,
      },
    ],
  }
}

export function blogPostingJsonLd(post: BlogPost, pathname: string): object | null {
  const path = normalizeRoutePath(pathname)
  if (!SITE_ORIGIN || !path.startsWith('/blog/')) return null

  const article: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.title,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.publishedAt.toISOString(),
    inLanguage: 'de-DE',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_ORIGIN}${path}`,
    },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
  }

  const ogImage = siteOgImageUrl()
  if (ogImage) {
    article.image = ogImage
  }

  return article
}

export function organizationWebsiteGraph(): object {
  const orgId = `${SITE_ORIGIN}/#organization`
  const localId = `${SITE_ORIGIN}/#localbusiness`
  const founderId = `${SITE_ORIGIN}/#person-founder`
  const ogImage = siteOgImageUrl()

  const org: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': orgId,
    name: SITE_NAME,
    alternateName: [
      SITE_NAME_ASCII,
      'Sorgel design',
      'SØRGEL design',
    ],
    url: SITE_ORIGIN,
    email: SITE_EMAIL,
    telephone: TEL_E164,
    description: SITE_DESCRIPTION,
    founder: { '@id': founderId },
    knowsAbout: [
      'Webdesign',
      'Suchmaschinenoptimierung',
      'Google Ads',
      'Web-Apps',
      'Business Automation',
      'Prozessautomatisierung',
      'n8n',
      'Printdesign',
      'Corporate Design',
    ],
  }

  if (ogImage) {
    org.logo = ogImage
    org.image = ogImage
  }

  const sameAs = sameAsUrls()
  if (sameAs.length > 0) {
    org.sameAs = sameAs
  }

  const localBusiness: Record<string, unknown> = {
    '@type': 'LocalBusiness',
    '@id': localId,
    name: SITE_NAME,
    alternateName: [SITE_NAME_ASCII],
    url: SITE_ORIGIN,
    email: SITE_EMAIL,
    telephone: TEL_E164,
    description: SITE_DESCRIPTION,
    parentOrganization: { '@id': orgId },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_STREET,
      addressLocality: SITE_LOCALITY,
      postalCode: SITE_POSTAL_CODE,
      addressRegion: SITE_REGION_CODE,
      addressCountry: SITE_COUNTRY,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO_LATITUDE,
      longitude: GEO_LONGITUDE,
    },
    areaServed: [
      { '@type': 'City', name: 'Ansbach' },
      { '@type': 'AdministrativeArea', name: 'Mittelfranken' },
    ],
  }

  if (ogImage) {
    localBusiness.image = ogImage
  }

  if (sameAs.length > 0) {
    localBusiness.sameAs = sameAs
  }

  const founder: Record<string, unknown> = {
    '@type': 'Person',
    '@id': founderId,
    name: 'Christof Sörgel',
    jobTitle: 'Inhaber',
    worksFor: { '@id': orgId },
    url: `${SITE_ORIGIN}/ueber-uns`,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      org,
      localBusiness,
      founder,
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
}

/**
 * Die drei Programme als ItemList von SoftwareApplication — nur auf /software.
 *
 * Bewusst ohne `aggregateRating` oder `offers`: Bewertungen gibt es keine, und
 * ein erfundener Preis im Markup wäre genau die Art Auszeichnung, die Google
 * (zu Recht) abstraft.
 */
export function softwareItemListJsonLd(pathname: string): object | null {
  if (!SITE_ORIGIN || normalizeRoutePath(pathname) !== '/software') return null

  const programs = [
    {
      anchor: 'zeiterfassung',
      name: 'Zeiterfassung',
      category: 'BusinessApplication',
      description:
        'Mobile Zeiterfassung für Baustelle und Außendienst: Stempeln aufs Projekt, Material, Fotos und Fahrzeuge am Eintrag, Pausen nach Arbeitszeitgesetz, Urlaub und Überstunden — mit Projektbericht und DATEV-Nachweis der täglichen Arbeitszeit.',
    },
    {
      anchor: 'auftrag-rechnung',
      name: 'Auftrag & Rechnung',
      category: 'FinanceApplication',
      description:
        'Angebot, Lieferschein, Rechnung und Mahnung bauen aufeinander auf. Dazu Nachkalkulation Soll/Ist aus der Zeiterfassung, Eingangsrechnungen mit KI-Belegerkennung, Bankabgleich und das Monatsbündel fürs Steuerbüro.',
    },
    {
      anchor: 'posteingang',
      name: 'Posteingang',
      category: 'BusinessApplication',
      description:
        'Mehrere Postfächer in einem Eingang: KI sortiert jede Mail samt Anhang in feste Kategorien und liest bei Rechnungen Lieferant, Nummer, Betrag und Fälligkeit aus — Belege gehen von dort in die Buchhaltung.',
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Software von ${SITE_NAME}`,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: programs.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: p.name,
        applicationCategory: p.category,
        operatingSystem: 'Web (Browser), iOS, Android',
        description: p.description,
        url: `${SITE_ORIGIN}/software#${p.anchor}`,
        inLanguage: 'de-DE',
        provider: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: `${SITE_ORIGIN}/`,
        },
      },
    })),
  }
}
