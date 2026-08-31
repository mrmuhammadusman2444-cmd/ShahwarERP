import { useState, useRef, useEffect, useMemo, Fragment } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { ClipboardList, CheckCircle2, Award, Printer, Hash, Tag, Layers, Truck, Store, ShoppingBag, CreditCard, Package, Pencil, RotateCcw, CloudUpload, Loader2, AlertTriangle } from "lucide-react"
import { can } from "../../Utils/Permissions.js"

const API_BASE = "http://localhost:3000"

const priceFields = [
    { key: "distributorPrice", label: "Distribution", icon: Truck, cellClass: "bg-zinc-50 text-zinc-700" },
    { key: "wholesaleRate", label: "Whole Sale", icon: Store, cellClass: "bg-zinc-50 text-zinc-700" },
    { key: "retailPrice", label: "Retail", icon: ShoppingBag, cellClass: "bg-amber-50 text-amber-800 font-bold" },
    { key: "unitSchemePoint", label: "Scheme Pt", icon: Award, cellClass: "bg-indigo-50 text-indigo-700 font-bold", prefix: "" },
    { key: "codOnlinePrice", label: "COD / Online", icon: CreditCard, cellClass: "bg-emerald-50 text-emerald-700 font-bold" },


]

function PriceCell({ value, dirty, cellClass, onCommit, prefix = "Rs" }) {
    const [editing, setEditing] = useState(false)
    const [draft, setDraft] = useState(value ?? "")
    const inputRef = useRef(null)

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [editing])

    const startEdit = () => {
        setDraft(value ?? "")
        setEditing(true)
    }

    const commit = () => {
        setEditing(false)
        if (draft === "" || draft === null) {
            onCommit(null)
            return
        }
        const num = Number(draft)
        if (!Number.isNaN(num) && num >= 0) onCommit(num)
    }

    const cancel = () => {
        setEditing(false)
        setDraft(value ?? "")
    }

    if (editing) {
        return (
            <div className="flex items-center justify-end gap-1">
                {prefix && <span className="text-[10px] text-zinc-400 font-mono">{prefix}</span>}
                <input
                    ref={inputRef}
                    min="0"
                    inputMode="decimal"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={commit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") commit()
                        if (e.key === "Escape") cancel()
                    }}
                    className="w-20 px-1.5 py-1 text-right text-[11px] font-mono font-semibold rounded-md border border-emerald-400 ring-2 ring-emerald-100 outline-none"
                />
            </div>
        )
    }

    return (
        <button
            type="button"
            onClick={startEdit}
            className={`group/cell relative inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-mono tabular-nums transition-all hover:ring-2 hover:ring-emerald-200 cursor-pointer ${cellClass}`}
        >
            {value != null && value !== ""
                ? `${prefix ? prefix + " " : ""}${Number(value).toLocaleString()}`
                : <span className="text-zinc-300  font-sans font-normal">Set value</span>}
            <Pencil size={9} className="opacity-0 group-hover/cell:opacity-60 transition-opacity shrink-0" />
            {dirty && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white" />}
        </button>
    )
}

export default function ProductPriceEditor() {
    const [products, setProducts] = useState([])
    const [originalProducts, setOriginalProducts] = useState([])
    const [dirtyFields, setDirtyFields] = useState({})
    const [syncMessage, setSyncMessage] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [syncing, setSyncing] = useState(false)

    const dirtyCount = Object.keys(dirtyFields).length

    const fetchProducts = async () => {
        setLoading(true)
        setError("")
        try {
            const res = await fetch(`${API_BASE}/find/product`)
            if (!res.ok) throw new Error(`Server returned ${res.status}`)
            const data = await res.json()
            const saleOnly = data.filter((p) => p.saleRawCategory !== "Raw")
            setProducts(saleOnly)
            setOriginalProducts(saleOnly)
            setDirtyFields({})
        } catch (err) {
            setError(err.message || "Products load nahi ho sake")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const updatePrice = (productId, field, newValue) => {
        setProducts((prev) => prev.map((p) => (p._id === productId ? { ...p, [field]: newValue } : p)))
        setDirtyFields((prev) => ({ ...prev, [`${productId}:${field}`]: true }))
    }

    const grouped = useMemo(() => {
        return products.reduce((acc, p) => {
            const cat = p.mainCategory || "Uncategorized"
            if (!acc[cat]) acc[cat] = []
            acc[cat].push(p)
            return acc
        }, {})
    }, [products])

    // Orders categories by first appearance in the fetched data.
    // Swap this for a fixed priority array if you want a specific business order.
    const categoryOrder = useMemo(() => {
        const seen = []
        for (const p of products) {
            const cat = p.mainCategory || "Uncategorized"
            if (!seen.includes(cat)) seen.push(cat)
        }
        return seen
    }, [products])

    const sortedCategories = useMemo(() => {
        return Object.keys(grouped).sort((a, b) => {
            let aRaw = a.toLowerCase().includes("raw")
            let bRaw = b.toLowerCase().includes("raw")
            if (aRaw && !bRaw) return 1
            if (!aRaw && bRaw) return -1
            let ia = categoryOrder.indexOf(a)
            let ib = categoryOrder.indexOf(b)
            if (ia === -1) return 1
            if (ib === -1) return -1
            return ia - ib
        })
    }, [grouped, categoryOrder])

    const handlePrint = () => window.print()

    const handleDiscard = () => {
        setProducts(originalProducts)
        setDirtyFields({})
        setSyncMessage("")
    }

    const handleSync = async () => {
        const changedIds = [...new Set(Object.keys(dirtyFields).map((k) => k.split(":")[0]))]
        const updates = changedIds.map((id) => {
            const product = products.find((p) => p._id === id)
            const changedValues = { _id: id }
            priceFields.forEach((f) => {
                if (dirtyFields[`${id}:${f.key}`]) changedValues[f.key] = product[f.key]
            })
            return changedValues
        })

        setSyncing(true)
        try {
            const res = await fetch(`${API_BASE}/bulk/update/product-prices`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ updates })
            })
            console.log(">>> BULK UPDATES SENT:", JSON.stringify(updates))
            const data = await res.json()
            if (!res.ok || !data.success) throw new Error(data.message || "Update failed")
                console.log(">>> BULK RESPONSE:", data)

            setOriginalProducts(products)
            setDirtyFields({})
        } catch (err) {
            setSyncMessage("Save nahi hua: " + err.message)
        } finally {
            setSyncing(false)
            setTimeout(() => setSyncMessage(""), 4500)
        }
    }

    let serial = 0

    return (
        <div className="min-h-screen bg-emerald-50/40 p-3 md:p-5 bg-[radial-gradient(circle,#05966915_1px,transparent_1px)] bg-size-[18px_18px]">

            {/* Header */}
            <div className="bg-white rounded-xl border border-emerald-100 shadow-sm shadow-emerald-900/5 px-4 py-3 mb-4 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-800 flex items-center justify-center text-white shadow-sm shadow-emerald-300 shrink-0 ring-1 ring-white/20">
                        <ClipboardList size={17} />
                    </div>
                    <div>
                        <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-[0.18em] leading-none mb-0.5">Price Editor</p>
                        <h1 className="text-[15px] font-bold text-zinc-800 leading-tight font-serif ">Shahwar Foods</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    {dirtyCount > 0 && (
                        <>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-[11px] font-semibold border border-amber-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> {dirtyCount} unsaved
                            </span>
                            <button
                                onClick={handleDiscard}
                                type="button"
                                disabled={syncing}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                            >
                                <RotateCcw size={13} /> Discard
                            </button>
                            <button
                                onClick={handleSync}
                                type="button"
                                disabled={syncing}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-linear-to-br from-amber-500 to-amber-600 shadow-sm shadow-amber-200 hover:shadow-md active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60"
                            >
                                {syncing ? <Loader2 size={13} className="animate-spin" /> : <CloudUpload size={13} />}
                                {syncing ? "Saving..." : "Save changes"}
                            </button>
                        </>
                    )}
                    <button
                        onClick={handlePrint}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-linear-to-br from-emerald-500 to-emerald-700 shadow-sm shadow-emerald-200 hover:shadow-md hover:shadow-emerald-300/60 active:scale-[0.98] transition-all cursor-pointer"
                    >
                        <Printer size={13} /> Print
                    </button>
                </div>
            </div>

            {syncMessage && (
                <div className={`mb-4 px-4 py-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 ${syncMessage.startsWith("Save nahi") ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
                    {syncMessage.startsWith("Save nahi") ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />} {syncMessage}
                </div>
            )}

            {/* Table Card */}
            <div className="bg-white rounded-xl border border-emerald-100 shadow-sm shadow-emerald-900/5 overflow-hidden">

                <div className="text-center pt-4 pb-2">
                    <h2 className="text-base md:text-lg font-bold text-emerald-800 tracking-tight font-serif">
                        Shahwar Foods <span className=" font-normal text-emerald-600">Product Price List</span>
                    </h2>
                    <p className="text-[10px] text-zinc-400 tracking-wide mt-0.5">Click any price to edit it &middot; Enter to save &middot; Esc to cancel</p>
                </div>

                <div className="relative flex items-center justify-center py-2">
                    <div className="absolute inset-x-6 border-t border-dashed border-emerald-200"></div>
                    <span className="relative bg-white px-3 text-[9px] tracking-[0.25em] text-emerald-400 font-bold uppercase">&#9670; Rate Card &#9670;</span>
                </div>

                <div className="overflow-x-auto overflow-y-auto max-h-117.5 custom-table-scroll">
                    <table className="w-full text-sm border-collapse">
                        <thead className="sticky top-0 z-10 bg-linear-to-br from-emerald-600 to-emerald-800 shadow-[0_2px_6px_rgba(4,120,87,0.25)]">
                            <tr>
                                <th className="text-left text-[10.5px] font-bold text-white/90 px-3 py-2.5 whitespace-nowrap"><span className="inline-flex items-center gap-1"><Hash size={11} /> S.No</span></th>
                                <th className="text-left text-[10.5px] font-bold text-white/90 px-3 py-2.5 whitespace-nowrap"><span className="inline-flex items-center gap-1"><Tag size={11} /> Code</span></th>
                                <th className="text-left text-[10.5px] font-bold text-white/90 px-3 py-2.5">Product Name</th>
                                <th className="text-center text-[10.5px] font-bold text-white/90 px-3 py-2.5 whitespace-nowrap"><span className="inline-flex items-center gap-1"><Layers size={11} /> Pack</span></th>
                                {priceFields.map((f) => (
                                    <th key={f.key} className="text-right text-[10.5px] font-bold text-white/90 px-3 py-2.5 whitespace-nowrap">
                                        <span className="inline-flex items-center justify-end gap-1"><f.icon size={11} /> {f.label}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-14">
                                        <div className="flex flex-col items-center gap-2">
                                            <Loader2 size={22} className="text-emerald-400 animate-spin" />
                                            <p className="text-zinc-400 text-xs">Products load ho rahe hain...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-14">
                                        <div className="flex flex-col items-center gap-2">
                                            <AlertTriangle size={22} className="text-red-400" />
                                            <p className="text-red-500 text-sm font-medium">{error}</p>
                                            <button
                                                onClick={fetchProducts}
                                                type="button"
                                                className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                                            >
                                                <RotateCcw size={12} /> Retry
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-14">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 ring-1 ring-emerald-100 border border-dashed border-emerald-200 flex items-center justify-center mb-1">
                                                <ClipboardList size={24} className="text-emerald-400" />
                                            </div>
                                            <p className="text-zinc-500 text-sm font-medium">No products found</p>
                                            <p className="text-zinc-400 text-xs">Add products to see them here</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                sortedCategories.map((cat) => (
                                    <Fragment key={cat}>
                                        <tr className="bg-emerald-50 border-y border-emerald-100">
                                            <td colSpan={9} className="px-3 py-1.5">
                                                <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-800 uppercase tracking-wide">
                                                    <Package size={11} className="text-emerald-500" /> {cat}
                                                    <span className="text-emerald-400 font-medium normal-case tracking-normal">&middot; {grouped[cat].length} items</span>
                                                </span>
                                            </td>
                                        </tr>
                                        {grouped[cat].map((p) => {
                                            serial += 1
                                            const rowNum = serial
                                            return (
                                                <tr
                                                    key={p._id || rowNum}
                                                    className={`group border-b border-zinc-100 border-l-2 border-l-transparent hover:border-l-emerald-400 transition-colors hover:bg-emerald-50/40 ${rowNum % 2 === 0 ? "bg-zinc-50/50" : "bg-white"}`}
                                                >
                                                    <td className="px-3 py-2">
                                                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold font-mono tabular-nums group-hover:bg-emerald-100 transition-colors">
                                                            {rowNum}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        <span className="inline-block px-1.5 py-0.5 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-500 text-[10px] font-mono">
                                                            {p.productCode || "—"}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        <p className="text-zinc-800 text-[12.5px] font-semibold leading-tight">{p.productName || "—"}</p>
                                                        {p.productCategory && (
                                                            <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-medium">
                                                                {p.productCategory}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <span className="inline-block px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-semibold font-mono tabular-nums">
                                                            {p.cartonSize || "—"}
                                                        </span>
                                                    </td>
                                                    {priceFields.map((f) => (
                                                        <td key={f.key} className="px-3 py-2 text-right border-l border-zinc-50">
                                                            <PriceCell
                                                                value={p[f.key]}
                                                                dirty={!!dirtyFields[`${p._id}:${f.key}`]}
                                                                cellClass={f.cellClass}
                                                                prefix={f.prefix}
                                                                onCommit={(val) => updatePrice(p._id, f.key, val)}
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            )
                                        })}
                                    </Fragment>
                                ))
                            )}
                        </tbody>
                    </table>

                    <style>{`
        .custom-table-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-table-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-table-scroll::-webkit-scrollbar-thumb { background: #bbf7d0; border-radius: 99px; }
        .custom-table-scroll::-webkit-scrollbar-thumb:hover { background: #86efac; }
    `}</style>
                </div>

                <div className="px-4 py-2.5 border-t border-emerald-50 bg-emerald-50/30 flex items-center justify-between flex-wrap gap-2">
                    <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                        <Package size={12} className="text-emerald-500" />
                        Total Products: <span className="font-semibold text-zinc-600 font-mono">{products.length}</span>
                    </p>
                    <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                        <Layers size={12} className="text-emerald-500" />
                        Categories: <span className="font-semibold text-zinc-600 font-mono">{sortedCategories.length}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}