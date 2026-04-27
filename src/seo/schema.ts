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
import { isKnownPath } from './routeMeta'

const TEL_E164 = SITE_PHONE_TEL.replace(/^tel:/, '')

/** Ungefähre Koordinaten Standort Merkendorf (Heglau) — für LocalBusiness geo */
const GEO_LATITUDE = 49.2047
const GEO_LONGITUDE = 10.6819

export function breadcrumbJsonLd(pathname: string): object | null {
  if (!SITE_ORIGIN || !isKnownPath(pathname)) return null

  const items: { name: string; url: string }[] = [
    { name: 'Start', url: `${SITE_ORIGIN}/` },
  ]
  if (pathname === '/leistungen') {
    items.push({ name: 'Leistungen', url: `${SITE_ORIGIN}/leistungen` })
  } else if (pathname === '/kontakt') {
    items.push({ name: 'Kontakt', url: `${SITE_ORIGIN}/kontakt` })
  } else if (pathname === '/ueber-uns') {
    items.push({ name: 'Über uns', url: `${SITE_ORIGIN}/ueber-uns` })
  } else if (pathname === '/impressum') {
    items.push({ name: 'Impressum', url: `${SITE_ORIGIN}/impressum` })
  } else if (pathname === '/datenschutz') {
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
  if (!SITE_ORIGIN || pathname !== '/kontakt') return null

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
  if (!SITE_ORIGIN || pathname !== '/') return null

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
