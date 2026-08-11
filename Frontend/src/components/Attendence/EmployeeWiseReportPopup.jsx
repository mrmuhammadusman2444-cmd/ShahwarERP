import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import EmployeeSelect from './EmployeeSelect';
import { X, Calendar, Filter, Search } from 'lucide-react';



const EmployeeWiseReportPopup = ({ showEmployeePopup, setShowEmployeePopup }) => {


    const [selectedEmp, setSelectedEmp] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    


    async function handleRequest() {
        if (!selectedEmp || !startDate || !endDate) {
            alert("Employee, Start Date aur End Date select karo")
            return
        }
        setLoading(true)
        try {
            let res = await axios.get(`http://localhost:3000/attendance/report?from=${startDate}&to=${endDate}`)

            const empRecords = res.data.filter((rec) => rec.employeeId === selectedEmp)

            const summary = {
                employeeName: empRecords[0]?.employeeName || "",
                present: empRecords.filter((r) => r.status === "present").length,
                absent: empRecords.filter((r) => r.status === "absent").length,
                leave: empRecords.filter((r) => r.status === "leave").length,
                overtime: empRecords.reduce((sum, r) => sum + (Number(r.overtime) || 0), 0),
                totalDays: empRecords.length,
            }
            setResult(summary)
        } catch (err) {
            console.log("REQUEST FAILED:", err.response?.data || err.message)
        }
        setLoading(false)
    }


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


                        <EmployeeSelect value={selectedEmp} onChange={(id) => setSelectedEmp(id)} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Start Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                                    End Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />                                </div>
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
                        <button onClick={handleRequest} type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-6 py-2.5 shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                            <Search className="w-3.5 h-3.5" />
                            {loading ? "Loading..." : "Request"}
                        </button>
                    </div>

                    {result && (
                        <div className="mt-5 pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-1 h-4 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
                                <p className="text-[13px] font-bold text-slate-700">{result.employeeName || "Employee"} — Summary</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
                                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wide mb-1">Present</p>
                                    <p className="text-2xl font-bold text-emerald-700">{result.present}</p>
                                </div>
                                <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-center">
                                    <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wide mb-1">Absent</p>
                                    <p className="text-2xl font-bold text-rose-700">{result.absent}</p>
                                </div>
                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
                                    <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wide mb-1">Leave</p>
                                    <p className="text-2xl font-bold text-amber-700">{result.leave}</p>
                                </div>
                                <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-center">
                                    <p className="text-[10px] font-bold text-sky-500 uppercase tracking-wide mb-1">Overtime</p>
                                    <p className="text-2xl font-bold text-sky-700">{result.overtime}<span className="text-xs font-medium"> hrs</span></p>
                                </div>
                            </div>

                            <p className="text-[11px] text-slate-400 mt-2.5 text-center">
                                Total marked days: <span className="font-semibold text-slate-600">{result.totalDays}</span>
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default EmployeeWiseReportPopup
