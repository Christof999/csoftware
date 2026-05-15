import { createContext } from 'react'

/** Wird bei strukturellen Änderungen (neuer Dienst, neue Kategorie …) erhöht.
 * Führt dazu, dass gespeicherte ältere Entscheidungen als ungültig behandelt
 * werden und das Banner erneut erscheint. */
export const CONSENT_VERSION = 4

export const CONSENT_STORAGE_KEY = 'sorgel-design-consent'

/** Alle Kategorien, für die wir Einwilligung einholen. `necessary` ist
 *  technisch nötig und kann nicht abgewählt werden. */
export type ConsentCategory = 'necessary' | 'fonts' | 'embeds' | 'camera'

export type ConsentPreferences = Record<ConsentCategory, boolean>

export const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  fonts: false,
  embeds: false,
  camera: false,
}

export interface StoredConsent {
  version: number
  decidedAt: string
  preferences: ConsentPreferences
}

export interface ConsentContextValue {
  /** true, sobald der Nutzer eine gültige Entscheidung getroffen hat. */
  hasDecided: boolean
  preferences: ConsentPreferences
  /** Zeitpunkt der letzten Entscheidung als ISO-String (oder null). */
  decidedAt: string | null
  /** Alle Kategorien aktivieren. */
  acceptAll: () => void
  /** Alle außer den notwendigen ablehnen. */
  rejectAll: () => void
  /** Individuelle Auswahl speichern. */
  save: (prefs: ConsentPreferences) => void
  /** Entscheidung löschen – Banner erscheint beim nächsten Render wieder. */
  revoke: () => void
  /** Banner manuell wieder öffnen, z. B. über einen Link im Footer. */
  openBanner: () => void
  /** Sichtbarkeits-Flag für den Banner. */
  isBannerOpen: boolean
}

export const ConsentContext = createContext<ConsentContextValue | null>(null)
