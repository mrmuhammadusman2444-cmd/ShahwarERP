import React from 'react';
import { BookOpen, Home, ChevronRight, Search, Printer } from 'lucide-react';

function FieldLabel({ children, required }) {
  return (
    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

const inputClass =
  "w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-indigo-50/70 border border-indigo-100/70 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all";

const ledgerRows = [
  { invoiceNo: '', depositId: '', debit: '', credit: '', balance: '' },
];

export default function SupplierLedger() {
  return (
    <div className="p-4 bg-slate-50 min-h-screen">

      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-slate-900 leading-tight">Supplier Ledger</h1>
            <p className="text-[11px] text-slate-400 leading-tight">Manage supplier ledger</p>
          </div>
        </div>


      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 mb-3.5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3.5">
          <div>
            <FieldLabel required>Select Supplier</FieldLabel>
            <select className={inputClass} >
              <option value="">Select option</option>
            </select>
          </div>
          <div>
            <FieldLabel>From</FieldLabel>
            <input type="date" className={inputClass} />
          </div>
          <div>
            <FieldLabel>To</FieldLabel>
            <input type="date" className={inputClass} />
          </div>
        </div>

        <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button onClick={() => window.print()} className="flex items-center gap-1.5 border cursor-pointer border-emerald-200 text-emerald-600 rounded-lg px-4 py-2 text-[12px] font-semibold hover:bg-emerald-50 transition-colors">
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
          <button className="flex items-center gap-1.5 bg-emerald-600 cursor-pointer text-white rounded-lg px-4 py-2 text-[12px] font-semibold hover:bg-emerald-700 transition-colors">
            <Search className="w-3.5 h-3.5" />
            Generate
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-[13px] font-bold text-slate-900">Supplier Ledger</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left h-108">
            <thead>
              <tr className="bg-emerald-500">
                <th className="text-[14.5px] font-semibold text-slate-100  tracking-wide px-4 py-2.5 whitespace-nowrap">Date</th>
                <th className="text-[14.5px] font-semibold text-slate-100  tracking-wide px-4 py-2.5">Description</th>
                <th className="text-[14.5px] font-semibold text-slate-100  tracking-wide px-4 py-2.5 whitespace-nowrap">Invoice No</th>
                <th className="text-[14.5px] font-semibold text-slate-100  tracking-wide px-4 py-2.5 whitespace-nowrap">Deposit ID</th>
                <th className="text-[14.5px] font-semibold text-slate-100  tracking-wide px-4 py-2.5 text-right">Debit</th>
                <th className="text-[14.5px] font-semibold text-slate-100  tracking-wide px-4 py-2.5 text-right">Credit</th>
                <th className="text-[14.5px] font-semibold text-slate-100  tracking-wide px-4 py-2.5 text-right whitespace-nowrap">Balance</th>
              </tr>
            </thead>
            <tbody>
              {ledgerRows.map((row, i) => (
                <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="text-[12px] text-slate-600 px-4 py-2.5 whitespace-nowrap">{row.date}</td>
                  <td className="text-[12px] text-slate-900 font-medium px-4 py-2.5">{row.description}</td>
                  <td className="text-[12px] text-slate-500 px-4 py-2.5">{row.invoiceNo}</td>
                  <td className="text-[12px] text-slate-500 px-4 py-2.5">{row.depositId}</td>
                  <td className="text-[12px] text-slate-500 px-4 py-2.5 text-right">{row.debit || ''}</td>
                  <td className="text-[12px] text-slate-500 px-4 py-2.5 text-right">{row.credit || ''}</td>
                  <td className="text-[12px] text-slate-900 font-semibold px-4 py-2.5 text-right">{row.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}