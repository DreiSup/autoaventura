'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { getVans } from '@/lib/data'
import { BookingNav } from '@/components/booking/booking-nav'
import { StepIndicator, StepIndicatorMobile } from '@/components/booking/step-indicator'
import { StepVehicle }  from '@/components/booking/step-vehicle'
import { StepDates }    from '@/components/booking/step-dates'
import { StepPack }     from '@/components/booking/step-pack'
import { StepSummary }  from '@/components/booking/step-summary'
import { SideSummary }  from '@/components/booking/side-summary'
import { PACKS }        from '@/config/packs'
import type { DateRange, PackId, VanId } from '@/lib/types'
import { Footer } from '@/components/footer'

const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

function nightsBetween(a: Date | null, b: Date | null) {
  if (!a || !b) return 0
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 86400000))
}
function hasHighSeason(start: Date | null, end: Date | null) {
  if (!start || !end) return false
  const cur = new Date(start)
  while (cur <= end) {
    const m = cur.getMonth()
    if (m >= 5 && m <= 7) return true
    cur.setDate(cur.getDate() + 1)
  }
  return false
}
function fmtShort(d: Date | null) {
  if (!d) return '—'
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`
}

function BackArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M10 6H2M5 2L1 6l4 4" />
    </svg>
  )
}

function BookingContent() {
  const searchParams = useSearchParams()
  const rawVanId = searchParams.get('van') as VanId | null
  const vans = getVans()
  const defaultVan = vans.find(v => v.id === rawVanId) ?? vans[0]

  const [step,  setStep]  = useState(0)
  const [van,   setVan]   = useState(defaultVan)
  const [dates, setDates] = useState<DateRange>({ start: null, end: null })
  const [pack,  setPack]  = useState<PackId>('sinpreo')

  const nights = nightsBetween(dates.start, dates.end)
  const high   = hasHighSeason(dates.start, dates.end)
  const rate   = high ? Math.round(van.price.low * 1.25) : van.price.low
  const packObj = PACKS.find(p => p.id === pack) ?? PACKS[0]
  const total  = nights * rate + nights * packObj.addPerDay

  const canContinue =
    step === 0 ? true :
    step === 1 ? nights >= 2 :
    step === 2 ? !!pack :
    true

  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-bg">
      <BookingNav />

      {/* ── Desktop ── */}
      <main className="hidden md:block px-16 py-8 pb-16">
        <div className="max-w-[1080px] mx-auto">
          <StepIndicator step={step} onJump={setStep} />

          <div className="grid grid-cols-[1fr_340px] gap-10 mt-7">
            {/* Main content */}
            <div>
              {step === 0 && <StepVehicle van={van} />}
              {step === 1 && <StepDates dates={dates} setDates={setDates} basePrice={van.price.low} />}
              {step === 2 && <StepPack pack={pack} setPack={setPack} />}
              {step === 3 && <StepSummary van={van} dates={dates} pack={pack} onJump={setStep} />}

              {step < 3 && (
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    className="flex items-center gap-2 font-display text-sm font-medium text-ink-3 hover:text-ink-2 transition-colors"
                  >
                    {step > 0 && <><BackArrow /> Atrás</>}
                  </button>
                  <button
                    onClick={() => canContinue && setStep(s => s + 1)}
                    className={[
                      'bg-terra text-[#fff7ef] font-display font-semibold text-[17px] py-[18px] px-7 rounded-full transition-all',
                      canContinue ? 'hover:bg-terra-dk' : 'opacity-40 cursor-not-allowed',
                    ].join(' ')}
                  >
                    Continuar →
                  </button>
                </div>
              )}
            </div>

            {/* Sticky sidebar */}
            <SideSummary van={van} dates={dates} pack={pack} step={step} />
          </div>
        </div>
      </main>

      {/* ── Mobile ── */}
      <div className="md:hidden pb-[130px]">
        <div className="px-5 pt-4">
          <StepIndicatorMobile step={step} />
        </div>

        <div className="px-5 py-3">
          {step === 0 && <StepVehicle van={van} />}
          {step === 1 && <StepDates dates={dates} setDates={setDates} basePrice={van.price.low} />}
          {step === 2 && <StepPack pack={pack} setPack={setPack} />}
          {step === 3 && <StepSummary van={van} dates={dates} pack={pack} onJump={setStep} />}
        </div>

        {/* Bottom drawer */}
        <div className="fixed bottom-0 left-0 right-0 bg-paper border-t border-line shadow-[0_-8px_24px_rgba(35,33,30,.08)] z-30">
          {drawerOpen && (
            <div className="px-5 pt-4 pb-0 border-b border-line">
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3 mb-3">Tu reserva</div>
              <div className="flex flex-col gap-2.5 mb-4 text-[13px]">
                <div className="flex justify-between gap-3">
                  <span className="text-ink-3">Vehículo</span>
                  <span className="text-ink font-medium">{van.name} · {van.sleeps} plazas</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-ink-3">Fechas</span>
                  <span className="text-ink font-medium">
                    {nights > 0 ? `${fmtShort(dates.start)} → ${fmtShort(dates.end)} · ${nights} ${nights===1?'día':'días'}` : '—'}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-ink-3">Pack</span>
                  <span className="text-ink font-medium">{step >= 2 ? packObj.name : '—'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Toggle + total */}
          <button
            onClick={() => setDrawerOpen(o => !o)}
            className="w-full px-5 py-3.5 flex items-center justify-between gap-3 text-left"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Total estimado</div>
              <div>
                <span className="font-display text-[22px] font-bold tracking-[-0.02em]">{nights > 0 ? `${total}€` : '—'}</span>
                {nights > 0 && <span className="text-[11px] text-ink-3 ml-1">IVA incl.</span>}
              </div>
            </div>
            <span className="flex items-center gap-1.5 font-display text-xs font-medium text-ink-3">
              {drawerOpen ? 'Ocultar' : 'Detalle'}
              <svg
                width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"
                className={['transition-transform duration-200', drawerOpen ? 'rotate-180' : ''].join(' ')}
              >
                <path d="M1 7 L5 3 L9 7" />
              </svg>
            </span>
          </button>

          <div className="px-5 pb-4">
            <button
              onClick={() => {
                if (step === 3) return
                if (canContinue) setStep(s => s + 1)
              }}
              className={[
                'w-full bg-terra text-[#fff7ef] font-display font-semibold text-[17px] py-[18px] rounded-full transition-all',
                canContinue ? 'hover:bg-terra-dk' : 'opacity-40 cursor-not-allowed',
              ].join(' ')}
            >
              {step === 3 ? `Confirmar y pagar — ${total}€` : 'Continuar →'}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  )
}

export default function ReservarPage() {
  return (
    <Suspense>
      <BookingContent />
    </Suspense>
  )
}
