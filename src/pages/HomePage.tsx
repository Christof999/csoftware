import { Hero } from '../components/Hero'

export function HomePage() {
  return (
    <>
      <Hero />
      <section className="border-t border-white/[0.06] bg-gallery-surface py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-zinc-400">
            Web & Produkte — mit der Ruhe von Linear, der Klarheit von gutem
            Design.
          </p>
        </div>
      </section>
    </>
  )
}
