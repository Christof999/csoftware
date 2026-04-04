import { motion } from 'framer-motion'
import { Eye, MessageCircle, Zap } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../../lib/motion'
import { SpotlightCard } from './tech/SpotlightCard'

const items = [
  {
    icon: Eye,
    title: 'Mehr Sichtbarkeit',
    text: 'Klare Struktur und verständliche Texte — damit Sie online besser gefunden werden und Besucher wissen, worum es geht.',
  },
  {
    icon: MessageCircle,
    title: 'Mehr Anfragen',
    text: 'Gute Führung: vom ersten Eindruck bis zum Kontakt — ohne dass sich Besucher verlaufen.',
  },
  {
    icon: Zap,
    title: 'Mehr Tempo im Alltag',
    text: 'Schnelle Ladezeiten und ein Auftritt, der auf dem Handy genauso funktioniert wie am Schreibtisch.',
  },
]

export function HomeValueProps() {
  return (
    <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-3 sm:gap-8"
        >
          {items.map((item, i) => (
            <motion.li key={item.title} custom={i} variants={fadeInUp}>
              <SpotlightCard className="h-full p-6 sm:p-8" showDemoLabel={false}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gallery-line bg-gallery-bg text-gallery-ink">
                  <item.icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-gallery-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-shell-muted">
                  {item.text}
                </p>
              </SpotlightCard>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
