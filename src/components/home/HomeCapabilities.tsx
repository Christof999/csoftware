import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../lib/motion'

const tags = [
  'Webdesign & Landingpages',
  'Technische SEO & Inhalte',
  'Google Ads & Conversion-Tracking',
  'Corporate Websites',
  'Maßgeschneiderte Web-Anwendungen',
  'Media Design & Print',
  'Flyer, Folder & Werbemittel',
  'Social-Media-Vorlagen',
  'Wartung & Weiterentwicklung',
]

export function HomeCapabilities() {
  return (
    <section className="border-b border-gallery-line bg-gallery-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            custom={0}
            variants={fadeInUp}
            className="text-sm font-medium text-shell-muted"
          >
            Leistungsfeld
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl"
          >
            Das können wir für Sie abdecken
          </motion.h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {tags.map((tag, i) => (
            <motion.li key={tag} custom={i} variants={fadeInUp}>
              <span className="inline-block rounded-full border border-gallery-line bg-gallery-bg px-4 py-2 text-xs font-medium text-gallery-ink sm:text-sm">
                {tag}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
