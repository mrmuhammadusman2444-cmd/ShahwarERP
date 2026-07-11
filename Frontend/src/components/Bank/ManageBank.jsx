import React from 'react'
import { Landmark, Home, ChevronRight, Plus, ListOrdered, Copy, FileText, FileSpreadsheet, FileBarChart, Printer, Search, ArrowUpDown } from 'lucide-react';
import {useNavigate} from 'react-router-dom';
const ManageBank = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-slate-50 min-h-screen">

      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
            <Landmark className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Bank List</h1>
            <p className="text-[11px] text-slate-400 leading-tight">Bank List</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400">

        </div>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap mb-3.5">
        <button onClick={()=>{navigate('/new/bank')}} type="button" className="flex items-center gap-1.5 bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2.5 shadow-sm shadow-teal-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <Plus className="w-4 h-4" />
          Add New Bank
        </button>
        <button onClick={()=>{navigate('/add/new/transaction')}} type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2.5 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <ListOrdered className="w-4 h-4" />
          Bank Transaction
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-[13px] font-bold text-slate-900">Bank List</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 px-4 py-3 border-b border-slate-100">

          <div className="flex items-center gap-2 text-[12px] text-slate-500">
            <span>Show</span>
            <select className="border border-slate-200 rounded-md px-2 py-1 text-[12px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 cursor-pointer">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button type="button" className="flex items-center gap-1 bg-slate-500 hover:bg-slate-600 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors cursor-pointer">
              <Copy className="w-3 h-3" />
              Copy
            </button>
            <button type="button" className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors cursor-pointer">
              <FileText className="w-3 h-3" />
              CSV
            </button>
            <button type="button" className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors cursor-pointer">
              <FileSpreadsheet className="w-3 h-3" />
              Excel
            </button>
            <button type="button" className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors cursor-pointer">
              <FileBarChart className="w-3 h-3" />
              PDF
            </button>
            <button type="button" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold rounded-md px-2.5 py-1.5 transition-colors cursor-pointer">
              <Printer className="w-3 h-3" />
              Print
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-slate-500">Search:</span>
            <div className="flex items-center gap-1.5 border border-slate-200 rounded-md px-2.5 py-1.5 bg-emerald-50/60">
              <Search className="w-3.5 h-3.5 text-slate-600" />
              <input placeholder="Search..." type="text" className="text-[12px] bg-transparent border-none focus:outline-none w-28" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-linear-to-br from-emerald-600 to-emerald-700">
                <th className="text-[10.5px] font-semibold text-slate-100  tracking-wide px-4 py-2.5">
                  <div className="flex items-center gap-1 cursor-pointer">SL <ArrowUpDown className="w-3 h-3 text-slate-300" /></div>
                </th>
                <th className="text-[10.5px] font-semibold text-slate-100  tracking-wide px-4 py-2.5">
                  <div className="flex items-center gap-1 cursor-pointer">Bank Name <ArrowUpDown className="w-3 h-3 text-slate-300" /></div>
                </th>
                <th className="text-[10.5px] font-semibold text-slate-100  tracking-wide px-4 py-2.5">
                  <div className="flex items-center gap-1 cursor-pointer">A/C Name <ArrowUpDown className="w-3 h-3 text-slate-300" /></div>
                </th>
                <th className="text-[10.5px] font-semibold text-slate-100  tracking-wide px-4 py-2.5">
                  <div className="flex items-center gap-1 cursor-pointer">A/C Number <ArrowUpDown className="w-3 h-3 text-slate-300" /></div>
                </th>
                <th className="text-[10.5px] font-semibold text-slate-100  tracking-wide px-4 py-2.5">
                  <div className="flex items-center gap-1 cursor-pointer">Branch <ArrowUpDown className="w-3 h-3 text-slate-300" /></div>
                </th>
                <th className="text-[10.5px] font-semibold text-slate-100  tracking-wide px-4 py-2.5">
                  <div className="flex items-center gap-1 cursor-pointer">Balance <ArrowUpDown className="w-3 h-3 text-slate-300" /></div>
                </th>
                <th className="text-[10.5px] font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors h-100">
                <td className="text-[12px] text-slate-500 px-4 py-3"></td>
                <td className="text-[12.5px] text-slate-900 font-medium px-4 py-3"></td>
                <td className="text-[12px] text-slate-600 px-4 py-3"></td>
                <td className="text-[12px] text-slate-600 px-4 py-3"></td>
                <td className="text-[12px] text-slate-600 px-4 py-3"></td>
                <td className="text-[12.5px] text-slate-900 font-semibold px-4 py-3"></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1.5">

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

export default ManageBank
