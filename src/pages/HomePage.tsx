import { Hero } from '../components/Hero'

export function HomePage() {
  return (
    <>
      <Hero />
      <section className="border-t border-gallery-line bg-gallery-surface py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-gallery-muted">
            Web & Software — zurückhaltend gestaltet, klar in der Aussage.
          </p>
        </div>
      </section>
    </>
  )
}
