import { useState,useEffect  } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { Package, Hash, Tag, Scale, Boxes, Bell, DollarSign, Warehouse, FileText, Save, ChevronDown } from 'lucide-react'

const categories = [
    { id: 'RM', label: 'Raw Material', tone: 'from-emerald-500 to-emerald-700', ring: 'ring-emerald-200', soft: 'bg-emerald-50 text-emerald-700' },
    { id: 'PM', label: 'Packing Material', tone: 'from-sky-500 to-sky-700', ring: 'ring-sky-200', soft: 'bg-sky-50 text-sky-700' },
    { id: 'WIP', label: 'Semi-Finished (WIP)', tone: 'from-amber-500 to-amber-600', ring: 'ring-amber-200', soft: 'bg-amber-50 text-amber-700' },
    { id: 'FG', label: 'Finished Good', tone: 'from-violet-500 to-violet-700', ring: 'ring-violet-200', soft: 'bg-violet-50 text-violet-700' },
]

const units = ['kg', 'litre', 'pieces', 'meter', 'dozen', 'gram', 'ml', 'carton', 'box']

const NewItem = () => {
    const navigate = useNavigate()
    const [saving, setSaving] = useState(false)
    const [item, setItem] = useState({
        itemName: '',
        category: 'RM',
        unitOfMeasure: '',
        currentStock: '',
        reorderLevel: '',
        costPerUnit: '',
        warehouseLocation: '',
        description: '',
        batchTracking: false,
    })

    function set(field, value) {
        setItem((p) => ({ ...p, [field]: value }))
    }

       async function handleSave() {
        setSaving(true)
        try {
            if (editId) {
                await axios.put(`http://localhost:3000/update/item/${editId}`, item)
                navigate('/manageitem')
            } else {
                await axios.post('http://localhost:3000/add/item', item)
                setItem({ itemName: '', category: 'RM', unitOfMeasure: '', currentStock: '', reorderLevel: '', costPerUnit: '', warehouseLocation: '', description: '', batchTracking: false })
            }
        } catch (err) {
            console.log("ITEM SAVE FAILED:", err.response?.data || err.message)
        }
        setSaving(false)
    }

        const location = useLocation()
    const editItem = location.state?.editItem || null
    const [editId, setEditId] = useState(null)

    useEffect(() => {
        if (editItem) {
            setEditId(editItem._id)
            setItem({
                itemName: editItem.itemName || '',
                category: editItem.category || 'RM',
                unitOfMeasure: editItem.unitOfMeasure || '',
                currentStock: editItem.currentStock ?? '',
                reorderLevel: editItem.reorderLevel ?? '',
                costPerUnit: editItem.costPerUnit ?? '',
                warehouseLocation: editItem.warehouseLocation || '',
                description: editItem.description || '',
                batchTracking: editItem.batchTracking || false,
            })
        }
    }, [])

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/40 p-4 md:p-6">
           {/* <div className="mb-5 flex gap-1 bg-white border border-slate-200 shadow-sm p-1 rounded-xl w-fit">
                <button className="px-6 py-2 rounded-lg bg-linear-to-b from-emerald-500 to-emerald-700 cursor-pointer text-white text-sm font-semibold shadow-md shadow-emerald-200">
                    New Item
                </button>
                <button onClick={() => navigate('/manageitem')} className="px-6 py-2 rounded-lg cursor-pointer text-emerald-600 text-sm font-medium hover:bg-emerald-50 transition-all">
                    Manage Items
                </button>
            </div> */}
            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-5 py-3.5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-200">
                    <Package className="h-5 w-5" />
                </div>
                <div>
                    <h1 className="text-slate-800 text-base font-bold leading-tight">New Item</h1>
                    <p className="text-slate-400 text-xs">Add a raw material, packing material or finished good</p>
                </div>
                <span className="ml-auto flex items-center gap-1.5 rounded-xl bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500">
                    <Hash className="h-3.5 w-3.5 text-emerald-500" />
                    Auto Code
                </span>
                
            </div>
           

            <div className="mx-auto w-full ">
                <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/50">
                    <div className="h-1 w-full bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700" />

                   

                    <div className="p-6">

                        <div className="mb-5">
                            <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Category</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {categories.map((c) => {
                                    const active = item.category === c.id
                                    return (
                                        <button key={c.id} type="button" onClick={() => set('category', c.id)}
                                            className={`flex flex-col items-start gap-1 rounded-2xl border-2 px-4 py-3 transition-all cursor-pointer ${active ? `border-transparent ring-2 ${c.ring} bg-linear-to-br ${c.tone} text-white shadow-md` : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                                            <span className={`text-[10px] font-black tracking-wider ${active ? 'text-white/90' : 'text-slate-400'}`}>{c.id}</span>
                                            <span className={`text-xs font-bold ${active ? 'text-white' : 'text-slate-600'}`}>{c.label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="sm:col-span-2">
                                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Item Name <span className="text-rose-400">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500"><Tag className="h-4 w-4" /></span>
                                    <input value={item.itemName} onChange={(e) => set('itemName', e.target.value)} placeholder="e.g. Aata, Pouch, Biscuit Carton"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-3 py-3 text-sm font-medium text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Unit of Measure</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500 z-10"><Scale className="h-4 w-4" /></span>
                                    <select value={item.unitOfMeasure} onChange={(e) => set('unitOfMeasure', e.target.value)}
                                        className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-9 py-3 text-sm font-medium text-slate-700 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none cursor-pointer">
                                        <option value="">Select unit</option>
                                        {units.map((u) => <option key={u} value={u}>{u}</option>)}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Current Stock</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500"><Boxes className="h-4 w-4" /></span>
                                    <input value={item.currentStock} onChange={(e) => set('currentStock', e.target.value)} placeholder="0"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-3 py-3 text-sm font-medium text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Reorder Level</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500"><Bell className="h-4 w-4" /></span>
                                    <input value={item.reorderLevel} onChange={(e) => set('reorderLevel', e.target.value)} placeholder="0"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-3 py-3 text-sm font-medium text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Price</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rs</span>
                                    <input value={item.costPerUnit} onChange={(e) => set('costPerUnit', e.target.value)} placeholder="0"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-3 py-3 text-sm font-medium text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Warehouse / Location</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500"><Warehouse className="h-4 w-4" /></span>
                                    <input value={item.warehouseLocation} onChange={(e) => set('warehouseLocation', e.target.value)} placeholder="e.g. Store-A"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-3 py-3 text-sm font-medium text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                    <FileText className="h-3.5 w-3.5 text-emerald-500" /> Description
                                </label>
                                <textarea rows={2} value={item.description} onChange={(e) => set('description', e.target.value)} placeholder="Optional notes..."
                                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                            </div>

                            <div className="sm:col-span-2">
                                <button type="button" onClick={() => set('batchTracking', !item.batchTracking)}
                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 w-full cursor-pointer hover:border-emerald-300 transition-all">
                                    <span className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${item.batchTracking ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                        <span className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${item.batchTracking ? 'translate-x-5' : ''}`} />
                                    </span>
                                    <span className="text-sm font-semibold text-slate-700">Batch / Expiry Tracking</span>
                                    <span className="ml-auto text-[11px] text-slate-400">{item.batchTracking ? 'Enabled' : 'Disabled'}</span>
                                </button>
                            </div>

                        </div>

                        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                            <button type="button" onClick={handleSave} disabled={saving}
                                className="flex cursor-pointer items-center gap-2 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
                                <Save className="h-4 w-4" />
                                {saving ? 'Saving...' : 'Save Item'}
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default NewItem