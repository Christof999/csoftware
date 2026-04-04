import { motion } from 'framer-motion'
import { CalendarClock, MessageSquare, ShieldCheck } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../../lib/motion'

const items = [
  {
    icon: MessageSquare,
    title: 'Klare Kommunikation',
    text:
      'Sie wissen, was als Nächstes passiert — ohne versteckte Schritte oder Überraschungen.',
  },
  {
    icon: CalendarClock,
    title: 'Verlässliche Meilensteine',
    text:
      'Abgestimmte Etappen statt endloser Schleifen — Sie behalten den Überblick.',
  },
  {
    icon: ShieldCheck,
    title: 'Partnerschaftlich',
    text:
      'Wir hören zu, priorisieren ehrlich und setzen um, was für Ihr Projekt wirklich zählt.',
  },
]

export function HomeTrust() {
  return (
    <section className="border-b border-gallery-line bg-gallery-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid gap-8 sm:grid-cols-3"
        >
          {items.map((item, i) => (
            <motion.li key={item.title} custom={i} variants={fadeInUp}>
              <item.icon className="h-6 w-6 text-gallery-ink" strokeWidth={1.25} aria-hidden />
              <h3 className="mt-4 font-display text-base font-semibold text-gallery-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-shell-muted">
                {item.text}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
