import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { canonicalUrl, getRouteMeta, isBlogPostPath } from '../seo/routeMeta'
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToHomeJsonLd,
  organizationWebsiteGraph,
  softwareItemListJsonLd,
} from '../seo/schema'
import { SITE_NAME, siteOgImageUrl } from '../site'

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaByProperty(prop: string, content: string) {
  let el = document.querySelector(
    `meta[property="${prop}"]`,
  ) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', prop)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLinkRel(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function DocumentMeta() {
  const { pathname } = useLocation()
  const blogPostPage = isBlogPostPath(pathname)
  const meta = getRouteMeta(pathname)
  const { title, description, indexable } = meta
  const canonical = canonicalUrl(pathname)

  useEffect(() => {
    if (blogPostPage) return
    document.title = title
    setMetaByName('description', description)
    setMetaByName(
      'robots',
      indexable ? 'index,follow,max-image-preview:large' : 'noindex,nofollow',
    )
    if (canonical) {
      setLinkRel('canonical', canonical)
      setMetaByProperty('og:url', canonical)
    }
    setMetaByProperty('og:title', title)
    setMetaByProperty('og:description', description)
    setMetaByProperty('og:type', 'website')
    setMetaByProperty('og:site_name', SITE_NAME)
    setMetaByProperty('og:locale', 'de_DE')
    const ogImage = siteOgImageUrl()
    if (ogImage) {
      setMetaByProperty('og:image', ogImage)
      setMetaByName('twitter:image', ogImage)
    }
    setMetaByName('twitter:card', 'summary_large_image')
    setMetaByName('twitter:title', title)
    setMetaByName('twitter:description', description)
  }, [title, description, canonical, indexable, blogPostPage])

  useEffect(() => {
    const scriptId = 'jsonld-breadcrumbs'
    const existing = document.getElementById(scriptId)
    existing?.remove()

    const data = breadcrumbJsonLd(pathname)
    if (!data) return

    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [pathname])

  useEffect(() => {
    const scriptId = 'jsonld-organization'
    const existing = document.getElementById(scriptId)
    existing?.remove()

    const data = organizationWebsiteGraph()

    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [])

  useEffect(() => {
    const scriptId = 'jsonld-faq'
    document.getElementById(scriptId)?.remove()
    const data = faqPageJsonLd(pathname)
    if (!data) return
    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [pathname])

  useEffect(() => {
    const scriptId = 'jsonld-howto'
    document.getElementById(scriptId)?.remove()
    const data = howToHomeJsonLd(pathname)
    if (!data) return
    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [pathname])

  useEffect(() => {
    const scriptId = 'jsonld-software'
    document.getElementById(scriptId)?.remove()
    const data = softwareItemListJsonLd(pathname)
    if (!data) return
    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [pathname])

  return null
}
