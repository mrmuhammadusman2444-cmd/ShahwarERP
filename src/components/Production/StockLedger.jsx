import { useState, useEffect } from 'react'
import axios from 'axios'
import { Boxes, Package, Search, ChevronDown, X, ArrowDownCircle, ArrowUpCircle, Home, ChevronRight } from 'lucide-react'

const catStyle = {
    RM: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    PM: 'bg-sky-50 text-sky-700 ring-sky-200',
    WIP: 'bg-amber-50 text-amber-700 ring-amber-200',
    FG: 'bg-violet-50 text-violet-700 ring-violet-200',
}

const StockLedger = () => {
    const [items, setItems] = useState([])
    const [itemOpen, setItemOpen] = useState(false)
    const [itemSearch, setItemSearch] = useState("")
    const [selectedItem, setSelectedItem] = useState(null)
    const [movements, setMovements] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchItems() {
            try {
                let res = await axios.get('http://localhost:3000/find/items')
                setItems(res.data)
            } catch (err) {
                console.log("ITEMS FAILED:", err.response?.data || err.message)
            }
        }
        fetchItems()
    }, [])

    async function loadLedger(item) {
        setLoading(true)
        try {
            let res = await axios.get('http://localhost:3000/stock-movements', { params: { itemName: item.itemName } })
            setMovements(res.data)
        } catch (err) {
            console.log("MOVEMENTS FAILED:", err.response?.data || err.message)
        }
        setLoading(false)
    }

    const totalIn = movements.filter((m) => m.type === "in").reduce((s, m) => s + (Number(m.quantity) || 0), 0)
    const totalOut = movements.filter((m) => m.type === "out").reduce((s, m) => s + (Number(m.quantity) || 0), 0)
    const balance = selectedItem ? Number(selectedItem.currentStock) || 0 : 0

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/40 p-4 md:p-6">

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 shadow-lg shadow-emerald-300/40 ring-4 ring-white">
                        <Boxes className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold leading-tight text-slate-800">Stock Ledger</h1>
                        <p className="text-[11px] font-medium tracking-wide text-slate-400">Item-wise stock movement history</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] shadow-sm">
                    <Home className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-slate-400">Production</span>
                    <ChevronRight className="h-3 w-3 text-slate-300" />
                    <span className="font-semibold text-emerald-600">Stock Ledger</span>
                </div>
            </div>

            <div className="mb-5 rounded-3xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/50">
                <div className="h-1 w-full bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700" />
                <div className="p-5 flex flex-col sm:flex-row sm:items-end gap-4">
                    <div className="flex-1 max-w-md">
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Select Item</label>
                        <div className="relative">
                            <div onClick={() => setItemOpen((o) => !o)}
                                className={`flex cursor-pointer items-center gap-2 rounded-2xl border bg-slate-50/60 px-3 py-3 transition-all ${itemOpen ? 'border-emerald-400 bg-white ring-4 ring-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}>
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"><Package className="h-4 w-4" /></span>
                                <span className={`flex-1 truncate text-sm font-medium ${selectedItem ? 'text-slate-800' : 'text-slate-400'}`}>{selectedItem ? selectedItem.itemName : 'Select item'}</span>
                                {selectedItem && <span role="button" onClick={(e) => { e.stopPropagation(); setSelectedItem(null); setMovements([]) }} className="flex h-4 w-4 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500"><X className="w-3 h-3" /></span>}
                                <ChevronDown className={`h-4 w-4 shrink-0 text-emerald-400 transition-transform ${itemOpen ? 'rotate-180' : ''}`} />
                            </div>
                            {itemOpen && (
                                <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40">
                                    <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
                                        <Search className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                        <input autoFocus value={itemSearch} onChange={(e) => setItemSearch(e.target.value)} placeholder="Search item..." className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-none" />
                                    </div>
                                    <div className="max-h-56 overflow-y-auto py-1">
                                        {items.filter((it) => (it.itemName || '').toLowerCase().includes(itemSearch.toLowerCase())).length === 0 ? (
                                            <p className="px-4 py-6 text-center text-xs text-slate-400">No items</p>
                                        ) : (
                                            items.filter((it) => (it.itemName || '').toLowerCase().includes(itemSearch.toLowerCase())).map((it) => (
                                                <button key={it._id} type="button" onClick={() => { setSelectedItem(it); setItemOpen(false); setItemSearch(''); loadLedger(it) }}
                                                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs text-slate-600 hover:bg-emerald-50/60 cursor-pointer">
                                                    <span className="font-mono text-[10px] font-bold text-emerald-600">{it.itemCode}</span>
                                                    <span className="flex-1 truncate">{it.itemName}</span>
                                                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ring-1 ${catStyle[it.category] || catStyle.RM}`}>{it.category}</span>
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {selectedItem && (
                        <div className="flex gap-3">
                            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 px-4 py-2.5 text-center">
                                <p className="text-[9px] font-bold uppercase tracking-wide text-emerald-600">Total In</p>
                                <p className="text-sm font-black text-emerald-700 tabular-nums">{totalIn.toLocaleString()}</p>
                            </div>
                            <div className="rounded-2xl border border-rose-100 bg-rose-50/50 px-4 py-2.5 text-center">
                                <p className="text-[9px] font-bold uppercase tracking-wide text-rose-500">Total Out</p>
                                <p className="text-sm font-black text-rose-600 tabular-nums">{totalOut.toLocaleString()}</p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-center shadow-sm">
                                <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">Balance</p>
                                <p className="text-sm font-black text-slate-800 tabular-nums">{balance.toLocaleString()} {selectedItem.unitOfMeasure}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-white shadow-lg shadow-slate-200/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white">
                                <th className="text-left text-[11px] font-bold uppercase tracking-wide px-4 py-3">Date</th>
                                <th className="text-left text-[11px] font-bold uppercase tracking-wide px-4 py-3">Type</th>
                                <th className="text-left text-[11px] font-bold uppercase tracking-wide px-4 py-3">Source</th>
                                <th className="text-left text-[11px] font-bold uppercase tracking-wide px-4 py-3">Reference</th>
                                <th className="text-right text-[11px] font-bold uppercase tracking-wide px-4 py-3">In</th>
                                <th className="text-right text-[11px] font-bold uppercase tracking-wide px-4 py-3">Out</th>
                                <th className="text-right text-[11px] font-bold uppercase tracking-wide px-4 py-3">Balance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {!selectedItem ? (
                                <tr><td colSpan={7} className="text-center py-16 text-sm text-slate-400">Select an item to view its ledger</td></tr>
                            ) : loading ? (
                                <tr><td colSpan={7} className="text-center py-16 text-sm text-slate-400">Loading...</td></tr>
                            ) : movements.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-16">
                                        <div className="flex flex-col items-center gap-2">
                                            <Boxes className="w-10 h-10 text-emerald-100" />
                                            <p className="text-slate-400 text-sm">No movements yet</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                movements.map((m, i) => (
                                    <tr key={i} className={`hover:bg-emerald-50/40 transition-colors ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                                        <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{m.date ? new Date(m.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</td>
                                        <td className="px-4 py-3">
                                            {m.type === "in" ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200"><ArrowDownCircle className="w-3 h-3" /> IN</span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-600 ring-1 ring-rose-200"><ArrowUpCircle className="w-3 h-3" /> OUT</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-xs text-slate-600 capitalize">{m.source || "—"}</td>
                                        <td className="px-4 py-3"><span className="font-mono text-[11px] text-slate-500">{m.reference || "—"}</span></td>
                                        <td className="px-4 py-3 text-right text-xs font-bold text-emerald-600 tabular-nums">{m.type === "in" ? `${Number(m.quantity || 0).toLocaleString()} ${m.unit || ''}` : "—"}</td>
                                        <td className="px-4 py-3 text-right text-xs font-bold text-rose-500 tabular-nums">{m.type === "out" ? `${Number(m.quantity || 0).toLocaleString()} ${m.unit || ''}` : "—"}</td>
                                        <td className="px-4 py-3 text-right text-xs font-bold text-slate-800 tabular-nums">{Number(m.balanceAfter || 0).toLocaleString()} {m.unit || ''}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default StockLedger