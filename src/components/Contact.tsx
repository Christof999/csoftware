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
    <section id="kontakt" className="scroll-mt-24 bg-craft-950 py-24">
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
            className="text-sm font-semibold uppercase tracking-widest text-gold-400"
          >
            Kontakt
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Lassen Sie uns über Ihr nächstes Projekt sprechen
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 text-lg text-craft-300"
          >
            Kurz beschreiben, was Sie brauchen — wir melden uns mit einem
            klaren nächsten Schritt. Ohne Druck, ohne Fachchinesisch.
          </motion.p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <motion.aside
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6 lg:col-span-2"
          >
            <motion.div
              custom={0}
              variants={fadeInUp}
              className="rounded-2xl border border-white/10 bg-navy-950/40 p-6"
            >
              <h3 className="font-display text-lg font-semibold text-white">
                Csoftware
              </h3>
              <p className="mt-2 text-sm text-craft-400">
                Software & Web für Handwerksbetriebe — regional verwurzelt,
                digital aufgestellt.
              </p>
            </motion.div>
            <motion.ul
              custom={1}
              variants={fadeInUp}
              className="space-y-4 text-sm text-craft-300"
            >
              <li className="flex gap-3">
                <Mail
                  className="mt-0.5 h-5 w-5 shrink-0 text-tech-400"
                  aria-hidden
                />
                <span>hallo@csoftware.example</span>
              </li>
              <li className="flex gap-3">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-tech-400"
                  aria-hidden
                />
                <span>+49 (0) 000 0000000</span>
              </li>
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-tech-400"
                  aria-hidden
                />
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
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-navy-950/60 to-craft-950/80 p-6 shadow-xl sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-craft-500">
                    Name
                  </span>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-white/10 bg-craft-950/80 px-4 py-3 text-sm text-white placeholder:text-craft-600 focus:border-tech-500/50 focus:outline-none focus:ring-2 focus:ring-tech-500/20"
                    placeholder="Max Mustermann"
                  />
                </label>
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-craft-500">
                    Firma
                  </span>
                  <input
                    name="company"
                    autoComplete="organization"
                    className="w-full rounded-xl border border-white/10 bg-craft-950/80 px-4 py-3 text-sm text-white placeholder:text-craft-600 focus:border-tech-500/50 focus:outline-none focus:ring-2 focus:ring-tech-500/20"
                    placeholder="Mustermann GmbH"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-craft-500">
                    E-Mail
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/10 bg-craft-950/80 px-4 py-3 text-sm text-white placeholder:text-craft-600 focus:border-tech-500/50 focus:outline-none focus:ring-2 focus:ring-tech-500/20"
                    placeholder="kontakt@firma.de"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-craft-500">
                    Ihr Anliegen
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full resize-y rounded-xl border border-white/10 bg-craft-950/80 px-4 py-3 text-sm text-white placeholder:text-craft-600 focus:border-tech-500/50 focus:outline-none focus:ring-2 focus:ring-tech-500/20"
                    placeholder="z. B. neue Website, Zeiterfassung für 12 Mitarbeitende, Übersicht über Aufträge …"
                  />
                </label>
              </div>

              {sent ? (
                <p
                  className="mt-6 rounded-xl border border-forest-600/40 bg-forest-900/30 px-4 py-3 text-sm text-forest-200"
                  role="status"
                >
                  Danke — das ist ein Demo-Formular. Anbindung an ein
                  E-Mail-Backend folgt bei Bedarf.
                </p>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-craft-500">
                  Mit dem Absenden stimmen Sie der kontextbezogenen
                  Kontaktaufnahme zu (Platzhalter).
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-forest-600 to-forest-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:from-forest-500 hover:to-forest-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tech-400"
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
