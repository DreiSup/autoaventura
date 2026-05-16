import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Stripe } from '@/components/stripe'
import type { Van, VanColor, StripeKind } from '@/lib/types'

const colorToKind: Record<VanColor, StripeKind> = {
  terra: '',
  sage:  'sage',
  ink:   'dark',
}

interface FleetCardProps {
  van: Van
  compact?: boolean
}

export function FleetCard({ van, compact = false }: FleetCardProps) {
  const kind     = colorToKind[van.color]
  const tagline  = van.tagline_es
  const imgH     = compact ? 'h-[220px]' : 'h-[280px]'

  return (
    <Link
      href={`/flota/${van.id}`}
      className="group flex flex-col bg-paper rounded overflow-hidden shadow-card hover:shadow-float transition-shadow duration-200"
    >
      {/* image */}
      <div className={cn('relative', imgH)}>
        <Stripe src={van.images?.[0]} kind={kind} label={`${van.name.toLowerCase()} · hero shot`} className="absolute inset-0" />

        {/* top-left tags */}
        <div className="absolute top-3.5 left-3.5 flex gap-1.5">
          <span className="bg-ink text-paper font-display text-[11px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm">
            {van.id.toUpperCase()}
          </span>
          {van.offroad && (
            <span className="bg-sage-tn text-[#43523c] font-display text-[11px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm">
              4×4
            </span>
          )}
        </div>

        {/* price badge */}
        <div className="absolute right-3.5 bottom-3.5 bg-paper px-3.5 py-2.5 rounded shadow-[0_4px_12px_rgba(0,0,0,.1)]">
          <p className="font-mono text-[10px] text-ink-3 uppercase tracking-[0.06em] leading-none mb-1">desde</p>
          <p className="font-display text-[22px] font-bold text-ink leading-none">
            {van.price.low}
            <span className="text-xs font-medium text-ink-3"> €/día</span>
          </p>
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col flex-1 px-5 pt-5 pb-5">
        <h3 className={cn('font-display font-semibold tracking-tight mb-1.5', compact ? 'text-2xl' : 'text-[28px]')}>
          {van.name}
        </h3>
        <p className="text-sm text-ink-2 italic mb-3.5">"{tagline}"</p>

        {/* spec chips */}
        <div className="flex flex-wrap gap-3.5 text-[13px] text-ink-2 mb-4">
          <SpecChip>{van.sleeps} plazas</SpecChip>
          <SpecChip>carnet {van.license}</SpecChip>
          <SpecChip>{van.length}</SpecChip>
        </div>

        {/* CTA row */}
        <div className="mt-auto flex items-center justify-between pt-3.5 border-t border-line font-display font-semibold text-sm">
          <span>Ver detalles</span>
          <span className="w-8 h-8 rounded-full bg-bg flex items-center justify-center group-hover:bg-bg-2 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M2 6h8M7 2l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

function SpecChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="w-1 h-1 rounded-full bg-terra" />
      {children}
    </span>
  )
}
