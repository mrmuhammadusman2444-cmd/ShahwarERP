import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { ShoppingCart, Building2, Factory, Truck, FileText, MapPin, Calendar, Hash, UserCheck, UserPlus, Plus, Trash2, Package, ClipboardList, StickyNote, ListOrdered, Wallet, Percent, TrendingUp, CircleDollarSign, AlertCircle } from 'lucide-react';


const AddPurchase = () => {
    const [newPurchase, setNewPurchase] = useState({
        supplierName: '',
        factory: '',
        vehicleNo: '',
        invoiceNo: '',
        Details: '',
        purchaseDate: '',
        builtyNo: '',
        receivedBy: '',
        gatePassNo: '',
    })

    async function handlePurchase(params) {
        let res = await axios.post('http://localhost:3000/new/purchase', newPurchase)
        console.log(res.data)
    }




    return (
        <div className="p-4 bg-slate-50 min-h-screen">

            <div className="flex items-center justify-between mb-4 flex-wrap gap-2.5">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
                        <ShoppingCart className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h1 className="text-[15.5px] font-bold text-slate-900 leading-tight">Add Purchase</h1>
                        <p className="text-[11px] text-slate-400 leading-tight">Add new purchase record</p>
                    </div>
                </div>

                <div className="flex items-center gap-2.5">
                    <button type="button"
                        className="border border-emerald-200 text-emerald-600 text-[12.5px] font-semibold rounded-lg px-5 py-2 hover:bg-emerald-50 transition-all hover:-translate-y-0.5 cursor-pointer">
                        Save &amp; Add Another
                    </button>
                    <button onClick={handlePurchase} type="button"
                        className="bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-6 py-2 shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                        Submit
                    </button>
                </div>
            </div>

            {/* ===== PAYMENT SUMMARY — TOPBAR ===== */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3 mb-4">

                <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-5 h-5 rounded-md bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                        <Wallet className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-[11.5px] font-bold text-slate-700">Payment summary</p>
                    <span className="ml-auto flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                    </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">

                    {/* TOTAL */}
                    <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/60 px-2.5 py-1.5">
                        <span className="flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                            <Package className="w-3 h-3" /> Total
                        </span>
                        <input disabled placeholder="0.00"
                            className="w-16 text-[12.5px] text-slate-700 font-bold bg-transparent border-0 p-0 text-right focus:outline-none tabular-nums" />
                    </div>

                    {/* DISCOUNT */}
                    <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/60 px-2.5 py-1.5">
                        <span className="flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                            <Percent className="w-3 h-3 text-amber-400" /> Disc
                        </span>
                        <input disabled placeholder="0.00"
                            className="w-16 text-[12.5px] text-amber-600 font-bold bg-transparent border-0 p-0 text-right focus:outline-none tabular-nums" />
                    </div>

                    {/* FREIGHT */}
                    <div className="flex items-center justify-between gap-2 rounded-lg border border-emerald-100 bg-emerald-50/40 px-2.5 py-1.5 transition-all hover:border-emerald-300 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
                        <span className="flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                            <Truck className="w-3 h-3 text-emerald-400" /> Freight
                        </span>
                        <input type="text" placeholder="0.00"
                            className="w-16 text-[12.5px] text-slate-900 font-bold placeholder-slate-300 bg-transparent border-0 p-0 text-right focus:outline-none tabular-nums" />
                    </div>

                    {/* GRAND TOTAL */}
                    <div className="flex items-center justify-between gap-2 rounded-lg border border-emerald-200 bg-linear-to-r from-emerald-50 to-emerald-100/50 px-2.5 py-1.5 shadow-sm">
                        <span className="flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-emerald-700 whitespace-nowrap">
                            <TrendingUp className="w-3 h-3" /> Grand
                        </span>
                        <input disabled placeholder="0.00"
                            className="w-16 text-[13px] text-emerald-700 font-bold bg-transparent border-0 p-0 text-right focus:outline-none tabular-nums" />
                    </div>

                    {/* PAID */}
                    <div className="flex items-center justify-between gap-2 rounded-lg border border-emerald-100 bg-emerald-50/40 px-2.5 py-1.5 transition-all hover:border-emerald-300 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
                        <span className="flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                            <CircleDollarSign className="w-3 h-3 text-emerald-400" /> Paid
                        </span>
                        <input type="text" placeholder="0.00"
                            className="w-16 text-[12.5px] text-slate-900 font-bold placeholder-slate-300 bg-transparent border-0 p-0 text-right focus:outline-none tabular-nums" />
                    </div>

                    {/* DUE */}
                    <div className="flex items-center justify-between gap-2 rounded-lg border border-rose-200 bg-linear-to-r from-rose-50 to-rose-100/40 px-2.5 py-1.5 shadow-sm">
                        <span className="flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-rose-600 whitespace-nowrap">
                            <AlertCircle className="w-3 h-3" /> Due
                        </span>
                        <input disabled placeholder="0.00"
                            className="w-16 text-[13px] text-rose-600 font-bold bg-transparent border-0 p-0 text-right focus:outline-none tabular-nums" />
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2  gap-4 items-start">

                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3.5">

                    <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-emerald-100">
                        <div className="w-6 h-6 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                            <ClipboardList className="w-3.5 h-3.5 text-white" />
                        </div>
                        <p className="text-[12px] font-bold text-slate-700">Purchase information</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">

                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                                Supplier <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 min-w-0">
                                    <div className="relative">
                                        <Building2 className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <select onChange={(e) => { setNewPurchase({ ...newPurchase, supplierName: e.target.value }) }} className="w-full text-[12.5px] text-slate-900 cursor-pointer placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all">
                                            <option value="">Select supplier</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="button" title="Add new supplier"
                                    className="shrink-0 w-9 h-9 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 flex items-center justify-center shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
                                    <UserPlus className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                                Purchase Date <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input onChange={(e) => { setNewPurchase({ ...newPurchase, purchaseDate: e.target.value }) }} type="date" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Factory</label>
                            <div className="relative">
                                <Factory className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <select onChange={(e) => { setNewPurchase({ ...newPurchase, Factory: e.target.value }) }} className="w-full text-[12.5px] text-slate-900 cursor-pointer placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all">
                                    <option value="">Select factory</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Builty No</label>
                            <div className="relative">
                                <Hash className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input onChange={(e) => { setNewPurchase({ ...newPurchase, builtyNo: e.target.value }) }} type="text" placeholder="Builty No" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Vehicle No</label>
                            <div className="relative">
                                <Truck className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input onChange={(e) => { setNewPurchase({ ...newPurchase, vehicleNo: e.target.value }) }} type="text" placeholder="Vehicle No" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Received By</label>
                            <div className="relative">
                                <UserCheck className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <select onChange={(e) => { setNewPurchase({ ...newPurchase, receivedBy: e.target.value }) }} className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 cursor-pointer bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all">
                                    <option value="">Select option</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Invoice No</label>
                            <div className="relative">
                                <FileText className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input onChange={(e) => { setNewPurchase({ ...newPurchase, invoiceNo: e.target.value }) }} type="text" placeholder="Invoice No" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Gate Pass No</label>
                            <div className="relative">
                                <MapPin className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input onChange={(e) => { setNewPurchase({ ...newPurchase, gatePassNo: e.target.value }) }} type="text" placeholder="Gate Pass No" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Details</label>
                            <div className="relative">
                                <StickyNote className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-3 pointer-events-none" />
                                <textarea onChange={(e) => { setNewPurchase({ ...newPurchase, Details: e.target.value }) }} placeholder="Details..." className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all h-35 resize-none" />
                            </div>
                        </div>

                    </div>
                </div>

                {/* ===== PURCHASE ITEMS — premium ===== */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm h-134  overflow-hidden">

                    <div className="flex items-center justify-between gap-3 px-4  py-3.5 border-b border-emerald-100 bg-linear-to-r from-emerald-50 via-white to-emerald-50">
                        <div className="flex items-center gap-2.5">
                            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 shadow-md shadow-emerald-200">
                                <span className="absolute inset-0 rounded-xl bg-emerald-400 opacity-40 blur-md -z-10" />
                                <ListOrdered className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[12.5px] font-bold text-slate-800 leading-tight">Purchase items</p>
                                <p className="text-[10.5px] text-slate-400 leading-tight">Add products to this purchase</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-white/80 backdrop-blur border border-emerald-100 px-2.5 py-1.5 shadow-sm">
                                <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">Rows</span>
                                <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-linear-to-br from-emerald-500 to-emerald-600 px-1.5 text-[10.5px] font-bold text-white tabular-nums">
                                    1
                                </span>
                            </div>

                            <button type="button"
                                className="group relative flex items-center gap-1.5 overflow-hidden bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[11.5px] font-semibold rounded-lg px-3.5 py-2 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
                                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                <Plus className="relative w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-90" />
                                <span className="relative">Add Row</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-linear-to-b from-emerald-600 to-emerald-700 text-white">
                                    <th className="text-[12px] font-bold  tracking-wider px-3 py-2.5 whitespace-nowrap">
                                        Item <span className="text-emerald-200">*</span>
                                    </th>
                                    <th className="text-[12px] font-bold  tracking-wider px-3 py-2.5 text-center whitespace-nowrap">Stock</th>
                                    <th className="text-[12px] font-bold  tracking-wider px-3 py-2.5 text-center whitespace-nowrap">
                                        Inv Qty <span className="text-emerald-200">*</span>
                                    </th>
                                    <th className="text-[12px] font-bold  tracking-wider px-3 py-2.5 text-center whitespace-nowrap">
                                        Stk Qty <span className="text-emerald-200">*</span>
                                    </th>
                                    <th className="text-[12px] font-bold  tracking-wider px-3 py-2.5 text-center whitespace-nowrap">
                                        Rate <span className="text-emerald-200">*</span>
                                    </th>
                                    <th className="text-[12px] font-bold  tracking-wider px-3 py-2.5 text-center whitespace-nowrap">Dis %</th>
                                    <th className="text-[12px] font-bold  tracking-wider px-3 py-2.5 text-center whitespace-nowrap">Total</th>
                                    <th className="text-[12px] font-bold  tracking-wider px-3 py-2.5 text-center whitespace-nowrap">Act</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="group border-b border-emerald-50 hover:bg-emerald-50/40 transition-colors">

                                    <td className="px-2.5 py-2.5">
                                        <div className="flex items-center gap-2">

                                            <input type="text" placeholder="Search product..."
                                                className="w-full min-w-28 text-[12px] font-medium text-slate-900 placeholder-slate-300 bg-transparent border border-transparent hover:border-emerald-200 focus:border-emerald-400 focus:bg-white rounded-lg px-2 py-1.5 focus:outline-none transition-all" />
                                        </div>
                                    </td>

                                    <td className="px-2 py-2.5">
                                        <span className="flex items-center justify-center rounded-md bg-slate-100 px-2 py-1.5 text-[11.5px] font-semibold text-slate-400 tabular-nums">
                                            0
                                        </span>
                                    </td>

                                    <td className="px-2 py-2.5">
                                        <input type="text" inputMode="numeric" placeholder="0"
                                            className="w-full text-[12px] font-bold text-emerald-700 placeholder-emerald-300 bg-emerald-50 border border-emerald-100 hover:border-emerald-300 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 rounded-lg px-2 py-1.5 text-center focus:outline-none transition-all tabular-nums" />
                                    </td>

                                    <td className="px-2 py-2.5">
                                        <input type="text" inputMode="numeric" placeholder="0"
                                            className="w-full text-[12px] font-bold text-slate-800 placeholder-slate-300 bg-emerald-50 border border-emerald-100 hover:border-emerald-300 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 rounded-lg px-2 py-1.5 text-center focus:outline-none transition-all tabular-nums" />
                                    </td>

                                    <td className="px-2 py-2.5">
                                        <div className="relative">
                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-300">Rs</span>
                                            <input type="text" inputMode="numeric" placeholder="0.00"
                                                className="w-full text-[12px] font-medium text-slate-800 placeholder-slate-300 bg-transparent border border-transparent hover:border-emerald-200 focus:border-emerald-400 focus:bg-white rounded-lg pl-6 pr-2 py-1.5 text-center focus:outline-none transition-all tabular-nums" />
                                        </div>
                                    </td>

                                    <td className="px-2 py-2.5">
                                        <div className="relative">
                                            <input type="text" inputMode="numeric" placeholder="0"
                                                className="w-full text-[12px] font-medium text-amber-700 placeholder-amber-300 bg-amber-50/60 border border-amber-100 hover:border-amber-300 focus:border-amber-400 focus:bg-white rounded-lg px-2 pr-5 py-1.5 text-center focus:outline-none transition-all tabular-nums" />
                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold text-amber-300">%</span>
                                        </div>
                                    </td>

                                    <td className="px-2 py-2.5 text-center">
                                        <span className="inline-block rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[12.5px] font-bold text-emerald-700 tabular-nums ring-1 ring-emerald-100">
                                            0.00
                                        </span>
                                    </td>

                                    <td className="px-2 py-2.5 text-center">
                                        <button type="button"
                                            className="group/del flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer mx-auto">
                                            <Trash2 className="w-3.5 h-3.5 transition-transform group-hover/del:rotate-12" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 px-4 py-3 border-t border-emerald-50 bg-emerald-50/30">
                        <p className="text-[10.5px] text-slate-400">
                            Tip: <span className="text-slate-500 font-medium">Add Row</span> se aur products add karein
                        </p>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Items total</span>
                            <span className="rounded-lg bg-white px-2.5 py-1 text-[12.5px] font-bold text-emerald-700 tabular-nums ring-1 ring-emerald-100 shadow-sm">
                                0.00
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddPurchase