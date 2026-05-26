/** Firestore-Dokument für einen veröffentlichten Blog-Beitrag */
export type BlogPost = {
  id: string
  title: string
  slug: string
  content: string
  metaDescription: string
  publishedAt: Date
}
