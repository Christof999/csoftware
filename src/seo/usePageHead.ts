import { useEffect } from 'react'
import { SITE_NAME, siteOgImageUrl } from '../site'

export type PageHeadMeta = {
  title: string
  description: string
  indexable: boolean
  canonical?: string
  ogType?: 'website' | 'article'
}

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

/** Setzt document.title, Meta-Tags und Open Graph (Client-seitig). */
export function usePageHead(meta: PageHeadMeta | null) {
  useEffect(() => {
    if (!meta) return

    const { title, description, indexable, canonical, ogType = 'website' } = meta

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
    setMetaByProperty('og:type', ogType)
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
  }, [meta])
}

export function useJsonLd(id: string, data: object | null) {
  useEffect(() => {
    document.getElementById(id)?.remove()
    if (!data) return

    const script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      document.getElementById(id)?.remove()
    }
  }, [id, data])
}
