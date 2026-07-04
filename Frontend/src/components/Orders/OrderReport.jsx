const OrderReport = () => {
    return (
        <div className="p-4 md:p-5">

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-b from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-gray-800 text-lg font-bold">Order Report</h1>
                        <p className="text-gray-400 text-xs">View and filter order reports</p>
                    </div>
                </div>

            </div>

            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">

                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-700 text-sm font-semibold">
                            Account's Order
                        </label>
                        <select className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-500 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                            <option value="">Select option</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-700 text-sm font-semibold">
                            Hafiz Monitoring Orders
                        </label>
                        <select className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-500 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                            <option value="">Select option</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-700 text-sm font-semibold">
                            Shahwar Monitoring Orders
                        </label>
                        <select className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-500 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                            <option value="">Select option</option>
                        </select>
                    </div>

                </div>

                <div>
                    <button
                        type="button"
                        className="flex items-center cursor-pointer gap-2 px-8 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Find
                    </button>
                </div>

            </div>

            <div className="mt-3 bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">

                <div className="flex items-center justify-between px-4 py-2.5 border-b border-emerald-50">
                    <h2 className="text-gray-700 text-sm font-bold">Order Product List</h2>
                    <button
                        type="button"
                        className="px-4 py-1.5 cursor-pointer bg-linear-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Print
                    </button>
                </div>

                <div className="text-center py-2.5 border-b border-emerald-50">
                    <h3 className="text-gray-800 text-sm font-bold">Hafiz Foods</h3>
                    <p className="text-gray-500 text-xs mt-0.5">Near PSO Depot, D I KHAN Road, Bannu KPK</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm h-83">
                        <thead>
                            <tr className="bg-linear-to-b from-emerald-500 to-emerald-700">
                                <th className="text-left text-gray-100 font-bold px-4 py-2 whitespace-nowrap">SL.</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-2">Product Name</th>
                                <th className="text-center text-gray-100 font-bold px-4 py-2 whitespace-nowrap">Desc</th>
                                <th className="text-right text-gray-100 font-bold px-4 py-2 whitespace-nowrap">Carton</th>
                                <th className="text-right text-gray-100 font-bold px-4 py-2 whitespace-nowrap">R-Carton</th>
                                <th className="text-center text-gray-100 font-bold px-4 py-2 whitespace-nowrap">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={6} className="text-center py-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
};

export default OrderReport;