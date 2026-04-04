export type ProjectSlug = 'website-1' | 'website-2' | 'zeiterfassung' | 'erp'

export type ProjectMeta = {
  slug: ProjectSlug
  title: string
  subtitle: string
  kind: 'Web' | 'Software'
  summary: string
  /** Dateinamen relativ zu `/public/project-screenshots/<slug>/` */
  screenshots: string[]
}

export const projects: ProjectMeta[] = [
  {
    slug: 'website-1',
    title: 'Website 1',
    subtitle: 'Neuer Auftritt mit klarem Aufbau',
    kind: 'Web',
    summary:
      'Besucher sehen sofort, was angeboten wird — und finden den Weg zur Anfrage ohne Umwege.',
    screenshots: ['screenshot-1.png', 'screenshot-2.png'],
  },
  {
    slug: 'website-2',
    title: 'Website 2',
    subtitle: 'Vertrauen durch ruhige Gestaltung',
    kind: 'Web',
    summary:
      'Großzügige Bilder, klare Schrift und eine Struktur, die auf dem Handy genauso funktioniert wie am Schreibtisch.',
    screenshots: ['screenshot-1.png'],
  },
  {
    slug: 'zeiterfassung',
    title: 'Zeiterfassung',
    subtitle: 'Stunden und Einsätze im Blick',
    kind: 'Software',
    summary:
      'Einfache Eingabe, übersichtliche Auswertung — damit am Monatsende weniger abgeglichen werden muss.',
    screenshots: ['dashboard.png', 'mobile.png'],
  },
  {
    slug: 'erp',
    title: 'ERP',
    subtitle: 'Aufträge und Infos an einem Ort',
    kind: 'Software',
    summary:
      'Was früher in mehreren Listen verteilt war, wird zu einer verständlichen Übersicht für Ihr Team.',
    screenshots: ['overview.png'],
  },
]

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug)
}

export function screenshotUrl(slug: ProjectSlug, file: string): string {
  return `/project-screenshots/${slug}/${file}`
}
