/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical Origin ohne abschließenden Slash, z. B. https://www.example.de */
  readonly VITE_SITE_URL?: string
  /** Öffentliche Kontakt-E-Mail (wird im UI angezeigt) */
  readonly VITE_CONTACT_EMAIL?: string
  /** Kommagetrennte Profil-URLs für JSON-LD sameAs (z. B. LinkedIn, Instagram) */
  readonly VITE_SITE_SAME_AS?: string
  /** Google Business Profile / Maps-Link für Footer, Kontakt und Schema */
  readonly VITE_GOOGLE_BUSINESS_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
