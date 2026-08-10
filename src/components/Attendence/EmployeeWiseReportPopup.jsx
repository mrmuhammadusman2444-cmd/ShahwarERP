import React from 'react'
import { X, Calendar, Filter, Search } from 'lucide-react';



const EmployeeWiseReportPopup = ({ showEmployeePopup, setShowEmployeePopup }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden">

                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
                    <p className="text-[14px] font-bold text-slate-700">Employee Wise Attendance Report</p>
                    <button onClick={() => setShowEmployeePopup(false)} type="button" className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors cursor-pointer">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-4">

                    <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-emerald-100">
                        <div className="w-1 h-4 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
                        <p className="text-[13px] font-bold text-slate-700">Employee Attendance Report</p>
                    </div>

                    <div className="flex flex-col gap-3.5">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Start Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input type="date" placeholder="Start Date" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                                    End Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input type="date" placeholder="End Date" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Status</label>
                            <div className="relative">
                                <Filter className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <select className="w-full text-[12.5px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all cursor-pointer">
                                    <option value="">Select option</option>
                                    <option>Present</option>
                                    <option>Leave</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end mt-5">
                        <button type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-6 py-2.5 shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                            <Search className="w-3.5 h-3.5" />
                            Request
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default EmployeeWiseReportPopup
