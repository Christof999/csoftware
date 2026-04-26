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

const HOME_TITLE = `${SITE_NAME_ASCII} | Webdesign & SEO · Ansbach`

/** Bekannte Pfade (ohne trailing slash), konsistent mit dem Router */
export const KNOWN_PATHS = [
  '/',
  '/leistungen',
  '/kontakt',
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
    description: SITE_DESCRIPTION,
  },
  '/leistungen': {
    title: `Leistungen — Webdesign, Web-Apps, SEO & Print | ${SITE_NAME_ASCII}`,
    description: `${SITE_NAME}: Leistungen rund um Websites, Web-Apps, SEO, Google Ads und Print & Media — klar strukturiert, aus einer Hand.`,
  },
  '/kontakt': {
    title: `Kontakt & Projekt anfragen | ${SITE_NAME_ASCII}`,
    description: `Kontakt zu ${SITE_NAME}: Projekt anfragen, Erstgespräch und Rückmeldung — unverbindlich und direkt.`,
  },
  '/impressum': {
    title: `Impressum | ${SITE_NAME_ASCII}`,
    description: `Impressum und Anbieterkennzeichnung von ${SITE_NAME}.`,
  },
  '/datenschutz': {
    title: `Datenschutz | ${SITE_NAME_ASCII}`,
    description: `Datenschutzerklärung zu ${SITE_NAME}: Informationen zur Verarbeitung personenbezogener Daten.`,
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
