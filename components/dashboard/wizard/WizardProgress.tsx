export function WizardProgress({
  total,
  current,
  maxVisited,
  onJump,
  stepLabel,
}: {
  total: number
  current: number
  maxVisited: number
  onJump: (step: number) => void
  stepLabel: string
}) {
  const percent = Math.round((current / total) * 100)

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-muted">
        <span>{stepLabel}</span>
        <span>{percent}%</span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone">
        <div className="h-full rounded-full bg-[color:var(--brass)] transition-all" style={{ width: `${percent}%` }} />
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {Array.from({ length: total }, (_, i) => i + 1).map((step) => {
          const reachable = step <= maxVisited
          const active = step === current
          return (
            <button
              key={step}
              type="button"
              disabled={!reachable}
              onClick={() => onJump(step)}
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                active
                  ? 'bg-ink text-white'
                  : reachable
                    ? 'border border-stone bg-surface text-ink hover:border-brass'
                    : 'border border-stone bg-surface text-muted opacity-50'
              }`}
            >
              {step}
            </button>
          )
        })}
      </div>
    </div>
  )
}
