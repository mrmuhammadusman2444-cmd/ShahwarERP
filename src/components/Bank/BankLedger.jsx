import React from 'react'
import { BookOpen, Plus, ListOrdered, Landmark, Building2, Calendar, Search, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const BankLedger = () => {
  const navigate = useNavigate();
  return (
    <div className="p-3.5 bg-slate-50 min-h-screen">

      <div className="flex items-center gap-2 flex-wrap mb-3">
        <button onClick={() => { navigate('/new/bank') }} type="button" className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-[12px] font-semibold rounded-lg px-3.5 py-2 shadow-sm shadow-sky-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          Add New Bank
        </button>
        <button onClick={() => { navigate('/add/new/transaction') }} type="button" className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-[12px] font-semibold rounded-lg px-3.5 py-2 shadow-sm shadow-blue-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <ListOrdered className="w-3.5 h-3.5" />
          Bank Transaction
        </button>
        <button onClick={() => { navigate('/manage/bank') }} type="button" className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-semibold rounded-lg px-3.5 py-2 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <Landmark className="w-3.5 h-3.5" />
          Manage Bank
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="px-4 py-2.5 border-b border-slate-100">
          <p className="text-[13px] font-bold text-slate-900">Bank Ledger</p>
        </div>

        <div className="px-4 py-3.5">
          <div className="flex items-end gap-3 flex-wrap">

            <div className="min-w-50">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select className="w-full text-[12px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all cursor-pointer">
                  <option value="">Select option</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">From</label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input type="date" className="text-[12px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">To</label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input type="date" className="text-[12px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
              </div>
            </div>

            <button type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12px] font-semibold rounded-lg px-4 py-2 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
              <Search className="w-3.5 h-3.5" />
              Search
            </button>

          </div>
        </div>

      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm mt-3.5 overflow-hidden">

        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-[11.5px] text-slate-400">Print Date: 07/07/2026 10:57:38</p>
          <button type="button" className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-[12px] font-semibold rounded-lg px-3.5 py-1.5 shadow-sm shadow-amber-200 transition-all hover:-translate-y-0.5 cursor-pointer">
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-linear-to-br from-emerald-600 to-emerald-700 border-y border-slate-100">
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-2.5">S No</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-2.5">Date</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-2.5">Description</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-2.5">Withdraw / Deposite ID</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-2.5 text-right">Debit (+)</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-2.5 text-right">Credit (-)</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-2.5 text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50 h-93">
                <td className="text-[12px] text-slate-500 px-3 py-2.5"></td>
                <td className="text-[12px] text-slate-500 px-3 py-2.5"></td>
                <td className="text-[12px] text-slate-500 px-3 py-2.5"></td>
                <td className="text-[12px] text-slate-500 px-3 py-2.5"></td>
                <td className="text-[12px] text-slate-500 px-3 py-2.5 text-right"></td>
              </tr>
              <tr className="bg-slate-50 border-t border-slate-100">
                <td colSpan={4} className="text-[12.5px] font-bold text-slate-700 px-3 py-2.5 text-right">Grand Total:</td>
                <td className="text-[13px] font-bold text-emerald-700 px-3 py-2.5 text-right">Rs 0.00</td>
                <td className="text-[13px] font-bold text-emerald-700 px-3 py-2.5 text-right">Rs 0.00</td>
                <td className="text-[13px] font-bold text-emerald-700 px-3 py-2.5 text-right">Rs 0.00</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

export default BankLedger
