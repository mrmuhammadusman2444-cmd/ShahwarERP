import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Factory, Package, Boxes, Calendar, Search, ChevronDown, X, CheckCircle2, AlertTriangle, Play } from 'lucide-react'

const NewProductionOrders = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [saving, setSaving] = useState(false)

    const [fgOpen, setFgOpen] = useState(false)
    const [fgSearch, setFgSearch] = useState("")
    const [fg, setFg] = useState(null)
    const [quantity, setQuantity] = useState("")
    const [date, setDate] = useState("")
    const [remark, setRemark] = useState("")

    const [calc, setCalc] = useState(null)
    const [calcLoading, setCalcLoading] = useState(false)

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

    const fgItems = items.filter((i) => i.category === "FG")

    async function handleCalculate() {
        if (!fg) { alert("Finished Good select karo"); return }
        if (!quantity || Number(quantity) <= 0) { alert("Quantity daalo"); return }
        setCalcLoading(true)
        try {
            let res = await axios.get(`http://localhost:3000/production/calculate/${fg.itemName}/${quantity}`)
            setCalc(res.data)
        } catch (err) {
            console.log("CALC FAILED:", err.response?.data || err.message)
        }
        setCalcLoading(false)
    }

    const canProduce = calc && calc.found && (calc.materials || []).every((m) => m.enough)

    async function handleCreate() {
        if (!calc || !calc.found) { alert("Pehle material calculate karo"); return }
        setSaving(true)
        try {
            await axios.post('http://localhost:3000/add/production-order', {
                fgItemName: fg.itemName,
                fgItemCode: fg.itemCode,
                quantity: quantity,
                unit: fg.unitOfMeasure,
                bomCode: calc.bomCode,
                requiredMaterials: calc.materials,
                date: date || new Date(),
                remark: remark,
            })
            setFg(null); setQuantity(""); setDate(""); setRemark(""); setCalc(null)
            alert("Production order created")
            navigate('/manage/production/order')
        } catch (err) {
            console.log("CREATE FAILED:", err.response?.data || err.message)
            alert("Create failed")
        }
        setSaving(false)
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/40 p-4 md:p-6">

            <div className="mb-5 flex gap-1 bg-white border border-slate-200 shadow-sm p-1 rounded-xl w-fit">
                <button className="px-6 py-2 rounded-lg bg-linear-to-b from-emerald-500 to-emerald-700 cursor-pointer text-white text-sm font-semibold shadow-md shadow-emerald-200">
                    New Order
                </button>
                <button onClick={() => navigate('/manage/production/order')} className="px-6 py-2 rounded-lg cursor-pointer text-emerald-600 text-sm font-medium hover:bg-emerald-50 transition-all">
                    Manage Orders
                </button>
            </div>

            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-5 py-3.5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-200">
                    <Factory className="h-5 w-5" />
                </div>
                <div>
                    <h1 className="text-slate-800 text-base font-bold leading-tight">New Production Order</h1>
                    <p className="text-slate-400 text-xs">Select a finished good and quantity to plan material</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                <div className="lg:col-span-1">
                    <div className="rounded-3xl border border-slate-200/70 bg-white shadow-lg shadow-slate-200/50 overflow-hidden">
                        <div className="h-1 w-full bg-linear-to-r from-emerald-500 to-emerald-700" />
                        <div className="p-5 flex flex-col gap-4">

                            <div>
                                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Finished Good <span className="text-rose-400">*</span></label>
                                <div className="relative">
                                    <div onClick={() => setFgOpen((o) => !o)}
                                        className={`flex cursor-pointer items-center gap-2 rounded-2xl border bg-slate-50/60 px-3 py-3 transition-all ${fgOpen ? 'border-emerald-400 bg-white ring-4 ring-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}>
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600"><Package className="h-4 w-4" /></span>
                                        <span className={`flex-1 truncate text-sm font-medium ${fg ? 'text-slate-800' : 'text-slate-400'}`}>{fg ? fg.itemName : 'Select finished good'}</span>
                                        {fg && <span role="button" onClick={(e) => { e.stopPropagation(); setFg(null); setCalc(null) }} className="flex h-4 w-4 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500"><X className="w-3 h-3" /></span>}
                                        <ChevronDown className={`h-4 w-4 shrink-0 text-emerald-400 transition-transform ${fgOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                    {fgOpen && (
                                        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40">
                                            <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
                                                <Search className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                                <input autoFocus value={fgSearch} onChange={(e) => setFgSearch(e.target.value)} placeholder="Search FG..." className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-none" />
                                            </div>
                                            <div className="max-h-56 overflow-y-auto py-1">
                                                {fgItems.filter((f) => (f.itemName || '').toLowerCase().includes(fgSearch.toLowerCase())).length === 0 ? (
                                                    <p className="px-4 py-6 text-center text-xs text-slate-400">No finished goods</p>
                                                ) : (
                                                    fgItems.filter((f) => (f.itemName || '').toLowerCase().includes(fgSearch.toLowerCase())).map((f) => (
                                                        <button key={f._id} type="button" onClick={() => { setFg(f); setFgOpen(false); setFgSearch(''); setCalc(null) }}
                                                            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs text-slate-600 hover:bg-emerald-50/60 cursor-pointer">
                                                            <span className="font-mono text-[10px] font-bold text-violet-600">{f.itemCode}</span>
                                                            <span className="flex-1 truncate">{f.itemName}</span>
                                                        </button>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Quantity to Produce <span className="text-rose-400">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Boxes className="h-4 w-4" /></span>
                                    <input  value={quantity} onChange={(e) => { setQuantity(e.target.value); setCalc(null) }} placeholder="e.g. 500"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-9 pr-16 py-3 text-sm font-medium text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                                    {fg && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">{fg.unitOfMeasure}</span>}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Date</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Calendar className="h-4 w-4" /></span>
                                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-9 pr-3 py-3 text-sm font-medium text-slate-700 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Remark</label>
                                <textarea rows={2} value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Optional..."
                                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-3 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                            </div>

                            <button type="button" onClick={handleCalculate} disabled={calcLoading}
                                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-500 bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-100 cursor-pointer disabled:opacity-70">
                                <Search className="h-4 w-4" />
                                {calcLoading ? 'Calculating...' : 'Calculate Material'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="rounded-3xl border border-slate-200/70 bg-white shadow-lg shadow-slate-200/50 overflow-hidden flex flex-col min-h-[60vh]">
                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
                            <div className="flex items-center gap-2">
                                <span className="h-4 w-1 rounded-full bg-emerald-500" />
                                <h2 className="text-sm font-bold text-slate-800">Required Materials</h2>
                                {calc && calc.found && <span className="rounded-full bg-slate-50 px-2.5 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200 font-mono">{calc.bomCode}</span>}
                            </div>
                            {calc && calc.found && (
                                canProduce
                                    ? <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" /> Stock Available</span>
                                    : <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold text-rose-600 ring-1 ring-rose-200"><AlertTriangle className="h-3.5 w-3.5" /> Shortage</span>
                            )}
                        </div>

                        <div className="flex-1 overflow-auto p-4">
                            {!calc ? (
                                <div className="flex flex-col items-center justify-center py-24 gap-2">
                                    <Boxes className="h-12 w-12 text-emerald-100" />
                                    <p className="text-sm font-semibold text-slate-400">No calculation yet</p>
                                    <p className="text-xs text-slate-300">Select FG + quantity, then Calculate</p>
                                </div>
                            ) : !calc.found ? (
                                <div className="flex flex-col items-center justify-center py-24 gap-2">
                                    <AlertTriangle className="h-12 w-12 text-amber-200" />
                                    <p className="text-sm font-semibold text-slate-500">No BOM found</p>
                                    <p className="text-xs text-slate-400">Create a recipe for this finished good first</p>
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-slate-100 overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-slate-50 text-slate-500">
                                                <th className="text-left text-[10px] font-bold uppercase px-4 py-2.5">Item</th>
                                                <th className="text-center text-[10px] font-bold uppercase px-4 py-2.5">Type</th>
                                                <th className="text-right text-[10px] font-bold uppercase px-4 py-2.5">Required</th>
                                                <th className="text-right text-[10px] font-bold uppercase px-4 py-2.5">In Stock</th>
                                                <th className="text-center text-[10px] font-bold uppercase px-4 py-2.5">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {(calc.materials || []).map((m, i) => (
                                                <tr key={i} className={`${m.enough ? '' : 'bg-rose-50/40'}`}>
                                                    <td className="px-4 py-3">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-semibold text-slate-800">{m.itemName}</span>
                                                            <span className="font-mono text-[10px] text-slate-400">{m.itemCode}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold ring-1 ${m.category === 'RM' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-sky-50 text-sky-700 ring-sky-200'}`}>{m.category}</span>
                                                    </td>
                                                    <td className="px-4 py-3 text-right text-xs font-bold text-slate-800 tabular-nums">{Number(m.requiredQty || 0).toLocaleString()} {m.unit}</td>
                                                    <td className="px-4 py-3 text-right text-xs font-medium tabular-nums text-slate-600">{Number(m.availableStock || 0).toLocaleString()} {m.unit}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        {m.enough ? (
                                                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" /></span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600 ring-1 ring-rose-200">-{Number(m.shortage || 0).toLocaleString()}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {calc && calc.found && (
                            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/40 px-5 py-4">
                                <p className="text-xs text-slate-500">{canProduce ? 'All materials available — ready to produce' : 'Some materials short — purchase more or reduce quantity'}</p>
                                <button type="button" onClick={handleCreate} disabled={saving}
                                    className={`flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-70 ${canProduce ? 'bg-linear-to-r from-emerald-600 to-emerald-800 shadow-emerald-900/20' : 'bg-linear-to-r from-slate-400 to-slate-500 shadow-slate-300'}`}>
                                    <Play className="h-4 w-4" />
                                    {saving ? 'Creating...' : 'Create Order'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default NewProductionOrders