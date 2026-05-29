/**
 * Firestore REST-Werttypen → plain JS (robust für verschiedene Automatisierungen).
 */

export type FirestoreValue = {
  stringValue?: string
  integerValue?: string
  doubleValue?: number
  booleanValue?: boolean
  timestampValue?: string
  nullValue?: null
  mapValue?: { fields?: Record<string, FirestoreValue> }
  arrayValue?: { values?: FirestoreValue[] }
}

export type FirestoreFields = Record<string, FirestoreValue>

function fieldKeys(fields: FirestoreFields | undefined, ...names: string[]): FirestoreValue | undefined {
  if (!fields) return undefined
  for (const name of names) {
    if (fields[name] !== undefined) return fields[name]
  }
  return undefined
}

export function parseFirestoreValue(value: FirestoreValue | undefined): unknown {
  if (!value) return undefined
  if (value.nullValue !== undefined) return null
  if (typeof value.stringValue === 'string') return value.stringValue
  if (typeof value.integerValue === 'string') return value.integerValue
  if (typeof value.doubleValue === 'number') return value.doubleValue
  if (typeof value.booleanValue === 'boolean') return value.booleanValue
  if (typeof value.timestampValue === 'string') {
    return new Date(value.timestampValue)
  }
  if (value.mapValue?.fields) {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value.mapValue.fields)) {
      out[k] = parseFirestoreValue(v)
    }
    return out
  }
  if (value.arrayValue?.values) {
    return value.arrayValue.values.map((v) => parseFirestoreValue(v))
  }
  return undefined
}

export function fieldAsString(
  fields: FirestoreFields | undefined,
  ...names: string[]
): string {
  const raw = parseFirestoreValue(fieldKeys(fields, ...names))
  if (typeof raw === 'string') return raw.trim()
  if (typeof raw === 'number' || typeof raw === 'boolean') return String(raw)
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>
    for (const key of ['html', 'content', 'body', 'text', 'value']) {
      if (typeof o[key] === 'string') return o[key].trim()
    }
  }
  return ''
}

/** Wert ist als HTML-/Text-Inhalt unbrauchbar (z. B. versehentlich gespeichertes Objekt). */
function isUnusableContentString(value: string): boolean {
  const t = value.trim()
  return t === '' || t === '[object Object]' || t === 'undefined' || t === 'null'
}

const CONTENT_KEYS = ['html', 'content', 'body', 'text', 'markdown', 'md', 'value', 'rendered'] as const

/** Findet rekursiv den ersten brauchbaren Inhalts-String in einem verschachtelten Objekt/Array. */
function deepFindContentString(value: unknown, depth = 0): string {
  if (depth > 6) return ''

  if (typeof value === 'string') {
    return isUnusableContentString(value) ? '' : value
  }

  if (Array.isArray(value)) {
    const parts = value
      .map((item) => {
        if (typeof item === 'string') {
          return isUnusableContentString(item) ? '' : item
        }
        if (item && typeof item === 'object') {
          const block = item as Record<string, unknown>
          if (typeof block.html === 'string' && !isUnusableContentString(block.html)) {
            return block.html
          }
          if (typeof block.text === 'string' && !isUnusableContentString(block.text)) {
            return `<p>${block.text}</p>`
          }
          return deepFindContentString(item, depth + 1)
        }
        return ''
      })
      .filter(Boolean)
    return parts.join('\n')
  }

  if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>
    // Bevorzugte Schlüssel direkt prüfen.
    for (const key of CONTENT_KEYS) {
      if (typeof o[key] === 'string' && !isUnusableContentString(o[key] as string)) {
        return o[key] as string
      }
    }
    if (Array.isArray(o.blocks)) {
      const fromBlocks = deepFindContentString(o.blocks, depth + 1)
      if (fromBlocks) return fromBlocks
    }
    // Sonst tiefer suchen (irgendein verschachteltes Feld kann den Text tragen).
    for (const nested of Object.values(o)) {
      if (nested && typeof nested === 'object') {
        const found = deepFindContentString(nested, depth + 1)
        if (found) return found
      }
    }
  }

  return ''
}

export function fieldAsHtmlContent(
  fields: FirestoreFields | undefined,
  ...names: string[]
): string {
  const raw = parseFirestoreValue(fieldKeys(fields, ...names))

  if (typeof raw === 'string') {
    const value = raw.trim()
    if (isUnusableContentString(value)) return ''
    // Manche Automatisierungen speichern JSON als String — versuchen zu entpacken.
    if (
      (value.startsWith('{') && value.endsWith('}')) ||
      (value.startsWith('[') && value.endsWith(']'))
    ) {
      try {
        const parsed = JSON.parse(value)
        const fromJson = deepFindContentString(parsed)
        if (fromJson) return fromJson
      } catch {
        // Kein gültiges JSON — als reinen Text behandeln.
      }
    }
    return raw
  }

  return deepFindContentString(raw)
}

/** Entfernt HTML-Tags und komprimiert Whitespace — für Title-Ableitung & Vorschau. */
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

/** Wandelt einen Slug in einen lesbaren Titel um: "mein-erster-beitrag" → "Mein erster Beitrag". */
export function titleFromSlug(slug: string): string {
  const words = slug
    .trim()
    .replace(/[-_/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!words) return ''
  return words.charAt(0).toUpperCase() + words.slice(1)
}

/**
 * Leitet einen Titel ab, wenn kein `title`-Feld vorhanden ist:
 * erste Überschrift im Content → erster Satz → Slug.
 */
export function deriveTitle(opts: {
  title?: string
  content?: string
  metaDescription?: string
  slug?: string
}): string {
  const explicit = opts.title?.trim()
  if (explicit) return explicit

  const content = opts.content ?? ''
  if (content) {
    const heading = content.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/i)
    if (heading) {
      const text = htmlToPlainText(heading[1])
      if (text) return text.slice(0, 120)
    }
    const plain = htmlToPlainText(content)
    if (plain) {
      const firstSentence = plain.split(/(?<=[.!?])\s/)[0] ?? plain
      return firstSentence.slice(0, 120).trim()
    }
  }

  const meta = opts.metaDescription?.trim()
  if (meta) {
    const firstSentence = meta.split(/(?<=[.!?])\s/)[0] ?? meta
    return firstSentence.slice(0, 120).trim()
  }

  return titleFromSlug(opts.slug ?? '') || 'Beitrag'
}

export function fieldAsIsoDate(
  fields: FirestoreFields | undefined,
  ...names: string[]
): string {
  const raw = parseFirestoreValue(fieldKeys(fields, ...names))
  if (raw instanceof Date && !Number.isNaN(raw.getTime())) {
    return raw.toISOString()
  }
  if (typeof raw === 'string' || typeof raw === 'number') {
    const d = new Date(raw)
    if (!Number.isNaN(d.getTime())) return d.toISOString()
  }
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>
    if (typeof o.seconds === 'number') {
      return new Date(o.seconds * 1000).toISOString()
    }
    if (typeof o._seconds === 'number') {
      return new Date(o._seconds * 1000).toISOString()
    }
  }
  return new Date(0).toISOString()
}
