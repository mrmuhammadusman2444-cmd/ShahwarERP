import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { UserCheck, Calendar, Clock, Save, CheckCircle2, XCircle, Plane, ChevronDown, Loader2, Check, Phone } from 'lucide-react'

const Attendence = () => {

    const [employees, setEmployees] = useState([])
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [attendance, setAttendance] = useState({})
    const [expanded, setExpanded] = useState(null)
    const [status, setStatus] = useState("idle")

    async function loadEmployees() {
        try {
            let empRes = await axios.get('http://localhost:3000/find/employee')
            let userRes = await axios.get('http://localhost:3000/all/users')

            const users = userRes.data
                .filter((u) => u.role !== "Admin")
                .map((u) => ({
                    _id: u._id,
                    firstName: u.firstName,
                    lastName: u.lastName,
                    designation: u.role || "System User",  
                    phone: u.phoneNo || "",
                    picture: u.image || "",                 
                }))

            setEmployees([...users, ...empRes.data])
        } catch (err) {
            console.log("LOAD FAILED:", err.response?.data || err.message)
        }
    }

    async function loadAttendance(d) {
        try {
            let res = await axios.get(`http://localhost:3000/find/attendance/${d}`)
            const map = {}
            res.data.forEach((rec) => {
                map[rec.employeeId] = {
                    status: rec.status,
                    halfDay: rec.halfDay,
                    shortDay: rec.shortDay,
                    overtime: rec.overtime,
                }
            })
            setAttendance(map)
        } catch (err) {
            console.log("ATTENDANCE LOAD FAILED:", err.response?.data || err.message)
        }
    }

    useEffect(() => { loadEmployees() }, [])
    useEffect(() => { loadAttendance(date) }, [date])

    function setStatusFor(empId, key, value) {
        setAttendance((prev) => ({
            ...prev,
            [empId]: {
                status: prev[empId]?.status || "present",
                halfDay: prev[empId]?.halfDay || false,
                shortDay: prev[empId]?.shortDay || false,
                overtime: prev[empId]?.overtime || 0,
                [key]: value,
            },
        }))
    }

    async function handleSave() {
        setStatus("saving")
        try {
            const admin = JSON.parse(localStorage.getItem("user") || "{}")
            const records = employees.map((emp) => ({
                employeeId: emp._id,
                employeeName: `${emp.firstName || ""} ${emp.lastName || ""}`.trim(),
                status: attendance[emp._id]?.status || "present",
                halfDay: attendance[emp._id]?.halfDay || false,
                shortDay: attendance[emp._id]?.shortDay || false,
                overtime: Number(attendance[emp._id]?.overtime) || 0,
            }))
            await axios.post('http://localhost:3000/save/attendance', {
                date, records, markedBy: `${admin.firstName} ${admin.lastName}`,
            })
            setStatus("saved")
            setTimeout(() => setStatus("idle"), 1500)
        } catch (err) {
            console.log("SAVE FAILED:", err.response?.data || err.message)
            setStatus("idle")
        }
    }

    const presentCount = employees.filter((e) => (attendance[e._id]?.status || "present") === "present").length
    const absentCount = employees.filter((e) => attendance[e._id]?.status === "absent").length
    const leaveCount = employees.filter((e) => attendance[e._id]?.status === "leave").length

    const tones = ["from-emerald-400 to-emerald-600", "from-sky-400 to-sky-600", "from-amber-400 to-amber-600", "from-violet-400 to-violet-600", "from-rose-400 to-rose-600"]

    const statusMeta = {
        present: { label: "Present", dot: "bg-emerald-500", text: "text-emerald-600", pill: "bg-emerald-50 text-emerald-700" },
        absent: { label: "Absent", dot: "bg-rose-500", text: "text-rose-600", pill: "bg-rose-50 text-rose-700" },
        leave: { label: "On Leave", dot: "bg-amber-500", text: "text-amber-600", pill: "bg-amber-50 text-amber-700" },
    }

    return (
        <div className="p-4 bg-slate-50 min-h-screen overflow-x-hidden">

            <style>{`
                input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(115deg) brightness(95%) contrast(101%);
                    cursor: pointer;
                }
            `}</style>

            {/* header */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2.5 pl-12 md:pl-0">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
                        <UserCheck className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Employee Attendance</h1>
                        <p className="text-[11px] text-slate-400 leading-tight">Mark daily attendance for workers</p>
                    </div>
                </div>
                {employees.length > 0 && (
                    <div className="flex justify-end -mt-2">
                        <button onClick={handleSave} disabled={status !== "idle"}
                            className={`flex items-center gap-1.5 text-white text-[13px] font-semibold rounded-xl px-7 py-3 shadow-md transition-all cursor-pointer disabled:cursor-not-allowed ${status === "saved" ? "bg-emerald-500 shadow-emerald-200" : "bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-emerald-200 hover:-translate-y-0.5"}`}>
                            {status === "idle" && (<><Save className="w-4 h-4" /> Save Attendance</>)}
                            {status === "saving" && (<><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>)}
                            {status === "saved" && (<><Check className="w-4 h-4" strokeWidth={3} /> Saved!</>)}
                        </button>
                    </div>
                )}
            </div>

            {/* date + stats */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-4">
                <div className="flex items-center gap-4 flex-wrap justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1">Attendance Date <span className="text-red-500">*</span></label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                                className="text-[13.5px] font-semibold text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-center min-w-[64px]">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Total</p>
                            <p className="text-lg font-bold text-slate-800">{employees.length}</p>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-center min-w-[64px]">
                            <p className="text-[10px] font-bold text-emerald-500 uppercase">Present</p>
                            <p className="text-lg font-bold text-emerald-700">{presentCount}</p>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-100 text-center min-w-[64px]">
                            <p className="text-[10px] font-bold text-rose-500 uppercase">Absent</p>
                            <p className="text-lg font-bold text-rose-700">{absentCount}</p>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-100 text-center min-w-[64px]">
                            <p className="text-[10px] font-bold text-amber-500 uppercase">Leave</p>
                            <p className="text-lg font-bold text-amber-700">{leaveCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* cards */}
            {employees.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                        <UserCheck className="w-7 h-7 text-emerald-300" />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">No employees found</p>
                </div>
            ) : (
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
                    {employees.map((emp) => {
                        const empId = emp._id
                        const current = attendance[empId]?.status || "present"
                        const isExpanded = expanded === empId
                        const name = `${emp.firstName || ""} ${emp.lastName || ""}`.trim()
                        const tone = tones[name.length % tones.length]
                        const initials = `${(emp.firstName || "").charAt(0)}${(emp.lastName || "").charAt(0)}`.toUpperCase()
                        const meta = statusMeta[current]

                        return (
                            <div key={empId} className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">

                                {/* ID card header */}
                                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                                    <p className="text-[11px] font-extrabold tracking-wide text-emerald-700">SHAHWAR FOODS</p>
                                    <p className="text-[10px] font-bold tracking-widest text-slate-400">EMPLOYEE ID</p>
                                </div>

                                {/* body — photo + details */}
                                <div className="p-4 flex gap-4">
                                    {/* photo */}
                                    {emp.picture ? (
                                        <img src={`http://localhost:3000${emp.picture}`} alt={name}
                                            className="w-20 h-24 rounded-lg object-cover shrink-0 ring-1 ring-slate-200 shadow-sm" />
                                    ) : (
                                        <div className={`w-20 h-24 rounded-lg bg-linear-to-br ${tone} flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-sm`}>
                                            {initials || "?"}
                                        </div>
                                    )}

                                    {/* details with underlines */}
                                    <div className="min-w-0 flex-1 flex flex-col justify-center gap-1.5">
                                        <span className={`self-start inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.pill}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />{meta.label}
                                        </span>
                                        <div className="border-b border-dashed border-slate-200 pb-0.5">
                                            <p className="text-[8px] font-semibold text-slate-400 tracking-widest uppercase">Name</p>
                                            <p className="text-slate-900 text-[14px] font-bold leading-tight truncate">{name || "—"}</p>
                                        </div>
                                        <div className="border-b border-dashed border-slate-200 pb-0.5">
                                            <p className="text-[8px] font-semibold text-slate-400 tracking-widest uppercase">Designation</p>
                                            <p className="text-slate-700 text-[12px] font-medium leading-tight truncate">{emp.designation || "—"}</p>

                                        </div>
                                        <div>
                                            <p className="text-[8px] font-semibold text-slate-400 tracking-widest uppercase">Phone</p>
                                            <p className="text-slate-700 text-[12px] font-medium leading-tight truncate">{emp.phone || "—"}</p>

                                        </div>
                                    </div>
                                </div>

                                {/* barcode strip */}


                                {/* gradient divider */}
                                <div className="h-1 bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-700" />

                                {/* status buttons */}
                                <div className="px-4 pt-3">
                                    <div className="grid grid-cols-3 gap-2">
                                        <button onClick={() => setStatusFor(empId, "status", "present")}
                                            className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-[11.5px] font-semibold transition-all cursor-pointer ${current === "present" ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" : "bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"}`}>
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Present
                                        </button>
                                        <button onClick={() => setStatusFor(empId, "status", "absent")}
                                            className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-[11.5px] font-semibold transition-all cursor-pointer ${current === "absent" ? "bg-rose-500 text-white shadow-md shadow-rose-200" : "bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600"}`}>
                                            <XCircle className="w-3.5 h-3.5" /> Absent
                                        </button>
                                        <button onClick={() => setStatusFor(empId, "status", "leave")}
                                            className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-[11.5px] font-semibold transition-all cursor-pointer ${current === "leave" ? "bg-amber-500 text-white shadow-md shadow-amber-200" : "bg-slate-50 text-slate-500 hover:bg-amber-50 hover:text-amber-600"}`}>
                                            <Plane className="w-3.5 h-3.5" /> Leave
                                        </button>
                                    </div>
                                </div>

                                {/* expand toggle */}
                                <button onClick={() => setExpanded(isExpanded ? null : empId)}
                                    className="w-full flex items-center justify-center gap-1 py-2.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer">
                                    {isExpanded ? "Less options" : "More options"}
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                                </button>

                                {/* expanded */}
                                {isExpanded && (
                                    <div className="px-4 pb-4 pt-1 border-t border-slate-50 bg-slate-50/30">
                                        <div className="flex items-center gap-5 pt-3 mb-3">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={attendance[empId]?.halfDay || false}
                                                    onChange={(e) => setStatusFor(empId, "halfDay", e.target.checked)}
                                                    className="w-4 h-4 rounded border-emerald-200 text-emerald-600 focus:ring-emerald-300 cursor-pointer" />
                                                <span className="text-[12.5px] font-medium text-slate-600">Half Day</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={attendance[empId]?.shortDay || false}
                                                    onChange={(e) => setStatusFor(empId, "shortDay", e.target.checked)}
                                                    className="w-4 h-4 rounded border-emerald-200 text-emerald-600 focus:ring-emerald-300 cursor-pointer" />
                                                <span className="text-[12.5px] font-medium text-slate-600">Short Day</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Overtime (hrs)</label>
                                            <div className="relative w-full max-w-[160px]">
                                                <Clock className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                <input type="number" value={attendance[empId]?.overtime || ""}
                                                    onChange={(e) => setStatusFor(empId, "overtime", e.target.value)}
                                                    placeholder="0.0"
                                                    className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-white border border-emerald-100 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
                </div>
            )}

            {/* save */}


        </div>
    )
}

export default Attendence