'use client'

import { useState } from 'react'
import { DatePicker } from './date-picker'
import type { DateRange } from '@/lib/types'

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

function fmtLong(d: Date | null): string {
  if (!d) return '— elegir —'
  return `${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`
}

interface DateFieldProps {
  label:       string
  date:        Date | null
  onClick:     () => void
  active:      boolean
  borderLeft?: boolean
}

function DateField({ label, date, onClick, active, borderLeft }: DateFieldProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'px-[18px] py-4 text-left transition-colors duration-150',
        active ? 'bg-bg' : 'bg-transparent',
        borderLeft ? 'border-l border-line' : '',
      ].join(' ')}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3 mb-1">{label}</div>
      <div className={['font-display text-lg font-semibold tracking-[-0.01em]', date ? 'text-ink' : 'text-ink-4'].join(' ')}>
        {fmtLong(date)}
      </div>
    </button>
  )
}

interface StepDatesProps {
  dates:    DateRange
  setDates: (r: DateRange) => void
  basePrice: number
}

export function StepDates({ dates, setDates, basePrice }: StepDatesProps) {
  const [open, setOpen] = useState(true)
  const nights  = nightsBetween(dates.start, dates.end)
  const high    = hasHighSeason(dates.start, dates.end)
  const rate    = high ? Math.round(basePrice * 1.25) : basePrice
  const subtotal = nights * rate
  const tooShort = nights > 0 && nights < 2

  return (
    <div>
      <div className="mb-7">
        <div className="eyebrow text-terra">Paso 2 de 4</div>
        <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] mt-3">Elige tus fechas.</h2>
        <p className="mt-2.5 text-ink-2 text-base leading-[1.55] max-w-[540px]">
          Mínimo 2 días. El precio se actualiza al instante — sin tarifas ocultas.
        </p>
      </div>

      <div className="bg-paper border border-line rounded-md p-7">
        {/* Date trigger */}
        <div className="grid grid-cols-2 border border-line rounded overflow-hidden mb-4">
          <DateField label="Recogida"   date={dates.start} onClick={() => setOpen(true)} active={open} />
          <DateField label="Devolución" date={dates.end}   onClick={() => setOpen(true)} active={open} borderLeft />
        </div>

        {/* Inline calendar */}
        {open && (
          <div className="bg-bg border border-line rounded p-4 mb-4">
            <DatePicker value={dates} onChange={setDates} />
          </div>
        )}

        {/* Age note */}
        <div className="flex items-start gap-2.5 text-[13px] text-ink-3 leading-[1.5] mb-4">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" className="mt-0.5 shrink-0">
            <circle cx="7" cy="7" r="5.5" />
            <path d="M7 4v3.5M7 9.5v.5" />
          </svg>
          <span>El conductor principal debe tener al menos 30 años y 5 años de carnet.</span>
        </div>

        {/* Live price calc */}
        <div className={['border border-dashed border-line-2 rounded p-4 transition-colors duration-200', nights > 0 ? 'bg-bg' : 'bg-transparent'].join(' ')}>
          {nights === 0 ? (
            <p className="text-ink-3 text-sm text-center py-2">Selecciona fechas para ver el cálculo.</p>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-ink-2 text-sm">
                  {nights} {nights === 1 ? 'día' : 'días'} · {rate}€/día
                </span>
                <span className="font-display text-[22px] font-bold text-ink tracking-[-0.02em]">{subtotal}€</span>
              </div>
              {high && (
                <div className="flex items-center gap-2 text-xs text-terra-dk mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-terra" />
                  Tus fechas caen en temporada alta (junio–agosto). Tarifa +25%.
                </div>
              )}
              {tooShort && (
                <p className="text-xs text-terra-dk mt-1">La estancia mínima es de 2 días.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
