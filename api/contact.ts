import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

/**
 * Vercel Serverless Function – nimmt Kontaktformular-Daten entgegen und
 * versendet sie per SMTP an die konfigurierte Zieladresse.
 *
 * Benötigte Environment Variables (in Vercel Project Settings > Environment Variables):
 *   SMTP_HOST         z. B. smtp.checkdomain.de
 *   SMTP_PORT         z. B. 587 (STARTTLS) oder 465 (SSL)
 *   SMTP_USER         SMTP-Login (i. d. R. die Postfach-Adresse)
 *   SMTP_PASSWORD     Postfach-Passwort
 *   CONTACT_TO        Empfänger, z. B. info@soergel-design.de
 *   CONTACT_FROM      Absender, muss ein Postfach auf der Domain sein
 *                     (z. B. "SØRGEL-design <info@soergel-design.de>")
 *   CONTACT_DIAG_TOKEN (optional) – wenn gesetzt, ist GET /api/contact
 *                     nur mit ?token=<wert> aufrufbar. Ohne Variable gibt GET
 *                     keine Konfigurationsdetails preis (404).
 */

type ContactBody = {
  name?: string
  company?: string
  email?: string
  message?: string
  website?: string
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/** Entfernt CR/LF und Steuerzeichen – schützt vor Header-Injection in E-Mail-Headern. */
function sanitizeHeaderValue(input: string): string {
  let out = ''
  for (const ch of input) {
    const code = ch.charCodeAt(0)
    if (code < 32 || code === 127) {
      out += ' '
    } else {
      out += ch
    }
  }
  return out.trim()
}

function clientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd.length > 0) {
    return fwd.split(',')[0]!.trim()
  }
  if (Array.isArray(fwd) && fwd[0]) {
    return fwd[0].split(',')[0]!.trim()
  }
  return req.socket?.remoteAddress ?? 'unknown'
}

/**
 * Sehr einfaches In-Memory-Rate-Limit pro IP. In Serverless-Umgebungen gilt es
 * nur pro Function-Instanz und ist daher eher eine Bremse gegen triviale
 * Flooding-Skripte als ein robuster Schutz. Für echten Schutz könnte ein
 * Upstash/Redis-basiertes Limit nachgerüstet werden.
 */
const RATE_WINDOW_MS = 60_000
const RATE_MAX = 5
const hits = new Map<string, { count: number; reset: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS })
    return false
  }
  entry.count += 1
  if (entry.count > RATE_MAX) return true
  return false
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('Cache-Control', 'no-store')

  if (req.method === 'GET') {
    const token = typeof req.query.token === 'string' ? req.query.token : ''
    const expected = process.env.CONTACT_DIAG_TOKEN
    if (!expected || token !== expected) {
      return res.status(404).json({ ok: false, error: 'Not Found' })
    }
    return res.status(200).json({
      ok: true,
      endpoint: 'contact',
      env: {
        SMTP_HOST: Boolean(process.env.SMTP_HOST),
        SMTP_PORT: process.env.SMTP_PORT ?? null,
        SMTP_USER: Boolean(process.env.SMTP_USER),
        SMTP_PASSWORD: Boolean(process.env.SMTP_PASSWORD),
        CONTACT_TO: Boolean(process.env.CONTACT_TO),
        CONTACT_FROM: Boolean(process.env.CONTACT_FROM),
      },
    })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }

  const ip = clientIp(req)
  if (isRateLimited(ip)) {
    res.setHeader('Retry-After', '60')
    return res
      .status(429)
      .json({ ok: false, error: 'Zu viele Anfragen. Bitte kurz warten.' })
  }

  const rawContentType = req.headers['content-type'] ?? ''
  if (!rawContentType.includes('application/json')) {
    return res
      .status(415)
      .json({ ok: false, error: 'Unsupported Media Type (JSON erwartet).' })
  }

  const body = (typeof req.body === 'string'
    ? safeParseJson(req.body)
    : (req.body ?? {})) as ContactBody

  if (body.website && body.website.trim() !== '') {
    return res.status(200).json({ ok: true })
  }

  const name = (body.name ?? '').toString().trim()
  const company = (body.company ?? '').toString().trim()
  const email = (body.email ?? '').toString().trim()
  const message = (body.message ?? '').toString().trim()

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ ok: false, error: 'Bitte füllen Sie Name, E-Mail und Nachricht aus.' })
  }
  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ ok: false, error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' })
  }
  if (message.length > 5000 || name.length > 200 || company.length > 200) {
    return res.status(400).json({ ok: false, error: 'Eingaben zu lang.' })
  }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD
  const to = process.env.CONTACT_TO ?? 'info@soergel-design.de'
  const from =
    process.env.CONTACT_FROM ?? `SØRGEL-design <${user ?? 'info@soergel-design.de'}>`

  if (!host || !user || !pass) {
    console.error('SMTP-Konfiguration fehlt (SMTP_HOST / SMTP_USER / SMTP_PASSWORD).')
    return res.status(500).json({
      ok: false,
      error: 'Der Versand ist derzeit nicht verfügbar. Bitte später erneut versuchen.',
    })
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    requireTLS: port !== 465,
  })

  const safeName = sanitizeHeaderValue(name)
  const safeEmail = sanitizeHeaderValue(email)
  const subject = sanitizeHeaderValue(
    `Neue Nachricht über das Kontaktformular – ${safeName}`,
  )

  const textBody = [
    'Neue Nachricht über das Kontaktformular',
    '',
    `Name:    ${name}`,
    `Firma:   ${company || '—'}`,
    `E-Mail:  ${email}`,
    '',
    'Nachricht:',
    message,
  ].join('\n')

  const htmlBody = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#0f172a;line-height:1.55">
      <h2 style="margin:0 0 12px;font-size:16px">Neue Nachricht über das Kontaktformular</h2>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Firma</td><td>${escapeHtml(company) || '&mdash;'}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">E-Mail</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      </table>
      <h3 style="margin:20px 0 6px;font-size:14px">Nachricht</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
    </div>
  `.trim()

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: `${safeName} <${safeEmail}>`,
      subject,
      text: textBody,
      html: htmlBody,
    })
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Fehler beim E-Mail-Versand:', error)
    return res.status(500).json({
      ok: false,
      error: 'Nachricht konnte nicht gesendet werden. Bitte später erneut versuchen.',
    })
  }
}

function safeParseJson(input: string): unknown {
  try {
    return JSON.parse(input)
  } catch {
    return {}
  }
}
