import { motion } from 'framer-motion'
import { Layers, Users } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../../lib/motion'
import { CursorGlow } from './tech/CursorGlow'

const items = [
  {
    Icon: Users,
    title: 'Persönlich',
    text: 'Wir stehen für eine ehrliche, individuelle Beratung und eine persönliche Zusammenarbeit, die sich gut anfühlt.',
  },
  {
    Icon: Layers,
    title: 'Alles aus einer Hand',
    text: 'Ein Ansprechpartner für alles rund um Ihre Website — von der ersten Frage bis zum laufenden Betrieb.',
  },
]

export function HomePromise() {
  return (
    <section
      id="unser-versprechen"
      className="border-b border-gallery-line bg-gallery-bg py-20 sm:py-28 dark:bg-stone-900"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <div className="flex items-center gap-4 border-b border-gallery-line pb-8">
            <motion.p
              custom={0}
              variants={fadeInUp}
              className="text-xs font-medium uppercase tracking-widest text-shell-muted"
            >
              Unser Versprechen
            </motion.p>
          </div>

          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-10 max-w-2xl font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl"
          >
            Auf Augenhöhe — direkte Kommunikation, kurze Wege.
          </motion.h2>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {items.map((item, i) => (
              <motion.li key={item.title} custom={i} variants={fadeInUp}>
                <CursorGlow className="h-full rounded-xl border border-gallery-line bg-gallery-surface">
                  <div className="flex gap-5 px-6 py-6">
                    <span className="mt-0.5 shrink-0 text-gallery-ink">
                      <item.Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-gallery-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-shell-muted">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </CursorGlow>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
