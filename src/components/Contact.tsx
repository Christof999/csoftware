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
    'w-full rounded-lg border border-white/[0.1] bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/40'

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
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-indigo-300/90"
          >
            Kontakt
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Lassen Sie uns kurz sprechen
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 text-lg text-zinc-400"
          >
            Beschreiben Sie Ziel und Rahmen — wir melden uns mit einem
            konkreten nächsten Schritt.
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
              <h3 className="font-display text-lg font-semibold text-white">
                Csoftware
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                Web & Software — für Teams, die Qualität vor Lautstärke stellen.
              </p>
            </motion.div>
            <motion.ul
              custom={1}
              variants={fadeInUp}
              className="space-y-4 text-sm text-zinc-400"
            >
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" aria-hidden />
                <span>hallo@csoftware.example</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" aria-hidden />
                <span>+49 (0) 000 0000000</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" aria-hidden />
                <span>Remote & vor Ort nach Absprache</span>
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
              className="rounded-2xl border border-white/[0.08] bg-gallery-elevated/80 p-6 shadow-panel backdrop-blur-sm sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-zinc-500">
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
                  <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                    Organisation
                  </span>
                  <input
                    name="company"
                    autoComplete="organization"
                    className={inputClass}
                    placeholder="Firma oder Team"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-zinc-500">
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
                  <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                    Nachricht
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className={`${inputClass} resize-y`}
                    placeholder="Kurz: Ziel, Zeitrahmen, was schon da ist …"
                  />
                </label>
              </div>

              {sent ? (
                <p
                  className="mt-6 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-zinc-300"
                  role="status"
                >
                  Danke — Demo-Formular ohne Backend.
                </p>
              ) : null}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-zinc-600">
                  Absenden = Kontaktaufnahme (Platzhalter).
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-indigo-400"
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
