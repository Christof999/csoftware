import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Scrolls to the hash element after client-side navigation. */
export function HashScroller() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      el.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      })
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
      ;(el as HTMLElement).focus({ preventScroll: true })
    }, 120)
    return () => clearTimeout(timer)
  }, [hash, pathname])

  return null
}
