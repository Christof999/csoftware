import { motion } from 'framer-motion'
import { Film, Image as ImageIcon } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../../lib/motion'

const videos = [
  {
    title: 'Kurz-Loop (15–30 Sek.)',
    text:
      'Ihre Website auf einem Laptop oder Tablet — z. B. in einem hellen Büro oder Café. Wirkt lebendig und „echt“.',
  },
  {
    title: 'Screen-Recording',
    text:
      'Sanftes Scrollen durch Ihre Startseite: Hero, Leistungen, Kontakt. Ideal als stummer Hintergrund im Hero.',
  },
  {
    title: 'Team oder Arbeitsplatz',
    text:
      'Kurze Szenen von Ihnen oder Ihrem Team am Arbeitsplatz — Vertrauen durch echte Menschen (mit Einwilligung).',
  },
]

const images = [
  {
    title: 'Projekt-Screenshots',
    text:
      'Echte Ausschnitte aus fertigen Websites — am besten Desktop und Mobil. Legen Sie sie unter „Beispiele“ ab.',
  },
  {
    title: 'Hero-Fotos',
    text:
      'Hochwertige Fotos von Ihrem Betrieb, Produkten oder Region — statt generischer Stockbilder, wo möglich.',
  },
  {
    title: 'Icons & Illustrationen',
    text:
      'Einheitliche kleine Grafiken für Leistungen — wirkt aufgeräumt und professionell.',
  },
]

export function HomeMediaIdeas() {
  return (
    <section className="border-b border-gallery-line bg-gallery-bg py-16 sm:py-24">
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
            Ideen für Ihre Seite
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl"
          >
            Videos & Bilder, die wir einbauen können
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeInUp}
            className="mt-4 text-base text-shell-muted"
          >
            Keine Pflicht — nur Inspiration. So zeigen Sie Besuchern, was alles
            möglich ist: von ruhigen Fotos bis zu kurzen Bewegtbildern.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="mb-6 flex items-center gap-2 text-gallery-ink">
              <Film className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              <h3 className="font-display text-lg font-semibold">Video</h3>
            </div>
            <ul className="space-y-6">
              {videos.map((v, i) => (
                <motion.li key={v.title} custom={i} variants={fadeInUp}>
                  <p className="font-medium text-gallery-ink">{v.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-shell-muted">
                    {v.text}
                  </p>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-stone-400 dark:text-stone-500">
              Technisch: MP4 (H.264), möglichst unter 5 MB für kurze Loops;
              optional WebM. Ohne Ton oder mit lizenzfreier Musik.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="mb-6 flex items-center gap-2 text-gallery-ink">
              <ImageIcon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              <h3 className="font-display text-lg font-semibold">Bilder</h3>
            </div>
            <ul className="space-y-6">
              {images.map((img, i) => (
                <motion.li key={img.title} custom={i} variants={fadeInUp}>
                  <p className="font-medium text-gallery-ink">{img.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-shell-muted">
                    {img.text}
                  </p>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-stone-400 dark:text-stone-500">
              Format: WebP oder JPEG, ausreichend groß für Retina (z. B. 1600 px
              Breite für Hero). Wir optimieren beim Einbau.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
