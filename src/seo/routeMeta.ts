import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_NAME_ASCII,
  SITE_ORIGIN,
} from '../site'

export type RouteMeta = {
  title: string
  description: string
  /** Für bekannte Routen true, sonst noindex */
  indexable: boolean
}

/** Titel mit Marken-Unicode (Ø) — konsistent mit Logo und Schema name */
const HOME_TITLE = `${SITE_NAME} | Webdesign & SEO · Ansbach`

/** Bekannte Pfade (ohne trailing slash), konsistent mit dem Router */
export const KNOWN_PATHS = [
  '/',
  '/leistungen',
  '/kontakt',
  '/ueber-uns',
  '/impressum',
  '/datenschutz',
] as const

export type KnownPath = (typeof KNOWN_PATHS)[number]

const KNOWN_SET = new Set<string>(KNOWN_PATHS)

export function isKnownPath(pathname: string): boolean {
  return KNOWN_SET.has(pathname)
}

const ROUTE_META: Record<KnownPath, Omit<RouteMeta, 'indexable'>> = {
  '/': {
    title: HOME_TITLE,
    description:
      'Webdesign, SEO und Web-Apps für Unternehmen in Ansbach und Mittelfranken: schnelle Sites, klare Struktur, persönliche Betreuung. Jetzt unverbindlich anfragen.',
  },
  '/leistungen': {
    title: `Leistungen | Webdesign, SEO & Print · Ansbach | ${SITE_NAME_ASCII}`,
    description:
      'Websites, lokale SEO, Google Ads, Web-Apps und Printdesign aus einer Hand — für Handwerk, Dienstleister und KMU in Ansbach und Mittelfranken. Leistungen ansehen und Kontakt aufnehmen.',
  },
  '/kontakt': {
    title: `Kontakt & Projekt anfragen | ${SITE_NAME_ASCII}`,
    description:
      'Projekt anfragen: Webdesign Ansbach, Web-Apps und Print — Antwort innerhalb eines Werktags, Erstgespräch kostenlos. Schreiben Sie uns oder rufen Sie an.',
  },
  '/ueber-uns': {
    title: `Über uns & Inhaber | ${SITE_NAME_ASCII}`,
    description:
      'Christof Sörgel, SØRGEL-design: Webentwicklung, SEO und Design aus Merkendorf — für Kunden in Ansbach und Mittelfranken. Erfahrung, Arbeitsweise und Kontakt.',
  },
  '/impressum': {
    title: `Impressum | ${SITE_NAME_ASCII}`,
    description:
      `Impressum und rechtliche Anbieterkennzeichnung von ${SITE_NAME}: Adresse Merkendorf, Kontakt, Umsatzsteuer-Hinweis.`,
  },
  '/datenschutz': {
    title: `Datenschutz | ${SITE_NAME_ASCII}`,
    description:
      `Datenschutzerklärung ${SITE_NAME}: Cookies, Kontaktformular, Hosting (Vercel), Rechte nach DSGVO — transparent erklärt.`,
  },
}

export function getRouteMeta(pathname: string): RouteMeta {
  if (isKnownPath(pathname)) {
    const base = ROUTE_META[pathname as KnownPath]
    return { ...base, indexable: true }
  }
  return {
    title: `Seite nicht gefunden | ${SITE_NAME_ASCII}`,
    description: `Die Seite wurde nicht gefunden. ${SITE_DESCRIPTION}`,
    indexable: false,
  }
}

export function canonicalUrl(pathname: string): string {
  if (!SITE_ORIGIN) return ''
  return `${SITE_ORIGIN}${pathname === '/' ? '' : pathname}`
}
