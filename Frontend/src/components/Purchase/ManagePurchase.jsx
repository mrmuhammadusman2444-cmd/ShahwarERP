import React from 'react'
import { useNavigate } from 'react-router-dom';

const ManagePurchase = () => {
    const navigate = useNavigate()
    const Purchase = [];

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 md:p-6">

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-b from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-blue-200">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-gray-800 text-xl font-bold">Manage Purchases</h1>
                        <p className="text-gray-400 text-xs">Manage your Purchase</p>
                    </div>
                </div>

            </div>


            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-4 mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
                    <div>
                        <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Start Date</label>
                        <input type="date"
                            className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
                    </div>
                    <div>
                        <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">End Date</label>
                        <input type="date"
                            className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
                    </div>
                    <button className="px-6 py-2.5 cursor-pointer bg-linear-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5">
                        Find
                    </button>
                    <button onClick={() => { navigate('/addpurchasepage') }} className="flex items-center cursor-pointer gap-2 px-4 py-2.5 bg-linear-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Purchase
                    </button>
                </div>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">

                <div className="px-5 py-3 border-b border-blue-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Show</span>
                            <select className="bg-blue-50 border border-blue-100 rounded-lg px-2 py-1.5 text-gray-600 text-xs focus:outline-none focus:border-blue-400 transition-all">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                            <span>entries</span>
                        </div>

                        <div className="flex items-center gap-1.5 ">
                            {[
                                { label: "Copy", bg: "bg-slate-500 cursor-pointer  hover:bg-slate-600" },
                                { label: "CSV", bg: "bg-green-500  cursor-pointer  hover:bg-green-600" },
                                { label: "Excel", bg: "bg-emerald-600 cursor-pointer hover:bg-emerald-700" },
                                { label: "PDF", bg: "bg-red-500  cursor-pointer   hover:bg-red-600" },
                                { label: "Print", bg: "bg-blue-500 cursor-pointer   hover:bg-blue-600" },
                            ].map((btn) => (
                                <button key={btn.label}
                                    className={`${btn.bg} text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors`}>
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 focus-within:border-emerald-400 transition-all">
                        <svg className="w-3.5 h-3.5 text-emerald-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Search..."
                            className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:outline-none w-36" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full h-97 text-sm border-collapse">
                        <thead>
                            <tr className="bg-linear-to-b from-emerald-500 to-emerald-700 text-white">
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">SL.</th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        Invoice No
                                        <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Factory Invoice</th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Purchase Id</th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Supplier Name</th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Purchase Date</th>
                                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Total Amount</th>
                                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {Purchase.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-16">
                                        <div className="flex flex-col items-center gap-2 ml-25">
                                            <svg className="w-10 h-10 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            <p className="text-gray-400 text-sm">No Records Found</p>
                                            <p className="text-gray-300 text-xs">Add a new purchase to get started</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                Purchase.map((purchase, idx) => (
                                    <tr key={purchase.id} className={`hover:bg-blue-50/40 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                                        <td className="px-4 py-3 text-gray-400 text-xs">{idx + 1}</td>
                                        <td className="px-4 py-3 text-blue-600 text-xs font-medium">{purchase.invoiceNo}</td>
                                        <td className="px-4 py-3 text-blue-500 text-xs">{purchase.purchaseBy}</td>
                                        <td className="px-4 py-3 text-blue-500 text-xs">{purchase.supplierName}</td>
                                        <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{purchase.date}</td>
                                        <td className="px-4 py-3 text-gray-700 text-xs font-medium">{purchase.totalAmount}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-1">
                                                <button className="w-7 h-7 bg-teal-700 hover:bg-teal-800 rounded flex items-center justify-center transition-colors" title="Duplicate">
                                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                </button>
                                                <button className="w-7 h-7 bg-blue-600 hover:bg-blue-700 rounded flex items-center justify-center transition-colors" title="Lock">
                                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                </button>
                                                <button className="w-7 h-7 bg-amber-500 hover:bg-amber-600 rounded flex items-center justify-center transition-colors" title="Payment">
                                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </button>
                                                <button className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors" title="Download">
                                                    <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                </button>
                                                <button className="w-7 h-7 bg-sky-400 hover:bg-sky-500 rounded flex items-center justify-center transition-colors" title="Edit">
                                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button className="w-7 h-7 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors" title="Delete">
                                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-5 py-3 border-t border-blue-50 flex flex-col sm:flex-row items-center justify-between gap-3 bg-blue-50/30">
                    <p className="text-xs text-gray-400">Showing 0 to 0 of 0 entries</p>
                    <div className="flex items-center gap-1">
                        <button className="px-3 py-1.5 text-xs text-gray-400 bg-white border border-blue-100 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-all">Previous</button>
                        <button className="px-3 py-1.5 text-xs text-white bg-linear-to-b from-emerald-500 to-emerald-700 rounded-lg">1</button>
                        <button className="px-3 py-1.5 text-xs text-gray-400 bg-white border border-blue-100 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-all">Next</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ManagePurchase
