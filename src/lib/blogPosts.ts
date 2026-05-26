import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type DocumentData,
  type Timestamp,
} from 'firebase/firestore'
import type { BlogPost } from '../types/blog'
import { getBlogCollectionName, getFirebaseDb } from './firebase'

function parsePublishedAt(value: unknown): Date {
  if (value && typeof value === 'object' && 'toDate' in value) {
    const ts = value as Timestamp
    return ts.toDate()
  }
  if (
    value &&
    typeof value === 'object' &&
    'seconds' in value &&
    typeof (value as { seconds: unknown }).seconds === 'number'
  ) {
    return new Date((value as { seconds: number }).seconds * 1000)
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value)
    if (!Number.isNaN(d.getTime())) return d
  }
  return new Date()
}

function mapDoc(id: string, data: DocumentData): BlogPost | null {
  const title = typeof data.title === 'string' ? data.title.trim() : ''
  const slug = typeof data.slug === 'string' ? data.slug.trim() : ''
  const content = typeof data.content === 'string' ? data.content : ''
  const metaDescription =
    typeof data.meta_description === 'string'
      ? data.meta_description.trim()
      : typeof data.metaDescription === 'string'
        ? data.metaDescription.trim()
        : ''

  if (!title || !slug) return null

  return {
    id,
    title,
    slug,
    content,
    metaDescription,
    publishedAt: parsePublishedAt(data.published_at ?? data.publishedAt),
  }
}

function sortByPublishedAtDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  )
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const db = getFirebaseDb()
  if (!db) {
    throw new Error('Firebase ist nicht konfiguriert (VITE_FIREBASE_* fehlen).')
  }

  const col = collection(db, getBlogCollectionName())
  const snapshot = await getDocs(col)
  const posts = snapshot.docs
    .map((d) => mapDoc(d.id, d.data()))
    .filter((p): p is BlogPost => p !== null)

  return sortByPublishedAtDesc(posts)
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const normalized = slug.trim()
  if (!normalized) return null

  const db = getFirebaseDb()
  if (!db) {
    throw new Error('Firebase ist nicht konfiguriert (VITE_FIREBASE_* fehlen).')
  }

  const col = collection(db, getBlogCollectionName())
  const q = query(col, where('slug', '==', normalized))
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    const docSnap = snapshot.docs[0]!
    const post = mapDoc(docSnap.id, docSnap.data())
    return post
  }

  const byId = await getDoc(doc(db, getBlogCollectionName(), normalized))
  if (byId.exists()) {
    return mapDoc(byId.id, byId.data())
  }

  return null
}

export function formatBlogDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
