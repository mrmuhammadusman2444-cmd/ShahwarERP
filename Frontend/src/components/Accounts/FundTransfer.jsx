import React, { useState, useRef, useEffect } from 'react'
import { ArrowRight, User, Wallet, Landmark, Warehouse, ChevronDown, Check, Repeat } from 'lucide-react'

function DropdownField({ icon: Icon, label, placeholder, value, options, onSelect, tone = 'emerald' }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        function onClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', onClick)
        return () => document.removeEventListener('mousedown', onClick)
    }, [])

    const selected = options.find((o) => o.value === value)

    return (
        <div ref={ref} className="relative">
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-emerald-700/70">
                {label}
            </label>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`group flex w-full cursor-pointer items-center gap-3 rounded-2xl border-2 bg-white px-4 py-3.5 text-left shadow-sm transition-all duration-200 ${open ? 'border-emerald-500 shadow-emerald-100' : 'border-emerald-100 hover:border-emerald-300'
                    }`}
            >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${selected ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-400'
                    }`}>
                    {selected ? <selected.icon size={17} /> : <Icon size={17} />}
                </span>
                <span className="min-w-0 flex-1">
                    <span className={`block truncate text-[15px] font-semibold ${selected ? 'text-slate-800' : 'text-slate-400'}`}>
                        {selected ? selected.label : placeholder}
                    </span>
                </span>
                <ChevronDown size={17} className={`shrink-0 text-emerald-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>

            <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{ maxHeight: open ? '260px' : '0px', opacity: open ? 1 : 0 }}
            >
                <div className="mt-2 flex flex-col gap-1 rounded-2xl border border-emerald-100 bg-white p-1.5 shadow-lg shadow-emerald-950/5">
                    {options.map((opt) => {
                        const isActive = opt.value === value
                        return (
                            <button
                                type="button"
                                key={opt.value}
                                onClick={() => { onSelect(opt.value); setOpen(false) }}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer ${isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-emerald-50/60'
                                    }`}
                            >
                                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    <opt.icon size={14} />
                                </span>
                                {opt.label}
                                {isActive && <Check size={15} className="ml-auto text-emerald-600" />}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// ---- Nested picker that expands only for Customer / Bank / Supplier ----
function NestedPicker({ title, placeholder }) {
    const [query, setQuery] = useState('')
    return (
        <div className="mt-3 animate-[slideDown_0.25s_ease-out] rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/50 p-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-700">{title}</p>
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2.5">
                <svg className="h-4 w-4 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
                />
            </div>
        </div>
    )
}

const FROM_OPTIONS = [
    { value: 'customer', label: 'Customer', icon: User },
    { value: 'cash', label: 'Cash', icon: Wallet },
    { value: 'bank', label: 'Bank', icon: Landmark },
    { value: 'warehouse', label: 'Warehouse', icon: Warehouse },
]

const TO_OPTIONS = [
    { value: 'supplier', label: 'Supplier', icon: User },
    { value: 'bank', label: 'Bank', icon: Landmark },
    { value: 'cash', label: 'Cash', icon: Wallet },
]

export default function FundTransfer() {
    const [fromType, setFromType] = useState('')
    const [toType, setToType] = useState('')

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50 p-4 md:p-6">
            <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <div className="mx-auto max-w-3xl">

                <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-700 shadow-md shadow-emerald-200">
                        <Repeat className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">New Transaction</h1>
                        <p className="text-xs text-slate-400">Move funds between accounts</p>
                    </div>
                </div>

                <div className="relative rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm md:p-7">

                    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_auto_1fr]">

                        <div>
                            <DropdownField
                                icon={Wallet}
                                label="From"
                                placeholder="Select source"
                                value={fromType}
                                options={FROM_OPTIONS}
                                onSelect={setFromType}
                            />
                            {fromType === 'customer' && (
                                <NestedPicker title="Select customer" placeholder="Search customer..." />
                            )}
                            {fromType === 'bank' && (
                                <NestedPicker title="Select bank account" placeholder="Search bank..." />
                            )}
                        </div>

                        <div className="hidden h-full items-center justify-center pt-8 md:flex">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 shadow-md shadow-emerald-200">
                                <ArrowRight className="h-5 w-5 text-white" />
                            </span>
                        </div>
                        <div className="flex justify-center md:hidden">
                            <span className="flex h-9 w-9 rotate-90 items-center justify-center rounded-full bg-emerald-600 shadow-md shadow-emerald-200">
                                <ArrowRight className="h-4 w-4 text-white" />
                            </span>
                        </div>

                        <div>
                            <DropdownField
                                icon={Landmark}
                                label="To"
                                placeholder="Select destination"
                                value={toType}
                                options={TO_OPTIONS}
                                onSelect={setToType}
                            />
                            {toType === 'supplier' && (
                                <NestedPicker title="Select supplier" placeholder="Search supplier..." />
                            )}
                            {toType === 'bank' && (
                                <NestedPicker title="Select bank account" placeholder="Search bank..." />
                            )}
                        </div>

                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 border-t border-emerald-50 pt-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-emerald-700/70">Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-emerald-400">Rs.</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full rounded-2xl border-2 border-emerald-100 bg-emerald-50/40 py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-800 placeholder-slate-300 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-emerald-700/70">Date</label>
                            <input
                                type="date"
                                className="w-full rounded-2xl border-2 border-emerald-100 bg-emerald-50/40 px-4 py-3.5 text-sm font-medium text-slate-700 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        className="mt-6 w-full cursor-pointer rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-700 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 hover:from-emerald-500 hover:to-emerald-600 active:translate-y-0"
                    >
                        Save Transaction
                    </button>
                </div>
            </div>
        </div>
    )
}