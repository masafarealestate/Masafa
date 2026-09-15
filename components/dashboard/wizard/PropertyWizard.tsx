'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { createProperty, updateProperty } from '../../../app/dashboard/properties/actions'
import { useLanguage } from '../../../lib/i18n/LanguageProvider'
import { createEmptyPropertyForm, type PropertyFormState } from '../../../lib/property-wizard'
import type { Amenity } from '../../../lib/types'
import { AgentStep, type AgentOption } from './AgentStep'
import { AmenitiesStep } from './AmenitiesStep'
import { DescriptionStep } from './DescriptionStep'
import { DetailsStep } from './DetailsStep'
import { LocationStep } from './LocationStep'
import { PhotosStep } from './PhotosStep'
import { PreviewStep } from './PreviewStep'
import { PriceStep } from './PriceStep'
import { PropertyTypeStep, type PropertyTypeOption } from './PropertyTypeStep'
import { PurposeStep } from './PurposeStep'
import { SaveStep } from './SaveStep'
import { SellerStep, type SellerOption } from './SellerStep'
import { WizardProgress } from './WizardProgress'

const TOTAL_STEPS = 12

function isStepValid(step: number, form: PropertyFormState): boolean {
  switch (step) {
    case 1:
      return form.purpose !== null
    case 2:
      return form.propertyTypeId !== null
    case 4:
      return form.agentId !== null
    default:
      return true
  }
}

export function PropertyWizard({
  mode = 'create',
  propertyId,
  initialForm,
  propertyTypes,
  agents,
  sellers,
  amenities,
}: {
  mode?: 'create' | 'edit'
  propertyId?: string
  initialForm?: PropertyFormState
  propertyTypes: PropertyTypeOption[]
  agents: AgentOption[]
  sellers: SellerOption[]
  amenities: Amenity[]
}) {
  const { lang, dict } = useLanguage()
  const t = dict.dashboard.propertyWizard
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [step, setStep] = useState(1)
  const [maxVisited, setMaxVisited] = useState(1)
  const [form, setForm] = useState<PropertyFormState>(() => initialForm ?? createEmptyPropertyForm())
  const [blocked, setBlocked] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveNotice, setSaveNotice] = useState<string | null>(null)
  const [mediaFolder] = useState(() => propertyId ?? `new-${crypto.randomUUID()}`)

  function patchForm(patch: Partial<PropertyFormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  function goNext() {
    if (!isStepValid(step, form)) {
      setBlocked(true)
      return
    }
    setBlocked(false)
    const next = Math.min(step + 1, TOTAL_STEPS)
    setStep(next)
    setMaxVisited((m) => Math.max(m, next))
  }

  function goBack() {
    setBlocked(false)
    setStep((s) => Math.max(1, s - 1))
  }

  function jumpTo(target: number) {
    if (target > maxVisited) return
    setBlocked(false)
    setStep(target)
  }

  function handleSave(status: 'draft' | 'pending_review' | 'published') {
    if (!form.purpose || !form.propertyTypeId || !form.agentId) {
      setSaveError(t.feedback.validationError)
      return
    }
    setSaveError(null)
    setSaveNotice(null)
    startTransition(async () => {
      const result =
        mode === 'edit' && propertyId ? await updateProperty(propertyId, form, status) : await createProperty(form, status)

      if (result.error) {
        const key = result.error === 'auth' ? 'authError' : result.error === 'seller' ? 'sellerError' : 'propertyError'
        setSaveError(t.feedback[key])
        return
      }

      if (result.fellBackToPendingReview) {
        setSaveNotice(t.feedback.publishBlockedFallback)
        setTimeout(() => router.push('/dashboard/properties'), 1800)
        return
      }

      router.push('/dashboard/properties')
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">{mode === 'edit' ? t.pageTitleEdit : t.pageTitle}</h1>

      <div className="mt-5">
        <WizardProgress
          total={TOTAL_STEPS}
          current={step}
          maxVisited={maxVisited}
          onJump={jumpTo}
          stepLabel={t.stepIndicator(step, TOTAL_STEPS)}
        />
      </div>

      <div className="mt-6 rounded-lg border border-stone bg-surface p-5 md:p-8">
        {step === 1 && <PurposeStep form={form} onChange={patchForm} t={t} />}
        {step === 2 && <PropertyTypeStep form={form} onChange={patchForm} propertyTypes={propertyTypes} lang={lang} t={t} />}
        {step === 3 && <SellerStep form={form} onChange={patchForm} sellers={sellers} t={t} />}
        {step === 4 && <AgentStep form={form} onChange={patchForm} agents={agents} lang={lang} t={t} />}
        {step === 5 && <LocationStep form={form} onChange={patchForm} lang={lang} t={t} />}
        {step === 6 && <DetailsStep form={form} onChange={patchForm} t={t} />}
        {step === 7 && <PriceStep form={form} onChange={patchForm} t={t} />}
        {step === 8 && <AmenitiesStep form={form} onChange={patchForm} amenities={amenities} lang={lang} t={t} />}
        {step === 9 && <PhotosStep form={form} onChange={patchForm} folder={mediaFolder} t={t} />}
        {step === 10 && <DescriptionStep form={form} onChange={patchForm} t={t} />}
        {step === 11 && (
          <PreviewStep form={form} propertyTypes={propertyTypes} sellers={sellers} agents={agents} amenities={amenities} t={t} />
        )}
        {step === 12 && <SaveStep t={t} pending={isPending} onSave={handleSave} />}

        {blocked && <p className="mt-4 text-sm text-red-600">{t.requiredHint}</p>}
        {saveError && <p className="mt-4 text-sm text-red-600">{saveError}</p>}
        {saveNotice && <p className="mt-4 text-sm text-amber-700">{saveNotice}</p>}
      </div>

      {step < TOTAL_STEPS && (
        <div className="mt-5 flex justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className="rounded-md border border-stone px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t.back}
          </button>
          <button
            type="button"
            onClick={goNext}
            className="rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--ink)' }}
          >
            {t.next}
          </button>
        </div>
      )}

      {step === TOTAL_STEPS && (
        <div className="mt-5">
          <button
            type="button"
            onClick={goBack}
            className="rounded-md border border-stone px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
          >
            {t.back}
          </button>
        </div>
      )}
    </div>
  )
}
