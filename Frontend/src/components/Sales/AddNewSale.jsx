const NewSale = () => {
  const products = [
    { id: 1,  name: "10kg Chicken Yaknhi Masala" },
    { id: 2,  name: "10Kg Biryani Masala" },
    { id: 3,  name: "10Kg Karahi Masala" },
    { id: 4,  name: "10kg Chat Masala" },
    { id: 5,  name: "5kg Mixed Spice" },
    { id: 6,  name: "1kg Garam Masala" },
    { id: 7,  name: "2kg Tikka Masala" },
    { id: 8,  name: "500g Biryani Mix" },
    { id: 9,  name: "3kg Nihari Masala" },
    { id: 10, name: "1kg Qorma Masala" },
    { id: 11, name: "2kg Paya Masala" },
    { id: 12, name: "750g Haleem Mix" },
    { id: 13, name: "1kg Sajji Masala" },
    { id: 14, name: "2kg Daal Masala" },
    { id: 15, name: "500g Zeera Powder" },
  ];

  // Aap apna selectedItems state yahan lagana — abhi empty
  const selectedItems = [];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 md:p-5">

      {/* ── Tabs ── */}
      <div className="flex gap-1 mb-5 bg-white border border-blue-100 shadow-sm p-1 rounded-xl w-fit">
        <button className="px-6 py-2 rounded-lg bg-linear-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-200 transition-all">
          New Sale
        </button>
        <button className="px-6 py-2 rounded-lg text-blue-500 text-sm font-medium hover:bg-blue-50 transition-all">
          Today's Sale
        </button>
      </div>

      {/* ── Master Layout ── */}
      <div className="flex flex-col xl:flex-row gap-4 items-start">

        {/* ════ LEFT — Product Browser ════ */}
        <div className="w-full xl:w-[38%] shrink-0 flex flex-col gap-3">

          {/* Search Bar */}
          <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-3 flex gap-2">
            <input
              type="text"
              placeholder="Search by product name..."
              className="flex-1 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
            />
            <select className="w-36 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 text-gray-600 text-sm focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
              <option value="">All Categories</option>
              <option value="masala">Masala</option>
              <option value="spices">Spices</option>
              <option value="mix">Mix</option>
            </select>
            <button className="w-10 h-9 shrink-0 bg-linear-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md shadow-blue-200 transition-all hover:from-blue-500 hover:to-blue-600">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Product Grid */}
          <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-4">
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Products — {products.length} items
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-2.5 overflow-y-auto max-h-[55vh] pr-1 custom-scroll">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="group bg-white hover:bg-blue-50 border border-blue-100 hover:border-blue-300 rounded-xl p-2.5 cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-blue-100 hover:-translate-y-0.5"
                >
                  <div className="w-full aspect-square rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-2">
                    <svg className="w-7 h-7 text-blue-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-xs font-medium leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {p.name}
                  </p>
                  <div className="mt-1.5 w-full h-6 bg-transparent group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-all">
                    <svg className="w-3 h-3 text-transparent group-hover:text-blue-500 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ RIGHT — Sale Form + Items Table ════ */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">

          {/* ── Sale Info Form ── */}
          <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-blue-50">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200 shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h2 className="text-gray-800 text-sm font-semibold">Sale Details</h2>
                <p className="text-gray-400 text-xs">Fill in the information below</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Gate Pass</label>
                <input type="text" placeholder="Manual gate pass..."
                  className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
              </div>
            
              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Customer Name</label>
                <input type="text" defaultValue="Counter Sale"
                  className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
              </div>
              <div>
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                  Date <span className="text-red-400">*</span>
                </label>
                <input type="date" defaultValue="2026-06-23"
                  className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Show Rate</label>
                <select className="w-full sm:w-64 bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                  <option>Distributor Rate</option>
                  <option>Retail Rate</option>
                  <option>Wholesale Rate</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Selected Items Table ── */}
          <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">

            {/* Table Header Bar */}
            <div className="px-5 py-3 border-b border-blue-100 flex items-center justify-between bg-blue-50/50">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-gray-700 text-sm font-semibold">Sale Items</span>
                <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {selectedItems.length}
                </span>
              </div>
            </div>

            {/* Scrollable Table Area — fixed height, scroll andar */}
            <div className="overflow-y-auto" style={{ maxHeight: "280px" }}>
              <table className="w-full text-sm border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-blue-600 text-white">
                    <th className="text-left text-xs font-semibold px-3 py-2.5 whitespace-nowrap">
                      Item Information <span className="text-red-300">*</span>
                    </th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5 whitespace-nowrap">Desc</th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5 whitespace-nowrap">Carton</th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5 whitespace-nowrap">Dozen</th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5 whitespace-nowrap">
                      Qnty <span className="text-red-300">*</span>
                    </th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5 whitespace-nowrap">
                      Rate <span className="text-red-300">*</span>
                    </th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5 whitespace-nowrap">Total</th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5 whitespace-nowrap">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {selectedItems.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-gray-400 text-sm">
                        <div className="flex flex-col items-center gap-2">
                          <svg className="w-9 h-9 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                          </svg>
                          <span className="text-gray-400 text-xs">Left side se product select karein</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    selectedItems.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`transition-colors hover:bg-blue-50/40 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                      >
                        {/* Item Name */}
                        <td className="px-3 py-2 min-w-35">
                          <input
                            type="text"
                            defaultValue={item.name}
                            className="w-full bg-transparent border border-transparent hover:border-green-300 focus:border-green-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs focus:outline-none transition-all"
                          />
                        </td>
                        {/* Desc */}
                        <td className="px-3 py-2 min-w-25">
                          <input
                            type="text"
                            placeholder="Description"
                            className="w-full bg-transparent border border-transparent hover:border-green-300 focus:border-green-400 focus:bg-white rounded px-2 py-1 text-gray-400 text-xs focus:outline-none transition-all placeholder-gray-300"
                          />
                        </td>
                        {/* Carton */}
                        <td className="px-3 py-2 w-16">
                          <input
                            type="number"
                            placeholder="0"
                            className="w-full bg-transparent border border-transparent hover:border-green-300 focus:border-green-400 focus:bg-white rounded px-2 py-1 text-gray-600 text-xs text-center focus:outline-none transition-all"
                          />
                        </td>
                        {/* Dozen */}
                        <td className="px-3 py-2 w-16">
                          <input
                            type="number"
                            placeholder="0"
                            className="w-full bg-transparent border border-transparent hover:border-green-300 focus:border-green-400 focus:bg-white rounded px-2 py-1 text-gray-600 text-xs text-center focus:outline-none transition-all"
                          />
                        </td>
                        {/* Qnty */}
                        <td className="px-3 py-2 w-16">
                          <input
                            type="number"
                            defaultValue={item.qty}
                            className="w-full bg-transparent border border-transparent hover:border-green-300 focus:border-green-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs text-center focus:outline-none transition-all"
                          />
                        </td>
                        {/* Rate */}
                        <td className="px-3 py-2 w-24">
                          <input
                            type="number"
                            defaultValue={item.rate}
                            className="w-full bg-transparent border border-transparent hover:border-green-300 focus:border-green-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs text-center focus:outline-none transition-all"
                          />
                        </td>
                        {/* Total */}
                        <td className="px-3 py-2 text-center text-gray-700 text-xs font-medium w-20">
                          {item.total ?? 0}
                        </td>
                        {/* Action */}
                        <td className="px-3 py-2 w-20">
                          <div className="flex items-center justify-center gap-1.5">
                            <button className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors" title="Remove">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            <button className="w-6 h-6 bg-teal-500 hover:bg-teal-600 rounded flex items-center justify-center transition-colors" title="View">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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

            {/* Grand Total + Submit — always visible, kabhi scroll nahi hoga */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4 border-t border-blue-100 bg-blue-50/40">
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Grand Total</p>
                <p className="text-gray-800 text-xl font-bold mt-0.5">
                  Rs. <span className="text-blue-700">
                    {selectedItems.reduce((s, i) => s + (i.total ?? 0), 0).toLocaleString()}
                  </span>
                </p>
              </div>
              <button className="w-full sm:w-auto px-8 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap">
                Proceed to Sale →
              </button>
            </div>

          </div>
          {/* ── End Items Table ── */}

        </div>
        {/* ════ End Right Panel ════ */}

      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #bfdbfe; border-radius: 99px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #93c5fd; }
      `}</style>
    </div>
  );
};

export default NewSale;