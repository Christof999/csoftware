import { SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from '../site'

export type RouteMeta = {
  title: string
  description: string
  /** Für bekannte Routen true, sonst noindex */
  indexable: boolean
}

/** Titel mit Marken-Unicode (Ø) — konsistent mit Logo und Schema name */
const HOME_TITLE = `${SITE_NAME} | Unternehmenssoftware, Automatisierung & Webdesign · Ansbach`

/** Bekannte Pfade (ohne trailing slash), konsistent mit dem Router */
export const KNOWN_PATHS = [
  '/',
  '/leistungen',
  '/software',
  '/blog',
  '/kontakt',
  '/ueber-uns',
  '/impressum',
  '/datenschutz',
] as const

/** Einzelner Firebase-Blog-Beitrag unter /blog/:slug */
export function isBlogPostPath(pathname: string): boolean {
  const path = normalizeRoutePath(pathname)
  return /^\/blog\/[^/]+$/.test(path)
}

export type KnownPath = (typeof KNOWN_PATHS)[number]

const KNOWN_SET = new Set<string>(KNOWN_PATHS)

/**
 * Gleicht Pfade mit dem Router ab: ohne trailing slash (außer Root `/`).
 * Sonst liefert z. B. `/blog/` keine Treffer in KNOWN_PATHS und die Seite
 * bekäme fälschlich noindex (404-Meta).
 */
export function normalizeRoutePath(pathname: string): string {
  const raw = pathname.trim()
  if (raw === '' || raw === '/') return '/'
  return raw.replace(/\/+$/, '')
}

export function isKnownPath(pathname: string): boolean {
  return KNOWN_SET.has(normalizeRoutePath(pathname))
}

const ROUTE_META: Record<KnownPath, Omit<RouteMeta, 'indexable'>> = {
  '/': {
    title: HOME_TITLE,
    description:
      'Eigene Programme für Zeiterfassung, Abrechnung und Posteingang, Automatisierung von Abläufen mit n8n und KI sowie Webdesign und SEO — für Unternehmen in Ansbach und Mittelfranken. Jetzt unverbindlich anfragen.',
  },
  '/leistungen': {
    title: `Leistungen | Webdesign, SEO & Print · Ansbach | ${SITE_NAME}`,
    description:
      'Websites, lokale SEO, Google Ads, Web-Apps, Business-Automatisierung mit n8n und KI sowie Printdesign aus einer Hand — für Handwerk, Dienstleister und KMU in Ansbach und Mittelfranken. Leistungen ansehen und Kontakt aufnehmen.',
  },
  '/software': {
    title: `Software für Unternehmen | Zeiterfassung, Rechnung & KI-Posteingang | ${SITE_NAME}`,
    description:
      'Eigene Programme für den Betrieb: mobile Zeiterfassung mit DATEV-Nachweis, Auftrags- und Rechnungsprogramm mit Nachkalkulation und Buchhaltung sowie KI-Posteingang für Belege. Einzeln oder als zusammenhängendes System — mit echten Praxisbeispielen.',
  },
  '/blog': {
    title: `Blog | Webdesign, SEO & Digitales · ${SITE_NAME}`,
    description:
      'Blog zu Webdesign, SEO, Performance und digitalen Themen — Einblicke und Tipps von SØRGEL-design aus Ansbach und Mittelfranken.',
  },
  '/kontakt': {
    title: `Kontakt & Projekt anfragen | ${SITE_NAME}`,
    description:
      'Projekt anfragen: Webdesign Ansbach, Web-Apps, Business-Automatisierung (n8n, KI) und Print — Antwort innerhalb eines Werktags, Erstgespräch kostenlos. Schreiben Sie uns oder rufen Sie an.',
  },
  '/ueber-uns': {
    title: `Über uns & Inhaber | ${SITE_NAME}`,
    description:
      'Christof Sörgel, SØRGEL-design: Webentwicklung, SEO und Design aus Merkendorf — für Kunden in Ansbach und Mittelfranken. Erfahrung, Arbeitsweise und Kontakt.',
  },
  '/impressum': {
    title: `Impressum | ${SITE_NAME}`,
    description:
      `Impressum und rechtliche Anbieterkennzeichnung von ${SITE_NAME}: Adresse Merkendorf, Kontakt, Umsatzsteuer-Hinweis.`,
  },
  '/datenschutz': {
    title: `Datenschutz | ${SITE_NAME}`,
    description:
      `Datenschutzerklärung ${SITE_NAME}: Cookies, Kontaktformular, Hosting (Vercel), Rechte nach DSGVO — transparent erklärt.`,
  },
}

/**
 * Meta eines konkreten Blog-Beitrags — gemeinsame Quelle für den Build-Prerender
 * (statisches HTML) und die Client-Navigation, damit beide dieselben Werte setzen.
 */
export function blogPostRouteMeta(post: {
  title: string
  metaDescription?: string
}): RouteMeta {
  const title = post.title.trim() || 'Beitrag'
  return {
    title: `${title} | Blog · ${SITE_NAME}`,
    description:
      post.metaDescription?.trim() ||
      `${title} — Blog von ${SITE_NAME} zu Webdesign, SEO und digitaler Sichtbarkeit in Ansbach und Mittelfranken.`,
    indexable: true,
  }
}

export function getRouteMeta(pathname: string): RouteMeta {
  const path = normalizeRoutePath(pathname)
  if (isBlogPostPath(path)) {
    return {
      title: `Blog | ${SITE_NAME}`,
      description:
        'Blog-Beitrag zu Webdesign, SEO und digitaler Sichtbarkeit — SØRGEL-design aus Ansbach und Mittelfranken.',
      indexable: true,
    }
  }
  if (isKnownPath(path)) {
    const base = ROUTE_META[path as KnownPath]
    return { ...base, indexable: true }
  }
  return {
    title: `Seite nicht gefunden | ${SITE_NAME}`,
    description: `Die Seite wurde nicht gefunden. ${SITE_DESCRIPTION}`,
    indexable: false,
  }
}

/**
 * Canonical pro Route. Root behält den Trailing-Slash (`/`), damit er mit
 * sitemap.xml übereinstimmt und Google keine zwei Varianten der Startseite
 * als unterschiedliche URLs interpretiert.
 */
export function canonicalUrl(pathname: string): string {
  if (!SITE_ORIGIN) return ''
  const path = normalizeRoutePath(pathname)
  return `${SITE_ORIGIN}${path}`
}
