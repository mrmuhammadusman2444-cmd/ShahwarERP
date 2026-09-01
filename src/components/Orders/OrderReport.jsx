import { useState, useEffect } from 'react'
import axios from 'axios'
import MultiCustomerSelect from './MultiCustomerSelect.jsx'

const OrderReport = () => {
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(false)

        async function handleFind() {
        setLoading(true)
        try {
            let params = {}
            if (selectedCustomers.length > 0) params.customers = selectedCustomers.join(",")
            let res = await axios.get('http://localhost:3000/order-report', { params })
            setRows(res.data)
        } catch (err) {
            console.log("ORDER REPORT FAILED:", err.response?.data || err.message)
        }
        setLoading(false)
    }

    const [customers, setCustomers] = useState([])
    const [selectedCustomers, setSelectedCustomers] = useState([])

    useEffect(() => {
        async function fetchCustomers() {
            try {
                let res = await axios.get('http://localhost:3000/find')
                setCustomers(res.data.map((c) => c.customerName).filter(Boolean))
            } catch (err) {
                console.log("CUSTOMERS FAILED:", err.response?.data || err.message)
            }
        }
        fetchCustomers()
    }, [])





    return (
        <div className="p-4 md:p-5">

            <div className="flex items-center justify-between mb-4 pl-12 md:pl-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-b from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-gray-800 text-lg font-bold">Order Report</h1>
                        <p className="text-gray-400 text-xs">View and filter order reports</p>
                    </div>
                </div>
            </div>

                            <div className="flex flex-col lg:flex-row lg:items-end gap-3.5">

                    <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                        <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Account's Order</label>
                        <MultiCustomerSelect
                            options={customers}
                            selected={selectedCustomers}
                            onChange={setSelectedCustomers}
                            placeholder="Type customer name..."
                        />
                    </div>

                    {[
                        { label: "Hafiz Monitoring Orders", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
                        { label: "Shahwar Monitoring Orders", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
                    ].map((f, i) => (
                        <div key={i} className="flex-1 flex flex-col gap-1.5 min-w-0">
                            <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">{f.label}</label>
                            <div className="relative group">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} /></svg>
                                </span>
                                <select className="w-full bg-emerald-50/70 border border-emerald-100 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 rounded-xl pl-11 pr-9 py-2.5 text-gray-600 text-sm font-medium focus:outline-none transition-all appearance-none cursor-pointer">
                                    <option value="">Select option</option>
                                </select>
                                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleFind}
                        className="flex items-center justify-center cursor-pointer gap-2 px-8 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Find
                    </button>

                </div>

            <div className="mt-4 bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">

                <div className="flex items-center justify-between px-5 py-1.5 border-b border-emerald-50 bg-linear-to-r from-emerald-50/60 to-white">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 text-white shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                        </span>
                        <h2 className="text-gray-700 text-sm font-bold">Order Product List</h2>
                    </div>
                    <button
                        type="button"
                        className="flex items-center gap-1.5 px-4 py-1.5 cursor-pointer bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-semibold rounded-lg shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                        Print
                    </button>
                </div>

                <div className="flex  items-center justify-center gap-2 py-1.5 border-b border-emerald-50 bg-emerald-50/20 flex-wrap">
                    <h3 className="text-gray-800 text-base font-extrabold tracking-wide">Hafiz Foods</h3>
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        (Near PSO Depot, D I KHAN Road, Bannu KPK)
                    </span>
                </div>

                <div className="overflow-auto order-report-scroll" style={{ maxHeight: "48vh", minHeight: "460px" }}>
                    <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
                        <colgroup>
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "34%" }} />
                            <col style={{ width: "18%" }} />
                            <col style={{ width: "13%" }} />
                            <col style={{ width: "13%" }} />
                            <col style={{ width: "14%" }} />
                        </colgroup>
                        <thead className="sticky top-0 z-10">
                            <tr>
                                <th className="bg-emerald-600 text-left text-white text-[11px] font-bold uppercase tracking-wider px-4 py-3">SL.</th>
                                <th className="bg-emerald-600 text-left text-white text-[11px] font-bold uppercase tracking-wider px-4 py-3">Product Name</th>
                                <th className="bg-emerald-600 text-left text-white text-[11px] font-bold uppercase tracking-wider px-4 py-3">Desc</th>
                                <th className="bg-emerald-600 text-center text-white text-[11px] font-bold uppercase tracking-wider px-4 py-3">Carton</th>
                                <th className="bg-emerald-600 text-center text-white text-[11px] font-bold uppercase tracking-wider px-4 py-3">R-Carton</th>
                                <th className="bg-emerald-600 text-center text-white text-[11px] font-bold uppercase tracking-wider px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-14">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="relative">
                                                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-50 to-emerald-100 ring-1 ring-emerald-100 flex items-center justify-center">
                                                    <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                                </span>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-gray-700 text-sm font-bold">{loading ? "Loading..." : "No orders to show"}</p>
                                                <p className="text-gray-400 text-xs mt-0.5">Choose your filters above and click <span className="text-emerald-600 font-semibold">Find</span></p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                rows.map((r, i) => (
                                    <tr key={i} className={`border-b border-gray-50 hover:bg-emerald-50/40 transition-colors ${i % 2 === 1 ? "bg-gray-50/40" : ""}`}>
                                        <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                                        <td className="px-4 py-3 text-gray-800 text-xs font-semibold">{r.productName}</td>
                                        <td className="px-4 py-3 text-left text-gray-400 text-xs">—</td>
                                        <td className="px-4 py-3 text-center text-gray-700 text-xs font-bold">{Number(r.carton || 0).toLocaleString()}</td>
                                        <td className="px-4 py-3 text-center text-gray-400 text-xs">—</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 ring-1 ring-amber-200">Pending</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            <style>{`
                .order-report-scroll::-webkit-scrollbar { width: 7px; height: 7px; }
                .order-report-scroll::-webkit-scrollbar-track { background: transparent; }
                .order-report-scroll::-webkit-scrollbar-thumb { background: #a7f3d0; border-radius: 99px; }
                .order-report-scroll::-webkit-scrollbar-thumb:hover { background: #6ee7b7; }
            `}</style>

        </div>
    );
};

export default OrderReport;