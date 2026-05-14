import Link from 'next/link'
import { PACKS } from '@/config/packs'
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

const BOOK_TIER: Record<string, { tier: string }> = {
  valle:  { tier: 'Compacta' },
  sierra: { tier: 'Aventurera' },
  mar:    { tier: 'Premium' },
  costa:  { tier: 'Familiar' },
}

function TrustIcon({ kind }: { kind: string }) {
  const p = { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: 'var(--sage)', strokeWidth: 1.4 } as const
  if (kind === 'shield') return (
    <svg {...p}>
      <path d="M8 1.5 L13.5 4 V8 Q13.5 12 8 14.5 Q2.5 12 2.5 8 V4 Z" />
      <path d="M5.5 8 L7.5 10 L10.5 6" />
    </svg>
  )
  if (kind === 'road') return (
    <svg {...p}>
      <path d="M5 2 L4 14 M11 2 L12 14" />
      <path d="M8 4 V6 M8 8 V10 M8 12 V13" />
    </svg>
  )
  if (kind === 'cal') return (
    <svg {...p}>
      <rect x="2.5" y="3.5" width="11" height="10" rx="1" />
      <path d="M2.5 6.5 H13.5 M5.5 2 V5 M10.5 2 V5" />
    </svg>
  )
  if (kind === 'lock') return (
    <svg {...p}>
      <rect x="3.5" y="7" width="9" height="7" rx="1" />
      <path d="M5.5 7 V5 Q5.5 2.5 8 2.5 Q10.5 2.5 10.5 5 V7" />
    </svg>
  )
  return null
}

function SummaryRow({ label, right, onEdit }: { label: string; right: React.ReactNode; onEdit?: () => void }) {
  return (
    <div className="flex items-center justify-between px-6 py-[18px] border-b border-line gap-4">
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">{label}</span>
        <span className="text-[15px] text-ink">{right}</span>
      </div>
      {onEdit && (
        <button onClick={onEdit} className="font-display text-xs font-semibold text-ink-2 underline underline-offset-[4px] decoration-line-2 shrink-0">
          Cambiar
        </button>
      )}
    </div>
  )
}

interface StepSummaryProps {
  van:      Van
  dates:    DateRange
  pack:     PackId
  onJump:   (step: number) => void
}

export function StepSummary({ van, dates, pack, onJump }: StepSummaryProps) {
  const nights   = nightsBetween(dates.start, dates.end)
  const high     = hasHighSeason(dates.start, dates.end)
  const rate     = high ? Math.round(van.price.low * 1.25) : van.price.low
  const baseTotal = nights * rate
  const packObj  = PACKS.find(p => p.id === pack) ?? PACKS[0]
  const packTotal = nights * packObj.addPerDay
  const total    = baseTotal + packTotal
  const tier     = BOOK_TIER[van.id] ?? { tier: 'Estándar' }

  return (
    <div>
      <div className="mb-7">
        <div className="eyebrow text-terra">Paso 4 de 4</div>
        <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] mt-3">Repasa y confirma.</h2>
        <p className="mt-2.5 text-ink-2 text-base leading-[1.55] max-w-[540px]">
          Bloqueamos las fechas al momento. Cobramos solo cuando confirmamos la disponibilidad — normalmente en menos de 2 horas.
        </p>
      </div>

      <div className="bg-paper border border-line rounded-md overflow-hidden">
        <SummaryRow
          label="Autocaravana"
          onEdit={() => onJump(0)}
          right={<><strong className="font-display font-semibold">{van.name}</strong> · {tier.tier.toLowerCase()} · {van.sleeps} plazas</>}
        />
        <SummaryRow
          label="Fechas"
          onEdit={() => onJump(1)}
          right={<><strong className="font-display font-semibold">{fmtShort(dates.start)} → {fmtShort(dates.end)}</strong> · {nights} {nights === 1 ? 'día' : 'días'}{high ? ' · temp. alta' : ''}</>}
        />
        <SummaryRow
          label="Pack"
          onEdit={() => onJump(2)}
          right={<strong className="font-display font-semibold">{packObj.name}</strong>}
        />

        {/* Price breakdown */}
        <div className="px-6 py-5 bg-bg">
          <div className="flex justify-between text-sm text-ink-2 mb-2">
            <span>Base · {rate}€/día × {nights} {nights === 1 ? 'día' : 'días'}</span>
            <span>{baseTotal}€</span>
          </div>
          {packObj.addPerDay > 0 && (
            <div className="flex justify-between text-sm text-ink-2 mb-2">
              <span>{packObj.name} · +{packObj.addPerDay}€/día × {nights}</span>
              <span>+{packTotal}€</span>
            </div>
          )}
          {high && (
            <div className="flex justify-between text-xs text-ink-3 mb-2">
              <span>Recargo de temporada alta (jun–ago) incluido en la base</span>
              <span>—</span>
            </div>
          )}
          <div className="h-px bg-line my-3" />
          <div className="flex justify-between items-baseline">
            <span className="font-display font-semibold text-[15px]">Total</span>
            <span>
              <span className="font-display text-[32px] font-bold tracking-[-0.02em]">{total}€</span>
              <span className="text-xs text-ink-3 ml-1.5">IVA incl.</span>
            </span>
          </div>
        </div>
      </div>

      {/* Trust signals */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 px-1 justify-between">
        {[
          { i: 'shield', t: 'Seguro incluido' },
          { i: 'road',   t: 'Asistencia 24 h' },
          { i: 'cal',    t: 'Cancelación flexible' },
          { i: 'lock',   t: 'Pago seguro' },
        ].map((b, i) => (
          <div key={i} className="flex items-center gap-2 text-[13px] text-ink-2 font-display font-medium">
            <TrustIcon kind={b.i} />
            <span>{b.t}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="mt-4 flex flex-col gap-3">
        <button className="w-full bg-terra text-[#fff7ef] font-display font-semibold text-[17px] py-[18px] px-7 rounded-full hover:bg-terra-dk transition-colors">
          Confirmar y pagar — {total}€
        </button>
        <button onClick={() => onJump(2)} className="text-center font-display text-[13px] text-ink-3 font-medium hover:text-ink-2 transition-colors">
          ← Volver y modificar
        </button>
      </div>

      <p className="mt-3.5 text-xs text-ink-3 text-center leading-[1.5]">
        Al confirmar aceptas los{' '}
        <Link href="/terminos" className="underline">términos del alquiler</Link>{' '}
        y la{' '}
        <Link href="/privacidad" className="underline">política de privacidad</Link>.<br />
        Cancela gratis hasta 30 días antes. 50% hasta 14 días.
      </p>
    </div>
  )
}
