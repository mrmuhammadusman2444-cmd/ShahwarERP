import React, { useState } from 'react'
import axios from 'axios'
import { HandCoins, Calendar, Wallet, RotateCcw, Save, FileText, Tag, Loader2, Check } from 'lucide-react'
import EmployeeSelect from '../Attendence/EmployeeSelect.jsx'

const EmployeeAdvanceSalary = () => {

    const [form, setForm] = useState({
        date: new Date().toISOString().slice(0, 10),
        employeeId: "",
        advanceType: "Payment",
        category: "Salary",
        amount: "",
        details: "",
    })
    const [status, setStatus] = useState("idle")

    function handleReset() {
        setForm({
            date: new Date().toISOString().slice(0, 10),
            employeeId: "",
            advanceType: "Payment",
            category: "Salary",
            amount: "",
            details: "",
        })
    }

    async function handleSave() {
        if (!form.employeeId || !form.amount) {
            alert("Employee aur Amount zaroori hai")
            return
        }
        setStatus("saving")
        try {
            await axios.post('http://localhost:3000/add/salary-advance', form)
            setStatus("saved")
            setTimeout(() => {
                setStatus("idle")
                handleReset()
            }, 1200)
        } catch (err) {
            console.log("SAVE FAILED:", err.response?.data || err.message)
            setStatus("idle")
        }
    }

    async function calculateCurrentSalary(employeeId) {
        try {
            const today = new Date()
            const year = today.getFullYear()
            const monthIndex = today.getMonth()
            const totalDays = new Date(year, monthIndex + 1, 0).getDate()
            const lastDay = today.getDate()   // aaj tak

            const monthStr = String(monthIndex + 1).padStart(2, "0")
            const from = `${year}-${monthStr}-01`
            const to = `${year}-${monthStr}-${String(totalDays).padStart(2, "0")}`

            // employee ki monthly salary
            let monthlySalary = 0
            const empRes = await axios.get('http://localhost:3000/find/employee')
            const userRes = await axios.get('http://localhost:3000/all/users')
            const emp = empRes.data.find((e) => e._id === employeeId)
            const user = userRes.data.find((u) => u._id === employeeId)
            if (emp) monthlySalary = Number(emp.hourRateSalary) || 0
            if (user) monthlySalary = Number(user.hourRateSalary) || 0

            // attendance
            const attRes = await axios.get(`http://localhost:3000/attendance/report?from=${from}&to=${to}`)
            const empAtt = attRes.data.filter((a) => a.employeeId === employeeId)

            const present = empAtt.filter((a) => a.status === "present").length
            const leave = empAtt.filter((a) => a.status === "leave").length
            const overtime = empAtt.reduce((sum, a) => sum + (Number(a.overtime) || 0), 0)

            const perDay = totalDays > 0 ? monthlySalary / totalDays : 0
            const overtimePay = overtime * (perDay / 8.5)
            const calculatedSalary = empAtt.length === 0
                ? 0
                : Math.round((present + leave) * perDay + overtimePay)

            setForm((prev) => ({ ...prev, amount: calculatedSalary }))
        } catch (err) {
            console.log("SALARY CALC FAILED:", err.response?.data || err.message)
        }
    }

    return (
        <div className="p-4 bg-slate-50 min-h-screen overflow-x-hidden">


            {/* header */}
            <div className="flex items-center gap-2.5 mb-4 pl-12 md:pl-0">
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
                    <HandCoins className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                    <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Employee Salary Advance</h1>
                    <p className="text-[11px] text-slate-400 leading-tight">Record salary advances, deductions & fines</p>
                </div>
            </div>

            {/* form card */}
            <div className="bg-white rounded-2xl border border-slate-100 h-170 shadow-sm p-8 w-full max-w-8xl">
                <div className="max-w-xl ">



                    <div className="flex flex-col gap-3.5">

                        {/* date */}
                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Date</label>
                            <div className="relative">
                                <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                                <input
                                    type="date"
                                    value={form.date}
                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                    className="w-full text-[12.5px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all"
                                />
                            </div>
                        </div>

                        {/* employee */}
                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                                Employee Name <span className="text-red-500">*</span>
                            </label>
                            <EmployeeSelect value={form.employeeId} onChange={(id) => {
                                setForm({ ...form, employeeId: id })
                                calculateCurrentSalary(id)
                            }} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Advance Type <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Tag className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                                    <select
                                        value={form.advanceType}
                                        onChange={(e) => setForm({ ...form, advanceType: e.target.value })}
                                        className="w-full text-[12.5px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Payment">Payment</option>
                                        <option value="Deduction">Deduction</option>
                                    </select>
                                    <svg className="w-3.5 h-3.5 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Advance / Fines</label>
                                <div className="relative">
                                    <HandCoins className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full text-[12.5px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Salary">Salary</option>
                                        <option value="Advance">Advance</option>
                                        <option value="Fine">Fine</option>
                                    </select>
                                    <svg className="w-3.5 h-3.5 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* amount */}
                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                                Amount <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="text-[12px] font-semibold text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">Rs.</span>
                                <input

                                    value={form.amount}
                                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all"
                                />
                            </div>
                        </div>

                        {/* details */}
                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Details</label>
                            <div className="relative">
                                <FileText className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-3 pointer-events-none" />
                                <textarea
                                    value={form.details}
                                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                                    rows={2}
                                    placeholder="Any notes or reason..."
                                    className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all resize-none"
                                />
                            </div>
                        </div>

                    </div>

                    {/* actions */}
                    <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Reset
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={status !== "idle"}
                            type="button"
                            className={`flex items-center gap-1.5 text-white text-[12.5px] font-semibold rounded-lg px-6 py-2.5 shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:cursor-not-allowed ${status === "saved" ? "bg-emerald-500 shadow-emerald-200" : "bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-emerald-200"}`}
                        >
                            {status === "idle" && (<><Save className="w-3.5 h-3.5" /> Save</>)}
                            {status === "saving" && (<><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>)}
                            {status === "saved" && (<><Check className="w-3.5 h-3.5" strokeWidth={3} /> Saved!</>)}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EmployeeAdvanceSalary