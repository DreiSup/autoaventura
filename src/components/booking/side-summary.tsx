import { PACKS } from '@/config/packs'
import { VanSilhouette } from './van-silhouette'
import type { Van, DateRange, PackId } from '@/lib/types'

const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

function nightsBetween(a: Date | null, b: Date | null): number {
  if (!a || !b) return 0
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 86400000))
}
function hasHighSeason(start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false
  const cur = new Date(start)
  while (cur <= end) {
    const m = cur.getMonth()
    if (m >= 5 && m <= 7) return true
    cur.setDate(cur.getDate() + 1)
  }
  return false
}
function fmtShort(d: Date | null): string {
  if (!d) return '—'
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`
}

const BOOK_TIER: Record<string, string> = {
  valle: 'Compacta', sierra: 'Aventurera', mar: 'Premium', costa: 'Familiar',
}

function SideRow({ label, value, sub, done }: { label: string; value: string; sub?: string; done: boolean }) {
  return (
    <div className="flex gap-2.5">
      <span className={[
        'w-3.5 h-3.5 rounded-full mt-[3px] shrink-0 flex items-center justify-center',
        done ? 'bg-ok text-white' : 'border-[1.5px] border-line-2',
      ].join(' ')}>
        {done && (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M1 4 L3 6 L7 2" />
          </svg>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">{label}</div>
        <div className={['text-[13px] leading-[1.4]', done ? 'text-ink font-medium' : 'text-ink-3'].join(' ')}>{value}</div>
        {sub && <div className="text-[11px] text-ink-3 mt-0.5">{sub}</div>}
      </div>
    </div>
  )
}

interface SideSummaryProps {
  van:   Van
  dates: DateRange
  pack:  PackId
  step:  number
}

export function SideSummary({ van, dates, pack, step }: SideSummaryProps) {
  const nights   = nightsBetween(dates.start, dates.end)
  const high     = hasHighSeason(dates.start, dates.end)
  const rate     = high ? Math.round(van.price.low * 1.25) : van.price.low
  const baseTotal = nights * rate
  const packObj  = PACKS.find(p => p.id === pack) ?? PACKS[0]
  const packTotal = nights * packObj.addPerDay
  const total    = baseTotal + packTotal

  return (
    <aside className="sticky top-[100px] bg-paper border border-line rounded-md p-5 text-sm flex flex-col gap-4 self-start">
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">Tu reserva</div>

      {/* Van mini */}
      <div className="flex gap-3 items-center">
        <div className="w-[72px] h-12 bg-bg border border-line rounded shrink-0 flex items-center justify-center">
          <VanSilhouette vanId={van.id} w={62} />
        </div>
        <div className="min-w-0">
          <div className="font-display font-semibold text-base tracking-[-0.01em]">{van.name}</div>
          <div className="text-xs text-ink-3">{BOOK_TIER[van.id] ?? 'Estándar'} · {van.sleeps} plazas</div>
        </div>
      </div>

      <div className="h-px bg-line" />

      <SideRow
        label="Fechas"
        done={step >= 1 && nights > 0}
        value={nights > 0 ? `${fmtShort(dates.start)} → ${fmtShort(dates.end)}` : 'pendiente'}
        sub={nights > 0 ? `${nights} ${nights === 1 ? 'día' : 'días'}${high ? ' · temp. alta' : ''}` : undefined}
      />
      <SideRow
        label="Pack"
        done={step >= 2}
        value={step >= 2 ? packObj.name : 'pendiente'}
        sub={step >= 2 ? (packObj.addPerDay === 0 ? 'Incluido' : `+${packObj.addPerDay}€/día`) : undefined}
      />

      <div className="h-px bg-line" />

      {/* Price total */}
      <div>
        <div className="flex justify-between text-[13px] text-ink-3 mb-1">
          <span>Base</span>
          <span>{nights > 0 ? `${baseTotal}€` : '—'}</span>
        </div>
        {packObj.addPerDay > 0 && step >= 2 && (
          <div className="flex justify-between text-[13px] text-ink-3 mb-1">
            <span>Pack</span>
            <span>+{packTotal}€</span>
          </div>
        )}
        <div className="flex justify-between items-baseline mt-2.5">
          <span className="font-display font-semibold text-sm">Total</span>
          <span className="font-display text-[22px] font-bold tracking-[-0.02em]">
            {nights > 0 ? `${total}€` : '—'}
          </span>
        </div>
        <div className="text-[11px] text-ink-3 mt-1">IVA incluido · sin extras escondidos</div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-ink-3 pt-1.5 border-t border-line">
        <span className="w-1.5 h-1.5 rounded-full bg-ok" />
        Las fechas se bloquean al confirmar
      </div>
    </aside>
  )
}
