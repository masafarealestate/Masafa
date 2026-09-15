'use client'

import { useLanguage } from '../../lib/i18n/LanguageProvider'
import type { DashboardStats } from '../../lib/dashboard'

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-stone bg-surface p-5 shadow-card">
      <div className="text-xs font-medium text-muted">{label}</div>
      <div className="mt-2 text-3xl font-bold text-ink">{value}</div>
    </div>
  )
}

export function OverviewStats({ stats }: { stats: DashboardStats }) {
  const { dict } = useLanguage()
  const labels = dict.dashboard.overview.stats

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">{dict.dashboard.overview.heading}</h1>
      <p className="mt-1 text-sm text-muted">{dict.dashboard.overview.subheading}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={labels.total} value={stats.total} />
        <StatCard label={labels.active} value={stats.active} />
        <StatCard label={labels.pending} value={stats.pending} />
        <StatCard label={labels.drafts} value={stats.drafts} />
        <StatCard label={labels.leads} value="—" />
        <StatCard label={labels.views} value="—" />
        <StatCard label={labels.whatsapp} value="—" />
      </div>
    </div>
  )
}
