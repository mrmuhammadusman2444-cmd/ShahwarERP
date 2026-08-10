import React from 'react'
import { useState } from 'react'
import DateWiseReportPopup from './DateWiseReportPopup'
import EmployeeWiseReportPopup from './EmployeeWiseReportPopup'
import { FileBarChart, Home, ChevronRight, Calendar, ChevronDown, Search, Printer, FileSearch } from 'lucide-react';

const AttendenceReport = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEmployeePopup, setShowEmployeePopup] = useState(false);
  return (
    <div className="p-4 bg-slate-50 min-h-screen">

      {
        showPopup == true ? <DateWiseReportPopup showPopup={showPopup} setShowPopup={setShowPopup} /> : null
      }

      {
        showEmployeePopup == true ? <EmployeeWiseReportPopup showEmployeePopup={showEmployeePopup} setShowEmployeePopup={setShowEmployeePopup} /> : null
      }


      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
            <FileBarChart className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Attendance Report</h1>
            <p className="text-[11px] text-slate-400 leading-tight">View attendance records</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400">

        </div>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap mb-3.5">
        <button onClick={() => { setShowPopup(true) }} type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2.5 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <Calendar className="w-4 h-4" />
          Date Wise Report
        </button>
        <button onClick={() => { setShowEmployeePopup(true) }} type="button" className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 text-[12.5px] font-semibold rounded-lg px-4 py-2.5 hover:bg-slate-50 transition-all hover:-translate-y-0.5 cursor-pointer">
          <ChevronDown className="w-4 h-4 rotate-90" />
          Employee Wise Report
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 mb-3.5">
        <div className="flex items-end gap-3 flex-wrap">

          <div>
            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">From</label>
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input type="date" className="text-[12.5px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">To</label>
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input type="date" className="text-[12.5px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
            </div>
          </div>

          <button type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-4 py-2 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
            <Search className="w-3.5 h-3.5" />
            Search
          </button>

        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <p className="text-[13px] font-bold text-slate-900">Attendance Report</p>
          <button type="button" className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-[12px] font-semibold rounded-lg px-3.5 py-1.5 shadow-sm shadow-amber-200 transition-all hover:-translate-y-0.5 cursor-pointer">
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-linear-to-br from-emerald-500 to-emerald-700 border-b border-slate-100">
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3">SL</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3">Date</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3">Name</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3">Designation</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3 text-center">Present &amp; Leave</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3 text-center">Short Day</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3 text-center">Overtime (hrs)</th>
                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3 text-center">Overtime Day (hrs)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 h-94">
              <tr>
                <td colSpan={8} className="h-94">
                  <div className="flex flex-col items-center justify-center gap-2 h-full">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                      <FileSearch className="w-6 h-6 text-emerald-300" />
                    </div>
                    <p className="text-[13px]  text-slate-700">No record found</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default AttendenceReport
