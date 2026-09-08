import React from 'react'
import { useState } from 'react'
import { ClipboardList, User, Calendar, Search, Printer, ChevronDown, Home, ChevronRight, Users } from 'lucide-react'

const UserWiseReport = () => {

  const [userOpen, setUserOpen] = useState(false)
  const records = []

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/40 p-4 md:p-6">

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 shadow-lg shadow-emerald-300/40 ring-4 ring-white">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight text-slate-800">Sales Report</h1>
            <p className="text-[11px] font-medium tracking-wide text-slate-400">User Wise Sales Report</p>
          </div>
        </div>

        
      </div>

      <div className="mb-5 rounded-3xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/50">
        <div className="h-1 w-full bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700" />
        <div className="p-5 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-end gap-3">

            <div className="flex-1 min-w-48">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">User Name</label>
              <div className="relative">
                <div
                  onClick={() => setUserOpen((o) => !o)}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border bg-slate-50/60 px-3 py-2.5 transition-all ${userOpen ? 'border-emerald-400 bg-white ring-4 ring-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-600"><User className="h-3 w-3" /></span>
                  <span className="flex-1 truncate text-xs font-medium text-slate-400">Select option</span>
                  <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-emerald-400 transition-transform duration-200 ${userOpen ? 'rotate-180' : ''}`} />
                </div>

                {userOpen && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40">
                    <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
                      <Search className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      <input autoFocus placeholder="Search user..." className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-none" />
                    </div>
                    <div className="max-h-56 overflow-y-auto py-1">
                      <p className="px-4 py-6 text-center text-xs text-slate-400">No users</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-36">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Start Date</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Calendar className="h-3.5 w-3.5" /></span>
                <input type="date" className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-2 py-2.5 text-xs font-medium text-slate-700 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
              </div>
            </div>

            <div className="flex-1 min-w-36">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">End Date</label>
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
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10.5px] font-bold text-emerald-700 ring-1 ring-emerald-100">08-Sep-2026</span>
            <button title="Print" className="group flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-sm cursor-pointer">
              <Printer className="h-4 w-4 transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 border-b border-slate-100 bg-slate-50/40 px-4 py-2.5 shrink-0 text-[11px]">
          <span className="text-slate-500"><span className="font-bold text-slate-700">From:</span> 8 - SEP - 2026</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500"><span className="font-bold text-slate-700">To:</span> 8 - SEP - 2026</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500"><span className="font-bold text-slate-700">Total Receipt:</span> <span className="font-bold text-emerald-600">Rs 0.00</span></span>
        </div>

        <div className="flex flex-1 flex-col p-4 min-h-0">
          <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-100 shadow-sm min-h-0">
            <div className="overflow-auto flex-1 custom-scroll">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-linear-to-r from-emerald-600 to-emerald-700">
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-white">SL.</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-white">User Name</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-white">Customer Name</th>
                    <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wide text-white">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {records.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-20 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
                            <Users className="h-5 w-5 text-emerald-300" />
                          </div>
                          <p className="text-xs font-semibold text-slate-500">Record not found</p>
                          <p className="text-[11px] text-slate-400">Select a user and search</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    records.map((r, i) => (
                      <tr key={i} className={`transition-colors hover:bg-emerald-50/50 ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                        <td className="px-4 py-2.5 text-xs text-slate-400">{i + 1}</td>
                        <td className="px-4 py-2.5 text-xs font-medium text-slate-800">{r.userName}</td>
                        <td className="px-4 py-2.5 text-xs text-slate-600">{r.customerName}</td>
                        <td className="px-4 py-2.5 text-right text-xs font-bold text-emerald-700 tabular-nums">{r.totalAmount}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Total Receipt</span>
            <span className="text-base font-black text-emerald-700 tabular-nums">Rs 0.00</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserWiseReport
