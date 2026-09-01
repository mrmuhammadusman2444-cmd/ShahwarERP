import { useState, useRef, useEffect } from 'react'
import { Search, X, Users, Check } from 'lucide-react'

export default function MultiCustomerSelect({ options, selected, onChange, placeholder = 'Type customer name...' }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setFocused(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const filtered = query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()) && !selected.includes(o))
    : []

  function add(name) {
    if (!selected.includes(name)) onChange([...selected, name])
    setQuery('')
  }

  function remove(name) {
    onChange(selected.filter((c) => c !== name))
  }

  return (
    <div ref={ref} className="relative w-full">
      <div className={`flex min-h-11 w-full flex-wrap items-center gap-1.5 rounded-xl border bg-emerald-50/70 px-2.5 py-1.5 transition-all ${focused ? 'border-emerald-400 bg-white ring-4 ring-emerald-50' : 'border-emerald-100'}`}>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
          <Users className="h-3.5 w-3.5" />
        </span>

        {selected.map((name) => (
          <span key={name} className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">            {name}
            <span role="button" onClick={() => remove(name)} className="flex h-4 w-4 items-center justify-center rounded-full text-emerald-500 hover:bg-emerald-200 hover:text-rose-500 cursor-pointer">
              <X className="h-3 w-3" />
            </span>
          </span>
        ))}

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={selected.length === 0 ? placeholder : ''}
          className="flex-1 min-w-24 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
        />
      </div>

      {focused && query && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40">
          <div className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-center text-xs text-gray-400">No customer found</p>
            ) : (
              filtered.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => add(name)}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-gray-600 transition-colors cursor-pointer hover:bg-emerald-50"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-[10px] font-bold text-emerald-700">
                    {(name || '?').charAt(0).toUpperCase()}
                  </span>
                  <span className="flex-1 truncate">{name}</span>
                  <span className="text-emerald-400"><Check className="h-3.5 w-3.5" /></span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}