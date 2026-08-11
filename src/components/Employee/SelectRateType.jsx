import { useState, useRef, useEffect } from "react"
import { ChevronDown, Briefcase, Timer, Wallet } from "lucide-react"

const options = [
    { value: "Hourly", label: "Hourly", icon: Timer },
    { value: "Salary", label: "Salary", icon: Wallet },
]

const RateTypeSelect = ({ value, onChange, placeholder = "Select rate type" }) => {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    const selected = options.find((o) => o.value === value)

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    return (
        <div ref={ref} className="relative w-full">

            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`flex items-center justify-between gap-2 w-full cursor-pointer bg-emerald-50 border rounded-xl px-3 py-1 transition-all
        ${open ? "border-emerald-400 bg-white ring-2 ring-emerald-100" : "border-emerald-100 hover:border-emerald-300"}`}
            >
                <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${selected ? "bg-emerald-50" : "bg-emerald-100"}`}>
                        {selected
                            ? <selected.icon className="w-4 h-4 text-emerald-600" />
                            : <Briefcase className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <span className={`text-[14px]  truncate ${selected ? "text-emerald-600" : "text-gray-400"}`}>
                        {selected ? selected.label : placeholder}
                    </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-emerald-500 transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`} />
            </button>

            {/* dropdown */}
            {open && (
                <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-emerald-200 rounded-2xl shadow-lg overflow-hidden py-1.5">
                    {options.map((opt) => {
                        const isActive = opt.value === value
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => { onChange(opt.value); setOpen(false) }}
                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left cursor-pointer transition-colors
                  ${isActive ? "bg-emerald-50/60" : "hover:bg-emerald-50"}`}
                            >
                                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                                    <opt.icon className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-emerald-500"}`} />
                                </div>
                                <span className={`text-[14px] font-semibold ${isActive ? "text-emerald-700" : "text-emerald-700"}`}>{opt.label}</span>
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default RateTypeSelect