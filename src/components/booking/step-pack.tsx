'use client'

import { useState } from 'react'
import { PACKS, COMPARE_ROWS } from '@/config/packs'
import type { PackId } from '@/lib/types'

interface StepPackProps {
  pack:    PackId
  setPack: (id: PackId) => void
}

function OkIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 4.5 L3.5 7 L8 1.5" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 2 L7 7 M7 2 L2 7" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 4 L6 8 L10 4" />
    </svg>
  )
}

function CheckCell({ v, accent }: { v: boolean | string; accent: boolean }) {
  if (v === true) {
    return (
      <span className={[
        'inline-flex items-center justify-center w-[18px] h-[18px] rounded-full',
        accent ? 'bg-sage text-white' : 'bg-sage-tn text-[#43523c]',
      ].join(' ')}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M1.5 5 L4 7.5 L8.5 2" />
        </svg>
      </span>
    )
  }
  return (
    <span className={['text-[13px]', accent ? 'font-semibold text-ink' : 'font-normal text-ink-2'].join(' ')}>
      {v}
    </span>
  )
}

function CompareTable() {
  return (
    <table className="w-full border-collapse text-[13px]">
      <thead>
        <tr className="bg-bg">
          <th className="text-left px-[18px] py-3 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3 font-medium">Característica</th>
          <th className="text-center px-3.5 py-3 font-display font-semibold text-ink-2">Aventurero</th>
          <th className="text-center px-3.5 py-3 font-display font-semibold text-ink">Sin Preocupaciones</th>
        </tr>
      </thead>
      <tbody>
        {COMPARE_ROWS.map((r, i) => (
          <tr key={i} className="border-t border-line">
            <td className="px-[18px] py-3 text-ink-2">{r.feat}</td>
            <td className="px-3.5 py-3 text-center"><CheckCell v={r.a} accent={false} /></td>
            <td className="px-3.5 py-3 text-center bg-[rgba(122,136,112,.06)]"><CheckCell v={r.b} accent /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function StepPack({ pack, setPack }: StepPackProps) {
  const [showCompare, setShowCompare] = useState(false)

  return (
    <div>
      <div className="mb-7">
        <div className="eyebrow text-terra">Paso 3 de 4</div>
        <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] mt-3">Elige tu pack.</h2>
        <p className="mt-2.5 text-ink-2 text-base leading-[1.55] max-w-[540px]">
          Lo básico ya está cubierto en ambos. La diferencia es cuánto quieres pensar al volver.
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        {PACKS.map(p => {
          const selected     = pack === p.id
          const recommended  = p.id === 'sinpreo'
          return (
            <button
              key={p.id}
              onClick={() => setPack(p.id)}
              className={[
                'text-left bg-paper rounded-md transition-all duration-150 cursor-pointer relative',
                selected
                  ? 'border-2 border-terra p-[23px] shadow-[0_2px_6px_rgba(194,85,58,.12)]'
                  : 'border border-line p-6',
                recommended && !selected ? 'shadow-[0_2px_6px_rgba(35,33,30,.06),0_8px_24px_rgba(35,33,30,.04)]' : '',
              ].join(' ')}
            >
              {recommended && (
                <span className="absolute -top-2.5 right-4 bg-ink text-paper font-display text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm">
                  Más popular
                </span>
              )}

              <div className="flex items-start gap-3.5">
                {/* Radio dot */}
                <span className={[
                  'w-5 h-5 rounded-full bg-paper shrink-0 mt-0.5 transition-all duration-150',
                  selected ? 'border-[6px] border-terra' : 'border-[1.5px] border-line-2',
                ].join(' ')} />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline flex-wrap gap-3">
                    <div>
                      <div className="font-display text-xl font-semibold text-ink tracking-[-0.01em]">{p.name}</div>
                      <div className="text-[13px] text-ink-3 mt-0.5">{p.tagline}</div>
                    </div>
                    <div className="text-right">
                      {p.addPerDay === 0 ? (
                        <div className="font-display text-sm font-semibold text-ok">Incluido</div>
                      ) : (
                        <>
                          <span className="font-display text-[22px] font-bold text-ink tracking-[-0.02em]">+{p.addPerDay}€</span>
                          <span className="text-xs text-ink-3 ml-1">/día</span>
                        </>
                      )}
                    </div>
                  </div>

                  <ul className="list-none p-0 mt-3.5 grid gap-[7px]">
                    {p.bullets.map((b, i) => (
                      <li key={i} className={['flex items-start gap-2.5 text-sm', b.ok ? 'text-ink-2' : 'text-ink-3'].join(' ')}>
                        <span className={[
                          'w-4 h-4 rounded-full inline-flex items-center justify-center shrink-0 mt-0.5',
                          b.ok ? 'bg-sage-tn text-[#43523c]' : 'bg-bg-2 text-ink-3',
                        ].join(' ')}>
                          {b.ok ? <OkIcon /> : <XIcon />}
                        </span>
                        <span>{b.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Expandable compare */}
      <button
        onClick={() => setShowCompare(!showCompare)}
        className="w-full mt-4 flex items-center justify-between px-[18px] py-3.5 bg-transparent border border-line rounded font-display font-medium text-sm text-ink-2 hover:bg-bg transition-colors"
      >
        <span>¿Qué incluye cada pack? Compara línea a línea</span>
        <span className={['transition-transform duration-200', showCompare ? 'rotate-180' : ''].join(' ')}>
          <ChevronDown />
        </span>
      </button>
      {showCompare && (
        <div className="bg-paper border border-line border-t-0 rounded-b overflow-x-auto">
          <CompareTable />
        </div>
      )}

      {/* Autoaventura Pass banner */}
      <div className="mt-6 bg-sage-tn rounded-md px-5 py-4 flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-full bg-sage text-paper shrink-0 flex items-center justify-center font-display font-bold text-sm tracking-[-0.02em]">
          A+
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold text-sm text-[#3b4a35]">Autoaventura Pass</div>
          <div className="text-[13px] text-[#4d5d44] leading-[1.45] mt-0.5">
            ¿Viajas más de 3 veces al año? Tarifa reducida y <em>Sin Preocupaciones</em> siempre incluido.{' '}
            <a href="#" className="underline underline-offset-[3px] font-semibold">Saber más →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
