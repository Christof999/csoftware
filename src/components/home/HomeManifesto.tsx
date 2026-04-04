import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../lib/motion'

export function HomeManifesto() {
  return (
    <section className="border-b border-gallery-line bg-gallery-bg py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <motion.h2
            custom={0}
            variants={fadeInUp}
            className="font-display text-2xl font-semibold leading-snug tracking-tight text-gallery-ink sm:text-3xl sm:leading-tight"
          >
            Schneller live. Ruhig wachsen. Klar messbar.
          </motion.h2>
          <motion.p
            custom={1}
            variants={fadeInUp}
            className="mt-6 text-base leading-relaxed text-shell-muted sm:text-lg"
          >
            Wir verbinden Strategie, Gestaltung und Technik in einem durchgängigen
            Ablauf — nicht als lose Einzelteile. So wird aus Ihrer Idee eine
            Website, die zu Ihrer Marke passt und im Alltag wartbar bleibt.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
