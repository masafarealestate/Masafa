import type { Dictionary } from '../../../lib/i18n/dictionaries'

export function SaveStep({
  t,
  pending,
  onSave,
}: {
  t: Dictionary['dashboard']['propertyWizard']
  pending: boolean
  onSave: (status: 'draft' | 'pending_review' | 'published') => void
}) {
  const buttonBase = 'rounded-md px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'

  return (
    <div>
      <h2 className="text-lg font-bold text-ink">{t.save.heading}</h2>
      <p className="mt-1 text-sm text-muted">{t.save.subheading}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={pending}
          onClick={() => onSave('draft')}
          className={`${buttonBase} text-white`}
          style={{ background: 'var(--ink)' }}
        >
          {pending ? t.save.saving : t.save.saveDraft}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => onSave('pending_review')}
          className={`${buttonBase} border border-stone text-ink hover:border-brass`}
        >
          {t.save.submitReview}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => onSave('published')}
          className={`${buttonBase} border border-brass text-brass hover:bg-brass/10`}
        >
          {t.save.publish}
        </button>
      </div>
    </div>
  )
}
