/** Wert ist als Inhalt unbrauchbar (z. B. versehentlich als Objekt gespeichert). */
function isUnusable(value: string): boolean {
  const t = value.trim()
  return t === '' || t === '[object Object]' || t === 'undefined' || t === 'null'
}

const CONTENT_KEYS = ['html', 'content', 'body', 'text', 'markdown', 'md', 'value', 'rendered']

function deepFind(value: unknown, depth = 0): string {
  if (depth > 6) return ''
  if (typeof value === 'string') return isUnusable(value) ? '' : value
  if (Array.isArray(value)) {
    return value.map((v) => deepFind(v, depth + 1)).filter(Boolean).join('\n')
  }
  if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>
    for (const key of CONTENT_KEYS) {
      if (typeof o[key] === 'string' && !isUnusable(o[key] as string)) {
        return o[key] as string
      }
    }
    for (const nested of Object.values(o)) {
      if (nested && typeof nested === 'object') {
        const found = deepFind(nested, depth + 1)
        if (found) return found
      }
    }
  }
  return ''
}

/** Stellt sicher, dass Blog-HTML immer ein verwertbarer String für dangerouslySetInnerHTML ist. */
export function normalizeBlogHtml(content: unknown): string {
  if (typeof content === 'string') {
    if (isUnusable(content)) return ''
    const value = content.trim()
    // Versehentlich als JSON-String gespeicherten Inhalt entpacken.
    if (
      (value.startsWith('{') && value.endsWith('}')) ||
      (value.startsWith('[') && value.endsWith(']'))
    ) {
      try {
        const parsed = JSON.parse(value)
        const fromJson = deepFind(parsed)
        if (fromJson) return fromJson
      } catch {
        // kein gültiges JSON — als Text behandeln
      }
    }
    return content
  }
  return deepFind(content)
}
