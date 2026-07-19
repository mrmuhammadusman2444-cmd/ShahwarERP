import React from 'react'
import { useState, useEffect } from 'react';
import MianCategoryUpdateProdcut from './MainCategoryUpdateProduct.jsx'
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { X, Package, Loader2, Check, AlertCircle, Boxes, Weight, Hash, LayoutGrid, Tags, Split, Wallet, Truck, Store, Building2, Smartphone, Sparkles, Warehouse, Save, TrendingUp } from "lucide-react";


const CATEGORIES = [
    "Zaiqa Recipe Bucket's 5kg/10kg",
    "Tea Pouch and Bag's",
    "Shahwar Syrup",
    "Spices Box (Shahwar)",
    "Shahwar Sachet Mix Rs.50",
    "Shahwar Pouch Mix",
    "Shahwar Mix",
    "Custard Boxes",
    "Shahwar Juices",
    "Salan Masala Bucket's 5kg/10kg",
    "General Spices",
    "Garam Masala Bucket's 5kg/10kg",
    "Dessert & Beverage",
]

const ProdcutUpdatePopup = ({ setShowProductPopup, updateData, handleManageProdcut }) => {

    const [status, setStatus] = useState("idle")
    const [categoryOpen, setCategoryOpen] = useState(false)

    const [product, setProduct] = useState({
        productName: '',
        cartonSize: '',
        weight: '',
        weightUnit: 'g',
        model: '',
        mainCategory: '',
        saleRawCategory: '',
        productCategory: '',
        costPrice: '',
        distributorPrice: '',
        retailPrice: '',
        wholesaleRate: '',
        codOnlinePrice: '',
        unitSchemePoint: '',
        storeLimit: ''
    })

    useEffect(() => {
        if (updateData) {
            setProduct(updateData)
        }
    }, [updateData])

    async function handleUpdateProduct() {
        setStatus("saving")

        const minDelay = new Promise(r => setTimeout(r, 700))

        try {
            await axios.post(`http://localhost:3000/update/product/${updateData._id}`, product)
            await minDelay
            setStatus("saved")
            setTimeout(() => {
                setStatus("idle")
                setShowProductPopup(false)
                handleManageProdcut()
            }, 1500)
        } catch (err) {
            console.log("UPDATE FAILED:", err.response?.data || err.message)
            await minDelay
            setStatus("error")
            setTimeout(() => setStatus("idle"), 2500)
        }
    }
    const cost = Number(product.costPrice) || 0
    const distributor = Number(product.distributorPrice) || 0
    const retail = Number(product.retailPrice) || 0
    const carton = Number(product.cartonSize) || 0
    const max = Math.max(cost, distributor, retail, 1)
    const margin = cost > 0 ? ((retail - cost) / cost) * 100 : 0


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/40 backdrop-blur-sm p-4">

            <div className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-3xl bg-white shadow-2xl shadow-emerald-950/20 ring-1 ring-emerald-100 animate-[fadeIn_0.25s_ease-out]">

                <div className="pointer-events-none absolute -top-28 -right-24 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-sky-100/40 blur-3xl" />

                <div className="relative flex items-start justify-between gap-4 border-b border-emerald-100 px-7 py-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-200">
                            <Package size={22} strokeWidth={2.2} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold tracking-tight text-gray-800">Update product</h2>
                            <p className="mt-0.5 flex items-center gap-2 text-xs text-gray-400">
                                <span>Changes apply to future orders only</span>
                            </p>
                        </div>
                    </div>

                    <button onClick={() => { setShowProductPopup(false) }} className="cursor-pointer rounded-xl p-2 text-gray-400 transition-all duration-200 hover:rotate-90 hover:bg-emerald-50 hover:text-emerald-700">
                        <X size={18} />
                    </button>
                </div>

                <div className="max-h-[calc(92vh-9.5rem)] overflow-y-auto px-7 py-6">

                    <div className="grid grid-cols-1 gap-x-10 gap-y-8 xl:grid-cols-2">

                        <section>
                            <div className="mb-5 flex items-center gap-2">
                                <span className="h-4 w-1 rounded-full bg-linear-to-b from-emerald-400 to-emerald-700" />
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Basic information</h3>
                                <span className="ml-2 h-px flex-1 bg-emerald-50" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div className="group col-span-2">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Product name <span className="text-emerald-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Package size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            value={product.productName}
                                            onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                                            placeholder="Enter product name..."
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Carton size</label>
                                    <div className="relative">
                                        <Boxes size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            value={product.cartonSize}
                                            onChange={(e) => setProduct({ ...product, cartonSize: e.target.value })}
                                            type="number"
                                            placeholder="e.g. 12"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-14 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">units</span>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Weight</label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1 min-w-0">
                                            <Weight size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                            <input
                                                value={product.weight}
                                                onChange={(e) => setProduct({ ...product, weight: e.target.value })}
                                                type="number"
                                                placeholder="500"
                                                className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                            />
                                        </div>
                                        <select
                                            value={product.weightUnit}
                                            onChange={(e) => setProduct({ ...product, weightUnit: e.target.value })}
                                            className="w-20 shrink-0 cursor-pointer appearance-none rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2.5 text-center text-sm text-gray-700 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:outline-none"
                                        >
                                            <option value="">g</option>
                                            <option>kg</option>
                                            <option>ml</option>
                                            <option>L</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Model</label>
                                    <div className="relative">
                                        <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            value={product.model}
                                            onChange={(e) => setProduct({ ...product, model: e.target.value })}
                                            placeholder="Enter model..."
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Sale / raw category</label>
                                    <div className="relative">
                                        <Split size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <select
                                            value={product.saleRawCategory}
                                            onChange={(e) => setProduct({ ...product, saleRawCategory: e.target.value })}
                                            className="w-full cursor-pointer appearance-none rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-700 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        >
                                            <option value="">Select category</option>
                                            <option>Sale</option>
                                            <option>Raw</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Main category</label>
                                    <div className="relative">
                                        <LayoutGrid size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <MianCategoryUpdateProdcut
                                            value={product.mainCategory}
                                            onChange={(cat) => setProduct({ ...product, mainCategory: cat })}
                                            className="w-full cursor-pointer appearance-none rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-700 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Product category</label>
                                    <div className="relative">
                                        <Tags size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <select
                                            value={product.productCategory}
                                            onChange={(e) => setProduct({ ...product, productCategory: e.target.value })}
                                            className="w-full cursor-pointer appearance-none rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-700 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        >
                                            <option value="">Select category</option>
                                            <option>Recipe</option>
                                            <option>Juices</option>
                                            <option>Beverages</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </section>

                        <section>
                            <div className="mb-5 flex items-center gap-2">
                                <span className="h-4 w-1 rounded-full bg-linear-to-b from-emerald-400 to-emerald-700" />
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Pricing</h3>
                                <span className="ml-2 h-px flex-1 bg-emerald-50" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Cost price <span className="text-emerald-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Wallet size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-gray-600" />
                                        <input
                                            value={product.costPrice}
                                            onChange={(e) => setProduct({ ...product, costPrice: e.target.value })}
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-11 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">Rs.</span>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Distributor price <span className="text-emerald-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Truck size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-400 transition-colors group-focus-within:text-sky-600" />
                                        <input
                                            value={product.distributorPrice}
                                            onChange={(e) => setProduct({ ...product, distributorPrice: e.target.value })}
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-11 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">Rs.</span>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Retail price <span className="text-emerald-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Store size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500 transition-colors group-focus-within:text-emerald-700" />
                                        <input
                                            value={product.retailPrice}
                                            onChange={(e) => setProduct({ ...product, retailPrice: e.target.value })}
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-11 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">Rs.</span>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Wholesale rate</label>
                                    <div className="relative">
                                        <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400 transition-colors group-focus-within:text-amber-600" />
                                        <input
                                            value={product.wholesaleRate}
                                            onChange={(e) => setProduct({ ...product, wholesaleRate: e.target.value })}
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-11 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">Rs.</span>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">COD / online price</label>
                                    <div className="relative">
                                        <Smartphone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-violet-400 transition-colors group-focus-within:text-violet-600" />
                                        <input
                                            value={product.codOnlinePrice}
                                            onChange={(e) => setProduct({ ...product, codOnlinePrice: e.target.value })}
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-11 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">Rs.</span>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Unit scheme point</label>
                                    <div className="relative">
                                        <Sparkles size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            value={product.unitSchemePoint}
                                            onChange={(e) => setProduct({ ...product, unitSchemePoint: e.target.value })}
                                            type="number"
                                            placeholder="0"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="group col-span-2">
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Store limit</label>
                                    <div className="relative">
                                        <Warehouse size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 transition-colors group-focus-within:text-emerald-600" />
                                        <input
                                            value={product.storeLimit}
                                            onChange={(e) => setProduct({ ...product, storeLimit: e.target.value })}
                                            type="number"
                                            placeholder="0"
                                            className="w-full cursor-text rounded-xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-10 pr-14 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100/70 focus:outline-none"
                                        />
                                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">units</span>
                                    </div>
                                </div>

                                <div className="col-span-2 rounded-2xl border border-emerald-100 bg-linear-to-br from-emerald-50/80 to-white p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-800">
                                            <TrendingUp size={13} /> Price ladder
                                        </span>
                                        <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                                            Live preview
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2.5">
                                        <span className="w-16 shrink-0 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Cost</span>
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                                            <div className="h-full rounded-full bg-gray-300 transition-all duration-500"
                                                style={{ width: `${(cost / max) * 100}%` }} />
                                        </div>
                                        <span className="w-20 shrink-0 text-right text-[11px] font-bold tabular-nums text-gray-500">
                                            Rs. {cost.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2.5">
                                        <span className="w-16 shrink-0 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Dist.</span>
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                                            <div className="h-full rounded-full bg-linear-to-r from-sky-400 to-sky-500 transition-all duration-500"
                                                style={{ width: `${(distributor / max) * 100}%` }} />
                                        </div>
                                        <span className="w-20 shrink-0 text-right text-[11px] font-bold tabular-nums text-sky-700">
                                            Rs. {distributor.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2.5">
                                        <span className="w-16 shrink-0 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Retail</span>
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                                            <div className="h-full rounded-full bg-linear-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
                                                style={{ width: `${(retail / max) * 100}%` }} />
                                        </div>
                                        <span className="w-20 shrink-0 text-right text-[11px] font-bold tabular-nums text-emerald-700">
                                            Rs. {retail.toLocaleString()}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Margin</p>
                                        <p className={`mt-0.5 text-sm font-bold tabular-nums ${margin >= 30 ? "text-emerald-700" : margin >= 15 ? "text-amber-700" : "text-rose-600"}`}>
                                            {margin.toFixed(0)}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Profit / unit</p>
                                        <p className="mt-0.5 text-sm font-bold tabular-nums text-gray-700">
                                            Rs. {(retail - cost).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Carton value</p>
                                        <p className="mt-0.5 text-sm font-bold tabular-nums text-gray-700">
                                            Rs. {(distributor * carton).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </section>

                    </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-emerald-100 bg-emerald-50/40 px-7 py-4">
                    <p className="flex items-center gap-1.5 text-[11px] text-gray-400">
                        <span className="font-bold text-emerald-500">*</span> Required fields must be filled
                    </p>

                    <div className="flex items-center gap-3">
                        <button onClick={() => { setShowProductPopup(false) }} className="w-36 cursor-pointer rounded-xl border border-emerald-200 bg-white py-2.5 text-sm font-semibold text-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-50 active:translate-y-0">
                            Cancel
                        </button>
                        <motion.button
                            onClick={handleUpdateProduct}
                            disabled={status !== "idle"}
                            whileTap={status === "idle" ? { scale: 0.97 } : {}}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className={`flex w-44 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${status === "error"
                                ? "bg-rose-600 shadow-rose-200"
                                : "bg-linear-to-b from-emerald-500 to-emerald-600 shadow-emerald-200 hover:from-emerald-400 hover:to-emerald-600"
                                }`}
                        >
                            <AnimatePresence mode="wait">

                                {status === "idle" && (
                                    <motion.span key="idle"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-center gap-2 whitespace-nowrap">
                                        <Save size={15} />
                                        Update product
                                    </motion.span>
                                )}

                                {status === "saving" && (
                                    <motion.span key="saving"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-center gap-2 whitespace-nowrap">
                                        <Loader2 size={15} className="animate-spin" />
                                        Updating...
                                    </motion.span>
                                )}

                                {status === "saved" && (
                                    <motion.span key="saved"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-center gap-2 whitespace-nowrap">
                                        <motion.span
                                            initial={{ scale: 0, rotate: -90 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.05 }}
                                            className="flex h-4 w-4 items-center justify-center rounded-full bg-white">
                                            <Check size={11} strokeWidth={4} className="text-emerald-600" />
                                        </motion.span>
                                        Product Updated
                                    </motion.span>
                                )}

                                {status === "error" && (
                                    <motion.span key="error"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0, x: [0, -4, 4, -3, 3, 0] }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.35 }}
                                        className="flex items-center gap-2 whitespace-nowrap">
                                        <AlertCircle size={15} />
                                        Update Failed
                                    </motion.span>
                                )}

                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProdcutUpdatePopup
