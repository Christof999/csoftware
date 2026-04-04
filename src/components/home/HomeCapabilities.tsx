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
    <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <div className="border-b border-gallery-line pb-8">
            <motion.p
              custom={0}
              variants={fadeInUp}
              className="text-xs font-medium uppercase tracking-widest text-shell-muted"
            >
              Leistungsfeld
            </motion.p>
          </div>

          <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-20">
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl sm:min-w-[220px]"
            >
              Das können wir für Sie abdecken
            </motion.h2>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={staggerContainer}
              className="flex flex-wrap gap-2 sm:gap-2.5"
            >
              {tags.map((tag, i) => (
                <motion.li key={tag} custom={i} variants={fadeInUp}>
                  <span className="inline-block rounded-full border border-gallery-line bg-gallery-bg px-4 py-2 text-xs font-medium text-gallery-ink transition-colors hover:border-stone-400 cursor-default sm:text-sm dark:hover:border-stone-600">
                    {tag}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
