import React, { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function fmt(dt) {
  const m = String(dt.getMonth() + 1).padStart(2, '0')
  const d = String(dt.getDate()).padStart(2, '0')
  return `${dt.getFullYear()}-${m}-${d}`
}

export default function DatePicker({ value, onChange, placeholder = 'Select date' }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(value ? new Date(value + 'T00:00:00') : null)
  const [view, setView] = useState(() => {
    const base = value ? new Date(value + 'T00:00:00') : new Date()
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const year = view.getFullYear()
  const month = view.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const today = new Date()
  const isToday = (d) => d && today.getDate() === d && today.getMonth() === month && today.getFullYear() === year
  const isSelected = (d) => d && selected && selected.getDate() === d && selected.getMonth() === month && selected.getFullYear() === year

  function prevMonth() { setView(new Date(year, month - 1, 1)) }
  function nextMonth() { setView(new Date(year, month + 1, 1)) }

  function pick(d) {
    const picked = new Date(year, month, d)
    setSelected(picked)
    onChange && onChange(fmt(picked))
    setOpen(false)
  }

  function pickToday() {
    const t = new Date()
    setSelected(t)
    setView(new Date(t.getFullYear(), t.getMonth(), 1))
    onChange && onChange(fmt(t))
    setOpen(false)
  }

  function clear(e) {
    e.stopPropagation()
    setSelected(null)
    onChange && onChange('')
  }

  const label = selected
    ? selected.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : ''

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full cursor-pointer items-center gap-2.5 rounded-2xl border bg-white px-4 py-2 text-left transition-all ${open ? 'border-emerald-400 ring-4 ring-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Calendar className="h-4 w-4" />
        </span>
        <span className={`flex-1 truncate text-sm font-semibold ${label ? 'text-slate-800' : 'text-slate-400 font-medium'}`}>
          {label || placeholder}
        </span>
        {selected && (
          <span
            role="button"
            onClick={clear}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
          >
            <X className="h-3.5 w-3.5" />
          </span>
        )}
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute left-0 z-50 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-300/40">
          {/* Header */}
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-800">{MONTHS[month]}</p>
              <p className="text-[11px] font-medium text-slate-400">{year}</p>
            </div>
            <button
              type="button"
              onClick={nextMonth}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekdays */}
          <div className="mb-1 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((w) => (
              <span key={w} className="flex h-7 items-center justify-center text-[10px] font-bold uppercase tracking-wide text-slate-400">
                {w}
              </span>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <span key={i} />
              const sel = isSelected(d)
              const tod = isToday(d)
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(d)}
                  className={`flex h-9 items-center justify-center rounded-lg text-[13px] font-semibold transition-all cursor-pointer
                    ${sel
                      ? 'bg-linear-to-br from-emerald-600 to-emerald-700 text-white shadow-sm shadow-emerald-300'
                      : tod
                        ? 'text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50'
                        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'}`}
                >
                  {d}
                </button>
              )
            })}
          </div>

          {/* Footer */}
          <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2.5">
            <button
              type="button"
              onClick={pickToday}
              className="cursor-pointer rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => { setSelected(null); onChange && onChange(''); setOpen(false) }}
              className="cursor-pointer rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
}