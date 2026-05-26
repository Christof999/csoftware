/** Kurzinfo für die Blog-Übersicht (ohne HTML-Content) */
export type BlogPostListItem = {
  id: string
  title: string
  slug: string
  metaDescription: string
  publishedAt: Date
}

/** Vollständiger Beitrag inkl. HTML-Content */
export type BlogPost = BlogPostListItem & {
  content: string
}
