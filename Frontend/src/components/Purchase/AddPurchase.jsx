import React from 'react';
import { ShoppingCart, Building2, Factory, Truck, FileText, MapPin, Calendar, Hash, UserCheck, UserPlus, Plus, Trash2, Package, ClipboardList, StickyNote, ListOrdered, Wallet } from 'lucide-react';


const AddPurchase = () => {
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
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">

                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-100">
                        <div className="w-6 h-6 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                            <ClipboardList className="w-3.5 h-3.5 text-white" />
                        </div>
                        <p className="text-[12px] font-bold text-slate-700">Purchase information</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">

                        <div>
                            <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                                Supplier <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 min-w-0">
                                    <div className="relative">
                                        <Building2 className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <select className="w-full text-[12.5px] text-slate-900 cursor-pointer placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all">
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
                            <label className="block text-[13px] font-bold text-slate-700  tracking-wide mb-1.5">
                                Purchase Date <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input type="date" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-slate-700  tracking-wide mb-1.5">Factory</label>
                            <div className="relative">
                                <Factory className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-auto" />
                                <select className="w-full text-[12.5px] text-slate-900 cursor-pointer placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all">
                                    <option value="">Select factory</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-slate-700  tracking-wide mb-1.5">Builty No</label>
                            <div className="relative">
                                <Hash className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input type="text" placeholder="Builty No" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-slate-700  tracking-wide mb-1.5">Vehicle No</label>
                            <div className="relative">
                                <Truck className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input type="text" placeholder="Vehicle No" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-slate-700  tracking-wide mb-1.5">Received By</label>
                            <div className="relative">
                                <UserCheck className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <select className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 cursor-pointer bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all">
                                    <option value="">Select option</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-slate-700  tracking-wide mb-1.5">Invoice No</label>
                            <div className="relative">
                                <FileText className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input type="text" placeholder="Invoice No" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-slate-700  tracking-wide mb-1.5">Gate Pass No</label>
                            <div className="relative">
                                <MapPin className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input type="text" placeholder="Gate Pass No" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                            </div>
                        </div>

                        <div className=" sm:col-span-2 ">
                            <label className="block text-[13px] font-bold text-slate-700 e tracking-wide mb-1.5">Details</label>
                            <div className="relative">
                                <StickyNote className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-3 pointer-events-none" />
                                <textarea placeholder="Details..." className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all h-50 mr-30 resize-none" />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col gap-4 ">

                    <div className="bg-white rounded-xl h-80 border border-slate-100 shadow-sm p-4 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                                    <ListOrdered className="w-3.5 h-3.5 text-white" />
                                </div>
                                <p className="text-[12px] font-bold text-slate-700">Purchase items</p>
                            </div>
                            <button type="button"
                                className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[11.5px] font-semibold rounded-lg px-3 py-1.5 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
                                <Plus className="w-3.5 h-3.5" />
                                Add Row
                            </button>
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-slate-100">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50">
                                        <th className="text-[13px] font-bold text-slate-700  tracking-wide px-3 py-2.5 whitespace-nowrap">Item *</th>
                                        <th className="text-[13px] font-bold text-slate-700  tracking-wide px-3 py-2.5 text-right whitespace-nowrap">Stock</th>
                                        <th className="text-[13px] font-bold text-slate-700  tracking-wide px-3 py-2.5 text-right whitespace-nowrap">Inv Qty *</th>
                                        <th className="text-[13px] font-bold text-slate-700  tracking-wide px-3 py-2.5 text-right whitespace-nowrap">Stk Qty *</th>
                                        <th className="text-[13px] font-bold text-slate-700  tracking-wide px-3 py-2.5 text-right whitespace-nowrap">Rate *</th>
                                        <th className="text-[13px] font-bold text-slate-700  tracking-wide px-3 py-2.5 text-right whitespace-nowrap">Dis %</th>
                                        <th className="text-[13px] font-bold text-slate-700  tracking-wide px-3 py-2.5 text-right whitespace-nowrap">Total</th>
                                        <th className="text-[13px] font-bold text-slate-700  tracking-wide px-3 py-2.5 text-center whitespace-nowrap">Act</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-2 py-2">
                                            <div className="relative">
                                                <input type="text" placeholder="Product" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-2 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all" />
                                            </div>
                                        </td>
                                        <td className="px-2 py-2">
                                            <input disabled placeholder="0.00" className="w-full text-[12.5px] text-slate-500 font-semibold bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-right" />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input type="text" placeholder="0.00" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-right" />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input type="text" placeholder="0.00" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-right" />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input type="text" placeholder="0.00" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-right" />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input type="text" placeholder="0.00" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-right" />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input disabled placeholder="0.00" className="w-full text-[12.5px] text-slate-500 font-semibold bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-right" />
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            <button type="button"
                                                className="w-8 h-8 rounded-lg bg-rose-500 hover:bg-rose-600 flex items-center justify-center transition-colors cursor-pointer mx-auto">
                                                <Trash2 className="w-4 h-4 text-white" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">

                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-100">
                            <div className="w-6 h-6 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                                <Wallet className="w-3.5 h-3.5 text-white" />
                            </div>
                            <p className="text-[12px] font-bold text-slate-700">Payment summary</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-4">

                            <div className="flex items-center justify-between gap-3">
                                <span className="text-[12px] font-semibold text-slate-600 whitespace-nowrap">Total</span>
                                <input disabled placeholder="0.00" className="w-full text-[12.5px] text-slate-500 font-semibold bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-right max-w-36" />
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <span className="text-[12px] font-semibold text-slate-600 whitespace-nowrap">Total Discount</span>
                                <input disabled placeholder="0.00" className="w-full text-[12.5px] text-slate-500 font-semibold bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-right max-w-36" />
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <span className="text-[12px] font-semibold text-slate-600 whitespace-nowrap">Freight Charges</span>
                                <input type="text" placeholder="0.00" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-right max-w-36" />
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <span className="text-[13px] font-bold text-emerald-700 whitespace-nowrap">Grand Total</span>
                                <input disabled placeholder="0.00" className="w-full max-w-36 text-[13px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-right" />
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <span className="text-[12px] font-semibold text-slate-600 whitespace-nowrap">Paid Amount</span>
                                <input type="text" placeholder="0.00" className="w-full text-[12.5px] text-slate-900 placeholder-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all text-right max-w-36" />
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <span className="text-[13px] font-bold text-rose-600 whitespace-nowrap">Due Amount</span>
                                <input disabled placeholder="0.00" className="w-full max-w-36 text-[13px] text-rose-600 font-bold bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 text-right" />
                            </div>

                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-end flex-wrap gap-2.5">
                            <button type="button"
                                className="border border-emerald-200 text-emerald-600 text-[12.5px] font-semibold rounded-lg px-5 py-2 hover:bg-emerald-50 transition-all hover:-translate-y-0.5 cursor-pointer">
                                Save & Add Another
                            </button>
                            <button type="button"
                                className="bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12.5px] font-semibold rounded-lg px-6 py-2 shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                                Submit
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddPurchase
