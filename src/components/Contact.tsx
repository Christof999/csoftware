import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, Clock, Mail, MapPin, MessageSquare, Phone, Plus, Send, Users } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { fadeInUp, staggerContainer } from '../lib/motion'
import { CursorGlow } from './home/tech/CursorGlow'

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: 'E-Mail',
    value: 'hallo@csoftware.example',
    note: 'Am schnellsten',
  },
  {
    Icon: Phone,
    label: 'Telefon',
    value: '+49 1732 387757',
    note: 'Mo – Fr, 9 – 18 Uhr',
  },
  {
    Icon: MapPin,
    label: 'Ort',
    value: 'Deutschland',
    note: 'Vor Ort oder remote',
  },
]

const PROMISES = [
  {
    Icon: Clock,
    title: 'Antwort in 24 Stunden',
    text: 'Innerhalb eines Werktags hören Sie von uns — persönlich, nicht automatisiert.',
  },
  {
    Icon: MessageSquare,
    title: 'Erstes Gespräch kostenlos',
    text: 'Wir hören zu, stellen Fragen und klären, ob und wie wir helfen können — ohne Verkaufsdruck.',
  },
  {
    Icon: Users,
    title: 'Direkt mit den Machern',
    text: 'Kein Vertrieb, kein Account-Manager — Sie sprechen von Anfang an mit denen, die Ihr Projekt umsetzen.',
  },
]

const FAQ = [
  {
    q: 'Was kostet eine Website?',
    a: 'Das hängt vom Umfang ab. Einfache Landingpages starten ab einem niedrigen vierstelligen Betrag — größere Sites mit individuellen Funktionen entsprechend mehr. Das besprechen wir transparent im ersten Gespräch.',
  },
  {
    q: 'Wie lange dauert die Umsetzung?',
    a: 'Eine einfache Website dauert 2–4 Wochen, komplexere Projekte entsprechend länger. Nach dem ersten Gespräch können wir eine realistische Einschätzung geben.',
  },
  {
    q: 'Ich habe nur eine vage Idee — ist das okay?',
    a: 'Absolut. Viele unserer besten Projekte starteten mit einer groben Richtung. Konzept und Struktur erarbeiten wir gemeinsam.',
  },
  {
    q: 'Ich brauche nur eine Kleinigkeit — lohnt sich das Schreiben?',
    a: 'Ja. Kein Anliegen ist zu klein. Schreiben Sie kurz, was Sie beschäftigt — wir sagen Ihnen direkt, ob und wie wir helfen können.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export function Contact() {
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  const inputClass =
    'w-full rounded-lg border border-gallery-line bg-gallery-bg px-4 py-3 text-sm text-gallery-ink placeholder:text-shell-subtle focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 transition-colors'

  return (
    <div>
      {/* Page header */}
      <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <div className="flex items-center gap-4 border-b border-gallery-line pb-8">
              <motion.p
                custom={0}
                variants={fadeInUp}
                className="text-xs font-medium uppercase tracking-widest text-shell-muted"
              >
                Kontakt
              </motion.p>
            </div>

            <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
              <motion.h1
                custom={1}
                variants={fadeInUp}
                className="font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl lg:text-6xl"
              >
                Lassen Sie uns
                <br />
                <span className="text-shell-muted">über Ihr Projekt reden.</span>
              </motion.h1>

              <motion.nav
                custom={2}
                variants={fadeInUp}
                className="flex flex-wrap gap-2 sm:justify-end"
                aria-label="Abschnitte"
              >
                <a
                  href="#formular"
                  className="inline-flex items-center gap-2 rounded-full border border-gallery-line bg-gallery-bg px-4 py-2 text-xs font-medium text-gallery-ink transition hover:border-stone-400 dark:hover:border-stone-600"
                >
                  <span className="font-mono text-shell-subtle">01</span>
                  Formular
                </a>
                <a
                  href="#faq"
                  className="inline-flex items-center gap-2 rounded-full border border-gallery-line bg-gallery-bg px-4 py-2 text-xs font-medium text-gallery-ink transition hover:border-stone-400 dark:hover:border-stone-600"
                >
                  <span className="font-mono text-shell-subtle">02</span>
                  Häufige Fragen
                </a>
              </motion.nav>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact info + Form */}
      <section
        id="formular"
        className="border-b border-gallery-line bg-gallery-bg py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-20">
            {/* Left column: contact details + promises */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className="space-y-12"
            >
              {/* Contact channels */}
              <div>
                <motion.p
                  custom={0}
                  variants={fadeInUp}
                  className="border-b border-gallery-line pb-6 mb-8 text-xs font-medium uppercase tracking-widest text-shell-muted"
                >
                  Direkt erreichbar
                </motion.p>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-3"
                >
                  {CONTACT_ITEMS.map((item, i) => (
                    <motion.li key={item.label} custom={i} variants={fadeInUp}>
                      <CursorGlow className="rounded-xl border border-gallery-line bg-gallery-surface">
                        <div className="flex items-start gap-5 px-6 py-5">
                          <span className="mt-0.5 shrink-0 text-gallery-ink">
                            <item.Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                          </span>
                          <div>
                            <p className="text-[10px] font-medium uppercase tracking-widest text-shell-subtle">
                              {item.label}
                            </p>
                            <p className="mt-1 font-display text-sm font-semibold text-gallery-ink">
                              {item.value}
                            </p>
                            <p className="mt-0.5 text-xs text-shell-muted">{item.note}</p>
                          </div>
                        </div>
                      </CursorGlow>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Promises */}
              <div>
                <motion.p
                  custom={3}
                  variants={fadeInUp}
                  className="border-b border-gallery-line pb-6 mb-8 text-xs font-medium uppercase tracking-widest text-shell-muted"
                >
                  Was Sie erwartet
                </motion.p>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-3"
                >
                  {PROMISES.map((item, i) => (
                    <motion.li key={item.title} custom={i} variants={fadeInUp}>
                      <CursorGlow className="rounded-xl border border-gallery-line bg-gallery-surface">
                        <div className="flex gap-5 px-6 py-5">
                          <span className="mt-0.5 shrink-0 text-gallery-ink">
                            <item.Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                          </span>
                          <div>
                            <p className="font-display text-sm font-semibold text-gallery-ink">
                              {item.title}
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-shell-muted">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </CursorGlow>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>

            {/* Right column: form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-gallery-line bg-gallery-surface p-6 sm:p-8"
              >
                <p className="mb-6 border-b border-gallery-line pb-6 text-xs font-medium uppercase tracking-widest text-shell-muted">
                  Nachricht schreiben
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-shell-subtle">
                      Name
                    </span>
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Ihr Name"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-shell-subtle">
                      Firma / Projekt
                    </span>
                    <input
                      name="company"
                      autoComplete="organization"
                      className={inputClass}
                      placeholder="Optional"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-shell-subtle">
                      E-Mail
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                      placeholder="name@beispiel.at"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-shell-subtle">
                      Worum geht es?
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className={`${inputClass} resize-y`}
                      placeholder="Stichwörter reichen — wir fragen nach, wenn nötig."
                    />
                  </label>
                </div>

                <AnimatePresence>
                  {sent && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-5 flex items-center gap-3 rounded-lg border border-gallery-line bg-gallery-elevated px-4 py-3"
                      role="status"
                    >
                      <CheckCircle
                        className="h-4 w-4 shrink-0 text-gallery-ink"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <p className="text-sm text-gallery-ink">
                        Danke — das ist ein Demo-Formular ohne Versendung.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6 flex flex-col gap-4 border-t border-gallery-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-shell-subtle">
                    Mit dem Absenden stimmen Sie der Kontaktaufnahme zu (Demo).
                  </p>
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                  >
                    <Send className="h-4 w-4" aria-hidden />
                    Nachricht senden
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="bg-gallery-surface py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            <div className="flex items-center gap-4 border-b border-gallery-line pb-8">
              <motion.span
                custom={0}
                variants={fadeInUp}
                className="font-mono text-xs text-shell-subtle"
              >
                02
              </motion.span>
              <motion.p
                custom={0}
                variants={fadeInUp}
                className="text-xs font-medium uppercase tracking-widest text-shell-muted"
              >
                Häufige Fragen
              </motion.p>
            </div>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="mt-10 max-w-xl font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl"
            >
              Was andere auch gefragt haben.
            </motion.h2>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="mt-10 space-y-3"
          >
            {FAQ.map((item, i) => (
              <motion.li key={item.q} custom={i} variants={fadeInUp}>
                <CursorGlow className="rounded-xl border border-gallery-line bg-gallery-bg">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-8 px-6 py-5 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <p className="font-display text-sm font-semibold text-gallery-ink">
                      {item.q}
                    </p>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-shell-subtle"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-shell-muted">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CursorGlow>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </div>
  )
}
