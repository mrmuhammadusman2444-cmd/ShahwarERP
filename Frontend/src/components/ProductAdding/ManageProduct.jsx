const ManageProduct = () => {
    return (
        <div className="p-4 md:p-5">

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-gray-800 text-lg font-bold">Manage Product</h1>
                        <p className="text-gray-400 text-xs">Manage your product</p>
                    </div>
                </div>

            </div>

            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">

                <div className="px-4 py-3 border-b border-blue-50">
                    <h2 className="text-gray-700 text-sm font-bold">Manage Product</h2>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-blue-50">

                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">Show</span>
                        <select className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-lg px-2 py-1 text-gray-700 text-xs focus:outline-none cursor-pointer appearance-none">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                        <span className="text-gray-500 text-xs">entries</span>
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

                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 focus-within:border-blue-400 transition-all">
                        <svg className="w-3.5 h-3.5 text-blue-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Search..."
                            className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:outline-none w-36" />
                    </div>

                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm h-118">
                        <thead>
                            <tr className="bg-blue-700 border-b border-blue-100">
                                <th className="text-left text-gray-100 font-bold px-4 py-2.5 whitespace-nowrap">SL.</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-2.5 whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        Product ID
                                        <svg className="w-3 h-3 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="text-left text-gray-100 font-bold px-4 py-2.5">Product Name</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-2.5 whitespace-nowrap">Product Model</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-2.5 whitespace-nowrap">Type</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-2.5 whitespace-nowrap">Supplier Name</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-2.5 whitespace-nowrap">Price</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-2.5 whitespace-nowrap">Scheme Point</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-2.5 whitespace-nowrap">Images</th>
                                <th className="text-left text-gray-100 font-bold px-4 py-2.5 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={10} className="text-center py-14">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-400 text-xs font-medium">No products found</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-blue-50">
                    <p className="text-gray-400 text-xs">Showing 0 to 0 of 0 entries</p>
                    <div className="flex items-center gap-1">
                        <button type="button" className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-gray-500 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-blue-100">
                            Previous
                        </button>
                        <button type="button" className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-gray-500 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-blue-100">
                            Next
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ManageProduct;