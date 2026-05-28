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
  /** Firebase Web-App (öffentlich, für Blog 2 / Firestore-Lesen) */
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
