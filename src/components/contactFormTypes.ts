/** Werte für das Kontaktformular (API + E-Mail-Aufbau) */

export type ServiceType = 'website' | 'webapp' | 'business_automation' | 'design_print'

export const SERVICE_TYPE_LABEL: Record<ServiceType, string> = {
  website: 'Website',
  webapp: 'Web-App',
  business_automation: 'Business-Automatisierung',
  design_print: 'Design & Druck',
}

export const DESIGN_FOCUS_OPTIONS = [
  { id: 'flyer', label: 'Flyer' },
  { id: 'visitenkarte', label: 'Visitenkarte' },
  { id: 'instagram', label: 'Instagram-Auftritt' },
  { id: 'ci', label: 'CI' },
  { id: 'logo_design', label: 'Logo-Design' },
] as const

export type DesignFocusId = (typeof DESIGN_FOCUS_OPTIONS)[number]['id']
