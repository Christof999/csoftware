import { Hero } from '../components/Hero'

export function HomePage() {
  return (
    <>
      <Hero />
      <section className="border-t border-gallery-line bg-gallery-bg py-14">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm leading-relaxed text-stone-600">
            Ob neuer Auftritt oder eine kleine Anwendung im Hintergrund: Sie
            erhalten etwas, das zu Ihnen passt — und das Sie gern weitergeben.
          </p>
        </div>
      </section>
    </>
  )
}
