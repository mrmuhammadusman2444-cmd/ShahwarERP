import { useState, useRef, useEffect } from "react";
import { Search, Command, CornerDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MenusList } from "./MenusList.jsx";   // path apne hisaab se adjust karo

const GlobalSearchBar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const boxRef = useRef(null);
    const inputRef = useRef(null);

    // search filter
    const results = query.trim()
        ? MenusList.filter((m) =>
            m.name.toLowerCase().includes(query.toLowerCase()) ||
            m.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8)
        : [];

    // bahar click se band
    useEffect(() => {
        function handleClickOutside(e) {
            if (boxRef.current && !boxRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Cmd+K / Ctrl+K se focus
    useEffect(() => {
        function handleKey(e) {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                inputRef.current?.focus();
                setOpen(true);
            }
        }
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    // result select
    function goTo(item) {
        navigate(item.path);
        setQuery("");
        setOpen(false);
    }

    // keyboard navigation (up/down/enter/esc)
    function onKeyDown(e) {
        if (!open || results.length === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => (i + 1) % results.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => (i - 1 + results.length) % results.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            goTo(results[activeIndex]);
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    }

    // query badle to active index reset
    useEffect(() => { setActiveIndex(0); }, [query]);

    return (
<div className="flex justify-center w-full lg:w-100 lg:-mt-1 lg:ml-30">
              <div ref={boxRef} className="relative w-full max-w-2xl">
                <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10"
                />

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={onKeyDown}
                    placeholder="Search anything..."
                    className="w-full h-10 rounded-xl border border-slate-200 bg-white pl-12 pr-20 text-sm placeholder:text-slate-400 shadow-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
                    <Command size={13} />
                    K
                </div>

                {/* Results dropdown */}
                {open && query.trim() && (
                    <div className="absolute top-full mt-2 left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                        {results.length === 0 ? (
                            <div className="px-4 py-6 text-center text-sm text-slate-400">
                                No results for "{query}"
                            </div>
                        ) : (
                            results.map((item, idx) => (
                                <button
                                    key={item.path + idx}
                                    onClick={() => goTo(item)}
                                    onMouseEnter={() => setActiveIndex(idx)}
                                    className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left cursor-pointer transition-colors ${idx === activeIndex ? "bg-emerald-50" : "hover:bg-slate-50"}`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${idx === activeIndex ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                                            <Search size={14} />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-slate-700 truncate">{item.name}</p>
                                            <p className="text-xs text-slate-400 truncate">{item.category}</p>
                                        </div>
                                    </div>
                                    {idx === activeIndex && (
                                        <span className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0">
                                            <CornerDownLeft size={12} /> Enter
                                        </span>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GlobalSearchBar;