import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to the hash element after client-side navigation. */
export function HashScroller() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 120)
    return () => clearTimeout(timer)
  }, [hash, pathname])

  return null
}
