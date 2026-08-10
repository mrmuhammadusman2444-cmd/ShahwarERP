import { useState, useEffect, useRef } from "react";
import axios from "axios";

const CustomerDropdown = ({ value, onChange }) => {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const ref = useRef(null);
    const searchRef = useRef(null);

    useEffect(() => {
        async function fetchCustomers() {
            try {
                let res = await axios.get("http://localhost:3000/find");
                setCustomers(res.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchCustomers();
    }, []);

    const selected = customers.find((c) => c.customerName === value);

    const filtered = customers.filter((c) =>
        (c.customerName || "").toLowerCase().includes(search.toLowerCase())
    );

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

    return (
        <div ref={ref} className="relative ">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center justify-between gap-2 w-full cursor-pointer bg-emerald-50 border border-emerald-100 hover:border-emerald-300 rounded-xl px-4 py-2.5 text-gray-600 text-sm focus:outline-none focus:border-emerald-400 transition-all"
            >
                <span className="truncate">{selected ? selected.customerName : "All customers"}</span>
                <svg
                    className={`w-3.5 h-3.5 text-emerald-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="absolute top-[calc(100%+6px)] left-0 z-50  bg-white border border-emerald-100 rounded-2xl shadow-lg shadow-emerald-100/50 min-w-60">

                    <div className="p-2 border-b border-emerald-50">
                        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 focus-within:border-emerald-400 transition-all">
                            <svg className="w-3.5 h-3.5 text-emerald-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search Customers"
                                className="flex-1 bg-transparent text-xs text-gray-600 placeholder-gray-400 border-dashed focus:outline-none"
                            />
                            {search && (
                                <button onClick={() => setSearch("")} className="text-gray-300 hover:text-gray-500 transition-colors">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="py-1.5 max-h-52 overflow-y-auto  custom-dd-scroll">
                        {filtered.length === 0 ? (
                            <p className="text-center text-gray-400 text-xs py-6">no customer found</p>
                        ) : (
                            filtered.map((cust) => (
                                <button
                                    key={cust._id}
                                    type="button"
                                    onClick={() => {
                                        onChange?.(cust.customerName);
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs cursor-pointer rounded-lg mx-1 transition-colors
                    ${cust.customerName === value
                                            ? "bg-emerald-50 text-emerald-700 font-semibold"
                                            : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                                        }`}
                                    style={{ width: "calc(100% - 8px)" }}
                                >
                                    {cust.customerName}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}

            <style>{`
        .custom-dd-scroll::-webkit-scrollbar { width: 4px; }
        .custom-dd-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-dd-scroll::-webkit-scrollbar-thumb { background: #bfdbfe; border-radius: 99px; }
        .custom-dd-scroll::-webkit-scrollbar-thumb:hover { background: #93c5fd; }
      `}</style>
        </div>
    );
};

export default CustomerDropdown;