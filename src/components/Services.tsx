import { motion } from 'framer-motion'
import {
  BarChart3,
  Clock,
  Globe,
  LayoutTemplate,
  Smartphone,
  Workflow,
} from 'lucide-react'
import { SpotlightCard } from './home/tech/SpotlightCard'
import { fadeInUp, staggerContainer } from '../lib/motion'

const blocks = [
  {
    title: 'Website & Landingpages',
    subtitle:
      'Texte, Bilder und Aufbau so, dass Besucher in wenigen Sekunden verstehen, wer Sie sind und wie Sie helfen.',
    icon: Globe,
    items: [
      {
        icon: LayoutTemplate,
        title: 'Gute Struktur',
        text: 'Leistungen und Kontakt finden — ohne suchen zu müssen.',
      },
      {
        icon: Smartphone,
        title: 'Handy & Computer',
        text: 'Lesbar und bedienbar, egal welches Gerät gerade zur Hand ist.',
      },
    ],
  },
  {
    title: 'Maßgeschneiderte Software',
    subtitle:
      'Wenn Fertiglösungen nicht passen: kleine Programme und Übersichten, die zu Ihrem Alltag passen.',
    icon: Workflow,
    items: [
      {
        icon: Clock,
        title: 'Zeiten & Termine',
        text: 'Erfassung, die im Alltag mitgeht — ohne komplizierte Schulungen.',
      },
      {
        icon: BarChart3,
        title: 'Daten im Blick',
        text: 'Aufträge, Bestände oder Kunden — übersichtlich statt verstreut.',
      },
    ],
  },
]

export function Services() {
  return (
    <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-24">
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
            className="text-sm font-medium text-shell-muted"
          >
            Leistungen
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-gallery-ink sm:text-4xl"
          >
            Womit wir Ihnen helfen
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 text-lg text-shell-muted"
          >
            Zwei Schwerpunkte — immer mit dem Ziel, dass Sie und Ihre Kunden
            sich zurechtfinden.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {blocks.map((block, bi) => (
            <motion.div
              key={block.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeInUp}
              custom={bi}
            >
              <SpotlightCard className="p-8 shadow-card sm:p-10" showDemoLabel={false}>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gallery-line bg-gallery-bg text-stone-700 dark:text-stone-300">
                    <block.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-gallery-ink">
                      {block.title}
                    </h3>
                    <p className="mt-3 text-shell-muted">{block.subtitle}</p>
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
                      <span className="mt-0.5 text-stone-500 dark:text-stone-400">
                        <item.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                      </span>
                      <div>
                        <p className="font-medium text-gallery-ink">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-shell-muted">
                          {item.text}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
