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
    subtitle: 'Handwerksbetrieb — Auftritt & Kontakt',
    kind: 'Web',
    summary:
      'Fokus auf klare Leistungsdarstellung und schnellen Kontakt — für Kundinnen und Kunden verständlich, für das Team wartungsarm.',
    screenshots: ['screenshot-1.png', 'screenshot-2.png'],
  },
  {
    slug: 'website-2',
    title: 'Website 2',
    subtitle: 'Regionaler Betrieb — Vertrauen sichtbar machen',
    kind: 'Web',
    summary:
      'Ruhige Bildsprache, starke Typografie und eine Struktur, die auf dem Smartphone genauso funktioniert wie im Büro.',
    screenshots: ['screenshot-1.png'],
  },
  {
    slug: 'zeiterfassung',
    title: 'Zeiterfassung',
    subtitle: 'Erfassung, die im Alltag mitgeht',
    kind: 'Software',
    summary:
      'Stunden und Einsätze nachvollziehbar — weniger Rückfragen, klarere Abrechnung, ohne die Crew zu bremsen.',
    screenshots: ['dashboard.png', 'mobile.png'],
  },
  {
    slug: 'erp',
    title: 'ERP',
    subtitle: 'Aufträge & Überblick im Team',
    kind: 'Software',
    summary:
      'Daten zusammenführen, die sonst in Tabellen verteilt sind — übersichtlich genug für Entscheidungen im Tagesgeschäft.',
    screenshots: ['overview.png'],
  },
]

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug)
}

export function screenshotUrl(slug: ProjectSlug, file: string): string {
  return `/project-screenshots/${slug}/${file}`
}
