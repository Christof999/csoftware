type BlogProseProps = {
  html: string
  className?: string
}

/**
 * Rendert HTML-Inhalt aus Firestore mit lesbarer Typografie.
 * Inhalt stammt aus dem eigenen Redaktionssystem — kein untrusted User-Input.
 */
export function BlogProse({ html, className = '' }: BlogProseProps) {
  return (
    <div
      className={`blog-prose text-base leading-relaxed text-shell-muted ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
