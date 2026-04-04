import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp } from '../lib/motion'
import { HeroPreview } from './HeroPreview'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-gallery-bg">
      <div
        className="pointer-events-none absolute inset-0 bg-mesh"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid [background-size:24px_24px] opacity-[0.35]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="max-w-xl"
          >
            <motion.p
              custom={0}
              variants={fadeInUp}
              className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400"
            >
              Software Studio
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeInUp}
              className="mt-6 font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              Klar. Schnell.{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-white to-cyan-200 bg-clip-text text-transparent">
                Lieferbar.
              </span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-6 text-lg leading-relaxed text-zinc-400"
            >
              Wir entwickeln Websites und Software, die sich wie ein gutes Tool
              anfühlen: ruhig, präzise, ohne Überladung — für Teams, die liefern
              wollen.
            </motion.p>
            <motion.div
              custom={3}
              variants={fadeInUp}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                to="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-indigo-400"
              >
                Projekt starten
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/arbeiten"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/[0.18] hover:bg-white/[0.06]"
              >
                Arbeiten
              </Link>
            </motion.div>
          </motion.div>

          <HeroPreview />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-20 grid gap-4 sm:grid-cols-3"
        >
          {[
            {
              t: 'Ruhige UI',
              d: 'Weniger Lärm, mehr Orientierung — damit Entscheidungen leichter fallen.',
            },
            {
              t: 'Tempo',
              d: 'Schnelle Builds, klare Schnitte — von der Idee bis zum Release.',
            },
            {
              t: 'Partnerschaft',
              d: 'Direkter Draht, ehrliche Priorität — ohne Buzzword-Bingo.',
            },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-xl border border-white/[0.06] bg-gallery-elevated/80 p-5 backdrop-blur-sm"
            >
              <p className="text-[11px] font-medium uppercase tracking-wider text-indigo-300/90">
                {item.t}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.d}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
