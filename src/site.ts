/**
 * Marken- und SEO-Basisdaten (zentrale Anpassung).
 * Produktions-URL und Kontakt-E-Mail per VITE_* in der Build-Umgebung setzen.
 */
export const SITE_NAME = 'SØRGEL-Design'
export const SITE_NAME_ASCII = 'SORGEL-Design'

/** Kurz für Meta-Titel / JSON-LD */
export const SITE_TAGLINE =
  'Webdesign, SEO, Google Ads, Web-Apps & Media Design — online & offline'

export const SITE_DESCRIPTION =
  `${SITE_NAME}: Webdesign, SEO, Google Ads, maßgeschneiderte Web-Lösungen und Media Design — Flyer, Print und einheitliche Marke online & offline.`

/** Canonical & Open-Graph: z. B. https://www.example.de (ohne Slash am Ende) */
export const SITE_ORIGIN = (
  typeof import.meta.env.VITE_SITE_URL === 'string'
    ? import.meta.env.VITE_SITE_URL
    : ''
).replace(/\/$/, '')

export const SITE_EMAIL =
  typeof import.meta.env.VITE_CONTACT_EMAIL === 'string' &&
  import.meta.env.VITE_CONTACT_EMAIL.length > 0
    ? import.meta.env.VITE_CONTACT_EMAIL
    : 'kontakt@sorgel-design.de'

export const SITE_EMAIL_MAILTO = `mailto:${SITE_EMAIL}`
