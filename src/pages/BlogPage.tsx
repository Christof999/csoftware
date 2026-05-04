import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { fadeInUp, staggerContainer } from '../lib/motion'
import { SITE_NAME, SORO_EMBED_SCRIPT_SRC } from '../site'

const SORO_SCRIPT_ID = 'soro-blog-embed-script'

export function BlogPage() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    const inject = () => {
      if (cancelled) return
      document.getElementById(SORO_SCRIPT_ID)?.remove()
      const script = document.createElement('script')
      script.id = SORO_SCRIPT_ID
      script.src = SORO_EMBED_SCRIPT_SRC
      script.defer = true
      document.body.appendChild(script)
    }

    inject()

    return () => {
      cancelled = true
      document.getElementById(SORO_SCRIPT_ID)?.remove()
      const el = mountRef.current
      if (el) el.replaceChildren()
    }
  }, [])

  return (
    <div>
      <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p
              custom={0}
              variants={fadeInUp}
              className="text-xs font-medium uppercase tracking-widest text-shell-muted"
            >
              Insights
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeInUp}
              className="mt-6 font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl"
            >
              Blog
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-6 text-base leading-relaxed text-shell-muted"
            >
              Neuigkeiten zu Webdesign, SEO und digitalen Themen aus der Praxis von{' '}
              {SITE_NAME}.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-gallery-bg py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div ref={mountRef} id="soro-blog" />
        </div>
      </section>
    </div>
  )
}
