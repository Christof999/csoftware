import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Loader2, Mail, Send } from 'lucide-react'
import {
  type FormEvent,
  type TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { fadeInUp, staggerContainer } from '../lib/motion'
import {
  SITE_EMAIL,
  SITE_EMAIL_MAILTO,
  SITE_GOOGLE_BUSINESS_URL,
  SITE_LOCALITY,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_POSTAL_CODE,
  SITE_STREET,
} from '../site'
import { CONTACT_FAQ_ITEMS } from '../seo/contactFaq'
import { CursorGlow } from './home/tech/CursorGlow'
import {
  DESIGN_FOCUS_OPTIONS,
  type ServiceType,
  SERVICE_TYPE_LABEL,
  type DesignFocusId,
} from './contactFormTypes'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROMISES = [
  {
    title: 'Antwort in 24 Stunden',
    text: 'Innerhalb eines Werktags hören Sie von uns',
  },
  {
    title: 'Erstes Gespräch kostenlos',
    text: 'Wir hören zu, stellen Fragen und klären, ob und wie wir helfen können',
  },
]

// ─── Auto-resize textarea ────────────────────────────────────────────────────

function AutoGrowTextarea({
  className = '',
  minRows = 3,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { minRows?: number }) {
  const ref = useRef<HTMLTextAreaElement>(null)

  const sync = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    const line = 22
    const minH = minRows * line + 24
    el.style.height = `${Math.max(minH, el.scrollHeight)}px`
  }, [minRows])

  useEffect(() => {
    sync()
  }, [props.value, sync])

  return (
    <textarea
      ref={ref}
      {...props}
      rows={minRows}
      className={className}
      onInput={(e) => {
        sync()
        props.onInput?.(e)
      }}
    />
  )
}

function BooleanRadios({
  name,
  value,
  onChange,
  legend,
  required: _required,
}: {
  name: string
  value: '' | 'yes' | 'no'
  onChange: (v: 'yes' | 'no') => void
  legend: string
  required?: boolean
}) {
  const chip =
    'inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gallery-line bg-gallery-bg px-4 py-2.5 text-sm transition has-[:checked]:border-gallery-ink has-[:checked]:bg-gallery-surface has-[:checked]:font-medium'

  return (
    <fieldset className="block w-full">
      <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-shell-subtle">
        {legend}
        {_required ? (
          <>
            {' '}
            <span aria-hidden="true">*</span>
            <span className="sr-only">Pflichtfeld</span>
          </>
        ) : null}
      </legend>
      <div className="flex flex-wrap gap-3">
        <label className={chip}>
          <input
            type="radio"
            name={name}
            value="yes"
            checked={value === 'yes'}
            onChange={() => onChange('yes')}
            className="sr-only"
          />
          Ja
        </label>
        <label className={chip}>
          <input
            type="radio"
            name={name}
            value="no"
            checked={value === 'no'}
            onChange={() => onChange('no')}
            className="sr-only"
          />
          Nein
        </label>
      </div>
    </fieldset>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function Contact() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [serviceType, setServiceType] = useState<ServiceType | ''>('')
  const [hasWebsite, setHasWebsite] = useState<'' | 'yes' | 'no'>('')
  const [hasLogo, setHasLogo] = useState<'' | 'yes' | 'no'>('')
  const [designFocus, setDesignFocus] = useState<Set<DesignFocusId>>(new Set())

  const yesNoToBool = (v: '' | 'yes' | 'no'): boolean | undefined =>
    v === 'yes' ? true : v === 'no' ? false : undefined

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return

    if (!serviceType) {
      setErrorMessage('Bitte wählen Sie eine Art der Dienstleistung.')
      return
    }

    if (serviceType === 'website') {
      if (!hasWebsite || !hasLogo) {
        setErrorMessage('Bitte beantworten Sie die Fragen zu Website und Logo.')
        return
      }
    }
    if (serviceType === 'design_print') {
      if (!hasLogo) {
        setErrorMessage('Bitte geben Sie an, ob Sie bereits ein Logo haben.')
        return
      }
      if (designFocus.size === 0) {
        setErrorMessage('Bitte wählen Sie mindestens einen Schwerpunkt.')
        return
      }
    }

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const notes = String(data.get('notes') ?? '').trim()
    const processDescription = String(data.get('processDescription') ?? '').trim()
    const honeypot = String(data.get('website') ?? '')

    if (serviceType === 'webapp' || serviceType === 'business_automation') {
      if (!processDescription) {
        setErrorMessage('Bitte beschreiben Sie Ihr Anliegen.')
        return
      }
    }

    const payload: Record<string, unknown> = {
      name,
      company,
      email,
      website: honeypot,
      serviceType,
      notes: notes || undefined,
    }

    if (serviceType === 'website') {
      payload.hasWebsite = yesNoToBool(hasWebsite)
      payload.hasLogo = yesNoToBool(hasLogo)
    } else if (serviceType === 'webapp' || serviceType === 'business_automation') {
      payload.processDescription = processDescription
    } else {
      payload.hasLogo = yesNoToBool(hasLogo)
      payload.designFocus = Array.from(designFocus)
    }

    setSubmitting(true)
    setErrorMessage(null)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }
      if (!response.ok || !result.ok) {
        throw new Error(
          result.error ??
            'Nachricht konnte nicht gesendet werden. Bitte später erneut versuchen.',
        )
      }
      setSent(true)
      form.reset()
      setServiceType('')
      setHasWebsite('')
      setHasLogo('')
      setDesignFocus(new Set())
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nachricht konnte nicht gesendet werden. Bitte später erneut versuchen.'
      setErrorMessage(message)
    } finally {
      setSubmitting(false)
    }
  }

  function toggleDesignFocus(id: DesignFocusId) {
    setDesignFocus((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const inputClass =
    'w-full rounded-lg border border-gallery-line bg-gallery-bg px-4 py-3 text-sm text-gallery-ink placeholder:text-shell-subtle focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 transition-colors'
  const textareaClass = `${inputClass} resize-none overflow-hidden`

  return (
    <div>
      {/* Page header */}
      <section className="border-b border-gallery-line bg-gallery-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <div className="flex items-center gap-4 border-b border-gallery-line pb-8">
              <motion.p
                custom={0}
                variants={fadeInUp}
                className="text-xs font-medium uppercase tracking-widest text-shell-muted"
              >
                Kontakt
              </motion.p>
            </div>

            <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
              <motion.h1
                custom={1}
                variants={fadeInUp}
                className="font-display text-4xl font-semibold tracking-tight text-gallery-ink sm:text-5xl lg:text-6xl"
              >
                Lassen Sie uns
                <br />
                <span className="text-shell-muted">über Ihr Projekt reden.</span>
              </motion.h1>

              <motion.nav
                custom={2}
                variants={fadeInUp}
                className="flex flex-wrap gap-2 sm:justify-end"
                aria-label="Abschnitte"
              >
                <a
                  href="#formular"
                  className="inline-flex items-center gap-2 rounded-full border border-gallery-line bg-gallery-bg px-4 py-2 text-xs font-medium text-gallery-ink transition hover:border-stone-400 dark:hover:border-stone-600"
                >
                  <span className="font-mono text-shell-subtle">01</span>
                  Formular
                </a>
                <a
                  href="#faq"
                  className="inline-flex items-center gap-2 rounded-full border border-gallery-line bg-gallery-bg px-4 py-2 text-xs font-medium text-gallery-ink transition hover:border-stone-400 dark:hover:border-stone-600"
                >
                  <span className="font-mono text-shell-subtle">02</span>
                  Häufige Fragen
                </a>
              </motion.nav>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="formular"
        className="border-b border-gallery-line bg-gallery-bg py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:order-last"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center rounded-xl border border-gallery-line bg-gallery-surface px-8 py-16 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <CheckCircle
                      className="h-9 w-9 text-gallery-ink"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <h2 className="mt-5 font-display text-xl font-semibold text-gallery-ink">
                      Danke für Ihre Nachricht!
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-shell-muted">
                      Wir melden uns innerhalb eines Werktags persönlich bei Ihnen.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    aria-label="Kontaktformular"
                    className="rounded-xl border border-gallery-line bg-gallery-surface p-6 sm:p-8"
                  >
                    <p className="mb-6 border-b border-gallery-line pb-6 text-xs font-medium uppercase tracking-widest text-shell-muted">
                      Nachricht schreiben
                    </p>

                    <div aria-hidden="true" className="hidden">
                      <label>
                        Website
                        <input
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          defaultValue=""
                        />
                      </label>
                    </div>

                    <fieldset className="mb-8 block border-0 p-0">
                      <legend className="mb-3 text-xs font-medium uppercase tracking-wide text-shell-subtle">
                        Art der Dienstleistung{' '}
                        <span aria-hidden="true">*</span>
                        <span className="sr-only">Pflichtfeld</span>
                      </legend>
                      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                        {(
                          [
                            ['website', SERVICE_TYPE_LABEL.website],
                            ['webapp', SERVICE_TYPE_LABEL.webapp],
                            [
                              'business_automation',
                              SERVICE_TYPE_LABEL.business_automation,
                            ],
                            ['design_print', SERVICE_TYPE_LABEL.design_print],
                          ] as const
                        ).map(([value, label]) => (
                          <label
                            key={value}
                            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm transition ${
                              serviceType === value
                                ? 'border-gallery-ink bg-gallery-bg font-medium text-gallery-ink'
                                : 'border-gallery-line bg-gallery-bg text-shell-muted hover:border-stone-400'
                            }`}
                          >
                            <input
                              type="radio"
                              name="serviceTypeUi"
                              value={value}
                              checked={serviceType === value}
                              onChange={() => {
                                setServiceType(value)
                                setHasWebsite('')
                                setHasLogo('')
                                setDesignFocus(new Set())
                                setErrorMessage(null)
                              }}
                              className="sr-only"
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label htmlFor="contact-name" className="block">
                        <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-shell-subtle">
                          Name <span aria-hidden="true">*</span>
                          <span className="sr-only">Pflichtfeld</span>
                        </span>
                        <input
                          id="contact-name"
                          name="name"
                          required
                          aria-required="true"
                          autoComplete="name"
                          maxLength={200}
                          className={inputClass}
                          placeholder="Ihr Name"
                        />
                      </label>
                      <label htmlFor="contact-company" className="block">
                        <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-shell-subtle">
                          Firma / Projekt
                        </span>
                        <input
                          id="contact-company"
                          name="company"
                          autoComplete="organization"
                          maxLength={200}
                          className={inputClass}
                          placeholder="Optional"
                        />
                      </label>
                      <label htmlFor="contact-email" className="block sm:col-span-2">
                        <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-shell-subtle">
                          E-Mail <span aria-hidden="true">*</span>
                          <span className="sr-only">Pflichtfeld</span>
                        </span>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          aria-required="true"
                          autoComplete="email"
                          maxLength={254}
                          className={inputClass}
                          placeholder="name@beispiel.de"
                        />
                      </label>

                      <AnimatePresence mode="wait">
                        {serviceType === 'website' && (
                          <motion.div
                            key="website-fields"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="col-span-1 space-y-5 sm:col-span-2"
                          >
                            <BooleanRadios
                              name="hasWebsite"
                              value={hasWebsite}
                              onChange={setHasWebsite}
                              legend="Haben Sie bereits eine Website?"
                              required
                            />
                            <BooleanRadios
                              name="hasLogo"
                              value={hasLogo}
                              onChange={setHasLogo}
                              legend="Haben Sie bereits ein Logo?"
                              required
                            />
                            <label htmlFor="contact-notes-website" className="block w-full">
                              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-shell-subtle">
                                Anmerkungen
                              </span>
                              <AutoGrowTextarea
                                id="contact-notes-website"
                                name="notes"
                                maxLength={5000}
                                minRows={3}
                                className={textareaClass}
                                placeholder="Optional — z. B. Wünsche, Zeitrahmen, Links …"
                              />
                            </label>
                          </motion.div>
                        )}

                        {serviceType === 'webapp' || serviceType === 'business_automation' ? (
                          <motion.div
                            key={`process-fields-${serviceType}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="col-span-1 space-y-5 sm:col-span-2"
                          >
                            <label htmlFor="contact-process" className="block w-full">
                              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-shell-subtle">
                                {serviceType === 'webapp' ? (
                                  <>
                                    Beschreiben Sie Ihren Prozess{' '}
                                    <span aria-hidden="true">*</span>
                                    <span className="sr-only">Pflichtfeld</span>
                                  </>
                                ) : (
                                  <>
                                    Welche Aufgaben sollen automatisiert werden?{' '}
                                    <span aria-hidden="true">*</span>
                                    <span className="sr-only">Pflichtfeld</span>
                                  </>
                                )}
                              </span>
                              <AutoGrowTextarea
                                id="contact-process"
                                name="processDescription"
                                required
                                aria-required="true"
                                maxLength={5000}
                                minRows={4}
                                className={textareaClass}
                                placeholder={
                                  serviceType === 'webapp'
                                    ? 'Was soll verbessert oder digital abgebildet werden?'
                                    : 'z. B. E-Mails mit Rechnungs-PDF erkennen und drucken, KI-Telefonassistent, n8n-Anbindung an CRM …'
                                }
                              />
                            </label>
                            <label htmlFor="contact-notes-process" className="block w-full">
                              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-shell-subtle">
                                Anmerkungen
                              </span>
                              <AutoGrowTextarea
                                id="contact-notes-process"
                                name="notes"
                                maxLength={5000}
                                minRows={3}
                                className={textareaClass}
                                placeholder="Optional"
                              />
                            </label>
                          </motion.div>
                        ) : null}

                        {serviceType === 'design_print' && (
                          <motion.div
                            key="design-fields"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="col-span-1 space-y-5 sm:col-span-2"
                          >
                            <fieldset className="block w-full">
                              <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-shell-subtle">
                                Worum geht es?{' '}
                                <span aria-hidden="true">*</span>
                                <span className="sr-only">
                                  Mindestens eine Auswahl erforderlich
                                </span>
                              </legend>
                              <div className="flex flex-wrap gap-2">
                                {DESIGN_FOCUS_OPTIONS.map(({ id, label }) => {
                                  const checked = designFocus.has(id)
                                  return (
                                    <button
                                      key={id}
                                      type="button"
                                      onClick={() => toggleDesignFocus(id)}
                                      className={`rounded-lg border px-3 py-2 text-sm transition ${
                                        checked
                                          ? 'border-gallery-ink bg-gallery-bg font-medium text-gallery-ink'
                                          : 'border-gallery-line bg-gallery-bg text-shell-muted hover:border-stone-400'
                                      }`}
                                      aria-pressed={checked}
                                    >
                                      {label}
                                    </button>
                                  )
                                })}
                              </div>
                              <p className="mt-2 text-xs text-shell-subtle">
                                Mehrfachauswahl möglich.
                              </p>
                            </fieldset>
                            <BooleanRadios
                              name="hasLogoDesign"
                              value={hasLogo}
                              onChange={setHasLogo}
                              legend="Haben Sie bereits ein Logo?"
                              required
                            />
                            <label htmlFor="contact-notes-design" className="block w-full">
                              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-shell-subtle">
                                Anmerkungen
                              </span>
                              <AutoGrowTextarea
                                id="contact-notes-design"
                                name="notes"
                                maxLength={5000}
                                minRows={3}
                                className={textareaClass}
                                placeholder="Optional"
                              />
                            </label>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {errorMessage && (
                      <div
                        id="contact-error"
                        role="alert"
                        className="mt-6 flex items-start gap-3 rounded-lg border border-red-300/60 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-200"
                      >
                        <AlertCircle
                          className="mt-0.5 h-4 w-4 shrink-0"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <p>{errorMessage}</p>
                      </div>
                    )}

                    <div className="mt-6 flex flex-col gap-4 border-t border-gallery-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-shell-subtle">
                        Mit dem Absenden stimmen Sie der Kontaktaufnahme zu.
                      </p>
                      <button
                        type="submit"
                        disabled={submitting || !serviceType}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                            Wird gesendet…
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" aria-hidden />
                            Nachricht senden
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className="space-y-12 lg:order-first"
            >
              <div>
                <motion.p
                  custom={0}
                  variants={fadeInUp}
                  className="border-b border-gallery-line pb-6 mb-8 text-xs font-medium uppercase tracking-widest text-shell-muted"
                >
                  Direkt erreichbar
                </motion.p>
                <motion.div custom={1} variants={fadeInUp} className="space-y-3">
                  <CursorGlow className="rounded-xl border border-gallery-line bg-gallery-surface">
                    <div className="flex items-start gap-5 px-6 py-5">
                      <span className="mt-0.5 shrink-0 text-gallery-ink">
                        <Mail className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                      </span>
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-shell-subtle">
                          E-Mail
                        </p>
                        <a
                          href={SITE_EMAIL_MAILTO}
                          className="mt-1 inline-block font-display text-sm font-semibold text-gallery-ink underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
                        >
                          {SITE_EMAIL}
                        </a>
                        <p className="mt-0.5 text-xs text-shell-muted">Am schnellsten</p>
                      </div>
                    </div>
                  </CursorGlow>
                  <CursorGlow className="rounded-xl border border-gallery-line bg-gallery-surface">
                    <div className="px-6 py-5 text-sm leading-relaxed text-shell-muted">
                      <p className="text-[10px] font-medium uppercase tracking-widest text-shell-subtle">
                        Adresse
                      </p>
                      <p className="mt-2 font-display text-sm font-semibold text-gallery-ink">
                        {SITE_STREET}
                        <br />
                        {SITE_POSTAL_CODE} {SITE_LOCALITY}
                      </p>
                      <p className="mt-4 text-[10px] font-medium uppercase tracking-widest text-shell-subtle">
                        Telefon
                      </p>
                      <a
                        href={SITE_PHONE_TEL}
                        className="mt-1 inline-block font-display text-sm font-semibold text-gallery-ink underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
                      >
                        {SITE_PHONE_DISPLAY}
                      </a>
                      {SITE_GOOGLE_BUSINESS_URL ? (
                        <p className="mt-4">
                          <a
                            href={SITE_GOOGLE_BUSINESS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gallery-ink underline decoration-gallery-line underline-offset-4 transition hover:decoration-gallery-ink"
                          >
                            Google-Unternehmensprofil
                          </a>
                        </p>
                      ) : null}
                    </div>
                  </CursorGlow>
                </motion.div>
              </div>

              <div>
                <motion.p
                  custom={2}
                  variants={fadeInUp}
                  className="border-b border-gallery-line pb-6 mb-8 text-xs font-medium uppercase tracking-widest text-shell-muted"
                >
                  Was Sie erwartet
                </motion.p>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  {PROMISES.map((item, i) => (
                    <motion.li
                      key={item.title}
                      custom={i}
                      variants={fadeInUp}
                      className="border-b border-gallery-line pb-6 last:border-0 last:pb-0"
                    >
                      <p className="font-display text-sm font-semibold text-gallery-ink">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-shell-muted">{item.text}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-gallery-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            <div className="flex items-center gap-4 border-b border-gallery-line pb-8">
              <motion.span
                custom={0}
                variants={fadeInUp}
                className="font-mono text-xs text-shell-subtle"
              >
                02
              </motion.span>
              <motion.p
                custom={0}
                variants={fadeInUp}
                className="text-xs font-medium uppercase tracking-widest text-shell-muted"
              >
                Häufige Fragen
              </motion.p>
            </div>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="mt-10 max-w-xl font-display text-2xl font-semibold tracking-tight text-gallery-ink sm:text-3xl"
            >
              Was andere auch gefragt haben.
            </motion.h2>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="mt-10 space-y-3"
          >
            {CONTACT_FAQ_ITEMS.map((item, i) => (
              <motion.li key={item.q} custom={i} variants={fadeInUp}>
                <CursorGlow className="rounded-xl border border-gallery-line bg-gallery-bg">
                  <div className="px-6 py-5">
                    <h3 className="font-display text-sm font-semibold text-gallery-ink">
                      {item.q}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-shell-muted">
                      {item.a}
                    </p>
                  </div>
                </CursorGlow>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </div>
  )
}
