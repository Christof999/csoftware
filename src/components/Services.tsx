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
      'Erster Eindruck zählt: klare Struktur, starke Bilder, schnelle Ladezeiten — damit Kundinnen und Kunden Sie sofort verstehen und kontaktieren.',
    icon: Globe,
    accent: 'from-tech-500/20 to-tech-600/5',
    items: [
      {
        icon: LayoutTemplate,
        title: 'Auftritt, der wirkt',
        text: 'Strukturierte Seiten für Leistungen, Referenzen und Kontakt — ohne Überfrachtung.',
      },
      {
        icon: Smartphone,
        title: 'Mobile zuerst',
        text: 'Ob Smartphone auf der Baustelle oder PC im Büro: alles bleibt lesbar und bedienbar.',
      },
    ],
  },
  {
    title: 'Individuelle Softwarelösungen',
    subtitle:
      'Wenn Standardtools an Grenzen stoßen: wir bauen digitale Hilfen, die zu Ihrem Alltag passen — von der Zeiterfassung bis zu übersichtlichen Übersichten für Ihr Team.',
    icon: Workflow,
    accent: 'from-forest-600/25 to-navy-800/30',
    items: [
      {
        icon: Clock,
        title: 'Zeiterfassung & Einsatzplanung',
        text: 'Erfassung, die nicht nervt — damit Stunden und Einsätze nachvollziehbar bleiben.',
      },
      {
        icon: BarChart3,
        title: 'ERP & Daten im Griff',
        text: 'Material, Aufträge, Kunden: komplexe Informationen so aufbereitet, dass Entscheidungen leichter fallen.',
      },
    ],
  },
]

export function Services() {
  return (
    <section
      id="leistungen"
      className="scroll-mt-24 border-b border-white/5 bg-craft-950 py-24"
    >
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
            Leistungen
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Digitalisierung, die sich für Handwerksbetriebe lohnt
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 text-lg text-craft-300"
          >
            Zwei Schwerpunkte — ein Ziel: mehr Ruhe im Tagesgeschäft und eine
            professionelle Außenwirkung.
          </motion.p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {blocks.map((block, bi) => (
            <motion.article
              key={block.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${block.accent} p-8 shadow-xl shadow-black/20`}
            >
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
              <div className="relative">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-craft-950/60 text-tech-400">
                    <block.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                      {block.title}
                    </h3>
                    <p className="mt-3 text-craft-300">{block.subtitle}</p>
                  </div>
                </div>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={staggerContainer}
                  className="mt-8 space-y-6"
                >
                  {block.items.map((item, ii) => (
                    <motion.li
                      key={item.title}
                      custom={bi * 2 + ii}
                      variants={fadeInUp}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-craft-950/50 p-4 backdrop-blur-sm"
                    >
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900/80 text-gold-400">
                        <item.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-craft-400">
                          {item.text}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
