import { useNavigate } from 'react-router-dom'
import SelectCategory from '../../components/SelectCategory/SelectCategory.jsx'
import { ShoppingBag, Trash2, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchableSelect from '../../components/Scheme Report/SearchableSelect.jsx'

const NewFinishProduct = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState("")
    const [viewItem, setViewItem] = useState(null)
    useEffect(() => {
        async function fetchPeople() {
            try {
                let [empRes, userRes] = await Promise.all([
                    axios.get('http://localhost:3000/find/employee'),
                    axios.get('http://localhost:3000/all/users'),
                ])
                let emps = empRes.data.map((e) => `${e.firstName || ""} ${e.lastName || ""}`.trim())
                let users = userRes.data.map((u) => `${u.firstName || ""} ${u.lastName || ""}`.trim())
                let all = [...emps, ...users].filter(Boolean)
                let unique = [...new Set(all)]
                setEmployees(unique.map((name) => ({ value: name, label: name })))
            } catch (err) {
                console.log("PEOPLE FETCH FAILED:", err.response?.data || err.message)
            }
        }
        fetchPeople()
    }, [])

    useEffect(() => {
        async function fetchProducts() {
            try {
                let res = await axios.get('http://localhost:3000/find/product')
                let saleOnly = res.data.filter((p) => p.saleRawCategory !== "Raw")
                setProducts(saleOnly)
            } catch (err) {
                console.log("PRODUCTS FAILED:", err.response?.data || err.message)
            }
        }
        fetchProducts()
    }, [])

    const visibleProducts = products.filter((p) => {
        let matchName = (p.productName || "").toLowerCase().includes(search.toLowerCase())
        let noCatFilter = !category || category === "All Categories" || category === "all"
        let matchCat = noCatFilter ? true : (p.mainCategory === category || p.productCategory === category)
        return matchName && matchCat
    })

    function handleAddItem(product) {
        setSelectedItems((prev) => {
            if (prev.find((it) => it._id === product._id)) return prev
            return [...prev, {
                _id: product._id,
                name: product.productName,
                mainCategory: product.mainCategory || "",
                cartonSize: Number(product.cartonSize) || 0,
                unitWeight: Number(product.weight) || 0,
                weightUnit: product.weightUnit || "kg",
                carton: "",
                dozen: 0,
                qty: 0,
                weight: 0,
            }]
        })
    }

    function handleRemoveItem(id) {
        setSelectedItems((prev) => prev.filter((it) => it._id !== id))
    }

    function handleCartonChange(id, value) {
        setSelectedItems((prev) => prev.map((it) => {
            if (it._id !== id) return it
            let carton = Number(value) || 0
            let qty = carton * it.cartonSize
            let dozen = qty / 12
            let weight = carton * it.unitWeight
            return { ...it, carton: value, qty, dozen, weight }
        }))
    }

    const totalWeight = selectedItems.reduce((s, i) => s + (Number(i.weight) || 0), 0)

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50 p-4 md:p-5">

            {viewItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setViewItem(null)}>
                    <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>

                        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-emerald-100/50 blur-3xl" />

                        <button onClick={() => setViewItem(null)} className="absolute right-4 top-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all hover:rotate-90 hover:bg-rose-50 hover:text-rose-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <div className="relative px-6 pt-7 pb-5 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-200 mb-3">
                                <ShoppingBag size={28} strokeWidth={2} />
                            </div>
                            <h2 className="text-gray-800 text-lg font-bold leading-tight">{viewItem.name}</h2>
                            <span className="mt-1.5 inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-100">Product Detail</span>
                        </div>

                        <div className="px-6 pb-6">
                            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3 mb-4">
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">Description</p>
                                <p className="text-gray-700 text-sm font-medium">{viewItem.desc || "—"}</p>
                            </div>

                            <div className="rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-100">
                                {[
                                    { label: "Carton", value: Number(viewItem.carton || 0).toLocaleString(), tone: "from-sky-400 to-sky-600", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
                                    { label: "Dozen", value: Number(viewItem.dozen || 0).toLocaleString(), tone: "from-violet-400 to-violet-600", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2" },
                                    { label: "Quantity", value: Number(viewItem.qty || 0).toLocaleString(), tone: "from-amber-400 to-amber-600", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
                                    { label: "Weight", value: `${Number(viewItem.weight || 0).toLocaleString()} ${viewItem.weightUnit || "kg"}`, tone: "from-emerald-400 to-emerald-600", icon: "M12 3l7 4v10l-7 4-7-4V7l7-4z" },
                                ].map((f) => (
                                    <div key={f.label} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50/70">
                                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${f.tone} text-white shadow-sm`}>
                                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} /></svg>
                                        </span>
                                        <span className="text-gray-500 text-sm font-medium">{f.label}</span>
                                        <span className="ml-auto text-gray-800 text-base font-bold tabular-nums">{f.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            )}

            <div className="flex gap-1 mb-5 bg-white border border-emerald-100 shadow-sm p-1 rounded-xl w-fit">
                <button className="px-6 py-2 rounded-lg bg-linear-to-b from-emerald-500 to-emerald-700 cursor-pointer text-white text-sm font-semibold shadow-md shadow-emerald-200 transition-all">
                    New Finish Product
                </button>
                <button onClick={() => { navigate('/managefinishproductpage') }} className="px-6 py-2 rounded-lg cursor-pointer text-emerald-500 text-sm font-medium hover:bg-emerald-100 transition-all">
                    Manage Finish Product
                </button>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm px-5 py-3.5 mb-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                    <div className="flex items-center gap-2.5 shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200 shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-gray-800 text-sm font-bold leading-tight">Product Details</h2>
                            <p className="text-gray-400 text-[11px]">Fill the info</p>
                        </div>
                    </div>

                    <div className="hidden lg:block w-px self-stretch bg-emerald-100 my-1" />

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="relative">
                            <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-1">Product Id</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" /></svg>
                                </span>
                                <input type="text" placeholder="Auto" readOnly
                                    className="w-full cursor-not-allowed bg-emerald-50/70 border border-emerald-100 rounded-xl pl-9 pr-3 py-2.5 text-gray-600 placeholder-gray-400 text-sm focus:outline-none" />
                            </div>
                        </div>
                        <div className="relative">
                            <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-1">Employee Name</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </span>

                                <SearchableSelect
                                    options={employees}
                                    value={selectedEmployee}
                                    onChange={setSelectedEmployee}
                                    placeholder="Search employee..." />
                            </div>
                        </div>
                        <div className="relative">
                            <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-1">Date <span className="text-rose-400">*</span></label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </span>
                                <input type="date"
                                    className="w-full bg-emerald-50/70 border border-emerald-100 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 rounded-xl pl-9 pr-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-4">

                <div className="w-full xl:w-[47%] shrink-0 flex flex-col gap-3">

                    <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-3 flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by product name..."
                            className="flex-1 min-w-0 bg-emerald-50 border border-emerald-100 rounded-full px-5 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
                        />
                        <SelectCategory value={category} onChange={setCategory} />
                        <button className="w-11 h-11 shrink-0 cursor-pointer bg-linear-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shadow-md shadow-emerald-200 transition-all hover:from-emerald-500 hover:to-emerald-600">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-4 flex flex-col flex-1">
                        <p className="text-emerald-500 text-xs font-semibold uppercase tracking-widest mb-3">
                            Products — {products.length} items
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 content-start overflow-y-auto pr-1 custom-scroll" style={{ height: "53vh" }}>
                            {visibleProducts.map((product, i) => {
                                const tone = [
                                    "from-emerald-400 to-emerald-600",
                                    "from-sky-400 to-sky-600",
                                    "from-amber-400 to-amber-600",
                                    "from-violet-400 to-violet-600",
                                    "from-rose-400 to-rose-600",
                                ][(product.productName || "").length % 5]
                                return (
                                    <div
                                        key={product._id}
                                        onClick={() => handleAddItem(product)}
                                        className="group relative h-36 flex flex-col items-center overflow-hidden rounded-2xl border border-emerald-100 bg-white cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300 hover:shadow-emerald-100"
                                    >
                                        <div className="flex flex-1 flex-col items-center justify-center px-2 py-3">
                                            <div className={`mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br ${tone} shadow-sm transition-transform duration-200 group-hover:scale-110`}>
                                                <ShoppingBag size={19} className="text-white" strokeWidth={2.2} />
                                            </div>
                                            <p className="text-gray-700 text-[11px] font-semibold leading-tight line-clamp-2 text-center group-hover:text-emerald-700 transition-colors min-h-7.5">
                                                {product.productName}
                                            </p>
                                            <p className="text-emerald-600 text-sm font-bold text-center mt-1">
                                                Rs. {Number(product.distributorPrice || 0).toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-br from-emerald-500 via-emerald-600 to-emerald-700">
                                            <div className="relative flex h-12 w-12 scale-0 rotate-45 items-center justify-center rounded-2xl bg-white/15 ring-4 ring-white/10 backdrop-blur-sm transition-all delay-100 duration-300 group-hover:scale-100 group-hover:rotate-0">
                                                <svg className="w-6 h-6 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            <div className="relative text-center">
                                                <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] drop-shadow">Add Product</p>
                                                <p className="text-[9px] text-white/70">Click to add</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {products.length === 0 && (
                                <div className="col-span-2 sm:col-span-3 xl:col-span-4 flex flex-col items-center justify-center py-20 gap-2">
                                    <ShoppingBag size={40} className="text-emerald-100" />
                                    <p className="text-gray-400 text-xs">Add some products</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-col">

                    <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1">

                        <div className="px-5 py-3 border-b border-emerald-100 flex items-center gap-2 bg-emerald-50/50 shrink-0">
                            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-emerald-100 px-2.5 py-1 text-gray-700 text-sm font-semibold shadow-sm">
                                Product Items
                                <span className="bg-emerald-100 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">{selectedItems.length}</span>
                            </span>
                        </div>

                        <div className="overflow-auto custom-scroll flex-1" style={{ maxHeight: "50vh" }}>
                            <table className="w-full min-w-160 text-sm border-collapse">
                                <thead className="sticky top-0 z-10">
                                    <tr className="bg-emerald-600 text-white">
                                        <th className="text-left text-xs font-semibold px-3 py-3 whitespace-nowrap">Item Information <span className="text-red-300">*</span></th>
                                        <th className="text-center text-xs font-semibold px-3 py-3">Desc</th>
                                        <th className="text-center text-xs font-semibold px-3 py-3">Carton</th>
                                        <th className="text-center text-xs font-semibold px-3 py-3">Dozen</th>
                                        <th className="text-center text-xs font-semibold px-3 py-3">Qnty <span className="text-red-300">*</span></th>
                                        <th className="text-center text-xs font-semibold px-3 py-3">Weight</th>
                                        <th className="text-center text-xs font-semibold px-3 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {selectedItems.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="text-center py-20">
                                                <div className="flex flex-col items-center gap-2">
                                                    <svg className="w-10 h-10 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                                                    </svg>
                                                    <span className="text-gray-400 text-xs">Select Product From the Left Side</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        selectedItems.map((item, idx) => (
                                            <tr key={item._id} className={`hover:bg-emerald-50/40 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                                                <td className="px-3 py-2 min-w-35">
                                                    <input type="text" defaultValue={item.name}
                                                        className="w-full bg-transparent border border-transparent hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs focus:outline-none transition-all" />
                                                </td>
                                                <td className="px-3 py-2 min-w-22.5">
                                                    <input type="text" placeholder="Description"
                                                        value={item.desc || ""}
                                                        onChange={(e) => setSelectedItems((prev) => prev.map((it) => it._id === item._id ? { ...it, desc: e.target.value } : it))}
                                                        className="w-full bg-transparent border border-transparent hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-500 text-xs focus:outline-none transition-all placeholder-gray-300" />
                                                </td>
                                                <td className="px-3 py-2 w-16">
                                                    <input placeholder="0"
                                                        value={item.carton}
                                                        onChange={(e) => handleCartonChange(item._id, e.target.value)}
                                                        className="w-full bg-emerald-50/50 border border-emerald-200 hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs text-center focus:outline-none transition-all" />
                                                </td>
                                                <td className="px-3 py-2 w-16 text-center text-gray-600 text-xs tabular-nums">{Number(item.dozen || 0).toLocaleString()}</td>
                                                <td className="px-3 py-2 w-16 text-center text-gray-700 text-xs font-medium tabular-nums">{Number(item.qty || 0).toLocaleString()}</td>
                                                <td className="px-3 py-2 w-20 text-center text-gray-600 text-xs tabular-nums">{Number(item.weight || 0).toLocaleString()} {item.weightUnit}</td>
                                                <td className="px-3 py-2 w-20">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <button onClick={() => handleRemoveItem(item._id)} className="w-6 h-6 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded flex items-center justify-center transition-colors cursor-pointer">
                                                            <Trash2 size={13} />
                                                        </button>
                                                        <button onClick={() => setViewItem(item)} className="w-6 h-6 bg-teal-50 text-teal-500 hover:bg-teal-500 hover:text-white rounded flex items-center justify-center transition-colors cursor-pointer">
                                                            <Eye size={13} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4 border-t border-emerald-100 bg-emerald-50/40 shrink-0 mt-auto">
                            <div>
                                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Total Weight</p>
                                <p className="text-gray-800 text-xl font-bold mt-0.5">
                                    <span className="text-emerald-700">
                                        {totalWeight >= 1000
                                            ? `${Math.floor(totalWeight / 1000)} ton${totalWeight % 1000 > 0 ? ` ${totalWeight % 1000} kg` : ""}`
                                            : `${totalWeight.toLocaleString()} kg`}
                                    </span>
                                </p>
                            </div>
                            <button className="w-full sm:w-auto px-8 py-2.5 cursor-pointer bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap">
                                Save Finish Product →
                            </button>
                        </div>

                    </div>

                </div>

            </div>

            <style>{`
        .custom-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #a7f3d0; border-radius: 99px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #6ee7b7; }
      `}</style>
        </div>
    )
}

export default NewFinishProduct