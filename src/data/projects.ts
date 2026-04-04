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
    subtitle: 'Markenauftritt & Lead-Flow',
    kind: 'Web',
    summary:
      'Klare Story, schnelle Ladezeit und ein Kontaktpfad, der konvertiert — ohne visuelles Rauschen.',
    screenshots: ['screenshot-1.png', 'screenshot-2.png'],
  },
  {
    slug: 'website-2',
    title: 'Website 2',
    subtitle: 'Produkt erklären, Vertrauen aufbauen',
    kind: 'Web',
    summary:
      'Typografie und Layout mit Ruhe im Fokus — auf dem Handy genauso überzeugend wie am Desktop.',
    screenshots: ['screenshot-1.png'],
  },
  {
    slug: 'zeiterfassung',
    title: 'Zeiterfassung',
    subtitle: 'Erfassung, die Teams nicht bremst',
    kind: 'Software',
    summary:
      'Stunden und Einsätze transparent — damit Planung und Abrechnung zusammenpassen.',
    screenshots: ['dashboard.png', 'mobile.png'],
  },
  {
    slug: 'erp',
    title: 'ERP',
    subtitle: 'Operative Übersicht für wachsende Teams',
    kind: 'Software',
    summary:
      'Daten aus Auftrag, Bestand und Kommunikation zusammenführen — lesbar für Menschen, nutzbar für Entscheidungen.',
    screenshots: ['overview.png'],
  },
]

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug)
}

export function screenshotUrl(slug: ProjectSlug, file: string): string {
  return `/project-screenshots/${slug}/${file}`
}
