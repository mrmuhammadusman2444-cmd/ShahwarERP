import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Inbox, Send, Flag, Calendar, Loader2, Clock, Trash2, Plus, Search, X, ChevronRight, Check } from 'lucide-react'

const InboxPage = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [showCompose, setShowCompose] = useState(false)
    const [tasks, setTasks] = useState([])
    const [form, setForm] = useState({ title: "", description: "", dueDate: "", priority: "normal" })
    const [status, setStatus] = useState("idle")

    useEffect(() => {
        async function loadUsers() {
            try {
                let res = await axios.get('http://localhost:3000/all/users')
                setUsers(res.data)
            } catch (err) {
                console.log("USERS LOAD FAILED:", err.response?.data || err.message)
            }
        }

        const currentUser = JSON.parse(localStorage.getItem("user") || "{}")

        if (currentUser.role === "Admin") {
            loadUsers()
        } else {
            loadTasks(currentUser.email)
        }
    }, [])

    async function handleDeleteTask(id) {
        try {
            await axios.delete(`http://localhost:3000/delete/task/${id}`)
            loadTasks(selectedUser.email)   // list refresh
        } catch (err) {
            console.log("DELETE FAILED:", err.response?.data || err.message)
        }
    }
    async function loadTasks(email) {
        try {
            let res = await axios.get(`http://localhost:3000/find/tasks/${email}`)
            setTasks(res.data)
        } catch (err) {
            console.log("TASKS LOAD FAILED:", err.response?.data || err.message)
        }
    }


    async function handleAssign() {

        setStatus("saving")
        try {
            const admin = JSON.parse(localStorage.getItem("user") || "{}")
            await axios.post('http://localhost:3000/add/task', {
                ...form,
                assignedTo: selectedUser.email,
                assignedBy: `${admin.firstName} ${admin.lastName}`,
            })
            setStatus("saved")
            loadTasks(selectedUser.email)
            setTimeout(() => {
                setForm({ title: "", description: "", dueDate: "", priority: "normal" })
                setStatus("idle")
                setShowCompose(false)
            }, 900)
        } catch (err) {
            console.log("ASSIGN FAILED:", err.response?.data || err.message)
            setStatus("idle")
        }
    }
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
    const isAdmin = currentUser.role === "Admin"

    async function updateStatus(id, newStatus) {
        try {
            await axios.put(`http://localhost:3000/update/task/status/${id}`, { status: newStatus })
            loadTasks(currentUser.email)   // refresh
        } catch (err) {
            console.log("STATUS FAILED:", err.response?.data || err.message)
        }
    }
    return (
        <div className="p-4 md:p-5 overflow-x-hidden">

            {isAdmin ? (

                <>
                    {/* header */}
                    <div className="flex items-center justify-between gap-3 mb-4 pl-12 md:pl-0 flex-wrap">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                                <Inbox className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-gray-800 text-lg font-bold">Inbox</h1>
                                <p className="text-gray-400 text-xs">Assign and track team tasks</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/70 rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row" style={{ minHeight: "85vh" }}>


                        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-slate-100 w-full lg:w-[42%]">


                            <div className="p-3 border-b border-slate-100">
                                <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
                                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                                    <input placeholder="Search tasks..." className="bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none w-full" />
                                </div>
                            </div>


                            <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-100 overflow-x-auto">
                                <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap bg-emerald-600 text-white cursor-pointer">
                                    All <span className="text-[10px] px-1.5 rounded-full bg-white/25">0</span>
                                </button>
                                <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap text-slate-500 hover:bg-slate-100 cursor-pointer">
                                    Pending <span className="text-[10px] px-1.5 rounded-full bg-slate-100">0</span>
                                </button>
                                <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap text-slate-500 hover:bg-slate-100 cursor-pointer">
                                    In progress <span className="text-[10px] px-1.5 rounded-full bg-slate-100">0</span>
                                </button>
                                <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap text-slate-500 hover:bg-slate-100 cursor-pointer">
                                    Done <span className="text-[10px] px-1.5 rounded-full bg-slate-100">0</span>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                {users.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full py-16 gap-2">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                                            <Inbox className="w-6 h-6 text-slate-300" />
                                        </div>
                                        <p className="text-slate-500 text-sm font-medium">No users found</p>
                                    </div>
                                ) : (
                                    users.map((u) => {
                                        const tones = ["from-emerald-400 to-emerald-600", "from-sky-400 to-sky-600", "from-amber-400 to-amber-600", "from-violet-400 to-violet-600", "from-rose-400 to-rose-600"]
                                        const tone = tones[(u.firstName || u.email || "").length % tones.length]
                                        const initial = `${(u.firstName || "").charAt(0)}${(u.lastName || "").charAt(0)}`.toUpperCase() || (u.email || "?").charAt(0).toUpperCase()

                                        return (
                                            <button
                                                key={u._id}
                                                onClick={() => { setSelectedUser(u); loadTasks(u.email) }}
                                                className="w-full text-left px-4 py-3 border-b border-slate-50 flex items-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
                                            >
                                                {u.image ? (
                                                    <img
                                                        src={`http://localhost:3000${u.image}`}
                                                        alt={u.firstName}
                                                        className="w-11 h-11 shrink-0 rounded-full object-cover shadow-sm"
                                                    />
                                                ) : (
                                                    <div className={`w-11 h-11 shrink-0 rounded-full bg-linear-to-br ${tone} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                                                        {initial}
                                                    </div>
                                                )}
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-slate-800 text-sm font-semibold truncate">
                                                        {u.firstName || ""} {u.lastName || ""}
                                                    </p>
                                                    <p className="text-slate-500 text-xs truncate">{u.email}</p>
                                                </div>
                                                {u.role && (
                                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 shrink-0">
                                                        {u.role}
                                                    </span>
                                                )}
                                            </button>
                                        )
                                    })
                                )}
                            </div>
                        </div>


                        <div className="flex-1 flex-col hidden lg:flex">

                            {!selectedUser ? (
                                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-8">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center">
                                        <Inbox className="w-8 h-8 text-slate-200" />
                                    </div>
                                    <div>
                                        <p className="text-slate-600 text-sm font-semibold">Select a user</p>
                                        <p className="text-slate-400 text-xs mt-0.5">Choose a team member to assign tasks</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col">


                                    <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                                        <div className="flex items-center gap-3">
                                            {selectedUser.image ? (
                                                <img src={`http://localhost:3000${selectedUser.image}`} alt="" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
                                                    {`${(selectedUser.firstName || "").charAt(0)}${(selectedUser.lastName || "").charAt(0)}`.toUpperCase()}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-slate-800 text-sm">{selectedUser.firstName} {selectedUser.lastName}</p>
                                                <p className="text-[11px] text-slate-400">{selectedUser.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowCompose(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
                                            <Plus className="w-4 h-4" /> New Task
                                        </button>
                                    </div>


                                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                        {tasks.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-full py-16 gap-2">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                                                    <Inbox className="w-6 h-6 text-slate-300" />
                                                </div>
                                                <p className="text-slate-500 text-sm font-medium">No tasks assigned yet</p>
                                                <p className="text-slate-400 text-xs">Click "New Task" to assign one</p>
                                            </div>
                                        ) : (
                                            tasks.map((task) => {
                                                const priorityTone = {
                                                    urgent: "bg-red-50 text-red-700 ring-red-200",
                                                    high: "bg-amber-50 text-amber-700 ring-amber-200",
                                                    normal: "bg-emerald-50 text-emerald-700 ring-emerald-200",
                                                }
                                                const statusTone = {
                                                    pending: "bg-gray-100 text-gray-600",
                                                    "in-progress": "bg-sky-100 text-sky-700",
                                                    done: "bg-emerald-100 text-emerald-700",
                                                }
                                                return (
                                                    <div key={task._id} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="min-w-0 flex-1">
                                                                <p className={`text-slate-800 text-sm font-bold ${task.status === "done" ? "line-through text-slate-400" : ""}`}>
                                                                    {task.title}
                                                                </p>
                                                                {task.description && (
                                                                    <p className="text-slate-500 text-xs mt-1">{task.description}</p>
                                                                )}
                                                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ring-1 capitalize ${priorityTone[task.priority] || priorityTone.normal}`}>
                                                                        <Flag className="w-2.5 h-2.5 inline mr-0.5" />{task.priority}
                                                                    </span>
                                                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md capitalize ${statusTone[task.status]}`}>
                                                                        {task.status.replace("-", " ")}
                                                                    </span>
                                                                    {task.dueDate && (
                                                                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                                                            <Calendar className="w-2.5 h-2.5" />
                                                                            {new Date(task.dueDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => handleDeleteTask(task._id)}
                                                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                                                            >
                                                                <Trash2 size={15} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                    {showCompose && selectedUser && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">

                                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-linear-to-r from-emerald-50 to-white">
                                    <div className="flex items-center gap-2">
                                        <Send className="w-4 h-4 text-emerald-600" />
                                        <h3 className="text-slate-800 text-base font-bold">New Task for {selectedUser.firstName}</h3>
                                    </div>
                                    <button onClick={() => setShowCompose(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                                        <X className="w-4.5 h-4.5 text-slate-500" />
                                    </button>
                                </div>

                                <div className="overflow-y-auto flex-1 p-5 flex flex-col gap-4">
                                    <div>
                                        <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Title <span className="text-red-400">*</span></label>
                                        <input
                                            value={form.title}
                                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                                            placeholder="Task title..."
                                            className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-slate-700 placeholder-slate-400 text-sm focus:outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Description</label>
                                        <textarea
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                            rows={3}
                                            placeholder="Details..."
                                            className="w-full resize-none bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-slate-700 placeholder-slate-400 text-sm focus:outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Due Date</label>
                                        <input
                                            type="date"
                                            value={form.dueDate}
                                            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                                            className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-slate-700 text-sm focus:outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-slate-500 text-[11px] font-bold uppercase tracking-wide block mb-1.5">Priority</label>
                                        <div className="flex gap-2">
                                            {[
                                                { value: "urgent", label: "Urgent", dot: "bg-red-500", active: "border-red-300 bg-red-50 text-red-700" },
                                                { value: "high", label: "High", dot: "bg-amber-500", active: "border-amber-300 bg-amber-50 text-amber-700" },
                                                { value: "normal", label: "Normal", dot: "bg-emerald-500", active: "border-emerald-300 bg-emerald-50 text-emerald-700" },
                                            ].map((p) => (
                                                <button
                                                    key={p.value}
                                                    type="button"
                                                    onClick={() => setForm({ ...form, priority: p.value })}
                                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-xs font-semibold transition-all cursor-pointer ${form.priority === p.value ? p.active : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"}`}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />{p.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-100 bg-slate-50/40">
                                    <button onClick={() => setShowCompose(false)} className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-semibold rounded-xl transition-all cursor-pointer">Cancel</button>
                                    <button
                                        onClick={handleAssign}
                                        disabled={status !== "idle"}
                                        className={`flex items-center gap-2 px-6 py-2.5 text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer disabled:cursor-not-allowed ${status === "saved" ? "bg-emerald-500" : "bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600"} shadow-emerald-200`}
                                    >
                                        {status === "idle" && (<><Send size={15} /> Assign</>)}
                                        {status === "saving" && (<><Loader2 size={15} className="animate-spin" /> Assigning...</>)}
                                        {status === "saved" && (<><Check size={15} strokeWidth={3} /> Assigned!</>)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (

                <>

                    <div className="flex items-center gap-3 mb-4 pl-12 md:pl-0">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                            <Inbox className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-gray-800 text-lg font-bold">My Tasks</h1>
                            <p className="text-gray-400 text-xs">Tasks assigned to you</p>
                        </div>
                    </div>

                    <div className="max-w-3xl flex flex-col gap-3">
                        {tasks.length === 0 ? (
                            <div className="bg-white border border-slate-200/70 rounded-2xl shadow-sm py-16 text-center">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                                    <Inbox className="w-7 h-7 text-emerald-300" />
                                </div>
                                <p className="text-slate-600 text-sm font-medium">No tasks yet</p>
                                <p className="text-slate-400 text-xs">You have no tasks assigned</p>
                            </div>
                        ) : (
                            tasks.map((task) => {
                                const priorityTone = {
                                    urgent: "bg-red-50 text-red-700 ring-red-200",
                                    high: "bg-amber-50 text-amber-700 ring-amber-200",
                                    normal: "bg-emerald-50 text-emerald-700 ring-emerald-200",
                                }
                                const statusTone = {
                                    pending: "bg-gray-100 text-gray-600",
                                    "in-progress": "bg-sky-100 text-sky-700",
                                    done: "bg-emerald-100 text-emerald-700",
                                }
                                return (
                                    <div key={task._id} className="bg-white border border-slate-200/70 rounded-2xl p-4 shadow-sm">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0 flex-1">
                                                <p className={`text-slate-800 text-sm font-bold ${task.status === "done" ? "line-through text-slate-400" : ""}`}>
                                                    {task.title}
                                                </p>
                                                {task.description && <p className="text-slate-500 text-xs mt-1">{task.description}</p>}
                                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ring-1 capitalize ${priorityTone[task.priority] || priorityTone.normal}`}>
                                                        <Flag className="w-2.5 h-2.5 inline mr-0.5" />{task.priority}
                                                    </span>
                                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md capitalize ${statusTone[task.status]}`}>
                                                        {task.status.replace("-", " ")}
                                                    </span>
                                                    {task.dueDate && (
                                                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                                            <Calendar className="w-2.5 h-2.5" />
                                                            {new Date(task.dueDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                                                        </span>
                                                    )}
                                                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                                        From: {task.assignedBy || "Admin"}
                                                    </span>
                                                </div>
                                            </div>


                                            {task.status !== "done" && (
                                                <div className="flex flex-col gap-1.5 shrink-0">
                                                    {task.status === "pending" && (
                                                        <button onClick={() => updateStatus(task._id, "in-progress")} className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors cursor-pointer flex items-center gap-1">
                                                            <Clock size={12} /> Start
                                                        </button>
                                                    )}
                                                    <button onClick={() => updateStatus(task._id, "done")} className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer flex items-center gap-1">
                                                        <Check size={12} /> Done
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default InboxPage