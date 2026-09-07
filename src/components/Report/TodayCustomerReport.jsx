import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import SelectCustomer from '../Sales/SelectCustomers.jsx'
import { ClipboardList, Warehouse, User, Calendar, Search, Printer, ChevronDown, Home, ChevronRight } from 'lucide-react'

const TodayCustomerReport = () => {


  const [customerOpen, setCustomerOpen] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerSearch, setCustomerSearch] = useState("")
  const [customers, setCustomers] = useState([])
const receipts = []
  useEffect(() => {
    async function fetchCustomers() {
      try {
        let res = await axios.get('http://localhost:3000/find')
        setCustomers(res.data)
      } catch (err) {
        console.log("CUSTOMERS FAILED:", err.response?.data || err.message)
      }
    }
    fetchCustomers()
  }, [])




  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/40 p-4 md:p-6">

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 shadow-lg shadow-emerald-300/40 ring-4 ring-white">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight text-slate-800">Todays Customer Receipt</h1>
            <p className="text-[11px] font-medium tracking-wide text-slate-400">Todays customer receipt overview</p>
          </div>
        </div>


      </div>

      <div className="mb-5 rounded-3xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/50">
        <div className="h-1 w-full bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700" />
        <div className="p-5 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-end gap-3">

            <div className="flex-1 min-w-40">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">WareHouse</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Warehouse className="h-3.5 w-3.5" /></span>
                <select className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-8 py-2.5 text-xs font-medium text-slate-700 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none cursor-pointer">
                  <option value="">Select option</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-emerald-400" />
              </div>
            </div>

            <div className="flex-1 min-w-48">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Customer Name</label>
              <div className="relative">
                <div
                  onClick={() => setCustomerOpen((o) => !o)}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border bg-slate-50/60 px-3 py-2 transition-all ${customerOpen ? 'border-emerald-400 bg-white ring-4 ring-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-600"><User className="h-3 w-3" /></span>
                  <span className={`flex-1 truncate text-xs font-medium ${customerName ? 'text-slate-700' : 'text-slate-400'}`}>{customerName || 'Select customer'}</span>
                  {customerName && (
                    <span role="button" onClick={(e) => { e.stopPropagation(); setCustomerName('') }} className="flex h-4 w-4 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    </span>
                  )}
                  <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-emerald-400 transition-transform duration-200 ${customerOpen ? 'rotate-180' : ''}`} />
                </div>

                {customerOpen && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40">
                    <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
                      <Search className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      <input autoFocus value={customerSearch} onChange={(e) => setCustomerSearch(e.target.value)} placeholder="Search customer..." className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-none" />
                    </div>
                    <div className="max-h-56 overflow-y-auto py-1 custom-scroll">
                      {customers.filter((c) => (c.customerName || '').toLowerCase().includes(customerSearch.toLowerCase())).length === 0 ? (
                        <p className="px-4 py-6 text-center text-xs text-slate-400">No customers</p>
                      ) : (
                        customers
                          .filter((c) => (c.customerName || '').toLowerCase().includes(customerSearch.toLowerCase()))
                          .map((c) => (
                            <button
                              key={c._id}
                              type="button"
                              onClick={() => { setCustomerName(c.customerName); setCustomerOpen(false); setCustomerSearch('') }}
                              className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors cursor-pointer ${customerName === c.customerName ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-600 hover:bg-emerald-50/60'}`}>
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-[10px] font-bold text-emerald-700">
                                {(c.customerName || '?').charAt(0).toUpperCase()}
                              </span>
                              <span className="flex-1 truncate">{c.customerName}</span>
                              {customerName === c.customerName && (
                                <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                              )}
                            </button>
                          ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-36">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">From Date</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Calendar className="h-3.5 w-3.5" /></span>
                <input type="date" className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-2 py-2.5 text-xs font-medium text-slate-700 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
              </div>
            </div>

            <div className="flex-1 min-w-36">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">To Date</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Calendar className="h-3.5 w-3.5" /></span>
                <input type="date" className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-2 py-2.5 text-xs font-medium text-slate-700 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
              </div>
            </div>

            <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 hover:from-emerald-500 hover:to-emerald-600 cursor-pointer">
              <Search className="h-3.5 w-3.5" />
              Search
            </button>

          </div>
        </div>
      </div>

      <div className="flex h-[80vh] flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-lg shadow-slate-200/50">

        <div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-white to-emerald-50/40 px-4 py-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-200 ring-2 ring-white">
              <span className="text-lg font-black">H</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 leading-tight">Hafiz Foods</h3>
              <p className="text-[10.5px] text-slate-400">Near PSO Depot, D I KHAN Road, Bannu KPK &middot; info@hafizfoods.com.pk &middot; 0334-1909797</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10.5px] font-bold text-emerald-700 ring-1 ring-emerald-100">07-Sep-2026</span>
            <button title="Print" className="group flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-sm cursor-pointer">
              <Printer className="h-4 w-4 transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 min-h-0">
          <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-100 shadow-sm min-h-0">
            <div className="overflow-auto flex-1 custom-scroll">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-linear-to-r from-emerald-600 to-emerald-700">
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-white">SL.</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-white">Date</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-white">Customer Name</th>
                    <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wide text-white">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {receipts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-20 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
                            <ClipboardList className="h-5 w-5 text-emerald-300" />
                          </div>
                          <p className="text-xs font-semibold text-slate-500">No receipts found</p>
                          <p className="text-[11px] text-slate-400">Select a customer and search</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    receipts.map((r, i) => (
                      <tr key={i} className={`transition-colors hover:bg-emerald-50/50 ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                        <td className="px-4 py-2.5 text-xs text-slate-400">{i + 1}</td>
                        <td className="px-4 py-2.5 text-xs text-slate-600">{r.date}</td>
                        <td className="px-4 py-2.5 text-xs font-medium text-slate-800">{r.customerName}</td>
                        <td className="px-4 py-2.5 text-right text-xs font-bold text-emerald-700 tabular-nums">{r.receipt}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Total</span>
            <span className="text-base font-black text-emerald-700 tabular-nums">Rs. 0</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TodayCustomerReport