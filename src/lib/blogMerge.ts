type BlogListEntry = {
  slug: string
  publishedAt: Date | string
}

/**
 * Remote-Beiträge (Firestore) behalten Vorrang bei gleichem Slug.
 * Lokale Software-Beiträge werden ergänzt, falls sie dort noch fehlen.
 */
export function mergeBlogLists<T extends BlogListEntry>(remote: T[], local: T[]): T[] {
  const seen = new Set(remote.map((post) => post.slug).filter(Boolean))
  const extra = local.filter((post) => post.slug && !seen.has(post.slug))
  return [...remote, ...extra].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}
