import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'

export type FirebaseWebConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

function readConfig(): FirebaseWebConfig | null {
  const env = import.meta.env
  const apiKey = env.VITE_FIREBASE_API_KEY
  const projectId = env.VITE_FIREBASE_PROJECT_ID
  const appId = env.VITE_FIREBASE_APP_ID

  if (
    typeof apiKey !== 'string' ||
    apiKey.length === 0 ||
    typeof projectId !== 'string' ||
    projectId.length === 0 ||
    typeof appId !== 'string' ||
    appId.length === 0
  ) {
    return null
  }

  const authDomain =
    typeof env.VITE_FIREBASE_AUTH_DOMAIN === 'string' &&
    env.VITE_FIREBASE_AUTH_DOMAIN.length > 0
      ? env.VITE_FIREBASE_AUTH_DOMAIN
      : `${projectId}.firebaseapp.com`

  const storageBucket =
    typeof env.VITE_FIREBASE_STORAGE_BUCKET === 'string' &&
    env.VITE_FIREBASE_STORAGE_BUCKET.length > 0
      ? env.VITE_FIREBASE_STORAGE_BUCKET
      : `${projectId}.appspot.com`

  const messagingSenderId =
    typeof env.VITE_FIREBASE_MESSAGING_SENDER_ID === 'string' &&
    env.VITE_FIREBASE_MESSAGING_SENDER_ID.length > 0
      ? env.VITE_FIREBASE_MESSAGING_SENDER_ID
      : ''

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  }
}

export function isFirebaseConfigured(): boolean {
  return readConfig() !== null
}

export function getFirebaseApp(): FirebaseApp | null {
  const config = readConfig()
  if (!config) return null
  if (getApps().length > 0) return getApp()
  return initializeApp(config)
}

export function getFirebaseDb(): Firestore | null {
  const app = getFirebaseApp()
  if (!app) return null
  return getFirestore(app)
}

/** Firestore-Sammlung für Blog-Beiträge (VITE_FIRESTORE_BLOG_COLLECTION, Standard: posts) */
export function getBlogCollectionName(): string {
  const raw = import.meta.env.VITE_FIRESTORE_BLOG_COLLECTION
  if (typeof raw === 'string' && raw.trim().length > 0) return raw.trim()
  return 'posts'
}
