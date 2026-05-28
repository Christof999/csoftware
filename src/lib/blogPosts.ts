/** Datumsformat für Blog-Beiträge (de-DE) */
export function formatBlogDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
