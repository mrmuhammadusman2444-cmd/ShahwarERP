import React from 'react';
import {ClipboardList, Home, ChevronRight, Plus, BookOpen, Receipt,Copy, FileSpreadsheet, FileText, Printer, Search, ArrowUpDown, ChevronDown, FileBarChart} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function ManageSupplier() {
  const navigate =useNavigate()
  return (
    <div className="p-4 bg-slate-50 min-h-screen">

      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
            <ClipboardList className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-slate-900 leading-tight">Manage Supplier</h1>
            <p className="text-[11px] text-slate-400 leading-tight">Manage your supplier</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
         
        </div>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap mb-3.5">
        <button onClick={()=>{navigate('/addsupplierpage')}} className="flex items-center gap-1.5  cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2.5 shadow-sm shadow-emerald-200 transition-colors">
          <Plus className="w-4 h-4" />
          Add Supplier
        </button>
        <button onClick={()=>{navigate('/supplierledgerpage')}} className="flex items-center gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2.5 shadow-sm shadow-emerald-200 transition-colors">
          <BookOpen className="w-4 h-4" />
          Supplier Ledger
        </button>
        <button className="flex items-center gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2.5 shadow-sm shadow-emerald-200 transition-colors">
          <Receipt className="w-4 h-4" />
          Supplier Sales Details
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-[13px] font-bold text-slate-900">Manage Supplier</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 px-4 py-3 border-b border-slate-100">

          <div className="flex items-center gap-2 text-[12px] text-slate-500">
            <span>Show</span>
            <select className="border border-slate-200 rounded-md px-2 py-1 text-[12px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button className="flex items-center gap-1  cursor-pointer bg-slate-500 hover:bg-slate-600 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors">
              <Copy className="w-3 h-3" />
              Copy
            </button>
            <button className="flex items-center gap-1 cursor-pointer bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors">
              <FileText className="w-3 h-3" />
              CSV
            </button>
            <button className="flex items-center gap-1 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors">
              <FileSpreadsheet className="w-3 h-3" />
              Excel
            </button>
            <button className="flex items-center gap-1 cursor-pointer bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors">
              <FileBarChart className="w-3 h-3" />
              PDF
            </button>
            <button className="flex items-center gap-1 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors">
              <Printer className="w-3 h-3" />
              Print
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-slate-500">Search:</span>
            <div className="flex items-center gap-1.5 border border-slate-200 rounded-md px-2.5 py-1.5 bg-indigo-50/60">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input type="text" placeholder="Search" className="text-[12px] bg-transparent border-none focus:outline-none w-28" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left h-110">
            <thead>
              <tr className="bg-emerald-500">
                <th className="text-[14px] font-semibold text-slate-100 uppercase tracking-wide px-4 py-2.5">SL.</th>
                <th className="text-[14px] font-semibold text-slate-100 uppercase tracking-wide px-4 py-2.5">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Supplier Name
                    <ArrowUpDown className="w-3 h-3 text-slate-300" />
                  </div>
                </th>
                <th className="text-[14px] font-semibold text-slate-100 uppercase tracking-wide px-4 py-2.5">Address</th>
                <th className="text-[14px] font-semibold text-slate-100 uppercase tracking-wide px-4 py-2.5">Mobile</th>
                <th className="text-[14px] font-semibold text-slate-100 uppercase tracking-wide px-4 py-2.5">Details</th>
                <th className="text-[14px] font-semibold text-slate-100 uppercase tracking-wide px-4 py-2.5">Balance</th>
                <th className="text-[14px] font-semibold text-slate-100 uppercase tracking-wide px-4 py-2.5">Action</th>
              </tr>
            </thead>
            <tbody>
           
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-[11.5px] text-slate-400">
          <span>Showing 1 to   entries</span>
          <div className="flex items-center gap-1.5">
            <button className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors">Previous</button>
            <button className="bg-emerald-600 text-white rounded-md px-2.5 py-1">1</button>
            <button className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}