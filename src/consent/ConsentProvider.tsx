import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  ConsentContext,
  CONSENT_STORAGE_KEY,
  type ConsentDecision,
} from './consentContext'

const FONTS_LINK_ID = 'google-fonts-inter'
const FONTS_PRECONNECT_1 = 'google-fonts-preconnect-googleapis'
const FONTS_PRECONNECT_2 = 'google-fonts-preconnect-gstatic'
const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'

function readStored(): ConsentDecision {
  if (typeof window === 'undefined') return 'pending'
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (v === 'accepted' || v === 'essential') return v
  } catch {
    // zugriff ggf. blockiert (private mode / ITP) – dann Banner zeigen
  }
  return 'pending'
}

function ensureGoogleFontsLoaded() {
  if (typeof document === 'undefined') return
  if (document.getElementById(FONTS_LINK_ID)) return

  const pre1 = document.createElement('link')
  pre1.id = FONTS_PRECONNECT_1
  pre1.rel = 'preconnect'
  pre1.href = 'https://fonts.googleapis.com'
  document.head.appendChild(pre1)

  const pre2 = document.createElement('link')
  pre2.id = FONTS_PRECONNECT_2
  pre2.rel = 'preconnect'
  pre2.href = 'https://fonts.gstatic.com'
  pre2.crossOrigin = 'anonymous'
  document.head.appendChild(pre2)

  const link = document.createElement('link')
  link.id = FONTS_LINK_ID
  link.rel = 'stylesheet'
  link.href = FONTS_HREF
  document.head.appendChild(link)
}

function removeGoogleFonts() {
  if (typeof document === 'undefined') return
  document.getElementById(FONTS_LINK_ID)?.remove()
  document.getElementById(FONTS_PRECONNECT_1)?.remove()
  document.getElementById(FONTS_PRECONNECT_2)?.remove()
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [decision, setDecision] = useState<ConsentDecision>(() => readStored())

  useEffect(() => {
    if (decision === 'accepted') {
      ensureGoogleFontsLoaded()
    } else {
      removeGoogleFonts()
    }
  }, [decision])

  const persist = useCallback((next: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, next)
    } catch {
      // ignore – Entscheidung gilt dann nur für die laufende Session
    }
    setDecision(next)
  }, [])

  const accept = useCallback(() => persist('accepted'), [persist])
  const essentialOnly = useCallback(() => persist('essential'), [persist])

  const revoke = useCallback(() => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY)
    } catch {
      // ignore
    }
    setDecision('pending')
  }, [])

  const value = useMemo(
    () => ({ decision, accept, essentialOnly, revoke }),
    [decision, accept, essentialOnly, revoke],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}
