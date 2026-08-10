import React from 'react'

const WarehouseSchemeReport = () => {
    return (
        <div className="p-4 md:p-5">

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-gray-800 text-lg font-bold">Warehouse Scheme Report</h1>
                        <p className="text-gray-400 text-xs">Generate warehouse wise scheme reports</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400"></div>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-4 mb-4">
                <div className="flex flex-wrap items-end gap-3">

                    <div className="flex flex-col gap-1.5 min-w-0">
                        <label className="text-gray-700 text-xs font-semibold whitespace-nowrap">Start Date</label>
                        <input
                            type="date"
                            defaultValue="2026-01-01"
                            className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2 text-gray-700 text-sm focus:outline-none transition-all cursor-pointer w-36"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-0">
                        <label className="text-gray-700 text-xs font-semibold whitespace-nowrap">End Date</label>
                        <input
                            type="date"
                            defaultValue="2026-07-06"
                            className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2 text-gray-700 text-sm focus:outline-none transition-all cursor-pointer w-36"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1 min-w-36">
                        <label className="text-gray-700 text-xs font-semibold whitespace-nowrap">Warehouse</label>
                        <select className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                            <option value="">Select warehouse</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1 min-w-36">
                        <label className="text-gray-700 text-xs font-semibold whitespace-nowrap">Customer Name</label>
                        <select className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                            <option value="">Select customer</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1 min-w-36">
                        <label className="text-gray-700 text-xs font-semibold whitespace-nowrap">Product</label>
                        <select className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                            <option value="">Select product</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        className="flex items-center gap-2 px-6 py-2 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Find
                    </button>

                </div>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-emerald-50">
                    <h2 className="text-gray-700 text-sm font-bold">Report Results</h2>
                    <span className="text-xs text-gray-700 bg-emerald-100 px-3 py-1 rounded-full">No data</span>
                </div>
                <div className="overflow-x-auto h-115">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-linear-to-r from-emerald-600 to-emerald-700">
                                <th className="text-left text-white font-bold px-10 py-2.5 w-12">SL</th>
                                <th className="text-left text-white font-bold px-40 py-2.5">Product Name</th>
                                <th className="text-right text-white font-bold px-40 py-2.5 w-24">Qty</th>
                                <th className="text-right text-white font-bold px-30 py-2.5 w-24">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={7} className="text-center py-10">
                                    <div className="flex flex-col items-center gap-2 mt-30">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-400 text-xs font-medium">Select filters and click Find</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default WarehouseSchemeReport
