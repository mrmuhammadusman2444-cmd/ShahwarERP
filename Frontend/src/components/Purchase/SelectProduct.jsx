import { useState, useEffect, useRef } from "react";
import axios from 'axios'
import { Package, Search, X, ChevronDown } from "lucide-react";

const SelectProducts = ({ value, onChange }) => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
    const ref = useRef(null);
    const searchRef = useRef(null);

    const selected = products.find((p) => p.productName === value);

    const filtered = products.filter((p) =>
        (p.productName || "").toLowerCase().includes(search.toLowerCase())
    );

    // ── Position calculate karo jab open ho ──
    useEffect(() => {
        if (open && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setDropdownPos({
                top: rect.bottom + 4,
                left: rect.left,
            });
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
    useEffect(() => {
        axios.get('http://localhost:3000/find/raw/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div ref={ref} className="relative w-full">

            {/* ── Trigger Button ── */}
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center justify-between gap-2 w-full cursor-pointer bg-emerald-50 border border-emerald-100 hover:border-emerald-300 rounded-lg px-3 py-1.5 text-slate-700 text-[12px] focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            >
                <div className="flex items-center gap-2 min-w-0">
                    <Package className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate text-[12px] font-medium">
                        {selected ? selected.productName : "Select product"}
                    </span>
                </div>
                <ChevronDown
                    className={`w-3.5 h-3.5 text-emerald-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {/* ── Dropdown — fixed position, sab ke upar ── */}
            {open && (
                <div
                    className="fixed z-[99999] w-64 bg-white border border-emerald-100 rounded-xl shadow-xl shadow-emerald-100/50 overflow-hidden"
                    style={{
                        top: dropdownPos.top + 'px',
                        left: dropdownPos.left + 'px',
                    }}
                >
                    {/* Search */}
                    <div className="p-2 border-b border-emerald-50">
                        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-1.5 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                            <Search className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="flex-1 bg-transparent text-[12px] text-slate-600 placeholder-slate-400 focus:outline-none"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="text-slate-300 hover:text-slate-500 transition-colors cursor-pointer"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* List */}
                    <div
                        className="py-1 overflow-y-auto"
                        style={{
                            maxHeight: "200px",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#6ee7b7 transparent",
                        }}
                    >
                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-6 gap-1.5">
                                <Package className="w-6 h-6 text-emerald-100" />
                                <p className="text-slate-400 text-[11px]">No product found</p>
                            </div>
                        ) : (
                            filtered.map((product) => (
                                <button
                                    key={product._id}
                                    type="button"
                                    onClick={() => {
                                        onChange?.(product);
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                    className={`w-full text-left px-3 py-2 text-[12px] cursor-pointer transition-colors flex items-center gap-2
                                        ${product.productName === value
                                            ? "bg-emerald-50 text-emerald-700 font-semibold"
                                            : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                                        }`}
                                >
                                    <div className="w-5 h-5 rounded-md bg-emerald-100 flex items-center justify-center shrink-0">
                                        <Package className="w-3 h-3 text-emerald-500" />
                                    </div>
                                    <span className="truncate">{product.productName}</span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectProducts;