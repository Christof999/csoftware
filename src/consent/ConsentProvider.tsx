import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  ConsentContext,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  DEFAULT_PREFERENCES,
  type ConsentPreferences,
  type StoredConsent,
} from './consentContext'

const FONTS_LINK_ID = 'google-fonts-inter'
const FONTS_PRECONNECT_1 = 'google-fonts-preconnect-googleapis'
const FONTS_PRECONNECT_2 = 'google-fonts-preconnect-gstatic'
const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'

interface InitialState {
  hasDecided: boolean
  preferences: ConsentPreferences
  decidedAt: string | null
}

function readStored(): InitialState {
  if (typeof window === 'undefined') {
    return { hasDecided: false, preferences: DEFAULT_PREFERENCES, decidedAt: null }
  }
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) {
      return { hasDecided: false, preferences: DEFAULT_PREFERENCES, decidedAt: null }
    }
    const parsed = JSON.parse(raw) as Partial<StoredConsent>
    if (parsed.version !== CONSENT_VERSION || !parsed.preferences) {
      return { hasDecided: false, preferences: DEFAULT_PREFERENCES, decidedAt: null }
    }
    return {
      hasDecided: true,
      preferences: {
        ...DEFAULT_PREFERENCES,
        ...parsed.preferences,
        necessary: true,
      },
      decidedAt: parsed.decidedAt ?? null,
    }
  } catch {
    return { hasDecided: false, preferences: DEFAULT_PREFERENCES, decidedAt: null }
  }
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
  const [state, setState] = useState<InitialState>(() => readStored())
  const [manuallyOpen, setManuallyOpen] = useState(false)

  useEffect(() => {
    if (state.preferences.fonts) {
      ensureGoogleFontsLoaded()
    } else {
      removeGoogleFonts()
    }
  }, [state.preferences.fonts])

  const persist = useCallback((prefs: ConsentPreferences) => {
    const decidedAt = new Date().toISOString()
    const next: StoredConsent = {
      version: CONSENT_VERSION,
      decidedAt,
      preferences: { ...prefs, necessary: true },
    }
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore – gilt dann nur für die laufende Session
    }
    setState({ hasDecided: true, preferences: next.preferences, decidedAt })
    setManuallyOpen(false)
  }, [])

  const acceptAll = useCallback(() => {
    persist({ necessary: true, fonts: true, embeds: true })
  }, [persist])

  const rejectAll = useCallback(() => {
    persist({ necessary: true, fonts: false, embeds: false })
  }, [persist])

  const save = useCallback(
    (prefs: ConsentPreferences) => {
      persist(prefs)
    },
    [persist],
  )

  const revoke = useCallback(() => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY)
    } catch {
      // ignore
    }
    setState({
      hasDecided: false,
      preferences: DEFAULT_PREFERENCES,
      decidedAt: null,
    })
    setManuallyOpen(false)
  }, [])

  const openBanner = useCallback(() => setManuallyOpen(true), [])

  const isBannerOpen = manuallyOpen || !state.hasDecided

  const value = useMemo(
    () => ({
      hasDecided: state.hasDecided,
      preferences: state.preferences,
      decidedAt: state.decidedAt,
      isBannerOpen,
      acceptAll,
      rejectAll,
      save,
      revoke,
      openBanner,
    }),
    [
      state.hasDecided,
      state.preferences,
      state.decidedAt,
      isBannerOpen,
      acceptAll,
      rejectAll,
      save,
      revoke,
      openBanner,
    ],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}
