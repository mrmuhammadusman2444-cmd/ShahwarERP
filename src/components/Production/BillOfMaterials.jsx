import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Layers, Package, Boxes, Plus, Trash2, Save, ChevronDown, Search, X } from 'lucide-react'

const NewBOM = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [saving, setSaving] = useState(false)

    const [fgOpen, setFgOpen] = useState(false)
    const [fgSearch, setFgSearch] = useState("")
    const [fg, setFg] = useState(null)
    const [batchSize, setBatchSize] = useState("")
    const [batchUnit, setBatchUnit] = useState("")
    const [remark, setRemark] = useState("")
    const [lines, setLines] = useState([])

    const [addOpen, setAddOpen] = useState(false)
    const [addSearch, setAddSearch] = useState("")

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
    const rmPmItems = items.filter((i) => i.category === "RM" || i.category === "PM")

    function addLine(item) {
        if (lines.find((l) => l.itemCode === item.itemCode)) return
        setLines((prev) => [...prev, {
            itemName: item.itemName,
            itemCode: item.itemCode,
            category: item.category,
            unit: item.unitOfMeasure || "",
            qty: "",
        }])
        setAddOpen(false)
        setAddSearch("")
    }

    function setQty(code, value) {
        setLines((prev) => prev.map((l) => l.itemCode === code ? { ...l, qty: value } : l))
    }

    function removeLine(code) {
        setLines((prev) => prev.filter((l) => l.itemCode !== code))
    }

    async function handleSave() {
        if (!fg) { alert("Finished Good select karo"); return }
        if (lines.length === 0) { alert("Kam se kam ek ingredient add karo"); return }
        setSaving(true)
        try {
            await axios.post('http://localhost:3000/add/bom', {
                fgItemName: fg.itemName,
                fgItemCode: fg.itemCode,
                batchSize: batchSize,
                batchUnit: batchUnit || fg.unitOfMeasure,
                items: lines,
                remark: remark,
            })
            setFg(null); setBatchSize(""); setBatchUnit(""); setRemark(""); setLines([])
            alert("BOM saved")
        } catch (err) {
            console.log("BOM SAVE FAILED:", err.response?.data || err.message)
            alert("Save failed")
        }
        setSaving(false)
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/40 p-4 md:p-6">

            <div className="mb-5 flex gap-1 bg-white border border-slate-200 shadow-sm p-1 rounded-xl w-fit">
                <button className="px-6 py-2 rounded-lg bg-linear-to-b from-emerald-500 to-emerald-700 cursor-pointer text-white text-sm font-semibold shadow-md shadow-emerald-200">
                    New BOM
                </button>
                <button onClick={() => navigate('/manage/bom')} className="px-6 py-2 rounded-lg cursor-pointer text-emerald-600 text-sm font-medium hover:bg-emerald-50 transition-all">
                    Manage BOM
                </button>
            </div>

            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-5 py-3.5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-200">
                    <Layers className="h-5 w-5" />
                </div>
                <div>
                    <h1 className="text-slate-800 text-base font-bold leading-tight">New Bill of Materials</h1>
                    <p className="text-slate-400 text-xs">Define recipe for a finished good (per batch)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                <div className="lg:col-span-1 flex flex-col gap-4">
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
                                        {fg && <span role="button" onClick={(e) => { e.stopPropagation(); setFg(null) }} className="flex h-4 w-4 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500"><X className="w-3 h-3" /></span>}
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
                                                        <button key={f._id} type="button" onClick={() => { setFg(f); setFgOpen(false); setFgSearch('') }}
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

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Batch Size</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Boxes className="h-4 w-4" /></span>
                                        <input  value={batchSize} onChange={(e) => setBatchSize(e.target.value)} placeholder="e.g. 100"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-9 pr-3 py-3 text-sm font-medium text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Unit</label>
                                    <input value={batchUnit} onChange={(e) => setBatchUnit(e.target.value)} placeholder="pouch"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-3 text-sm font-medium text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Remark</label>
                                <textarea rows={2} value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Optional notes..."
                                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-3 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                            </div>

                            <button type="button" onClick={handleSave} disabled={saving}
                                className="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
                                <Save className="h-4 w-4" />
                                {saving ? 'Saving...' : 'Save BOM'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="rounded-3xl border border-slate-200/70 bg-white shadow-lg shadow-slate-200/50 overflow-hidden flex flex-col min-h-[60vh]">
                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
                            <div className="flex items-center gap-2">
                                <span className="h-4 w-1 rounded-full bg-emerald-500" />
                                <h2 className="text-sm font-bold text-slate-800">Ingredients</h2>
                                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 ring-1 ring-emerald-100">{lines.length}</span>
                            </div>
                            <div className="relative">
                                <button onClick={() => setAddOpen((o) => !o)} className="flex items-center gap-1.5 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-700 px-4 py-3 text-xs font-bold text-white shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
                                    <Plus className="h-3.5 w-3.5" /> Add Item
                                </button>
                                {addOpen && (
                                    <div className="absolute right-0 top-full z-50 mt-1.5 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40">
                                        <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
                                            <Search className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                            <input autoFocus value={addSearch} onChange={(e) => setAddSearch(e.target.value)} placeholder="Search RM / PM..." className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-none" />
                                        </div>
                                        <div className="max-h-64 overflow-y-auto py-1">
                                            {rmPmItems.filter((i) => (i.itemName || '').toLowerCase().includes(addSearch.toLowerCase()) && !lines.find((l) => l.itemCode === i.itemCode)).length === 0 ? (
                                                <p className="px-4 py-6 text-center text-xs text-slate-400">No items</p>
                                            ) : (
                                                rmPmItems.filter((i) => (i.itemName || '').toLowerCase().includes(addSearch.toLowerCase()) && !lines.find((l) => l.itemCode === i.itemCode)).map((i) => (
                                                    <button key={i._id} type="button" onClick={() => addLine(i)}
                                                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-600 hover:bg-emerald-50/60 cursor-pointer">
                                                        <span className={`font-mono text-[10px] font-bold ${i.category === 'RM' ? 'text-emerald-600' : 'text-sky-600'}`}>{i.itemCode}</span>
                                                        <span className="flex-1 truncate">{i.itemName}</span>
                                                        <span className="text-[9px] text-slate-400">{i.unitOfMeasure}</span>
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto p-2">
                            {lines.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-2">
                                    <Boxes className="h-10 w-10 text-emerald-100" />
                                    <p className="text-sm font-semibold text-slate-400">No ingredients yet</p>
                                    <p className="text-xs text-slate-300">Add RM / PM from the button above</p>
                                </div>
                            ) : (
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-slate-400">
                                            <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wide">Code</th>
                                            <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wide">Item</th>
                                            <th className="px-3 py-2 text-center text-[10px] font-bold uppercase tracking-wide">Type</th>
                                            <th className="px-3 py-2 text-center text-[10px] font-bold uppercase tracking-wide">Qty / Batch</th>
                                            <th className="px-3 py-2 text-center text-[10px] font-bold uppercase tracking-wide">Unit</th>
                                            <th className="px-3 py-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lines.map((l, idx) => (
                                            <tr key={l.itemCode} className={`${idx % 2 === 1 ? 'bg-slate-50/50' : ''} rounded-xl`}>
                                                <td className="px-3 py-2 font-mono text-[11px] font-bold text-emerald-600">{l.itemCode}</td>
                                                <td className="px-3 py-2 text-xs font-semibold text-slate-800">{l.itemName}</td>
                                                <td className="px-3 py-2 text-center">
                                                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold ring-1 ${l.category === 'RM' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-sky-50 text-sky-700 ring-sky-200'}`}>{l.category}</span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input  value={l.qty} onChange={(e) => setQty(l.itemCode, e.target.value)} placeholder="0"
                                                        className="w-24 mx-auto block rounded-lg border border-slate-200 bg-slate-50/60 px-2 py-1.5 text-xs text-center text-slate-700 focus:border-emerald-400 focus:bg-white focus:outline-none transition-all" />
                                                </td>
                                                <td className="px-3 py-2 text-center text-xs text-slate-500">{l.unit}</td>
                                                <td className="px-3 py-2 text-center">
                                                    <button onClick={() => removeLine(l.itemCode)} className="w-7 h-7 inline-flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"><Trash2 size={13} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default NewBOM