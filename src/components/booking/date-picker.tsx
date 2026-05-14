'use client'

import { useState } from 'react'
import type { DateRange } from '@/lib/types'

const ES_MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
const ES_DOW = ['Lu','Ma','Mi','Ju','Vi','Sa','Do']

interface CalendarMonthProps {
  year:    number
  month:   number
  start:   Date | null
  end:     Date | null
  hover:   Date | null
  onPick:  (d: Date) => void
  onHover: (d: Date | null) => void
}

function CalendarMonth({ year, month, start, end, hover, onPick, onHover }: CalendarMonthProps) {
  const today = new Date(); today.setHours(0,0,0,0)
  const first = new Date(year, month, 1)
  const startDow = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  const endish = end || hover
  const inRange  = (d: Date) => !!(start && endish && d > start && d < endish)
  const isStart  = (d: Date) => !!(start && d.getTime() === start.getTime())
  const isEnd    = (d: Date) => !!(end   && d.getTime() === end.getTime())

  return (
    <div className="min-w-0">
      <div className="text-center font-display font-semibold text-sm text-ink mb-3 capitalize">
        {ES_MONTHS[month]} {year}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {ES_DOW.map((d, i) => (
          <div key={i} className="text-center font-mono text-[10px] text-ink-3 uppercase tracking-wider pb-1.5">{d}</div>
        ))}
        {cells.map((c, i) => {
          if (!c) return <div key={i} />
          const past = c < today
          const start_ = isStart(c)
          const end_   = isEnd(c)
          const range  = inRange(c)
          return (
            <div
              key={i}
              onClick={() => !past && onPick(c)}
              onMouseEnter={() => !past && onHover(c)}
              onMouseLeave={() => onHover(null)}
              className={[
                'flex items-center justify-center h-8 text-sm cursor-pointer select-none transition-colors',
                past ? 'text-ink-4 cursor-default' : 'text-ink hover:bg-bg-2',
                start_ ? 'bg-terra text-white hover:bg-terra-dk rounded-sm' : '',
                end_   ? 'bg-terra text-white hover:bg-terra-dk rounded-sm' : '',
                range  ? 'bg-terra-tn text-terra-dk rounded-none' : '',
                !start_ && !end_ && !range && !past ? 'rounded-sm' : '',
              ].filter(Boolean).join(' ')}
            >
              {c.getDate()}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface DatePickerProps {
  value:    DateRange
  onChange: (r: DateRange) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const today = new Date(); today.setHours(0,0,0,0)
  const [start, setStart] = useState<Date | null>(value.start)
  const [end,   setEnd]   = useState<Date | null>(value.end)
  const [hover, setHover] = useState<Date | null>(null)
  // On mobile, show only one month at a time
  const [mobileMonth, setMobileMonth] = useState(0) // 0 = current, 1 = next

  const pick = (d: Date) => {
    if (!start || (start && end)) {
      setStart(d); setEnd(null)
      onChange({ start: d, end: null })
    } else if (d <= start) {
      setStart(d)
      onChange({ start: d, end })
    } else {
      setEnd(d)
      onChange({ start, end: d })
    }
  }

  const base = new Date(today.getFullYear(), today.getMonth() + mobileMonth, 1)
  const next = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  const baseDesktop = new Date(today.getFullYear(), today.getMonth(), 1)

  return (
    <>
      {/* Desktop: two months side by side */}
      <div className="hidden md:grid grid-cols-2 gap-5">
        <CalendarMonth
          year={baseDesktop.getFullYear()} month={baseDesktop.getMonth()}
          start={start} end={end} hover={hover}
          onPick={pick} onHover={setHover}
        />
        <CalendarMonth
          year={next.getFullYear()} month={next.getMonth()}
          start={start} end={end} hover={hover}
          onPick={pick} onHover={setHover}
        />
      </div>

      {/* Mobile: one month with prev/next controls */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setMobileMonth(m => Math.max(0, m - 1))}
            disabled={mobileMonth === 0}
            className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 2L2 5l4 4" />
            </svg>
          </button>
          <button
            onClick={() => setMobileMonth(m => m + 1)}
            className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink-2"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 2l4 3-4 4" />
            </svg>
          </button>
        </div>
        <CalendarMonth
          year={base.getFullYear()} month={base.getMonth()}
          start={start} end={end} hover={hover}
          onPick={pick} onHover={setHover}
        />
      </div>
    </>
  )
}
