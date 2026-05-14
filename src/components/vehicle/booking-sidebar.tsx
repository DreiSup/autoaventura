'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DatePicker } from '@/components/booking/date-picker'
import type { Van, DateRange } from '@/lib/types'

const MONTHS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']

function fmtShort(d: Date) {
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`
}

function nightsBetween(a: Date | null, b: Date | null) {
  if (!a || !b) return 0
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 86400000))
}

function effectivePer(van: Van, nights: number): number {
  if (nights >= 14) return van.tiers[4].per
  if (nights >= 7)  return van.tiers[3].per
  if (nights >= 3)  return van.tiers[2].per
  if (nights === 2) return van.tiers[1].per
  return van.tiers[0].per
}

export function BookingSidebar({ van }: { van: Van }) {
  const [dates, setDates]     = useState<DateRange>({ start: null, end: null })
  const [calOpen, setCalOpen] = useState(false)

  const nights = nightsBetween(dates.start, dates.end)
  const per    = nights > 0 ? effectivePer(van, nights) : van.price.low
  const total  = nights * per

  const bookingHref = dates.start && dates.end
    ? `/reservar?van=${van.id}&from=${dates.start.toISOString().split('T')[0]}&to=${dates.end.toISOString().split('T')[0]}`
    : `/reservar?van=${van.id}`

  return (
    <div className="bg-paper rounded border border-line shadow-card p-6 sticky top-[88px]">
      {/* Price */}
      <div className="mb-5">
        <div className="font-mono text-[10px] text-ink-3 uppercase tracking-[0.08em] mb-1">Desde</div>
        <div>
          <span className="font-display text-[36px] font-bold tracking-[-0.02em] leading-none">{van.price.low}€</span>
          <span className="text-sm text-ink-3"> / día</span>
        </div>
        <div className="text-[12px] text-ink-3 mt-1">temporada baja · todo incluido</div>
      </div>

      {/* Date selector */}
      <div className="border border-line rounded overflow-hidden mb-3.5">
        <button
          onClick={() => setCalOpen(o => !o)}
          className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-bg-2 transition-colors"
        >
          <div className="flex gap-6 items-center">
            <div>
              <div className="font-display text-[10px] font-semibold tracking-[0.08em] uppercase text-ink-3 mb-0.5">Recogida</div>
              <div className="text-sm font-medium">{dates.start ? fmtShort(dates.start) : '—'}</div>
            </div>
            <span className="text-ink-3">→</span>
            <div>
              <div className="font-display text-[10px] font-semibold tracking-[0.08em] uppercase text-ink-3 mb-0.5">Devolución</div>
              <div className="text-sm font-medium">{dates.end ? fmtShort(dates.end) : '—'}</div>
            </div>
          </div>
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round"
            style={{ transform: calOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}
          >
            <path d="M3 5l4 4 4-4" />
          </svg>
        </button>

        {calOpen && (
          <div className="px-4 py-4 border-t border-line">
            <DatePicker value={dates} onChange={setDates} />
          </div>
        )}
      </div>

      {/* Price breakdown */}
      {nights > 0 && (
        <div className="bg-bg-2 rounded px-4 py-3.5 mb-4">
          <div className="flex justify-between text-[13px] mb-2">
            <span className="text-ink-2">{per}€ × {nights} {nights === 1 ? 'día' : 'días'}</span>
            <span className="font-display font-semibold">{per * nights}€</span>
          </div>
          <div className="h-px bg-line my-2.5" />
          <div className="flex justify-between items-baseline">
            <span className="font-display font-semibold text-sm">Total estimado</span>
            <span className="font-display font-bold text-[22px] tracking-[-0.02em]">{total}€</span>
          </div>
        </div>
      )}

      {/* CTAs */}
      <Link
        href={bookingHref}
        className="block w-full bg-terra text-[#fff7ef] font-display font-semibold text-[15px] text-center py-3.5 rounded-full hover:bg-terra-dk transition-colors mb-2.5"
      >
        {dates.start && dates.end ? 'Reservar ahora' : 'Ver disponibilidad'}
      </Link>
      <a
        href="https://wa.me/34962123456"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-wa text-white font-display font-semibold text-[14px] py-3.5 rounded-full hover:opacity-90 transition-opacity"
      >
        <WaIcon />
        Preguntar por WhatsApp
      </a>

      {/* Policy lines */}
      <div className="mt-5 pt-5 border-t border-line flex flex-col gap-3">
        <PolicyLine title="Cancelación flexible" sub="Gratis hasta 30 días antes. 50% hasta 14 días.">
          <path d="M2 6l2 2 4-5" />
          <path d="M9 8h3M9 11h3" />
        </PolicyLine>
        <PolicyLine title="Kilometraje" sub="Ilimitado">
          <circle cx="7" cy="7" r="5" />
          <path d="M7 4v3l2 1" />
        </PolicyLine>
        <PolicyLine title="Seguro" sub="A todo riesgo con franquicia">
          <path d="M7 1l5 2v4c0 3-2 5-5 6-3-1-5-3-5-6V3l5-2z" />
        </PolicyLine>
        <PolicyLine title="Fianza" sub="1.200€ · devolución 7–10 días">
          <path d="M2 7h10M9 4l3 3-3 3" />
        </PolicyLine>
      </div>
    </div>
  )
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 14.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.9-1-3.2-1.7-4.5-3.9-.4-.6.4-.5 1-1.6.1-.2.1-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.6 1.1 3.1 1.3 3.3.2.3 2.2 3.5 5.4 4.9 2 .8 2.8.9 3.8.8.6-.1 1.7-.7 2-1.4.3-.7.3-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
    </svg>
  )
}

function PolicyLine({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5 items-start">
      <svg
        width="14" height="14" viewBox="0 0 14 14" fill="none"
        stroke="var(--terra)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
        className="shrink-0 mt-0.5"
      >
        {children}
      </svg>
      <div className="text-[13px]">
        <div className="font-display font-semibold text-ink">{title}</div>
        <div className="text-ink-3">{sub}</div>
      </div>
    </div>
  )
}
