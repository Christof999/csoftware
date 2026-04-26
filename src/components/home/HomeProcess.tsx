import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../lib/motion'
import { HOME_PROCESS_STEPS } from '../../seo/homeProcessSteps'
import { CursorGlow } from './tech/CursorGlow'

const steps = HOME_PROCESS_STEPS.map((s, i) => ({
  n: String(i + 1).padStart(2, '0'),
  title: s.name,
  text: s.text,
}))

export function HomeProcess() {
  return (
    <section
      id="ablauf"
      className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28"
    >
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
              Ablauf
            </motion.p>
          </div>

          <motion.h2
            custom={1}
            variants={fadeInUp}
            className="mt-10 font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl"
          >
            Von der Idee bis zur fertigen Website
          </motion.h2>
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="mt-12 space-y-3"
        >
          {steps.map((step, i) => (
            <motion.li key={step.n} custom={i} variants={fadeInUp}>
              <CursorGlow className="rounded-xl border border-gallery-line bg-gallery-bg">
                <div className="flex items-start gap-8 px-6 py-6 sm:gap-12 sm:px-8">
                  <span className="shrink-0 font-mono text-xs font-medium text-shell-subtle pt-0.5 w-6">
                    {step.n}
                  </span>
                  <div className="flex-1 sm:flex sm:items-baseline sm:justify-between sm:gap-10">
                    <h3 className="font-display text-base font-semibold text-gallery-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-shell-muted sm:mt-0 sm:max-w-md sm:text-right">
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
