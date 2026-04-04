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
      'Klare Struktur, schnelle Ladezeiten — damit Kundinnen und Kunden Sie finden und verstehen.',
    icon: Globe,
    items: [
      {
        icon: LayoutTemplate,
        title: 'Auftritt',
        text: 'Leistungen, Referenzen, Kontakt — übersichtlich gebündelt.',
      },
      {
        icon: Smartphone,
        title: 'Überall nutzbar',
        text: 'Vom Smartphone bis zum Büro: lesbar und bedienbar.',
      },
    ],
  },
  {
    title: 'Individuelle Softwarelösungen',
    subtitle:
      'Wenn Standardtools nicht reichen: Zeiterfassung, Übersichten, ERP — passend zu Ihrem Betrieb.',
    icon: Workflow,
    items: [
      {
        icon: Clock,
        title: 'Zeiterfassung',
        text: 'Erfassung, die im Alltag mitgeht — mit klaren Summen.',
      },
      {
        icon: BarChart3,
        title: 'ERP & Daten',
        text: 'Aufträge und Material im Blick — ohne Tabellen-Chaos.',
      },
    ],
  },
]

export function Services() {
  return (
    <section className="border-b border-gallery-line bg-gallery-bg py-20 sm:py-24">
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
            Leistungen
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-gallery-ink sm:text-4xl"
          >
            Was wir für Handwerksbetriebe tun
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 text-lg text-stone-600"
          >
            Zwei Bereiche — ein Anspruch: ruhige Oberflächen, die im Betrieb
            wirklich helfen.
          </motion.p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {blocks.map((block, bi) => (
            <motion.article
              key={block.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={staggerContainer}
              className="border border-gallery-line bg-gallery-surface p-8 sm:p-10"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gallery-line text-gallery-ink">
                  <block.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-gallery-ink">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-stone-600">{block.subtitle}</p>
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
                    className="flex gap-4 border-t border-gallery-line pt-6 first:border-t-0 first:pt-0"
                  >
                    <span className="mt-0.5 text-gallery-muted">
                      <item.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    <div>
                      <p className="font-medium text-gallery-ink">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">
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
