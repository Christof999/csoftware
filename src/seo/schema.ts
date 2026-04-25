import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_NAME_ASCII,
  SITE_ORIGIN,
  SITE_SAME_AS,
} from '../site'
import { isKnownPath } from './routeMeta'

const STREET = 'Heglau 32'
const LOCALITY = 'Merkendorf'
const POSTAL = '91732'
const REGION = 'BY'
const COUNTRY = 'DE'

export function breadcrumbJsonLd(pathname: string): object | null {
  if (!SITE_ORIGIN || !isKnownPath(pathname)) return null

  const items: { name: string; url: string }[] = [
    { name: 'Start', url: `${SITE_ORIGIN}/` },
  ]
  if (pathname === '/leistungen') {
    items.push({ name: 'Leistungen', url: `${SITE_ORIGIN}/leistungen` })
  } else if (pathname === '/kontakt') {
    items.push({ name: 'Kontakt', url: `${SITE_ORIGIN}/kontakt` })
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

export function organizationWebsiteGraph(): object {
  const orgId = `${SITE_ORIGIN}/#organization`
  const localId = `${SITE_ORIGIN}/#localbusiness`

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
    description: SITE_DESCRIPTION,
    knowsAbout: [
      'Webdesign',
      'Suchmaschinenoptimierung',
      'Google Ads',
      'Web-Apps',
      'Printdesign',
      'Corporate Design',
    ],
  }

  if (SITE_SAME_AS.length > 0) {
    org.sameAs = SITE_SAME_AS
  }

  const localBusiness: Record<string, unknown> = {
    '@type': 'LocalBusiness',
    '@id': localId,
    name: SITE_NAME,
    alternateName: [SITE_NAME_ASCII],
    url: SITE_ORIGIN,
    email: SITE_EMAIL,
    description: SITE_DESCRIPTION,
    parentOrganization: { '@id': orgId },
    address: {
      '@type': 'PostalAddress',
      streetAddress: STREET,
      addressLocality: LOCALITY,
      postalCode: POSTAL,
      addressRegion: REGION,
      addressCountry: COUNTRY,
    },
    areaServed: [
      { '@type': 'City', name: 'Ansbach' },
      { '@type': 'AdministrativeArea', name: 'Mittelfranken' },
    ],
  }

  if (SITE_SAME_AS.length > 0) {
    localBusiness.sameAs = SITE_SAME_AS
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      org,
      localBusiness,
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
