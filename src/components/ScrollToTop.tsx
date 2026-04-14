import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Temporarily disable CSS smooth-scroll so navigation lands instantly at top
    const root = document.documentElement
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    const id = requestAnimationFrame(() => {
      root.style.scrollBehavior = ''
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
