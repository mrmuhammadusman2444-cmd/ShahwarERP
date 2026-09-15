import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { Layers, Search, Boxes, Package, Calculator, Home, ChevronRight, ChevronDown, X } from 'lucide-react'

const YieldOverview = () => {
    const [products, setProducts] = useState([])
    const [boms, setBoms] = useState([])
    const [bomOpen, setBomOpen] = useState(false)
    const [bomSearch, setBomSearch] = useState("")
    const [selectedBom, setSelectedBom] = useState(null)
    const [selectedType, setSelectedType] = useState("")
        const [lotOverride, setLotOverride] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                let pRes = await axios.get('http://localhost:3000/find/product')
                setProducts((pRes.data || []).filter((p) => p.saleRawCategory !== "Raw"))
                let bRes = await axios.get('http://localhost:3000/find/boms')
                setBoms(bRes.data || [])
            } catch (err) {
                console.log("FETCH FAILED:", err.response?.data || err.message)
            }
        }
        fetchData()
    }, [])

    function toGrams(w, unit) {
        let val = Number(w) || 0
        let u = (unit || "g").toLowerCase()
        if (u === "kg") return val * 1000
        if (u === "mg") return val / 1000
        return val
    }

        const bomLotGrams = selectedBom ? toGrams(selectedBom.batchSize, selectedBom.batchUnit) : 0
    const lotInGrams = lotOverride !== "" ? toGrams(lotOverride, "kg") : bomLotGrams

    const types = useMemo(() => {
        let set = new Set()
        products.forEach((p) => { if (p.mainCategory) set.add(p.mainCategory) })
        return Array.from(set)
    }, [products])

    const rows = useMemo(() => {
        if (!selectedBom || !selectedType) return []
        return products
            .filter((p) => p.mainCategory === selectedType)
            .map((p) => {
                let wGrams = toGrams(p.weight, p.weightUnit)
                let units = wGrams > 0 ? Math.floor(lotInGrams / wGrams) : 0
                let cartonSize = Number(p.cartonSize) || 0
                let cartons = cartonSize > 0 ? Math.floor(units / cartonSize) : 0
                return { productName: p.productName, weight: p.weight, weightUnit: p.weightUnit, cartonSize, units, cartons }
            })
            .sort((a, b) => toGrams(a.weight, a.weightUnit) - toGrams(b.weight, b.weightUnit))
    }, [products, lotInGrams, selectedType, selectedBom])

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/40 p-4 md:p-6">

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 shadow-lg shadow-emerald-300/40 ring-4 ring-white">
                        <Calculator className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold leading-tight text-slate-800">Yield Overview</h1>
                        <p className="text-[11px] font-medium tracking-wide text-slate-400">Recipe lot se ek packaging type ke sab sizes ka yield</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] shadow-sm">
                    <Home className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-slate-400">Production</span>
                    <ChevronRight className="h-3 w-3 text-slate-300" />
                    <span className="font-semibold text-emerald-600">Yield Overview</span>
                </div>
            </div>

            <div className="mb-5 rounded-3xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/50">
                <div className="h-1 w-full bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700" />
                <div className="p-5 flex flex-col lg:flex-row lg:items-end gap-4">
                    <div className="flex-1 max-w-xs">
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Select Recipe (BOM)</label>
                        <div className="relative">
                            <div onClick={() => setBomOpen((o) => !o)}
                                className={`flex cursor-pointer items-center gap-2 rounded-2xl border bg-slate-50/60 px-3 py-3 transition-all ${bomOpen ? 'border-emerald-400 bg-white ring-4 ring-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}>
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"><Layers className="h-4 w-4" /></span>
                                <span className={`flex-1 truncate text-sm font-medium ${selectedBom ? 'text-slate-800' : 'text-slate-400'}`}>{selectedBom ? selectedBom.fgItemName : 'Select BOM'}</span>
                                {selectedBom && <span role="button" onClick={(e) => { e.stopPropagation(); setSelectedBom(null) }} className="flex h-4 w-4 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500"><X className="w-3 h-3" /></span>}
                                <ChevronDown className={`h-4 w-4 shrink-0 text-emerald-400 transition-transform ${bomOpen ? 'rotate-180' : ''}`} />
                            </div>
                            {bomOpen && (
                                <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40">
                                    <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
                                        <Search className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                        <input autoFocus value={bomSearch} onChange={(e) => setBomSearch(e.target.value)} placeholder="Search BOM..." className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-none" />
                                    </div>
                                    <div className="max-h-56 overflow-y-auto py-1">
                                        {boms.filter((b) => (b.fgItemName || '').toLowerCase().includes(bomSearch.toLowerCase())).length === 0 ? (
                                            <p className="px-4 py-6 text-center text-xs text-slate-400">No BOM</p>
                                        ) : (
                                            boms.filter((b) => (b.fgItemName || '').toLowerCase().includes(bomSearch.toLowerCase())).map((b) => (
                                                <button key={b._id} type="button" onClick={() => { setSelectedBom(b); setBomOpen(false); setBomSearch('') }}
                                                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs text-slate-600 hover:bg-emerald-50/60 cursor-pointer">
                                                    <span className="font-mono text-[10px] font-bold text-emerald-600">{b.bomCode}</span>
                                                    <span className="flex-1 truncate">{b.fgItemName}</span>
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 max-w-xs">
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Packaging Type</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 z-10"><Boxes className="h-4 w-4" /></span>
                            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-9 py-3 text-sm font-medium text-slate-700 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none cursor-pointer">
                                <option value="">Select type</option>
                                {types.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />
                        </div>
                    </div>

                                        {selectedBom && (
                        <div className="flex-1 max-w-xs">
                            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Lot Size (Adjustable)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Boxes className="h-4 w-4" /></span>
                                <input value={lotOverride} onChange={(e) => setLotOverride(e.target.value)} placeholder={(bomLotGrams / 1000).toString()}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-9 pr-16 py-3 text-sm font-bold text-slate-800 placeholder-slate-400 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">kg</span>
                            </div>
                            <p className="mt-1 text-[9px] text-slate-400">Recipe lot: {(bomLotGrams / 1000).toLocaleString()} kg {lotOverride !== "" && <span className="text-amber-600 font-bold">· Adjusted to {lotOverride} kg</span>}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-white shadow-lg shadow-slate-200/50 overflow-hidden">
                <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-3.5">
                    <span className="h-4 w-1 rounded-full bg-emerald-500" />
                    <h2 className="text-sm font-bold text-slate-800">{selectedType || "Products"} Yield</h2>
                    {rows.length > 0 && <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 ring-1 ring-emerald-100">{rows.length} sizes</span>}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white">
                                <th className="text-left text-[11px] font-bold uppercase tracking-wide px-4 py-3">Product</th>
                                <th className="text-center text-[11px] font-bold uppercase tracking-wide px-4 py-3">Size</th>
                                <th className="text-right text-[11px] font-bold uppercase tracking-wide px-4 py-3">Units Possible</th>
                                <th className="text-right text-[11px] font-bold uppercase tracking-wide px-4 py-3">Cartons</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {!selectedBom ? (
                                <tr><td colSpan={4} className="text-center py-16 text-sm text-slate-400">Select a recipe first</td></tr>
                            ) : !selectedType ? (
                                <tr><td colSpan={4} className="text-center py-16 text-sm text-slate-400">Select a packaging type (Sachet, Box, Bucket...)</td></tr>
                            ) : rows.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-16">
                                        <div className="flex flex-col items-center gap-2"><Boxes className="w-10 h-10 text-emerald-100" /><p className="text-sm font-semibold text-slate-400">No products in this type</p></div>
                                    </td>
                                </tr>
                            ) : (
                                rows.map((r, i) => (
                                    <tr key={i} className={`hover:bg-emerald-50/40 transition-colors ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"><Package className="h-3.5 w-3.5" /></span>
                                                <span className="text-xs font-semibold text-slate-800">{r.productName}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">{r.weight} {r.weightUnit}</span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className="text-sm font-black text-emerald-700 tabular-nums">{r.units.toLocaleString()}</span>
                                            <span className="text-[10px] text-slate-400 ml-1">pcs</span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {r.cartonSize > 0 ? <span className="text-sm font-bold text-slate-700 tabular-nums">{r.cartons.toLocaleString()}</span> : <span className="text-xs text-slate-300">—</span>}
                                        </td>
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

export default YieldOverview