'use client'

const LABELS = ['Vehículo', 'Fechas', 'Pack', 'Resumen']

interface StepIndicatorProps {
  step:   number
  onJump: (i: number) => void
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1.5 5.5 L4.5 8.5 L9.5 2.5" />
    </svg>
  )
}

export function StepIndicator({ step, onJump }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0 py-5">
      {LABELS.map((label, i) => {
        const done    = i < step
        const current = i === step
        return (
          <div key={i} className="contents">
            <button
              onClick={() => i <= step && onJump(i)}
              className={['flex items-center gap-2.5', i <= step ? 'cursor-pointer' : 'cursor-default'].join(' ')}
            >
              <span className={[
                'w-[26px] h-[26px] rounded-full flex items-center justify-center font-display text-xs font-semibold transition-all duration-200',
                done    ? 'bg-ink text-[#fff7ef]' : '',
                current ? 'bg-terra text-[#fff7ef]' : '',
                !done && !current ? 'bg-transparent border border-line-2 text-ink-3' : '',
              ].join(' ')}>
                {done ? <CheckIcon /> : i + 1}
              </span>
              <span className={[
                'font-display text-[13px] transition-all duration-200',
                done    ? 'font-medium text-ink-2' : '',
                current ? 'font-semibold text-ink' : '',
                !done && !current ? 'font-medium text-ink-3' : '',
              ].join(' ')}>
                {label}
              </span>
            </button>
            {i < LABELS.length - 1 && (
              <span className={[
                'flex-1 h-px mx-3.5 transition-colors duration-200',
                done ? 'bg-ink' : 'bg-line',
              ].join(' ')} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// Mobile variant: progress bar + step label
export function StepIndicatorMobile({ step }: { step: number }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">Paso {step + 1} de 4</span>
        <span className="font-display font-semibold text-sm text-ink">{LABELS[step]}</span>
      </div>
      <div className="flex gap-1">
        {LABELS.map((_, i) => (
          <div
            key={i}
            className={[
              'flex-1 h-1 rounded-full transition-colors duration-200',
              i < step  ? 'bg-ink' : '',
              i === step ? 'bg-terra' : '',
              i > step  ? 'bg-line' : '',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}
