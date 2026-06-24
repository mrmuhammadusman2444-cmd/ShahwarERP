import { useState, useRef, useEffect } from "react";

const categories = [
  { value: "", label: "All Categories" },
  { value: "zaiqa-recipe-bucket", label: "Zaiqa Recipe Bucket's 5kg/10kg" },
  { value: "tea-pouch-bag", label: "Tea Pouch and Bag's" },
  { value: "shahwar-syrup", label: "Shahwar Syrup" },
  { value: "spices-box-shahwar", label: "Spices Box (Shahwar)" },
  { value: "shahwar-sachet-mix", label: "Shahwar Sachet Mix Rs.50" },
  { value: "shahwar-pouch-mix", label: "Shahwar Pouch Mix" },
  { value: "shahwar-mix", label: "Shahwar Mix" },
  { value: "custard-boxes", label: "Custard Boxes" },
  { value: "shahwar-juices", label: "Shahwar Juices" },
  { value: "salan-masala-bucket", label: "Salan Masala Bucket's 5kg/10kg" },
  { value: "sachet-40", label: "Sachet Rs.40 (Shahwar)" },
  { value: "sachet-30", label: "Sachet Rs.30 (Shahwar)" },
  { value: "sachet-20", label: "Sachet Rs.20 (Shahwar)" },
  { value: "sachet-10", label: "Sachet Rs.10 (Shahwar)" },
  { value: "recipe-bucket", label: "Recipe Bucket's 5kg/10kg" },
  { value: "plain-spices-sachet", label: "Plain Spices Sachet Rs.20" },
  { value: "plain-spices-box", label: "Plain Spices Box (Shahwar)" },
  { value: "plain-recipe-bucket", label: "Plain Recipe Shahwar Buckets 5kg/10kg" },
  { value: "plain-recipe-bags", label: "Plain Recipe Shahwar Bags 5kg/10kg" },
  { value: "jars-shahwar", label: "Jars (Shahwar)" },
  { value: "general-spices", label: "General Spices" },
  { value: "garam-masala-bucket", label: "Garam Masala Bucket's 5kg/10kg" },
  { value: "dessert-beverage", label: "Dessert & Beverage" },
  { value: "custard-sachet", label: "Custard Sachet Rs.20" },
  { value: "custard-box-bucket", label: "Custard Box Shahwar Buckets 10kg/5kg" },
  { value: "custard-box-bags", label: "Custard Box Shahwar Bags 10kg/5kg" },
];

const CategoryDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const searchRef = useRef(null);

  const selected = categories.find((c) => c.value === value) || categories[0];

  const filtered = categories.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  // Close on outside click
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

  // Auto focus search when opens
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
        className="flex items-center justify-between gap-2 w-44 cursor-pointer bg-blue-50 border border-blue-100 hover:border-blue-300 rounded-full px-4 py-2.5 text-gray-600 text-sm focus:outline-none focus:border-blue-400 transition-all"
      >
        <span className="truncate">{selected.label}</span>
        <svg
          className={`w-3.5 h-3.5 text-blue-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50  bg-white border border-blue-100 rounded-2xl shadow-lg shadow-blue-100/50 min-w-60">

          <div className="p-2 border-b border-blue-50">
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 focus-within:border-blue-400 transition-all">
              <svg className="w-3.5 h-3.5 text-blue-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Category search karein..."
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
              <p className="text-center text-gray-400 text-xs py-6">Koi category nahi mili</p>
            ) : (
              filtered.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => {
                    onChange?.(cat.value);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left px-3 py-2 text-xs cursor-pointer rounded-lg mx-1 transition-colors
                    ${cat.value === value
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  style={{ width: "calc(100% - 8px)" }}
                >
                  {cat.label}
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

export default CategoryDropdown;