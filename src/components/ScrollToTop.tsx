import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return // HashScroller handles anchor navigation
    const root = document.documentElement
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    const id = requestAnimationFrame(() => { root.style.scrollBehavior = '' })
    return () => cancelAnimationFrame(id)
  }, [pathname, hash])

  return null
}
