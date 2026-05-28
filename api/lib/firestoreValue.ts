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

export function fieldAsHtmlContent(
  fields: FirestoreFields | undefined,
  ...names: string[]
): string {
  const raw = parseFirestoreValue(fieldKeys(fields, ...names))
  if (typeof raw === 'string') return raw
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>
    for (const key of ['html', 'content', 'body', 'text', 'value', 'rendered']) {
      if (typeof o[key] === 'string') return o[key]
    }
    const blocks = o.blocks
    if (Array.isArray(blocks)) {
      const parts = blocks
        .map((b) => {
          if (!b || typeof b !== 'object') return ''
          const block = b as Record<string, unknown>
          if (typeof block.html === 'string') return block.html
          if (typeof block.text === 'string') return `<p>${block.text}</p>`
          return ''
        })
        .filter(Boolean)
      if (parts.length > 0) return parts.join('\n')
    }
  }
  if (Array.isArray(raw)) {
    return raw
      .map((item) => (typeof item === 'string' ? item : ''))
      .filter(Boolean)
      .join('\n')
  }
  return ''
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
