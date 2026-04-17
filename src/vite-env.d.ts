/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical Origin ohne abschließenden Slash, z. B. https://www.example.de */
  readonly VITE_SITE_URL?: string
  /** Öffentliche Kontakt-E-Mail (wird im UI angezeigt) */
  readonly VITE_CONTACT_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
