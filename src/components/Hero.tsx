import { motion } from 'framer-motion'
import { ArrowRight, Hammer, Sparkles } from 'lucide-react'
import { fadeInUp } from '../lib/motion'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden border-b border-white/5 bg-craft-950 bg-hero-glow bg-grid-fine [background-size:100%_100%,64px_64px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-craft-950" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-3xl"
        >
          <motion.div
            custom={0}
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-craft-200 backdrop-blur-sm sm:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-tech-400" aria-hidden />
            Craft meets Code — Software für den Mittelstand
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeInUp}
            className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Traditionelles Handwerk trifft auf{' '}
            <span className="bg-gradient-to-r from-tech-400 via-forest-400 to-gold-400 bg-clip-text text-transparent">
              maßgeschneiderte Software
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-craft-300 sm:text-xl"
          >
            Weniger Papierkram, mehr Zeit auf der Baustelle: Wir machen Ihr
            Unternehmen digital sichtbar und Ihre Abläufe klar — von der
            professionellen Website bis zu Tools, die wirklich zu Ihrem Betrieb
            passen.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy-600 to-navy-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy-900/50 transition hover:from-navy-500 hover:to-navy-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tech-400"
            >
              Unverbindlich sprechen
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-craft-100 backdrop-blur-sm transition hover:border-tech-400/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tech-400"
            >
              <Hammer className="h-4 w-4 text-gold-400" aria-hidden />
              Leistungen ansehen
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-16 grid gap-4 sm:grid-cols-3"
        >
          {[
            {
              label: 'Sichtbarkeit',
              value: 'Klar & vertrauenswürdig',
              hint: 'Websites, die Aufträge bringen',
            },
            {
              label: 'Prozesse',
              value: 'Strukturiert statt chaotisch',
              hint: 'Zeiten, Aufträge, Daten am richtigen Ort',
            },
            {
              label: 'Partnerschaft',
              value: 'Persönlich & nah',
              hint: 'Wir sprechen Ihre Sprache — nicht nur IT-Slang',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-navy-950/40 p-5 backdrop-blur-sm"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-tech-400/90">
                {item.label}
              </p>
              <p className="mt-2 font-display text-lg font-semibold text-white">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-craft-400">{item.hint}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
