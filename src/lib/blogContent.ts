/** Stellt sicher, dass Blog-HTML immer ein String für dangerouslySetInnerHTML ist. */
export function normalizeBlogHtml(content: unknown): string {
  if (typeof content === 'string') return content
  if (content && typeof content === 'object') {
    const o = content as Record<string, unknown>
    for (const key of ['html', 'content', 'body', 'text', 'value', 'rendered']) {
      if (typeof o[key] === 'string') return o[key]
    }
  }
  return ''
}
