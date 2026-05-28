import { normalizeBlogHtml } from '../../lib/blogContent'

type BlogProseProps = {
  html: unknown
  className?: string
}

/**
 * Rendert HTML-Inhalt aus Firestore mit lesbarer Typografie.
 * Inhalt stammt aus dem eigenen Redaktionssystem — kein untrusted User-Input.
 */
export function BlogProse({ html, className = '' }: BlogProseProps) {
  const safeHtml = normalizeBlogHtml(html)
  if (!safeHtml) {
    return (
      <p className="text-sm text-shell-muted" role="status">
        Für diesen Beitrag ist noch kein Textinhalt hinterlegt.
      </p>
    )
  }

  return (
    <div
      className={`blog-prose text-base leading-relaxed text-shell-muted ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  )
}
