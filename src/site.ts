/**
 * Marken- und SEO-Basisdaten (zentrale Anpassung).
 * Produktions-URL und Kontakt-E-Mail per VITE_* in der Build-Umgebung setzen.
 */
export const SITE_NAME = 'SØRGEL-design'
export const SITE_NAME_ASCII = 'SORGEL-design'

/** Kurz für Meta-Titel / JSON-LD */
export const SITE_TAGLINE =
  'Webdesign, SEO, Google Ads, Web-Apps & Media Design — online & offline'

export const SITE_DESCRIPTION =
  `${SITE_NAME}: Webdesign, SEO, Google Ads, maßgeschneiderte Web-Lösungen und Media Design — Flyer, Print und einheitliche Marke online & offline.`

/** Canonical & Open-Graph: z. B. https://www.example.de (ohne Slash am Ende) */
export const SITE_ORIGIN = (
  typeof import.meta.env.VITE_SITE_URL === 'string' &&
  import.meta.env.VITE_SITE_URL.length > 0
    ? import.meta.env.VITE_SITE_URL
    : 'https://www.soergel-design.de'
).replace(/\/$/, '')

/** Kommagetrennte Profil-URLs (z. B. Instagram, LinkedIn) für JSON-LD sameAs */
export const SITE_SAME_AS: string[] = (() => {
  const raw = import.meta.env.VITE_SITE_SAME_AS
  if (typeof raw !== 'string' || raw.length === 0) return []
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
})()

export const SITE_EMAIL =
  typeof import.meta.env.VITE_CONTACT_EMAIL === 'string' &&
  import.meta.env.VITE_CONTACT_EMAIL.length > 0
    ? import.meta.env.VITE_CONTACT_EMAIL
    : 'info@soergel-design.de'

export const SITE_EMAIL_MAILTO = `mailto:${SITE_EMAIL}`

/** NAP & Kontakt (konsistent mit Impressum, für Kontaktseite & Schema) */
export const SITE_STREET = 'Heglau 32'
export const SITE_POSTAL_CODE = '91732'
export const SITE_LOCALITY = 'Merkendorf'
export const SITE_REGION_CODE = 'BY'
export const SITE_COUNTRY = 'DE'
export const SITE_PHONE_DISPLAY = '0173 2387757'
export const SITE_PHONE_TEL = 'tel:+491732387757'

/** Open Graph / Twitter: absoluter Pfad unter SITE_ORIGIN */
export const SITE_OG_IMAGE_PATH = '/og-default.png'

export function siteOgImageUrl(): string {
  if (!SITE_ORIGIN) return ''
  return `${SITE_ORIGIN}${SITE_OG_IMAGE_PATH}`
}

/**
 * Google Business Profile (Maps) — optional per VITE_GOOGLE_BUSINESS_URL setzen,
 * z. B. https://maps.app.goo.gl/... für Footer, Kontakt und sameAs.
 */
export const SITE_GOOGLE_BUSINESS_URL: string =
  typeof import.meta.env.VITE_GOOGLE_BUSINESS_URL === 'string' &&
  import.meta.env.VITE_GOOGLE_BUSINESS_URL.trim().length > 0
    ? import.meta.env.VITE_GOOGLE_BUSINESS_URL.trim()
    : ''
