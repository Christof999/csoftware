import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { THEME_STORAGE_KEY } from './constants'
import { ThemeContext, type Theme } from './themeContext'

const LEGACY_THEME_KEY = 'csoftware-theme'

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  let saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
  if (saved !== 'light' && saved !== 'dark') {
    const legacy = localStorage.getItem(LEGACY_THEME_KEY) as Theme | null
    if (legacy === 'light' || legacy === 'dark') {
      localStorage.setItem(THEME_STORAGE_KEY, legacy)
      localStorage.removeItem(LEGACY_THEME_KEY)
      saved = legacy
    }
  }
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getPreferredTheme())

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    localStorage.setItem(THEME_STORAGE_KEY, t)
    applyTheme(t)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}
