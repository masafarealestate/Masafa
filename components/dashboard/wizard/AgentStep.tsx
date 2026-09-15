import { FieldSelect } from '../../FieldSelect'
import type { Dictionary, Lang } from '../../../lib/i18n/dictionaries'
import type { PropertyFormState } from '../../../lib/property-wizard'

export type AgentOption = {
  id: string
  full_name: string
  full_name_en: string
  phone?: string | null
  whatsapp?: string | null
  photo_url?: string | null
  job_title?: string | null
}

export function AgentStep({
  form,
  onChange,
  agents,
  lang,
  t,
}: {
  form: PropertyFormState
  onChange: (patch: Partial<PropertyFormState>) => void
  agents: AgentOption[]
  lang: Lang
  t: Dictionary['dashboard']['propertyWizard']
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-ink">{t.agent.heading}</h2>
      <p className="mt-1 text-sm text-muted">{t.agent.subheading}</p>

      {agents.length === 0 ? (
        <p className="mt-6 text-sm text-muted">{t.agent.empty}</p>
      ) : (
        <div className="mt-5 max-w-sm">
          <FieldSelect
            label={t.agent.selectLabel}
            value={form.agentId ?? ''}
            onChange={(value) => onChange({ agentId: value || null })}
            options={[
              { value: '', label: t.agent.selectPlaceholder },
              ...agents.map((a) => ({ value: a.id, label: lang === 'ar' ? a.full_name : a.full_name_en || a.full_name })),
            ]}
          />
        </div>
      )}
    </div>
  )
}
