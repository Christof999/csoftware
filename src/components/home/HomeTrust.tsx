import { motion } from 'framer-motion'
import { Package, Settings2, ShieldCheck } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../../lib/motion'

const items = [
  {
    Icon: Settings2,
    n: '01',
    title: 'Einfache Wartbarkeit',
    text: 'In einer Welt voller KI-Tools behalten Sie die Kontrolle. Ihr System bleibt schlank, verständlich und ohne überflüssige Abhängigkeiten — damit Änderungen keine Woche dauern.',
  },
  {
    Icon: ShieldCheck,
    n: '02',
    title: 'Sicheres Hosting',
    text: 'Kein überfülltes Shared-Hosting, keine versteckten Risiken. Ihr Auftritt liegt schnell, stabil und mit klarer Verantwortung — von uns betrieben, nicht irgendwo.',
  },
  {
    Icon: Package,
    n: '03',
    title: 'Alles aus einer Hand',
    text: 'Von der ersten Idee bis zum laufenden Betrieb: Design, Code, Hosting und Wartung — ohne Schnittstellenprobleme zwischen Agenturen und Anbietern.',
  },
]

export function HomeTrust() {
  return (
    <section className="border-b border-gallery-line bg-gallery-bg py-20 sm:py-28">
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
              Im KI-Zeitalter
            </motion.p>
          </div>

          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-10 font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl"
          >
            Was uns auszeichnet — heute mehr denn je
          </motion.h2>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-12"
          >
            {items.map((item, i) => (
              <motion.li key={item.title} custom={i} variants={fadeInUp}>
                <div className="flex items-start gap-5">
                  <span className="font-mono text-xs text-shell-subtle mt-0.5 shrink-0 w-5 select-none">
                    {item.n}
                  </span>
                  <div>
                    <item.Icon
                      className="h-5 w-5 text-gallery-ink mb-4"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <h3 className="font-display text-base font-semibold text-gallery-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-shell-muted">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
