import { useState } from 'react'
import axios from 'axios'
import { BarChart3, Calendar, Search, Factory, Boxes, Package, TrendingDown, Home, ChevronRight } from 'lucide-react'

const catStyle = {
    RM: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    PM: 'bg-sky-50 text-sky-700 ring-sky-200',
    WIP: 'bg-amber-50 text-amber-700 ring-amber-200',
    FG: 'bg-violet-50 text-violet-700 ring-violet-200',
}

const ProductionReports = () => {
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [report, setReport] = useState(null)
    const [loading, setLoading] = useState(false)

    async function handleSearch() {
        setLoading(true)
        try {
            let params = {}
            if (fromDate) params.from = fromDate
            if (toDate) params.to = toDate
            let res = await axios.get('http://localhost:3000/production/report', { params })
            setReport(res.data)
        } catch (err) {
            console.log("REPORT FAILED:", err.response?.data || err.message)
        }
        setLoading(false)
    }

    function fmtDate(d) {
        return d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/40 p-4 md:p-6">

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 shadow-lg shadow-emerald-300/40 ring-4 ring-white">
                        <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold leading-tight text-slate-800">Production Report</h1>
                        <p className="text-[11px] font-medium tracking-wide text-slate-400">Production summary &amp; material consumption</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] shadow-sm">
                    <Home className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-slate-400">Production</span>
                    <ChevronRight className="h-3 w-3 text-slate-300" />
                    <span className="font-semibold text-emerald-600">Report</span>
                </div>
            </div>

            <div className="mb-5 rounded-3xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/50">
                <div className="h-1 w-full bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700" />
                <div className="p-5 flex flex-col lg:flex-row lg:items-end gap-3">
                    <div className="flex-1 min-w-36">
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">From Date</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Calendar className="h-3.5 w-3.5" /></span>
                            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-2 py-2.5 text-xs font-medium text-slate-700 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-36">
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">To Date</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Calendar className="h-3.5 w-3.5" /></span>
                            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-2 py-2.5 text-xs font-medium text-slate-700 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                        </div>
                    </div>
                    <button onClick={handleSearch} className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
                        <Search className="h-3.5 w-3.5" />
                        {loading ? 'Loading...' : 'Search'}
                    </button>
                </div>
            </div>

            {report && (
                <div className="mb-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600"><Factory className="h-6 w-6" /></div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Total Orders</p>
                            <p className="text-2xl font-black text-slate-800 tabular-nums">{report.totalOrders || 0}</p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600"><Boxes className="h-6 w-6" /></div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">FG Produced</p>
                            <p className="text-2xl font-black text-slate-800 tabular-nums">{Number(report.totalFgProduced || 0).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-500"><TrendingDown className="h-6 w-6" /></div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Materials Consumed</p>
                            <p className="text-2xl font-black text-slate-800 tabular-nums">{(report.consumption || []).length}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                <div className="rounded-2xl border border-slate-200/70 bg-white shadow-lg shadow-slate-200/50 overflow-hidden">
                    <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-3.5">
                        <span className="h-4 w-1 rounded-full bg-emerald-500" />
                        <h2 className="text-sm font-bold text-slate-800">Production Orders</h2>
                        {report && <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 ring-1 ring-emerald-100">{(report.orders || []).length}</span>}
                    </div>
                    <div className="overflow-x-auto max-h-[55vh]">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0">
                                <tr className="bg-slate-50 text-slate-500">
                                    <th className="text-left text-[10px] font-bold uppercase px-4 py-2.5">Order</th>
                                    <th className="text-left text-[10px] font-bold uppercase px-4 py-2.5">FG</th>
                                    <th className="text-left text-[10px] font-bold uppercase px-4 py-2.5">Date</th>
                                    <th className="text-right text-[10px] font-bold uppercase px-4 py-2.5">Qty</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {!report || (report.orders || []).length === 0 ? (
                                    <tr><td colSpan={4} className="text-center py-14 text-sm text-slate-400">{report ? 'No production found' : 'Search to view report'}</td></tr>
                                ) : (
                                    report.orders.map((o, i) => (
                                        <tr key={i} className="hover:bg-emerald-50/40">
                                            <td className="px-4 py-2.5 font-mono text-[11px] font-bold text-emerald-600">{o.orderNo}</td>
                                            <td className="px-4 py-2.5 text-xs font-semibold text-slate-800">{o.fgItemName}</td>
                                            <td className="px-4 py-2.5 text-xs text-slate-600 whitespace-nowrap">{fmtDate(o.date)}</td>
                                            <td className="px-4 py-2.5 text-right text-xs font-bold text-slate-700 tabular-nums">{Number(o.quantity || 0).toLocaleString()} {o.unit}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200/70 bg-white shadow-lg shadow-slate-200/50 overflow-hidden">
                    <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-3.5">
                        <span className="h-4 w-1 rounded-full bg-rose-400" />
                        <h2 className="text-sm font-bold text-slate-800">Material Consumption</h2>
                        {report && <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-500 ring-1 ring-rose-100">{(report.consumption || []).length}</span>}
                    </div>
                    <div className="overflow-x-auto max-h-[55vh]">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0">
                                <tr className="bg-slate-50 text-slate-500">
                                    <th className="text-left text-[10px] font-bold uppercase px-4 py-2.5">Item</th>
                                    <th className="text-center text-[10px] font-bold uppercase px-4 py-2.5">Type</th>
                                    <th className="text-right text-[10px] font-bold uppercase px-4 py-2.5">Consumed</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {!report || (report.consumption || []).length === 0 ? (
                                    <tr><td colSpan={3} className="text-center py-14 text-sm text-slate-400">{report ? 'No consumption' : 'Search to view report'}</td></tr>
                                ) : (
                                    report.consumption.map((m, i) => (
                                        <tr key={i} className="hover:bg-emerald-50/40">
                                            <td className="px-4 py-2.5">
                                                <span className="text-xs font-semibold text-slate-800">{m.itemName}</span>
                                                <span className="ml-2 font-mono text-[10px] text-slate-400">{m.itemCode}</span>
                                            </td>
                                            <td className="px-4 py-2.5 text-center">
                                                <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold ring-1 ${catStyle[m.category] || catStyle.RM}`}>{m.category}</span>
                                            </td>
                                            <td className="px-4 py-2.5 text-right text-xs font-bold text-rose-500 tabular-nums">{Number(m.consumed || 0).toLocaleString()} {m.unit}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProductionReports