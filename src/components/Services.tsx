import { motion } from 'framer-motion'
import {
  Globe,
  LayoutTemplate,
  LineChart,
  Palette,
  Printer,
  Search,
  Smartphone,
  Target,
  Workflow,
} from 'lucide-react'
import { SpotlightCard } from './home/tech/SpotlightCard'
import { fadeInUp, staggerContainer } from '../lib/motion'

const blocks = [
  {
    title: 'Websites & Online-Sichtbarkeit',
    subtitle:
      'Ihr Auftritt soll nicht nur gut aussehen — er soll gefunden werden und Besucher zur Anfrage führen. Dazu gehören klare Seitenstruktur, saubere Technik, Suchmaschinenoptimierung (SEO) und — wenn Sie möchten — die Einbindung von Google Ads mit messbaren Zielen und sinnvollem Tracking.',
    icon: Globe,
    items: [
      {
        icon: LayoutTemplate,
        title: 'Webdesign & Struktur',
        text:
          'Landingpages und mehrseitige Sites mit durchdachtem Aufbau, schnellen Ladezeiten und sauberem Aufbau für Suchmaschinen und Nutzer.',
      },
      {
        icon: Search,
        title: 'SEO & Auffindbarkeit',
        text:
          'Technische Grundlagen, sinnvolle Überschriften und Inhalte, die zu Ihren Suchanfragen passen — damit Google versteht, worum es bei Ihnen geht.',
      },
      {
        icon: Target,
        title: 'Google Ads & Anbindung',
        text:
          'Anzeigen-Kampagnen strukturieren, Zielseiten abstimmen und Conversions messbar machen — abgestimmt auf Budget und Zielgruppe.',
      },
      {
        icon: Smartphone,
        title: 'Geräte & Performance',
        text:
          'Optimiert für Mobilgeräte und Desktop — damit Nutzer überall ein gutes Erlebnis haben.',
      },
    ],
  },
  {
    title: 'Maßgeschneiderte digitale Lösungen',
    subtitle:
      'Wenn Standardsoftware an Grenzen stößt, entwickeln wir Funktionen und Oberflächen, die zu Ihrem Alltag passen — von internen Übersichten bis zu speziellen Abläufen. Ohne vorgefertigte Produktnamen: wir hören zu und bauen, was wirklich gebraucht wird.',
    icon: Workflow,
    items: [
      {
        icon: LineChart,
        title: 'Individuelle Anwendungen',
        text:
          'Weboberflächen und kleine Systeme, die Ihre Daten und Prozesse zusammenführen — verständlich für Ihr Team.',
      },
      {
        icon: Workflow,
        title: 'Prozesse statt Insellösungen',
        text:
          'Weniger Doppelarbeit: wir denken Abläufe mit und verbinden, was zusammengehört — im Rahmen Ihrer technischen Möglichkeiten.',
      },
    ],
  },
  {
    title: 'Media Design & Print',
    subtitle:
      'Ein stimmiges Erscheinungsbild endet nicht am Bildschirm. Wir gestalten Drucksachen und Werbemittel, die optisch zu Ihrer Website und Marke passen — vom Flyer über den Messeauftritt bis zu Vorlagen für Social Media.',
    icon: Palette,
    items: [
      {
        icon: Printer,
        title: 'Print & Werbemittel',
        text:
          'Flyer, Folder, Plakate oder Angebotsvorlagen — einheitlich mit Ihrer Website und Ihren Farben.',
      },
      {
        icon: Palette,
        title: 'Einheitliche Marke',
        text:
          'Schrift, Farben und Bildsprache konsistent führen — online und offline erkennbar.',
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
            Web, Sichtbarkeit, individuelle Umsetzungen und Media — aus einer
            Hand, damit Ihr Auftritt zusammenpasst.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {blocks.map((block, bi) => (
            <motion.div
              key={block.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeInUp}
              custom={bi}
            >
              <SpotlightCard
                className="flex h-full flex-col p-6 shadow-card sm:p-8"
                showDemoLabel={false}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gallery-line bg-gallery-bg text-stone-700 dark:text-stone-300">
                    <block.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-gallery-ink sm:text-xl">
                      {block.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-shell-muted">
                      {block.subtitle}
                    </p>
                  </div>
                </div>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="mt-8 flex flex-1 flex-col space-y-5 border-t border-gallery-line pt-8"
                >
                  {block.items.map((item, ii) => (
                    <motion.li
                      key={item.title}
                      custom={bi * 4 + ii}
                      variants={fadeInUp}
                      className="flex gap-3"
                    >
                      <span className="mt-0.5 shrink-0 text-stone-500 dark:text-stone-400">
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
