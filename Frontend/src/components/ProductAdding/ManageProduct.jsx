import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Pencil, Trash2, ChevronDown, Plus, TrendingUp, TrendingDown, Package } from 'lucide-react';
import { toast } from 'react-toastify'
import { motion } from "framer-motion";
import DeleteAlertPopup from './DeleteAlertPopup.jsx'
import ProdcutUpdatePopup from './ProdcutUpdatePopup.jsx';


const ManageProduct = () => {
    const [manageProduct, setManageProduct] = useState([])
    const [expandedId, setExpandedId] = useState(null)
    const [entries, setEntries] = useState(10)
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [DeleteProduct, setDeleteProduct] = useState(null)
    const [search, setSearch] = useState("")
    const [showProductPopup, setShowProductPopup] = useState(false)
    const [updateProduct, setUpdateProduct] = useState(null)

    const navigate = useNavigate()
    async function handleManageProdcut() {
        let res = await axios.get('http://localhost:3000/find/product')
        setManageProduct(res.data)
    }

    useEffect(() => {
        handleManageProdcut()

    }, [])

    async function handleDeleteProduct(id) {

        await axios.post('http://localhost:3000/delete/product', { _id: id })
        setManageProduct(manageProduct.filter((p) => p._id !== id))
        setShowDeletePopup(false)
        toast.success('Product Deleted Successfully', { position: 'bottom-right', autoClose: 800 })

    }

    const filtered = manageProduct.filter((p) =>
        `${p.productName} ${p.model} ${p.mainCategory} ${p.saleRawCategory}`
            .toLowerCase()
            .includes(search.toLowerCase())
    )





    return (
        <div className="p-4 md:p-5">

            {showDeletePopup == true ? <DeleteAlertPopup showDeletePopup={showDeletePopup} setShowDeletePopup={setShowDeletePopup} DeleteProduct={DeleteProduct} handleDeleteProduct={handleDeleteProduct} /> : null}

            {showProductPopup && updateProduct && (
                <ProdcutUpdatePopup
                    setShowProductPopup={setShowProductPopup}
                    updateData={updateProduct}
                    handleManageProdcut={handleManageProdcut}
                />
            )}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-gray-800 text-lg font-bold">Manage Product</h1>
                        <p className="text-gray-400 text-xs">Manage your product</p>
                    </div>
                </div>
                <motion.button
                    onClick={() => { navigate('/newProduct') }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl bg-linear-to-b from-emerald-500 to-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200"
                >
                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    <motion.span
                        whileHover={{ rotate: 90 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="relative flex h-5 w-5 items-center justify-center rounded-md bg-white/20"
                    >
                        <Plus size={13} strokeWidth={3} />
                    </motion.span>

                    <span className="relative whitespace-nowrap">Add New Product</span>
                </motion.button>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">

                <div className="px-4 py-3 border-b border-emerald-50">
                    <h2 className="text-gray-700 text-sm font-bold">Manage Product</h2>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-emerald-50">

                    <div className="flex items-center gap-3">

                        <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-xl p-1">
                            {[10, 25, 50, 100].map((num) => {
                                const active = entries === num
                                return (
                                    <button
                                        key={num}
                                        onClick={() => setEntries(num)}
                                        className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${active ? "text-white" : "text-gray-500 hover:text-emerald-700"
                                            }`}>
                                        {active && (
                                            <motion.span
                                                layoutId="entriesPill"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                className="absolute inset-0 rounded-lg bg-linear-to-b from-emerald-500 to-emerald-600 shadow-sm shadow-emerald-200"
                                            />
                                        )}
                                        <span className="relative">{num}</span>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="flex flex-col leading-tight">
                            <span className="text-gray-600 text-xs font-semibold">
                                {Math.min(entries, filtered.length)} <span className="text-gray-400 font-normal">shown</span>
                            </span>
                            <span className="text-gray-400 text-[10px]">
                                of {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                    </div>

                    <div className="flex items-center gap-1.5 ">
                        {[
                            { label: "Copy", bg: "bg-slate-500 cursor-pointer  hover:bg-slate-600" },
                            { label: "CSV", bg: "bg-green-500  cursor-pointer  hover:bg-green-600" },
                            { label: "Excel", bg: "bg-emerald-600 cursor-pointer hover:bg-emerald-700" },
                            { label: "PDF", bg: "bg-red-500  cursor-pointer   hover:bg-red-600" },
                            { label: "Print", bg: "bg-blue-500 cursor-pointer   hover:bg-blue-600" },
                        ].map((btn) => (
                            <button onClick={() => window.print()} key={btn.label}
                                className={`${btn.bg} text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors`}>
                                {btn.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 focus-within:border-emerald-400 transition-all">
                        <svg className="w-3.5 h-3.5 text-emerald-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:outline-none w-36" />
                    </div>

                </div>

                <div className="max-h-117.5 overflow-y-auto overflow-x-auto">
                    <table className="w-full text-sm align-top  ">
                        <thead className="sticky top-0 z-10 ">
                            <tr className="bg-emerald-700">
                                <th className="text-left text-gray-100 font-bold px-4 py-3 whitespace-nowrap text-xs uppercase tracking-wider">SL.</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-3 text-xs uppercase tracking-wider">Product</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-3 whitespace-nowrap text-xs uppercase tracking-wider">Model</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-3 whitespace-nowrap text-xs uppercase tracking-wider">Category</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-3 whitespace-nowrap text-xs uppercase tracking-wider">Price Ladder</th>
                                <th className="text-right text-gray-100 font-bold px-4 py-3 whitespace-nowrap text-xs uppercase tracking-wider">Retail / Margin</th>
                                <th className="text-center text-gray-100 font-bold px-4 py-3 whitespace-nowrap text-xs uppercase tracking-wider">Scheme</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-3 whitespace-nowrap text-xs uppercase tracking-wider">Stock</th>
                                <th className="text-right text-gray-100 font-bold px-4 py-3 whitespace-nowrap text-xs uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="text-center py-24  ">
                                        <div className="flex flex-col items-center gap-3 ">
                                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center ">
                                                <Package className="w-7 h-7 text-emerald-300" strokeWidth={1.5} />
                                            </div>
                                            <p className="text-gray-600 text-sm font-semibold">No products yet</p>
                                            <p className="text-gray-400 text-xs">Add your first product to see it here</p>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {filtered.map((product, index) => {

                                const cost = Number(product.costPrice) || 0
                                const distributor = Number(product.distributorPrice) || 0
                                const retail = Number(product.retailPrice) || 0
                                const wholesale = Number(product.wholesaleRate) || 0
                                const cod = Number(product.codOnlinePrice) || 0
                                const limit = Number(product.storeLimit) || 0
                                const scheme = Number(product.unitSchemePoint) || 0

                                const margin = cost > 0 ? ((retail - cost) / cost) * 100 : 0
                                const isOpen = expandedId === product._id

                                const marginTone =
                                    margin >= 30 ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                                        : margin >= 15 ? "bg-amber-50 text-amber-700 ring-amber-200"
                                            : "bg-rose-50 text-rose-700 ring-rose-200"

                                const typeTone = {
                                    sale: "bg-emerald-50 text-emerald-700 ring-emerald-200",
                                    raw: "bg-violet-50 text-violet-700 ring-violet-200",
                                }

                                const tileTone = [
                                    "from-emerald-400 to-emerald-600",
                                    "from-sky-400 to-sky-600",
                                    "from-amber-400 to-amber-600",
                                    "from-violet-400 to-violet-600",
                                    "from-rose-400 to-rose-600",
                                ][(product.productName || "").length % 5]

                                const initial = (product.productName || "?").trim().charAt(0).toUpperCase()

                                const max = Math.max(cost, distributor, retail, wholesale, 1)

                                return (
                                    <React.Fragment key={product._id}>

                                        <tr className={`group border-b  border-emerald-50 transition-colors ${isOpen ? "bg-emerald-50/70" : "hover:bg-emerald-50/50"
                                            }`}>

                                            <td className="px-4 py-3  text-gray-400 text-xs font-mono tabular-nums whitespace-nowrap relative">
                                                <span className={`absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-600 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                                                    }`} />
                                                {String(index + 1).padStart(2, "0")}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 shrink-0 rounded-xl bg-linear-to-br ${tileTone} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                                                        {initial}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-gray-800 text-sm font-semibold truncate flex items-center gap-2">
                                                            {product.productName}
                                                            {product.saleRawCategory && (
                                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ring-1 capitalize shrink-0 ${typeTone[product.saleRawCategory?.toLowerCase()] || "bg-gray-50 text-gray-600 ring-gray-200"
                                                                    }`}>
                                                                    {product.saleRawCategory}
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="text-gray-400 text-[11px] truncate font-mono">
                                                            #{product._id.slice(-6).toUpperCase()}
                                                            {product.cartonSize ? ` · ${product.cartonSize}/carton` : ""}
                                                            {product.weight ? ` · ${product.weight}${product.weightUnit || "g"}` : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                                                {product.model || <span className="text-gray-300">—</span>}
                                            </td>

                                            <td className="px-4 py-3">
                                                {product.mainCategory ? (
                                                    <span className="text-gray-600 text-[11px] bg-gray-100 px-2 py-1 rounded-md whitespace-nowrap">
                                                        {product.mainCategory}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-300 text-xs">—</span>
                                                )}
                                            </td>

                                            <td className="px-4 py-3 w-40">
                                                <div className="flex flex-col gap-1">
                                                    {[
                                                        { label: "C", value: cost, tone: "bg-gray-300" },
                                                        { label: "D", value: distributor, tone: "bg-sky-400" },
                                                        { label: "R", value: retail, tone: "bg-emerald-500" },
                                                    ].map((tier) => (
                                                        <div key={tier.label} className="flex items-center gap-1.5">
                                                            <span className="text-[9px] font-bold text-gray-400 w-2">{tier.label}</span>
                                                            <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full rounded-full ${tier.tone}`}
                                                                    style={{ width: `${(tier.value / max) * 100}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className="text-gray-800 text-base font-bold tabular-nums">
                                                        Rs. {retail.toLocaleString()}
                                                    </span>
                                                    {cost > 0 && retail > 0 && (
                                                        <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded ring-1 tabular-nums ${marginTone}`}>
                                                            {margin >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                                            {margin.toFixed(0)}%
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 text-center whitespace-nowrap">
                                                {scheme > 0 ? (
                                                    <span className="inline-flex items-center justify-center min-w-8 h-8 px-2 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 text-white text-xs font-bold tabular-nums shadow-sm shadow-emerald-200">
                                                        {scheme}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center justify-center min-w-8 h-8 px-2 rounded-xl bg-gray-50 text-gray-300 text-xs font-bold ring-1 ring-gray-100">
                                                        —
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {limit > 0 ? (
                                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 px-2 py-1 rounded-md">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                        {limit.toLocaleString()} units
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 bg-gray-50 ring-1 ring-gray-200 px-2 py-1 rounded-md">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                                        No limit
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => setExpandedId(isOpen ? null : product._id)}
                                                        title="Details"
                                                        className={`p-1.5 rounded-lg cursor-pointer transition-all ${isOpen ? "text-emerald-700 bg-emerald-100" : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-100"
                                                            }`}>
                                                        <ChevronDown size={15} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                                    </button>
                                                    <button
                                                        onClick={() => { setUpdateProduct(product); setShowProductPopup(true) }}
                                                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-100 cursor-pointer transition-all">
                                                        <Pencil size={15} />
                                                    </button>
                                                    <button onClick={() => { setDeleteProduct(product); setShowDeletePopup(true) }}
                                                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-100 cursor-pointer transition-all">
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>

                                        {isOpen && (
                                            <tr className="bg-emerald-50/40 border-b border-emerald-100">
                                                <td colSpan={9} className="px-4 py-5">
                                                    <div className="pl-14 grid grid-cols-2 lg:grid-cols-4 gap-3">
                                                        {[
                                                            { label: "Cost price", value: cost, accent: "text-gray-700" },
                                                            { label: "Distributor price", value: distributor, accent: "text-sky-700" },
                                                            { label: "Retail price", value: retail, accent: "text-emerald-700" },
                                                            { label: "Wholesale rate", value: wholesale, accent: "text-amber-700" },
                                                            { label: "COD / Online price", value: cod, accent: "text-violet-700" },
                                                        ].map((tier) => (
                                                            <div key={tier.label} className="bg-white rounded-xl border border-emerald-100 px-3.5 py-2.5">
                                                                <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">{tier.label}</p>
                                                                <p className={`mt-0.5 text-sm font-bold tabular-nums ${tier.value > 0 ? tier.accent : "text-gray-300"}`}>
                                                                    {tier.value > 0 ? `Rs. ${tier.value.toLocaleString()}` : "Not set"}
                                                                </p>
                                                            </div>
                                                        ))}

                                                        <div className="bg-white rounded-xl border border-emerald-100 px-3.5 py-2.5">
                                                            <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">Profit per unit</p>
                                                            <p className={`mt-0.5 text-sm font-bold tabular-nums ${retail - cost > 0 ? "text-emerald-700" : "text-rose-600"}`}>
                                                                Rs. {(retail - cost).toLocaleString()}
                                                            </p>
                                                        </div>

                                                        <div className="bg-white rounded-xl border border-emerald-100 px-3.5 py-2.5">
                                                            <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">Per carton value</p>
                                                            <p className="mt-0.5 text-sm font-bold tabular-nums text-gray-700">
                                                                {product.cartonSize
                                                                    ? `Rs. ${(distributor * Number(product.cartonSize)).toLocaleString()}`
                                                                    : <span className="text-gray-300">—</span>}
                                                            </p>
                                                        </div>


                                                    </div>
                                                </td>
                                            </tr>
                                        )}

                                    </React.Fragment>
                                )
                            })}

                        </tbody>
                    </table>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-emerald-50">
                    <p className="text-gray-400 text-xs">
                        Showing {filtered.length === 0 ? 0 : 1} to {filtered.length} of {filtered.length} entries
                    </p>
                    <div className="flex items-center gap-1">
                        <button type="button" className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-gray-500 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-emerald-100">
                            Previous
                        </button>
                        <button type="button" className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-gray-500 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-emerald-100">
                            Next
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default ManageProduct