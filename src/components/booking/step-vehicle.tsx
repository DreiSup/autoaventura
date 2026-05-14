import Link from 'next/link'
import { VanSilhouette } from './van-silhouette'
import type { Van } from '@/lib/types'

const BOOK_TIER: Record<string, { tier: string; size: string }> = {
  valle:  { tier: 'Compacta',   size: 'Pequeña' },
  sierra: { tier: 'Aventurera', size: 'Mediana' },
  mar:    { tier: 'Premium',    size: 'Mediana' },
  costa:  { tier: 'Familiar',   size: 'Grande'  },
}

interface StepVehicleProps {
  van: Van
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3 mb-1">{label}</div>
      <div className="font-display font-semibold text-base text-ink">{value}</div>
    </div>
  )
}

export function StepVehicle({ van }: StepVehicleProps) {
  const tier = BOOK_TIER[van.id] ?? { tier: 'Estándar', size: 'Mediana' }

  return (
    <div>
      <div className="mb-6">
        <div className="eyebrow text-terra">Paso 1 de 4</div>
        <h2 className="text-[26px] md:text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] mt-3">Confirma tu autocaravana.</h2>
        <p className="mt-2 text-ink-2 text-sm md:text-base leading-[1.55] max-w-[540px]">
          Esta es la que has elegido. Si quieres comparar antes de seguir, puedes volver a la flota.
        </p>
      </div>

      <div className="bg-paper border border-line rounded-md p-5 md:p-7">
        {/* Mobile: stacked. Desktop: side by side */}
        <div className="flex flex-col gap-5 md:flex-row md:gap-7 md:items-center">
          {/* Van silhouette */}
          <div className="w-full h-[140px] md:w-[240px] md:shrink-0 bg-bg border border-line rounded flex items-center justify-center">
            <VanSilhouette vanId={van.id} w={200} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-terra-tn text-terra-dk font-display text-[11px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm">
                {tier.tier}
              </span>
              <span className="bg-transparent border border-line-2 text-ink-2 font-display text-[11px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm">
                Tamaño {tier.size.toLowerCase()}
              </span>
            </div>
            <div className="font-display text-[22px] md:text-[28px] font-semibold tracking-[-0.02em] mb-0.5">{van.name}</div>
            <div className="text-ink-2 text-sm md:text-[15px] mb-4">{van.tagline_es}</div>
            <div className="flex gap-4 md:gap-[22px] flex-wrap">
              <SpecRow label="Plazas"    value={String(van.sleeps)} />
              <SpecRow label="Cinturones" value={String(van.seats)} />
              <SpecRow label="Eslora"    value={van.length} />
            </div>
          </div>
        </div>

        <div className="h-px bg-line my-5 md:my-6" />

        <div className="flex items-start md:items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3 mb-1">Precio base</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[13px] text-ink-3">desde</span>
              <span className="font-display text-[26px] md:text-[28px] font-bold tracking-[-0.02em]">{van.price.low}€</span>
              <span className="text-sm text-ink-3">/día</span>
            </div>
            <div className="text-xs text-ink-3 mt-1">El precio varía según la temporada.</div>
          </div>
          <Link href="/flota" className="font-display text-[13px] font-semibold text-ink-2 underline underline-offset-[4px] decoration-line-2">
            ← Cambiar van
          </Link>
        </div>
      </div>
    </div>
  )
}
