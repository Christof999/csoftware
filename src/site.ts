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

/** Soro Blog-Embed (externes Widget unter app.trysoro.com) */
export const SORO_EMBED_SCRIPT_SRC =
  'https://app.trysoro.com/api/embed/57e54aad-c6d6-4d34-848b-c8b3edf59a07'

/**
 * Prüft öffentliche Maps-/GBP-Links.
 * Google Maps „Teilen“ liefert oft `https://share.google/…` (Kurzlink) —
 * der ist gültig. Nur die echte Fehlerseite `share.google/error` blockieren.
 */
function extractFirstHttpsUrl(raw: string): string {
  const m = raw.match(/https:\/\/[^\s]+/i)
  return m ? m[0].replace(/[),.;]+$/, '') : raw.trim()
}

function sanitizeGoogleBusinessUrl(raw: string): string {
  const trimmed = extractFirstHttpsUrl(raw)
  if (!trimmed) return ''
  if (!/^https:\/\//i.test(trimmed)) return ''

  let url: URL
  try {
    url = new URL(trimmed)
  } catch {
    return ''
  }

  const host = url.hostname.toLowerCase()
  const pathLower = `${url.pathname}${url.search}`.toLowerCase()

  // Nur die explizite Fehler-URL, nicht normale Kurzcodes wie /7ZoknUjvB4B8gboaQ
  if (host === 'share.google') {
    if (
      pathLower === '/error' ||
      pathLower.startsWith('/error?') ||
      pathLower.includes('/error/')
    ) {
      return ''
    }
  }
  if (trimmed.toLowerCase().includes('share.google/error')) return ''

  // Kurzlinks + Places; regional oft www.google.de/maps/... (nicht nur .com)
  const googleCcTld =
    /^([a-z0-9-]+\.)*google\.(com|de|at|ch|co\.uk|fr|nl|pl|cz|it|es)$/i
  const okHost =
    host === 'share.google' ||
    host === 'maps.app.goo.gl' ||
    host === 'goo.gl' ||
    host === 'g.page' ||
    host.endsWith('.g.page') ||
    host === 'maps.google.com' ||
    host === 'maps.google.de' ||
    googleCcTld.test(host)

  if (!okHost) return ''

  return trimmed
}

/**
 * Google Business Profile (Maps) — optional per VITE_GOOGLE_BUSINESS_URL setzen.
 * Erlaubt u. a.: share.google/… (Teilen in Maps), maps.app.goo.gl, g.page,
 * google.de/maps/… — oder Text mit Firmenname davor; die erste https-URL wird
 * verwendet. Nicht verwenden: nur die Seite share.google/error.
 * Wichtig: Bei Vite muss die Variable beim **Build** gesetzt sein (z. B. Vercel
 * Environment → Production → Redeploy).
 */
export const SITE_GOOGLE_BUSINESS_URL: string = (() => {
  const raw = import.meta.env.VITE_GOOGLE_BUSINESS_URL
  if (typeof raw !== 'string') return ''
  const out = sanitizeGoogleBusinessUrl(raw)
  if (import.meta.env.DEV && raw.trim().length > 0 && !out) {
    console.warn(
      '[site] VITE_GOOGLE_BUSINESS_URL wird ignoriert (ungültige oder fehlerhafte URL). In Google Maps: „Teilen“ → Link kopieren (share.google/…, maps.app.goo.gl, google.de/maps/…).',
    )
  }
  return out
})()
