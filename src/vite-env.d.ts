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
  /** Firebase Web-App (öffentlich, für den Blog / Firestore-Lesen) */
  readonly VITE_FIREBASE_API_KEY?: string
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string
  readonly VITE_FIREBASE_PROJECT_ID?: string
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string
  readonly VITE_FIREBASE_APP_ID?: string
  /** Firestore-Sammlung für Blog-Beiträge */
  readonly VITE_FIRESTORE_BLOG_COLLECTION?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/**
 * Blog-Beiträge inklusive Content, beim Build aus `.blog-prerender.json`
 * eingebettet (siehe vite.config.ts). Nur der Prerender-Entry importiert
 * dieses Modul — es landet nicht im Client-Bundle.
 */
declare module 'virtual:blog-prerender-data' {
  export const posts: {
    id: string
    slug: string
    title: string
    metaDescription?: string
    publishedAt: string
    content?: string
  }[]
}
