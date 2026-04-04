import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../lib/motion'
import { CursorGlow } from './tech/CursorGlow'

const steps = [
  {
    n: '01',
    title: 'Kennenlernen',
    text:
      'Wir klären Ziele, Zielgruppe und Budget — in einem Gespräch, das Sie verstehen.',
  },
  {
    n: '02',
    title: 'Konzept & Struktur',
    text:
      'Seitenaufbau, Texte und Bildideen — damit nichts dem Zufall überlassen bleibt.',
  },
  {
    n: '03',
    title: 'Design',
    text:
      'Ein Look, der zu Ihnen passt: Farben, Typografie, erster Eindruck.',
  },
  {
    n: '04',
    title: 'Umsetzung',
    text:
      'Die Website wird gebaut, getestet und für Mobilgeräte optimiert.',
  },
  {
    n: '05',
    title: 'Launch & Begleitung',
    text:
      'Go-live mit Checkliste — und Unterstützung, wenn Sie etwas anpassen möchten.',
  },
]

export function HomeProcess() {
  return (
    <section
      id="ablauf"
      className="border-b border-gallery-line bg-gallery-surface py-16 sm:py-20"
    >
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
            Ablauf
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl"
          >
            Von der Idee bis zur fertigen Website
          </motion.h2>
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="mt-10 space-y-4"
        >
          {steps.map((step, i) => (
            <motion.li key={step.n} custom={i} variants={fadeInUp}>
              <CursorGlow className="rounded-xl border border-gallery-line bg-gallery-bg">
                <div className="flex gap-6 px-4 py-5 sm:gap-10 sm:px-6">
                  <span className="shrink-0 font-mono text-sm font-medium text-shell-muted">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-gallery-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-shell-muted">
                      {step.text}
                    </p>
                  </div>
                </div>
              </CursorGlow>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
