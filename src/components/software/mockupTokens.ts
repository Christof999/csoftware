/**
 * Farben und Kurven der nachgebauten Programm-Ansichten.
 *
 * Die Ansichten behalten bewusst ihre eigenen Farben — auch im dunklen
 * Seitenmodus. Ein Screenshot dreht sich ja auch nicht mit dem Seitenthema;
 * nur der Rahmen darum passt sich an.
 *
 * Die Akzentfarbe ist je Programm eine andere, weil sie im echten Einsatz aus
 * dem Logo des Betriebs abgeleitet wird.
 */

/** Auftrag & Rechnung */
export const ACCENT_INVOICE = '#3f7264'
export const ACCENT_INVOICE_SOFT = '#eef4f2'
/** Zeiterfassung */
export const ACCENT_TIME = '#b23a48'
export const ACCENT_TIME_SOFT = '#fdeaec'
/** Posteingang */
export const ACCENT_MAIL = '#6e3df5'
export const ACCENT_MAIL_SOFT = 'rgba(110, 61, 245, 0.10)'

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
