import { motion } from 'framer-motion'
import { Layers, MousePointer2, Sparkles } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../../lib/motion'
import { CursorGlowDemo } from './tech/CursorGlowDemo'
import { SpotlightCard } from './tech/SpotlightCard'
import { TiltCard } from './tech/TiltCard'

export function HomeTechShowcase() {
  return (
    <section className="border-b border-gallery-line bg-gallery-surface py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            custom={0}
            variants={fadeInUp}
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-gallery-line bg-gallery-bg text-gallery-ink"
          >
            <Sparkles className="h-5 w-5" strokeWidth={1.5} aria-hidden />
          </motion.div>
          <motion.p
            custom={1}
            variants={fadeInUp}
            className="mt-4 text-sm font-medium text-shell-muted"
          >
            Web-Technik im Erlebnis
          </motion.p>
          <motion.h2
            custom={2}
            variants={fadeInUp}
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl"
          >
            Was heute möglich ist — zum Anfassen
          </motion.h2>
          <motion.p
            custom={3}
            variants={fadeInUp}
            className="mt-4 text-base text-shell-muted"
          >
            Moderne Websites nutzen kleine, gezielte Effekte: Bewegung im
            Scroll, Licht folgt der Maus, Karten reagieren räumlich. Hier drei
            fertige Bausteine — so können wir Ihre Seite erlebbar machen.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          <motion.div custom={0} variants={fadeInUp} className="lg:col-span-1">
            <SpotlightCard
              title="Spotlight bei Hover"
              description="Ein weiches Licht folgt dem Cursor — wirkt hochwertig und lenkt die Aufmerksamkeit ohne zu schreien."
            />
          </motion.div>
          <motion.div custom={1} variants={fadeInUp} className="lg:col-span-1">
            <TiltCard
              title="3D-Tilt"
              description="Die Karte neigt sich leicht in Richtung Maus — ein klassischer Effekt für Produkt- und Referenzkarten."
            />
          </motion.div>
          <motion.div custom={2} variants={fadeInUp} className="lg:col-span-1">
            <CursorGlowDemo />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          variants={fadeInUp}
          custom={0}
          className="mt-10"
        >
          <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-wider text-shell-muted">
            Scroll-Animation
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gallery-line">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, margin: '-10px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gallery-ink dark:bg-stone-200"
            />
          </div>
          <p className="mt-2 text-center text-xs text-shell-muted">
            Balken füllt sich, sobald der Bereich sichtbar wird — typisch für
            Storytelling und KPI-Zeilen.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          variants={staggerContainer}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-shell-muted"
        >
          <motion.li custom={0} variants={fadeInUp} className="flex items-center gap-1.5">
            <MousePointer2 className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            React + Motion
          </motion.li>
          <motion.li custom={1} variants={fadeInUp} className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            CSS-Variablen &amp; Transforms
          </motion.li>
          <motion.li custom={2} variants={fadeInUp}>
            Respektiert „weniger Bewegung“ im System
          </motion.li>
        </motion.ul>
      </div>
    </section>
  )
}
