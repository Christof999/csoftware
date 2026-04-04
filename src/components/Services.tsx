import { motion } from 'framer-motion'
import {
  BarChart3,
  Clock,
  Globe,
  LayoutTemplate,
  Smartphone,
  Workflow,
} from 'lucide-react'
import { fadeInUp, staggerContainer } from '../lib/motion'

const blocks = [
  {
    title: 'Webdesign & Landing Pages',
    subtitle:
      'Schnelle, präzise Oberflächen — damit Besucher verstehen, was Sie anbieten, und den nächsten Schritt gehen.',
    icon: Globe,
    items: [
      {
        icon: LayoutTemplate,
        title: 'Struktur',
        text: 'Inhalte, Referenzen, Kontakt — logisch geführt, ohne Ballast.',
      },
      {
        icon: Smartphone,
        title: 'Überall stark',
        text: 'Vom ersten Pixel an für Mobilgeräte gedacht — schnell und lesbar.',
      },
    ],
  },
  {
    title: 'Individuelle Software',
    subtitle:
      'Wenn Standardtools nicht passen: interne Tools, Dashboards und Workflows — so, dass Ihr Team sie wirklich nutzt.',
    icon: Workflow,
    items: [
      {
        icon: Clock,
        title: 'Zeit & Einsätze',
        text: 'Erfassungen, die im Alltag funktionieren — mit klaren Summen.',
      },
      {
        icon: BarChart3,
        title: 'Daten & Übersicht',
        text: 'Komplexität reduzieren: KPIs, Aufträge, Bestände — an einem Ort.',
      },
    ],
  },
]

export function Services() {
  return (
    <section className="border-b border-white/[0.06] bg-gallery-bg py-20 sm:py-24">
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
            Leistungen
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Von der Oberfläche bis ins System
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 text-lg text-zinc-400"
          >
            Zwei Schwerpunkte — ein Anspruch: klare UX, saubere Technik, messbarer
            Fortschritt.
          </motion.p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {blocks.map((block, bi) => (
            <motion.article
              key={block.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={staggerContainer}
              className="rounded-2xl border border-white/[0.08] bg-gallery-elevated/90 p-8 shadow-panel backdrop-blur-sm sm:p-10"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-indigo-300">
                  <block.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-zinc-400">{block.subtitle}</p>
                </div>
              </div>
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="mt-10 space-y-6"
              >
                {block.items.map((item, ii) => (
                  <motion.li
                    key={item.title}
                    custom={bi * 2 + ii}
                    variants={fadeInUp}
                    className="flex gap-4 border-t border-white/[0.06] pt-6 first:border-t-0 first:pt-0"
                  >
                    <span className="mt-0.5 text-zinc-500">
                      <item.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    <div>
                      <p className="font-medium text-white">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                        {item.text}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
