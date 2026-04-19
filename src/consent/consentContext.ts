import { createContext } from 'react'

export type ConsentDecision = 'accepted' | 'essential' | 'pending'

export interface ConsentContextValue {
  decision: ConsentDecision
  accept: () => void
  essentialOnly: () => void
  revoke: () => void
}

export const ConsentContext = createContext<ConsentContextValue | null>(null)

export const CONSENT_STORAGE_KEY = 'sorgel-design-consent'
