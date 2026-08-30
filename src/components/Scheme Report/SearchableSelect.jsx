import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, Check, X } from 'lucide-react'

export default function SearchableSelect({ options, value, onChange, placeholder = 'Select', icon: Icon }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full cursor-pointer items-center gap-2 rounded-xl border bg-emerald-50 px-3 py-2 text-left transition-all ${open ? 'border-emerald-400 bg-white ring-2 ring-emerald-100' : 'border-emerald-100 hover:border-emerald-300'}`}
      >
        {Icon && (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-600">
            <Icon className="h-3.5 w-3.5" />
          </span>
        )}
        <span className={`flex-1 truncate text-sm ${selected ? 'text-gray-700 font-semibold' : 'text-gray-400'}`}>
          {selected ? selected.label : placeholder}
        </span>
        {selected && (
          <span
            role="button"
            onClick={(e) => { e.stopPropagation(); onChange('') }}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
          >
            <X className="h-3.5 w-3.5" />
          </span>
        )}
        <ChevronDown className={`h-4 w-4 shrink-0 text-emerald-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <Search className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-center text-xs text-gray-400">No match found</p>
            ) : (
              filtered.map((o) => {
                const active = o.value === value
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => { onChange(o.value); setOpen(false); setQuery('') }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors cursor-pointer ${active ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600 hover:bg-emerald-50/60'}`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-[10px] font-bold text-emerald-700">
                      {(o.label || '?').charAt(0).toUpperCase()}
                    </span>
                    <span className="flex-1 truncate">{o.label}</span>
                    {active && <Check className="h-4 w-4 shrink-0 text-emerald-600" />}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}