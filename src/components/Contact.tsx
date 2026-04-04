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

  const inputClass =
    'w-full rounded-lg border border-gallery-line bg-gallery-surface px-3 py-2.5 text-sm text-gallery-ink placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 dark:placeholder:text-stone-500'

  return (
    <section className="bg-gallery-surface py-20 sm:py-24">
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
            className="text-sm font-medium text-stone-500"
          >
            Kontakt
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-gallery-ink sm:text-4xl"
          >
            Schreiben Sie uns
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 text-lg text-stone-600"
          >
            Kurz beschreiben, was Sie brauchen — wir melden uns persönlich bei
            Ihnen.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-5">
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
                Wir freuen uns auf Ihre Nachricht — ob erste Frage oder konkrete
                Idee.
              </p>
            </motion.div>
            <motion.ul
              custom={1}
              variants={fadeInUp}
              className="space-y-4 text-sm text-stone-600"
            >
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-stone-500" aria-hidden />
                <span>hallo@csoftware.example</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-stone-500" aria-hidden />
                <span>+49 (0) 000 0000000</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-stone-500" aria-hidden />
                <span>Nach Absprache vor Ort oder online</span>
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
              className="rounded-2xl border border-gallery-line bg-gallery-bg p-6 shadow-card sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-500">
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
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-500">
                    Firma oder Projekt
                  </span>
                  <input
                    name="company"
                    autoComplete="organization"
                    className={inputClass}
                    placeholder="Optional"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-500">
                    E-Mail
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                    placeholder="name@beispiel.de"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-500">
                    Nachricht
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className={`${inputClass} resize-y`}
                    placeholder="Worum geht es? Was wünschen Sie sich?"
                  />
                </label>
              </div>

              {sent ? (
                <p
                  className="mt-6 rounded-lg border border-gallery-line bg-gallery-elevated px-4 py-3 text-sm text-gallery-ink"
                  role="status"
                >
                  Danke — das ist ein Demo-Formular ohne automatische Versendung.
                </p>
              ) : null}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-stone-400">
                  Mit dem Absenden stimmen Sie der Kontaktaufnahme zu (Demo).
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800"
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
  )
}
