import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { ChevronDown, Search, Landmark, Check } from 'lucide-react'

const SelectBank = ({ value, onChange }) => {
    const [banks, setBanks] = useState([])
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const boxRef = useRef(null)

    useEffect(() => {
        async function loadBanks() {

            let res = await axios.get('http://localhost:3000/find/bank')
            setBanks(res.data)

        }
        loadBanks()
    }, [])

    useEffect(() => {
        function handleClickOutside(e) {
            if (boxRef.current && !boxRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // search se filter
    const filtered = banks.filter((b) =>
        (b.bankName || "").toLowerCase().includes(search.toLowerCase()) ||
        (b.accountNumber || "").toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="relative w-full" ref={boxRef}>

            {/* selected / trigger */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-2 bg-emerald-50 border border-emerald-100 focus:border-emerald-400 rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-all cursor-pointer hover:border-emerald-300"
            >
                <span className={`flex items-center gap-2 truncate ${value ? "text-gray-700" : "text-gray-400"}`}>
                    <Landmark className="w-4 h-4 text-emerald-500 shrink-0" />
                    {value || "Select bank"}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {/* dropdown */}
            {open && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-emerald-100 rounded-xl shadow-lg overflow-hidden">

                    {/* search */}
                    <div className="p-2 border-b border-emerald-50">
                        <div className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-100 rounded-lg px-2.5 py-1.5">
                            <Search className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <input
                                autoFocus
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search bank..."
                                className="bg-transparent text-xs text-gray-700 placeholder-gray-400 focus:outline-none w-full"
                            />
                        </div>
                    </div>

                    {/* list */}
                    <div className="max-h-52 overflow-y-auto">
                        {filtered.length === 0 ? (
                            <p className="text-center text-gray-400 text-xs py-4">No bank found</p>
                        ) : (
                            filtered.map((bank) => {
                                const isSelected = value === bank.bankName
                                return (
                                    <button
                                        key={bank._id}
                                        type="button"
                                        onClick={() => {
                                            onChange(bank.bankName)
                                            setOpen(false)
                                            setSearch("")
                                        }}
                                        className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-left hover:bg-emerald-50 transition-colors cursor-pointer ${isSelected ? "bg-emerald-50" : ""}`}
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <span className="w-7 h-7 shrink-0 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-[11px] font-bold">
                                                {(bank.bankName || "?").charAt(0).toUpperCase()}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-gray-700 text-xs font-medium truncate">{bank.bankName || "—"}</p>
                                                {bank.accountNumber && (
                                                    <p className="text-gray-400 text-[10px] font-mono truncate">{bank.accountNumber}</p>
                                                )}
                                            </div>
                                        </div>
                                        {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
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

export default SelectBank