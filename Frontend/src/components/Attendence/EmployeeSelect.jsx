import { useState, useEffect, useRef } from "react";
import axios from 'axios'
import { ChevronDown, Search, X, User } from "lucide-react";

const EmployeeSelect = ({ value, onChange, employees = [], placeholder = "Select employee..." }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [AllEmployees, setAllEmployees] = useState([])
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
    const ref = useRef(null);
    const searchRef = useRef(null);

    // ── Search filter ──
    const filtered = AllEmployees.filter(emp => {
        const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase()
        return fullName.includes(search.toLowerCase()) ||
            (emp.designation || "").toLowerCase().includes(search.toLowerCase())
    })

    // ── Selected employee ──
    const selected = AllEmployees.find(emp => emp._id === value)

    useEffect(() => {
        if (open && ref.current) {
            const updatePos = () => {
                const rect = ref.current.getBoundingClientRect();
                setDropdownPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
            };
            updatePos();
            // scroll/resize pe bhi update
            window.addEventListener('scroll', updatePos, true);
            window.addEventListener('resize', updatePos);
            return () => {
                window.removeEventListener('scroll', updatePos, true);
                window.removeEventListener('resize', updatePos);
            };
        }
    }, [open]);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        if (open && searchRef.current) {
            setTimeout(() => searchRef.current?.focus(), 50);
        } else {
            setSearch("");
        }
    }, [open]);

    const deptColor = {
        Sales: "bg-blue-50 text-blue-600 ring-blue-100",
        HR: "bg-purple-50 text-purple-600 ring-purple-100",
        Finance: "bg-emerald-50 text-emerald-600 ring-emerald-100",
        IT: "bg-amber-50 text-amber-600 ring-amber-100",
        Operations: "bg-rose-50 text-rose-600 ring-rose-100",
    };

    const avatarColor = {
        Sales: "from-blue-500 to-blue-600",
        HR: "from-purple-500 to-purple-600",
        Finance: "from-emerald-500 to-emerald-600",
        IT: "from-amber-500 to-amber-600",
        Operations: "from-rose-500 to-rose-600",
    };


    useEffect(() => {
        async function fetchEmployees() {
            try {
                const empRes = await axios.get('http://localhost:3000/find/employee')
                const userRes = await axios.get('http://localhost:3000/all/users')
                console.log("USERS RAW:", userRes.data)
                const users = userRes.data
                    .filter((u) => u.role !== "Admin")
                    .map((u) => ({
                        _id: u._id,
                        firstName: u.firstName,
                        lastName: u.lastName,
                        designation: u.designation || u.role || "System User",
                    }))
                       console.log("USERS MAPPED:", users)   // ← add
                const emps = empRes.data.map((e) => ({
                    _id: e._id,
                    firstName: e.firstName,
                    lastName: e.lastName,
                    designation: e.designation || "",
                }))
                setAllEmployees([...users, ...emps])
            } catch (err) {
                console.log(err)
            }
        }
        fetchEmployees()
    }, [])

    return (
        <div ref={ref} className="relative w-full">

            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className={`flex items-center justify-between gap-2 w-full cursor-pointer bg-emerald-50 border rounded-xl px-3 py-2.5 text-slate-700 text-[12px] focus:outline-none transition-all shadow-sm
                    ${open ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-emerald-300'}`}
            >
                <div className="flex items-center gap-2.5 min-w-0">
                    {selected ? (
                        <>
                            <div className="w-6 h-6 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shrink-0">
                                <span className="text-white text-[9px] font-bold">
                                    {selected.firstName?.[0]}{selected.lastName?.[0]}
                                </span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-slate-700 text-[12px] font-semibold truncate leading-none">
                                    {selected.firstName} {selected.lastName}
                                </p>
                                <p className="text-slate-400 text-[10px] leading-none mt-0.5">{selected.designation}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                                <User className="w-3.5 h-3.5 text-emerald-400" />
                            </div>
                            <span className="text-slate-400 text-[12px]">{placeholder}</span>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                    {selected && (
                        <div
                            onClick={(e) => { e.stopPropagation(); onChange?.(""); }}
                            className="w-4 h-4 rounded-full bg-emerald-100 hover:bg-rose-100 flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <X className="w-2.5 h-2.5 text-slate-400 hover:text-rose-500" />
                        </div>
                    )}
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {/* ── Dropdown ── */}
            {open && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-9999 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                    {/* Search */}
                    <div className="p-2 border-b border-slate-100">
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search name or department..."
                                className="flex-1 bg-transparent text-[12px] text-slate-600 placeholder-slate-400 focus:outline-none"
                            />
                            {search && (
                                <button onClick={() => setSearch("")} className="text-slate-300 hover:text-slate-500 transition-colors">
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* List */}
                    <div className="overflow-y-auto" style={{ maxHeight: "220px", scrollbarWidth: "thin", scrollbarColor: "#d1fae5 transparent" }}>
                        {AllEmployees.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-6 gap-1.5">
                                <User className="w-6 h-6 text-slate-200" />
                                <p className="text-slate-400 text-[11px]">No employees available</p>
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-6 gap-1.5">
                                <Search className="w-6 h-6 text-slate-200" />
                                <p className="text-slate-400 text-[11px]">No employee found</p>
                            </div>
                        ) : (
                            filtered.map((emp, idx) => (
                                <button
                                    key={emp._id || idx}
                                    type="button"
                                    onClick={() => { onChange?.(emp._id); setOpen(false); setSearch(""); }}
                                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-left cursor-pointer transition-colors
                    ${emp._id === value ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}
                                >
                                    <div className="w-7 h-7 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shrink-0">
                                        <span className="text-white text-[9px] font-bold">
                                            {emp.firstName?.[0]}{emp.lastName?.[0]}
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className={`text-[12px] font-medium truncate leading-none ${emp._id === value ? 'text-emerald-700' : 'text-slate-700'}`}>
                                            {emp.firstName} {emp.lastName}
                                        </p>
                                        <p className="text-slate-400 text-[10px] leading-none mt-0.5">{emp.designation}</p>
                                    </div>

                                    {emp.designation && (
                                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md ring-1 shrink-0 bg-emerald-50 text-emerald-600 ring-emerald-100">
                                            {emp.designation}
                                        </span>
                                    )}

                                    {emp._id === value && (
                                        <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))
                        )}
                    </div>

                    <div className="px-3 py-1.5 border-t border-slate-100 bg-slate-50/50">
                        <p className="text-[10px] text-slate-400">
                            {filtered.length} of {AllEmployees.length} employees
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeSelect;