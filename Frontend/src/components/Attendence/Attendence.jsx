import React from 'react'
import {
    UserCheck, Home, ChevronRight, Calendar, Clock, Save, CheckCircle2, XCircle
} from 'lucide-react';

const Attendence = () => {
  return (
        <div className="p-4 bg-slate-50 min-h-screen">
 
            <style>{`
                input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(115deg) brightness(95%) contrast(101%);
                    cursor: pointer;
                }
            `}</style>
 
            <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
                        <UserCheck className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Employee Attendance</h1>
                        <p className="text-[11px] text-slate-400 leading-tight">Mark daily attendance for workers</p>
                    </div>
                </div>
 
                <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
                   
                </div>
            </div>
 
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 mb-3.5">
                <div className="flex items-center gap-4 flex-wrap">
 
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                                Attendance Date <span className="text-red-500">*</span>
                            </label>
                            <input type="date" className="text-[13.5px] font-semibold text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                        </div>
                    </div>
 
                    <div className="flex items-center gap-1.5 ml-2">
                        <button type="button" className="text-[11.5px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-3.5 py-1.5 hover:bg-emerald-100 transition-colors cursor-pointer">
                            Today
                        </button>
                        <button type="button" className="text-[11.5px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-3.5 py-1.5 hover:bg-slate-100 transition-colors cursor-pointer">
                            Yesterday
                        </button>
                    </div>
 
                </div>
            </div>
 
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
 
                <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-[13px] font-bold text-slate-900">Worker Attendance Sheet</p>
                </div>
 
                <div className="overflow-x-auto ">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-linear-to-br from-emerald-500 to-emerald-700 border-b border-slate-100 ">
                                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3">SL</th>
                                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3">Name</th>
                                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3">Designation</th>
                                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3 text-center">Present &amp; Leave</th>
                                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3 text-center">Short Day</th>
                                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3 text-center">Overtime (hrs)</th>
                                <th className="text-[13px] font-bold text-slate-50  tracking-wide px-3 py-3 text-center">Overtime Day (hrs)</th>
                            </tr>
                        </thead>
                        <tbody>
 
                            <tr className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors ">
                                <td className="text-[12px] text-slate-500 px-3 py-3 ">1</td>
                                <td className="text-[12.5px] text-slate-900 font-medium px-3 py-3">Ali Raza</td>
                                <td className="text-[12px] text-slate-600 px-3 py-3">Machine Operator</td>
                                <td className="px-3 py-3">
                                    <div className="flex justify-center">
                                        <div className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 p-1 gap-1">
                                            <label className="cursor-pointer">
                                                <input type="radio" name="attendance-1" className="peer sr-only" defaultChecked />
                                                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-400 peer-checked:bg-emerald-500 peer-checked:text-white peer-checked:shadow-sm transition-all duration-300">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Present
                                                </span>
                                            </label>
                                            <label className="cursor-pointer">
                                                <input type="radio" name="attendance-1" className="peer sr-only" />
                                                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-400 peer-checked:bg-rose-500 peer-checked:text-white peer-checked:shadow-sm transition-all duration-300">
                                                    <XCircle className="w-3 h-3" />
                                                    Leave
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    <div className="flex items-center justify-center">
                                        <input type="checkbox" className="w-4 h-4 rounded border-emerald-200 text-emerald-600 focus:ring-emerald-300 cursor-pointer" />
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    <div className="relative w-24 mx-auto">
                                        <Clock className="w-3.5 h-3.5 text-emerald-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input type="text" placeholder="0.0" className="w-full text-[12px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-center" />
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    <div className="relative w-24 mx-auto">
                                        <Clock className="w-3.5 h-3.5 text-emerald-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input type="text" placeholder="0.0" className="w-full text-[12px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-center" />
                                    </div>
                                </td>
                            </tr>
 
                            <tr className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                                <td className="text-[12px] text-slate-500 px-3 py-3">2</td>
                                <td className="text-[12.5px] text-slate-900 font-medium px-3 py-3">Usman Khan</td>
                                <td className="text-[12px] text-slate-600 px-3 py-3">Packing Supervisor</td>
                                <td className="px-3 py-3">
                                    <div className="flex justify-center">
                                        <div className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 p-1 gap-1">
                                            <label className="cursor-pointer">
                                                <input type="radio" name="attendance-2" className="peer sr-only" defaultChecked />
                                                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-400 peer-checked:bg-emerald-500 peer-checked:text-white peer-checked:shadow-sm transition-all duration-300">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Present
                                                </span>
                                            </label>
                                            <label className="cursor-pointer">
                                                <input type="radio" name="attendance-2" className="peer sr-only" />
                                                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-400 peer-checked:bg-rose-500 peer-checked:text-white peer-checked:shadow-sm transition-all duration-300">
                                                    <XCircle className="w-3 h-3" />
                                                    Leave
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    <div className="flex items-center justify-center">
                                        <input type="checkbox" className="w-4 h-4 rounded border-emerald-200 text-emerald-600 focus:ring-emerald-300 cursor-pointer" />
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    <div className="relative w-24 mx-auto">
                                        <Clock className="w-3.5 h-3.5 text-emerald-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input type="text" placeholder="0.0" className="w-full text-[12px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-center" />
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    <div className="relative w-24 mx-auto">
                                        <Clock className="w-3.5 h-3.5 text-emerald-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input type="text" placeholder="0.0" className="w-full text-[12px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-center" />
                                    </div>
                                </td>
                            </tr>
 
                            <tr className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                                <td className="text-[12px] text-slate-500 px-3 py-3">3</td>
                                <td className="text-[12.5px] text-slate-900 font-medium px-3 py-3">Bilal Ahmed</td>
                                <td className="text-[12px] text-slate-600 px-3 py-3">Warehouse Staff</td>
                                <td className="px-3 py-3">
                                    <div className="flex justify-center">
                                        <div className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 p-1 gap-1">
                                            <label className="cursor-pointer">
                                                <input type="radio" name="attendance-3" className="peer sr-only" />
                                                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-400 peer-checked:bg-emerald-500 peer-checked:text-white peer-checked:shadow-sm transition-all duration-300">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Present
                                                </span>
                                            </label>
                                            <label className="cursor-pointer">
                                                <input type="radio" name="attendance-3" className="peer sr-only" defaultChecked />
                                                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-400 peer-checked:bg-rose-500 peer-checked:text-white peer-checked:shadow-sm transition-all duration-300">
                                                    <XCircle className="w-3 h-3" />
                                                    Leave
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    <div className="flex items-center justify-center">
                                        <input type="checkbox" className="w-4 h-4 rounded border-emerald-200 text-emerald-600 focus:ring-emerald-300 cursor-pointer" />
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    <div className="relative w-24 mx-auto">
                                        <Clock className="w-3.5 h-3.5 text-emerald-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input type="text" placeholder="0.0" className="w-full text-[12px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-center" />
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    <div className="relative w-24 mx-auto">
                                        <Clock className="w-3.5 h-3.5 text-emerald-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input type="text" placeholder="0.0" className="w-full text-[12px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-center" />
                                    </div>
                                </td>
                            </tr>
 
                            <tr className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                                <td className="text-[12px] text-slate-500 px-3 py-3">4</td>
                                <td className="text-[12.5px] text-slate-900 font-medium px-3 py-3">Hamza Tariq</td>
                                <td className="text-[12px] text-slate-600 px-3 py-3">Delivery Driver</td>
                                <td className="px-3 py-3">
                                    <div className="flex justify-center">
                                        <div className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 p-1 gap-1">
                                            <label className="cursor-pointer">
                                                <input type="radio" name="attendance-4" className="peer sr-only" defaultChecked />
                                                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-400 peer-checked:bg-emerald-500 peer-checked:text-white peer-checked:shadow-sm transition-all duration-300">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Present
                                                </span>
                                            </label>
                                            <label className="cursor-pointer">
                                                <input type="radio" name="attendance-4" className="peer sr-only" />
                                                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-400 peer-checked:bg-rose-500 peer-checked:text-white peer-checked:shadow-sm transition-all duration-300">
                                                    <XCircle className="w-3 h-3" />
                                                    Leave
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    <div className="flex items-center justify-center">
                                        <input type="checkbox" className="w-4 h-4 rounded border-emerald-200 text-emerald-600 focus:ring-emerald-300 cursor-pointer" />
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    <div className="relative w-24 mx-auto">
                                        <Clock className="w-3.5 h-3.5 text-emerald-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input type="text" placeholder="0.0" className="w-full text-[12px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-center" />
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    <div className="relative w-24 mx-auto">
                                        <Clock className="w-3.5 h-3.5 text-emerald-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input type="text" placeholder="0.0" className="w-full text-[12px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-center" />
                                    </div>
                                </td>
                            </tr>
 
                        </tbody>
                    </table>
                </div>
 
                <div className="flex items-center justify-end px-4 py-3.5 border-t border-slate-100">
                    <button type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-6 py-2.5 shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                        <Save className="w-3.5 h-3.5" />
                        Save Attendance
                    </button>
                </div>
 
            </div>
        </div>
    );
}

export default Attendence
