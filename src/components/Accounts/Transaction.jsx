import React, { useState, useRef, useEffect } from 'react'
import BankDropDown from '../Bank/BankDropDown.jsx'
import SelectSupplier from '../Purchase/SelectProduct.jsx'
import axios from 'axios'
import { ArrowLeftRight, User, Wallet, Landmark, Warehouse, ChevronDown, Check, Repeat, ShieldCheck, Calendar, X, Search } from 'lucide-react'

function DropdownField({ icon: Icon, label, placeholder, value, options, onSelect }) {
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
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`flex w-full cursor-pointer flex-col items-start gap-2 rounded-2xl border bg-white px-4 py-3.5 text-left transition-all duration-200 ${open ? 'border-emerald-400 ring-4 ring-emerald-50' : 'border-slate-200 hover:border-emerald-300'
                    }`}
            >
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label} account</span>
                <span className="flex w-full items-center gap-2.5">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${selected ? 'bg-linear-to-br from-emerald-600 to-emerald-800 text-white' : 'bg-slate-100 text-slate-400'
                        }`}>
                        {selected ? <selected.icon size={16} /> : <Icon size={16} />}
                    </span>
                    <span className={`min-w-0 flex-1 truncate text-[15px] font-bold ${selected ? 'text-slate-800' : 'text-slate-400 font-medium'}`}>
                        {selected ? selected.label : placeholder}
                    </span>
                    <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                </span>
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
                                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${isActive ? 'bg-linear-to-br from-emerald-600 to-emerald-800 text-white' : 'bg-slate-100 text-slate-400'}`}>
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

function NestedPicker({ title, placeholder, value, onSelect, type = 'customer' }) {
    const [query, setQuery] = useState('')
    const [items, setItems] = useState([])

    useEffect(() => {
        async function handleFetch() {
            try {
                const url = type === 'supplier'
                    ? 'http://localhost:3000/find/supplier'
                    : 'http://localhost:3000/find'
                let res = await axios.get(url)
                setItems(res.data)
            } catch (err) {
                console.log("FETCH FAILED:", err.response?.data || err.message)
            }
        }
        handleFetch()
    }, [type])

    const nameKey = type === 'supplier' ? 'supplierName' : 'customerName'

    const filtered = items.filter((c) =>
        (c[nameKey] || "").toLowerCase().includes(query.toLowerCase())
    )

    const selected = items.find((c) => c[nameKey] === value)

    return (
        <div className="mt-2 animate-[slideDown_0.2s_ease-out] rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/50 p-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-emerald-700">{title}</p>

            {selected ? (
                <div className="flex items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 shrink-0">
                            {(selected[nameKey] || "?").charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-semibold text-slate-700 truncate">{selected[nameKey]}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => onSelect?.("")}
                        className="text-slate-400 hover:text-rose-500 cursor-pointer shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2.5">
                        <Search className="h-4 w-4 shrink-0 text-emerald-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={placeholder}
                            className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
                        />
                    </div>

                    <div className="mt-2 max-h-40 overflow-y-auto rounded-xl border border-emerald-100 bg-white">
                        {filtered.length === 0 ? (
                            <p className="text-center text-slate-400 text-xs py-4">No {type} found</p>
                        ) : (
                            filtered.map((c) => (
                                <button
                                    key={c._id}
                                    type="button"
                                    onClick={() => onSelect?.(c[nameKey])}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-left cursor-pointer hover:bg-emerald-50 transition-colors border-b border-emerald-50 last:border-0"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 shrink-0">
                                        {(c[nameKey] || "?").charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 truncate">{c[nameKey]}</span>
                                </button>
                            ))
                        )}
                    </div>
                </>
            )}
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
    const [fromBank, setFromBank] = useState('')
    const [toBank, setToBank] = useState('')
    const [fromCustomer, setFromCustomer] = useState('')
    const [toSupplier, setToSupplier] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [details, setDetails] = useState('')
    const [status, setStatus] = useState('idle')
    const [bankList, setBankList] = useState([])


    useEffect(() => {
        async function loadBanks() {
            try {
                let res = await axios.get('http://localhost:3000/find/bank')
                setBankList(res.data)
            } catch (err) {
                console.log("BANK LIST FAILED:", err.response?.data || err.message)
            }
        }
        loadBanks()
    }, [])

    async function handleSaveTransaction() {
        let selectedBankName = toType === 'bank' ? toBank : fromBank
        let bankObj = bankList.find((b) => b.bankName === selectedBankName)
        let bankId = bankObj ? bankObj._id : ""

        if (fromType === 'customer' && toType === 'bank') {
            if (!fromCustomer || !toBank || !amount) {
                alert("Customer, Bank aur Amount zaroori hai")
                return
            }
            setStatus('saving')
            try {
                await axios.post('http://localhost:3000/add/fund-transfer', {
                    date: date,
                    fromType: fromType,
                    toType: toType,
                    fromCustomer: fromCustomer,
                    bankName: toBank,
                    bankId: bankId,
                    amount: amount,
                    details: details,
                })
                setStatus('saved')
                window.dispatchEvent(new Event('approval-changed'))
                setTimeout(() => setStatus('idle'), 2000)
            } catch (err) {
                console.log("SAVE FAILED:", err.response?.data || err.message)
                setStatus('idle')
            }
        }
        // ── Customer → Supplier ──
        else if (fromType === 'customer' && toType === 'supplier') {
            if (!fromCustomer || !toSupplier || !amount) {
                alert("Customer, Supplier aur Amount zaroori hai")
                return
            }
            setStatus('saving')
            try {
                await axios.post('http://localhost:3000/add/fund-transfer', {
                    date: date,
                    fromType: fromType,
                    toType: toType,
                    fromCustomer: fromCustomer,
                    toSupplier: toSupplier,
                    amount: amount,
                    details: details,
                })
                setStatus('saved')
                window.dispatchEvent(new Event('approval-changed'))
                setTimeout(() => setStatus('idle'), 2000)
            } catch (err) {
                console.log("SAVE FAILED:", err.response?.data || err.message)
                setStatus('idle')
            }
        }
        // ── Bank → Supplier ──
        else if (fromType === 'bank' && toType === 'supplier') {
            if (!fromBank || !toSupplier || !amount) {
                alert("Bank, Supplier aur Amount zaroori hai")
                return
            }
            setStatus('saving')
            try {
                await axios.post('http://localhost:3000/add/fund-transfer', {
                    date: date,
                    fromType: fromType,
                    toType: toType,
                    bankName: fromBank,
                    bankId: bankId,
                    amount: amount,
                    toSupplier: toSupplier,
                    details: details,
                })
                setStatus('saved')
                window.dispatchEvent(new Event('approval-changed'))
                setTimeout(() => setStatus('idle'), 2000)
            } catch (err) {
                console.log("SAVE FAILED:", err.response?.data || err.message)
                setStatus('idle')
            }
        }
        else {
            alert("Filhaal sirf Customer to Bank aur Customer to Supplier available hai")
        }
    }

    const fromSummary = fromType === 'customer' ? (fromCustomer || 'Customer')
        : fromType === 'bank' ? (fromBank || 'Bank')
            : fromType === 'cash' ? 'Cash'
                : fromType === 'warehouse' ? 'Warehouse'
                    : '—'

    const toSummary = toType === 'supplier' ? (toSupplier || 'Supplier')
        : toType === 'bank' ? (toBank || 'Bank')
            : toType === 'cash' ? 'Cash'
                : '—'

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50 p-4 md:p-6 flex flex-col items-center">
            <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <div className="w-full max-w-5xl">

                <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-emerald-600 to-emerald-800 shadow-lg shadow-emerald-300/40 ring-4 ring-white">
                        <Repeat className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 leading-tight">Transaction</h1>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Make Transaction To Ledger Accordingly</p>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-xl shadow-slate-200/50 md:p-6">



                    <div className="relative grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr]">

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
                                <NestedPicker
                                    title="Select customer"
                                    placeholder="Search customer..."
                                    type="customer"
                                    value={fromCustomer}
                                    onSelect={setFromCustomer}
                                />
                            )}
                            {fromType === 'bank' && (
                                <div className="mt-2">
                                    <BankDropDown value={fromBank} onChange={(bankName) => setFromBank(bankName)} />
                                </div>
                            )}
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
                                <NestedPicker
                                    title="Select supplier"
                                    placeholder="Search supplier..."
                                    type="supplier"
                                    value={toSupplier}
                                    onSelect={setToSupplier}
                                />
                            )}
                            {toType === 'bank' && (
                                <div className="mt-2">
                                    <BankDropDown value={toBank} onChange={(bankName) => setToBank(bankName)} />
                                </div>
                            )}
                        </div>

                        <div className="pointer-events-none absolute left-1/2 top-6.5 hidden -translate-x-1/2 md:flex">
                            <span className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-slate-500 shadow-md">
                                <ArrowLeftRight size={15} />
                            </span>
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-[1.3fr_1fr]">
                        <div>
                            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">Amount</label>
                            <div className="flex items-center gap-2 rounded-2xl border-2 border-emerald-100 bg-emerald-50/30 px-4 py-3 transition-all focus-within:border-emerald-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-50">
                                <span className="text-2xl font-bold text-slate-700">Rs.</span>
                                <input

                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-transparent text-2xl font-bold text-slate-800 placeholder-slate-300 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                                <Calendar size={12} />
                                Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-700 h-13.5 transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">Notes / Description</label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Add reference or secure note..."
                            rows={2}
                            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 focus:outline-none"
                        />
                    </div>

                    <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Review summary</p>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">From</p>
                                    <p className="text-sm font-bold text-slate-700 truncate max-w-32">{fromSummary}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">To</p>
                                    <p className="text-sm font-bold text-slate-700 truncate max-w-32">{toSummary}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Amount</p>
                                    <p className="text-sm font-bold text-emerald-700">Rs. {amount ? Number(amount).toLocaleString() : '0'}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSaveTransaction}
                            disabled={status === 'saving'}
                            className="group relative flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-emerald-700 to-emerald-800 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                            {status === 'saving' ? (
                                <>
                                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Saving...
                                </>
                            ) : status === 'saved' ? (
                                <>
                                    <Check size={16} strokeWidth={3} />
                                    Saved!
                                </>
                            ) : (
                                <>
                                    <ShieldCheck size={16} />
                                    Confirm Transfer
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}