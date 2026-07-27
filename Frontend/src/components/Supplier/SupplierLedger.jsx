import React from 'react';
import { BookOpen, Search, Printer, TrendingUp, TrendingDown, Wallet, FileText } from 'lucide-react';
import SelectSupplier from '../../components/Purchase/SelectSupplier.jsx';

function FieldLabel({ children, required }) {
  return (
    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

const inputClass =
  "w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all";

const ledgerRows = [];

export default function SupplierLedger() {

  const totalDebit = ledgerRows.reduce((sum, r) => sum + (Number(r.debit) || 0), 0);
  const totalCredit = ledgerRows.reduce((sum, r) => sum + (Number(r.credit) || 0), 0);
  const closingBalance = totalDebit - totalCredit;

  return (
    <div className="p-4 bg-slate-50 min-h-screen">

      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
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
            <SelectSupplier />
          </div>
          <div>
            <FieldLabel>From</FieldLabel>
            <div className="relative">
              <input type="date" className={inputClass} />
            </div>
          </div>
          <div>
            <FieldLabel>To</FieldLabel>
            <div className="relative">
              <input type="date" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button onClick={() => window.print()} className="group flex items-center gap-2 cursor-pointer bg-white border border-emerald-200 hover:border-emerald-300 text-emerald-700 rounded-xl pl-2.5 pr-4 py-2 text-[12px] font-semibold shadow-sm hover:shadow-md hover:shadow-emerald-100 transition-all hover:-translate-y-0.5">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
              <Printer className="w-3.5 h-3.5" />
            </span>
            Print
          </button>
          <button className="group relative flex items-center gap-2 overflow-hidden cursor-pointer bg-linear-to-br from-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white rounded-xl pl-2.5 pr-4 py-2 text-[12px] font-semibold shadow-md shadow-emerald-200/60 transition-all hover:-translate-y-0.5">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-white/20 group-hover:bg-white/25 transition-colors">
              <Search className="w-3.5 h-3.5" />
            </span>
            Generate
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
            <FileText className="w-3.5 h-3.5 text-white" />
          </div>
          <p className="text-[13px] font-bold text-slate-900">Ledger Entries</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-linear-to-b from-emerald-500 to-emerald-700">
                <th className="text-[12px] font-semibold text-slate-100 px-4 py-2.5 whitespace-nowrap">Date</th>
                <th className="text-[12px] font-semibold text-slate-100 px-4 py-2.5">Description</th>
                <th className="text-[12px] font-semibold text-slate-100 px-4 py-2.5 whitespace-nowrap">Invoice No</th>
                <th className="text-[12px] font-semibold text-slate-100 px-4 py-2.5 whitespace-nowrap">Deposit ID</th>
                <th className="text-[12px] font-semibold text-slate-100 px-4 py-2.5 text-right">Debit</th>
                <th className="text-[12px] font-semibold text-slate-100 px-4 py-2.5 text-right">Credit</th>
                <th className="text-[12px] font-semibold text-slate-100 px-4 py-2.5 text-right whitespace-nowrap">Balance</th>
              </tr>
            </thead>
            <tbody>
              {ledgerRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 ring-1 ring-emerald-100 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-slate-700 text-[13px] font-semibold">No Ledger Entries</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">Select a supplier and generate to view entries</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                ledgerRows.map((row, i) => (
                  <tr key={i} className="group border-t border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                    <td className="text-[12px] text-slate-600 px-4 py-3 whitespace-nowrap tabular-nums">{row.date || '—'}</td>
                    <td className="text-[12px] text-slate-900 font-medium px-4 py-3">{row.description || '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {row.invoiceNo ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold ring-1 ring-emerald-100">
                          {row.invoiceNo}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-[12px]">—</span>
                      )}
                    </td>
                    <td className="text-[12px] text-slate-500 px-4 py-3 whitespace-nowrap font-mono">{row.depositId || '—'}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {Number(row.debit) > 0 ? (
                        <span className="text-[12.5px] font-bold text-emerald-600 tabular-nums">{Number(row.debit).toLocaleString()}</span>
                      ) : (
                        <span className="text-slate-300 text-[12px]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {Number(row.credit) > 0 ? (
                        <span className="text-[12.5px] font-bold text-amber-600 tabular-nums">{Number(row.credit).toLocaleString()}</span>
                      ) : (
                        <span className="text-slate-300 text-[12px]">—</span>
                      )}
                    </td>
                    <td className="text-[12.5px] text-slate-900 font-bold px-4 py-3 text-right whitespace-nowrap tabular-nums">
                      {row.balance ? Number(row.balance).toLocaleString() : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}