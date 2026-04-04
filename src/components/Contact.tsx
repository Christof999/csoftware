import { type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../lib/motion'

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="bg-gallery-bg py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            custom={0}
            variants={fadeInUp}
            className="text-xs font-medium uppercase tracking-[0.2em] text-gallery-muted"
          >
            Kontakt
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-gallery-ink sm:text-4xl"
          >
            Kurz schreiben, wir melden uns
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 text-lg text-stone-600"
          >
            Beschreiben Sie Ihr Anliegen in eigenen Worten — ohne technisches
            Vokabular.
          </motion.p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <motion.aside
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8 lg:col-span-2"
          >
            <motion.div custom={0} variants={fadeInUp}>
              <h3 className="font-display text-lg font-semibold text-gallery-ink">
                Csoftware
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Web & Software für Handwerksbetriebe.
              </p>
            </motion.div>
            <motion.ul
              custom={1}
              variants={fadeInUp}
              className="space-y-4 text-sm text-stone-600"
            >
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gallery-muted" aria-hidden />
                <span>hallo@csoftware.example</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gallery-muted" aria-hidden />
                <span>+49 (0) 000 0000000</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gallery-muted" aria-hidden />
                <span>Musterstadt & Umgebung</span>
              </li>
            </motion.ul>
          </motion.aside>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="border border-gallery-line bg-gallery-surface p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gallery-muted">
                    Name
                  </span>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full border border-gallery-line bg-gallery-bg px-3 py-2.5 text-sm text-gallery-ink placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    placeholder="Max Mustermann"
                  />
                </label>
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gallery-muted">
                    Firma
                  </span>
                  <input
                    name="company"
                    autoComplete="organization"
                    className="w-full border border-gallery-line bg-gallery-bg px-3 py-2.5 text-sm text-gallery-ink placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    placeholder="Mustermann GmbH"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gallery-muted">
                    E-Mail
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full border border-gallery-line bg-gallery-bg px-3 py-2.5 text-sm text-gallery-ink placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    placeholder="kontakt@firma.de"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gallery-muted">
                    Nachricht
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full resize-y border border-gallery-line bg-gallery-bg px-3 py-2.5 text-sm text-gallery-ink placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    placeholder="Ihr Projekt oder Ihre Frage …"
                  />
                </label>
              </div>

              {sent ? (
                <p
                  className="mt-6 border border-gallery-line bg-stone-50 px-4 py-3 text-sm text-stone-700"
                  role="status"
                >
                  Danke — Demo-Formular ohne Backend.
                </p>
              ) : null}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-stone-400">
                  Absenden = Kontaktaufnahme (Platzhalter).
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 border border-gallery-ink bg-gallery-ink px-5 py-2.5 text-sm font-medium text-gallery-surface transition hover:bg-stone-800"
                >
                  <Send className="h-4 w-4" aria-hidden />
                  Senden
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
