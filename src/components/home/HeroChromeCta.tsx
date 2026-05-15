import { ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookieConsent } from '../../consent/useCookieConsent'
import { usePrefersReducedMotion } from './tech/usePrefersReducedMotion'

/**
 * Primär-CTA im Hero: Chrom-Optik mit optionalem Kamera-Spiegel-Effekt.
 * Kamera nur bei Einwilligung (Cookie-Kategorie `camera`) und ohne
 * „prefers-reduced-motion“. Bei Verweigerung oder Fehler: statisches Metall.
 */
export function HeroChromeCta({ to }: { to: string }) {
  const { preferences, hasDecided } = useCookieConsent()
  const reduced = usePrefersReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [streamOk, setStreamOk] = useState(false)
  const streamRef = useRef<MediaStream | null>(null)

  const stopStream = useCallback(() => {
    for (const t of streamRef.current?.getTracks() ?? []) {
      t.stop()
    }
    streamRef.current = null
    setStreamOk(false)
    const v = videoRef.current
    if (v) v.srcObject = null
  }, [])

  const tryCamera =
    hasDecided && preferences.camera && !reduced && typeof navigator !== 'undefined'

  useEffect(() => {
    if (!tryCamera || !navigator.mediaDevices?.getUserMedia) {
      stopStream()
      return
    }

    let cancelled = false

    async function run() {
      try {
        // Kurz warten, bis der Cookie-Dialog zu ist — sonst kann der Browser-Prompt
        // leicht übersehen werden oder hinter dem Overlay hängen.
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, 400)
        })
        if (cancelled) return

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 480 } },
          audio: false,
        })
        if (cancelled) {
          for (const t of stream.getTracks()) t.stop()
          return
        }
        streamRef.current = stream
        const v = videoRef.current
        if (v) {
          v.srcObject = stream
          await v.play().catch(() => {})
        }
        if (!cancelled) setStreamOk(true)
      } catch {
        if (!cancelled) stopStream()
      }
    }

    void run()
    return () => {
      cancelled = true
      stopStream()
    }
  }, [tryCamera, stopStream])

  return (
    <Link
      to={to}
      className="group relative inline-flex min-h-[3rem] select-none items-center justify-center gap-2 overflow-hidden rounded-full border border-white/35 px-7 py-3 text-sm font-semibold tracking-tight text-neutral-800 shadow-[0_10px_28px_-6px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.55)] transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:shadow-[0_14px_36px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.65)] active:scale-[0.99] dark:border-white/12 dark:text-neutral-100 dark:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.14)] dark:hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.18)]"
    >
      {/* Statische Metallfläche (immer) */}
      <span
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(128deg,#ececec_0%,#b4b4b4_18%,#f6f6f6_38%,#9d9d9d_55%,#e4e4e4_72%,#c0c0c0_100%)] dark:bg-[linear-gradient(128deg,#5c5c5c_0%,#3a3a3a_22%,#6b6b6b_42%,#2f2f2f_58%,#555_78%,#404040_100%)]"
      />

      {/* Kamera-Feed: nur bei Einwilligung gemountet, damit die Ref beim Stream bereit ist */}
      {tryCamera ? (
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          className={
            streamOk
              ? 'absolute inset-0 z-[1] h-full w-full scale-x-[-1] object-cover opacity-[0.92] blur-[1.5px] saturate-[0.85] contrast-[1.05] transition-opacity duration-300 dark:opacity-90'
              : 'pointer-events-none absolute inset-0 z-[1] h-full w-full scale-x-[-1] object-cover opacity-0 blur-[1.5px]'
          }
          aria-hidden
        />
      ) : null}

      {/* Chrom-Glanz & Kantenlicht */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(165deg,rgba(255,255,255,0.55)_0%,transparent_38%,transparent_58%,rgba(0,0,0,0.08)_100%)] dark:bg-[linear-gradient(165deg,rgba(255,255,255,0.2)_0%,transparent_40%,transparent_60%,rgba(0,0,0,0.35)_100%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] rounded-full shadow-[inset_0_2px_6px_rgba(255,255,255,0.45),inset_0_-3px_10px_rgba(0,0,0,0.18)] dark:shadow-[inset_0_1px_4px_rgba(255,255,255,0.12),inset_0_-4px_12px_rgba(0,0,0,0.45)]"
      />

      {/* Beschriftung — leicht erhaben */}
      <span
        className="relative z-[3] flex items-center gap-2 [text-shadow:0_1px_0_rgba(255,255,255,0.88),0_-0.5px_0_rgba(0,0,0,0.14)] dark:[text-shadow:0_1px_1px_rgba(0,0,0,0.85),0_-0.5px_0_rgba(255,255,255,0.1)]"
      >
        Unverbindlich anfragen
        <ArrowRight
          className="h-4 w-4 shrink-0 opacity-90"
          strokeWidth={2}
          aria-hidden
        />
      </span>
    </Link>
  )
}
