import React from 'react';
import {
  Wallet, Home, ChevronRight, Building2, Calendar, Tag, Banknote, Info, FileText
} from 'lucide-react';

const inputClass =
  "w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all";

function FieldLabel({ children, required }) {
  return (
    <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function IconField({ icon: Icon, children }) {
  return (
    <div className="relative">
      <Icon className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-1.5 mb-3.5">
      <span className="w-1 h-3.5 bg-emerald-600 rounded-full" />
      <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">{children}</span>
    </div>
  );
}

export default function SupplierAdvance() {
  return (
    <div className="p-4 bg-slate-50 min-h-screen">

      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
            <Wallet className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Supplier</h1>
            <p className="text-[11px] text-slate-400 leading-tight">Supplier Advance</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
       
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-start">

        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-4">

          <SectionLabel>Advance Details</SectionLabel>

          <div className="flex flex-col gap-3.5 mb-4">
            <div>
              <FieldLabel required>Supplier Name</FieldLabel>
              <IconField icon={Building2}>
                <select className={inputClass}>
                  <option value="">Select supplier</option>
                </select>
              </IconField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <FieldLabel>Date</FieldLabel>
                <IconField icon={Calendar}>
                  <input type="date" className={inputClass} />
                </IconField>
              </div>
              <div>
                <FieldLabel required>Advance Type</FieldLabel>
                <IconField icon={Tag}>
                  <select className={inputClass}>
                    <option value="">Select type</option>
                  </select>
                </IconField>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 mb-4" />

          <SectionLabel>Amount</SectionLabel>

          <div className="flex flex-col gap-3.5 mb-4">
            <div>
              <FieldLabel required>Amount</FieldLabel>
              <IconField icon={Banknote}>
                <input type="text" placeholder="Rs. 0.00" className={inputClass} />
              </IconField>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-100 rounded-lg px-3 py-2.5">
              <Info className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="text-[11px] text-slate-500">Amount in word:</span>
              <span className="text-[12px] text-slate-400 italic">—</span>
            </div>
          </div>

          <div className="border-t border-slate-100 mb-4" />

          <SectionLabel>Additional Details</SectionLabel>
          <div>
            <FieldLabel>Details</FieldLabel>
            <IconField icon={FileText}>
              <textarea rows={3} placeholder="Advance ke baare mein notes..." className={`${inputClass} pt-2.5 resize-none`} />
            </IconField>
          </div>

        </div>

        <div className="flex flex-col gap-3">

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center mb-2">
              <Wallet className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-[13px] font-bold text-slate-900 leading-tight">New Advance Entry</p>
            <p className="text-[10.5px] text-slate-400 mb-3 leading-tight">Fill in details on the left</p>

            <div className="w-full border-t border-slate-100 pt-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Supplier</span>
                <span className="text-slate-400">Not set</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Advance Type</span>
                <span className="text-slate-400">Not set</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Amount</span>
                <span className="text-slate-400">Rs. 0.00</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3.5">
            <p className="text-[10.5px] text-slate-400 mb-2.5">
              <span className="text-red-500">*</span> Required fields must be filled
            </p>
            <button
              type="button"
              className="w-full py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 cursor-pointer text-white text-[12.5px] font-semibold rounded-lg shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 mb-2"
            >
              Save Advance
            </button>
            <button
              type="button"
              className="w-full py-2.5 border border-emerald-200 text-emerald-600 text-[12.5px] font-semibold rounded-lg hover:bg-emerald-50 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Save &amp; Another
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}