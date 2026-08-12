import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CalendarDays, Plus, Trash2, Calendar, Tag, Loader2 } from 'lucide-react'

const ManageHolidays = () => {

    const [holidays, setHolidays] = useState([])
    const [date, setDate] = useState("")
    const [name, setName] = useState("")
    const [saving, setSaving] = useState(false)

    async function loadHolidays() {
        try {
            let res = await axios.get('http://localhost:3000/find/holidays')
            setHolidays(res.data)
        } catch (err) {
            console.log("LOAD FAILED:", err.response?.data || err.message)
        }
    }

    useEffect(() => {
        loadHolidays()
    }, [])

    async function handleAdd() {
        if (!date) {
            alert("Date select karo")
            return
        }
        setSaving(true)
        try {
            await axios.post('http://localhost:3000/add/holiday', { date, name })
            setDate("")
            setName("")
            await loadHolidays()
        } catch (err) {
            console.log("ADD FAILED:", err.response?.data || err.message)
        }
        setSaving(false)
    }

    async function handleDelete(id) {
        if (!window.confirm("Delete this holiday?")) return
        try {
            await axios.delete(`http://localhost:3000/delete/holiday/${id}`)
            await loadHolidays()
        } catch (err) {
            console.log("DELETE FAILED:", err.response?.data || err.message)
        }
    }

    // weekday nikaalो date se
    function getWeekday(d) {
        return new Date(d).toLocaleDateString("en-US", { weekday: "long" })
    }

    return (
        <div className="p-4 bg-slate-50 min-h-screen overflow-x-hidden">

            <style>{`
                input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(115deg) brightness(95%) contrast(101%);
                    cursor: pointer;
                }
            `}</style>

            {/* header */}
            <div className="flex items-center gap-2.5 mb-4 pl-12 md:pl-0">
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
                    <CalendarDays className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                    <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Manage Holidays</h1>
                    <p className="text-[11px] text-slate-400 leading-tight">Add Eid & special holidays (Friday is auto)</p>
                </div>
            </div>

            {/* add form */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-4">
                <div className="flex items-end gap-3 flex-wrap">
                    <div className="flex-1 min-w-40">
                        <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Date <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full text-[12.5px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-40">
                        <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Holiday Name</label>
                        <div className="relative">
                            <Tag className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Eid ul Azha" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                        </div>
                    </div>
                    <button onClick={handleAdd} disabled={saving} className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-5 py-2.5 shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-60">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Add Holiday
                    </button>
                </div>
            </div>

            {/* list */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-[13px] font-bold text-slate-900">Holidays List <span className="text-slate-400 font-normal">({holidays.length})</span></p>
                </div>

                {holidays.length === 0 ? (
                    <div className="py-14 text-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-2">
                            <CalendarDays className="w-6 h-6 text-emerald-300" />
                        </div>
                        <p className="text-[13px] text-slate-500">No holidays added yet</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {holidays.map((h) => (
                            <div key={h._id} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50/60 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center shrink-0">
                                        <span className="text-[13px] font-bold text-emerald-700 leading-none">{new Date(h.date).getDate()}</span>
                                        <span className="text-[8px] font-semibold text-emerald-500 uppercase">{new Date(h.date).toLocaleDateString("en-US", { month: "short" })}</span>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-semibold text-slate-800">{h.name || "Holiday"}</p>
                                        <p className="text-[11px] text-slate-400">{new Date(h.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} · {getWeekday(h.date)}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(h._id)} className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ManageHolidays