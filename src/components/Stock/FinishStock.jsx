import React from 'react'
import { ClipboardList, Home, ChevronRight, Printer, Search, ArrowUpDown, Package, Layers, Wallet, FileSearch } from 'lucide-react';

const FinishStock = () => {
  return (
    <div className="p-4 bg-slate-50 min-h-screen">

      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
            <ClipboardList className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">All Product</h1>
            <p className="text-[11px] text-slate-400 leading-tight">Browse all products by category</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400">

        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3.5">

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-700  tracking-wide">Total Products</p>
            <p className="text-[16px] font-bold text-slate-900">0</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-700  tracking-wide">Categories</p>
            <p className="text-[16px] font-bold text-slate-900">0</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <Wallet className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-700  tracking-wide">Total Amount</p>
            <p className="text-[16px] font-bold text-slate-900">Rs 0</p>
          </div>
        </div>

      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="flex items-center justify-between flex-wrap gap-3 px-4 py-3 border-b border-slate-100">
          <button type="button" className="flex items-center gap-1.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white text-[12px] font-semibold rounded-lg px-4 py-2 shadow-sm shadow-amber-200 transition-all hover:-translate-y-0.5 cursor-pointer">
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-slate-600">Search:</span>
            <div className="flex items-center gap-1.5 border border-slate-200 rounded-md px-2.5 py-1.5 bg-emerald-50/60">
              <Search className="w-3.5 h-3.5 text-slate-700" />
              <input placeholder='Search' type="text" className="text-[12px] bg-transparent border-none focus:outline-none w-40" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-3 text-[12px] text-slate-500 border-b border-slate-100">
          <span>Show</span>
          <select className="border border-slate-200 rounded-md px-2 py-1 text-[12px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 cursor-pointer">
            <option>100</option>
            <option>250</option>
            <option>500</option>
          </select>
          <span>entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-linear-to-br from-emerald-500 to-emerald-700 border-b border-slate-100">
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-4 py-3">SL.</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">Pack <ArrowUpDown className="w-3 h-3 text-slate-50" /></div>
                </th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">Product Name <ArrowUpDown className="w-3 h-3 text-slate-50" /></div>
                </th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">Carton <ArrowUpDown className="w-3 h-3 text-slate-50" /></div>
                </th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">Dozan <ArrowUpDown className="w-3 h-3 text-slate-50" /></div>
                </th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">Amount <ArrowUpDown className="w-3 h-3 text-slate-50" /></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="py-14">
                  <div className="flex flex-col items-center justify-center gap-2 h-60">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center ">
                      <FileSearch className="w-6 h-6 text-emerald-300" />
                    </div>
                    <p className="text-[13px]  text-slate-600">No products found</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-[11.5px] text-slate-400 flex-wrap gap-2.5">
          <span>Showing 0 to 0 of 0 entries</span>
          <div className="flex items-center gap-1.5">
            <button type="button" className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors cursor-pointer">Previous</button>
            <button type="button" className="bg-emerald-600 text-white rounded-md px-2.5 py-1 cursor-pointer">1</button>
            <button type="button" className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors cursor-pointer">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FinishStock
