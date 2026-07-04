import SelectCategory from '../../components/SelectCategory/SelectCategory.jsx'
import { useNavigate } from 'react-router-dom';


const NewOrder = () => {
  let navigate = useNavigate()
  const products = [];

  const selectedItems = [];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 md:p-5">

      <div className="flex gap-1 mb-5 bg-white border border-blue-100 shadow-sm p-1 rounded-xl w-fit">
        <button className="px-6 py-2 rounded-lg bg-linear-to-b from-emerald-500 to-emerald-700 cursor-pointer text-white text-sm font-semibold shadow-md shadow-blue-200 transition-all">
          New Order
        </button>
        <button onClick={() => { navigate('/ManageOrdersPage') }} className="px-6 py-2 rounded-lg cursor-pointer text-emerald-500 text-sm font-medium hover:bg-emerald-100 transition-all">
          Manage Orders
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-4">

        <div className="w-full xl:w-[55%] shrink-0 flex flex-col gap-3">

          <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-3 flex gap-2">
            <input
              type="text"
              placeholder="Search by product name..."
              className="flex-1 bg-emerald-50 border border-emerald-100 rounded-full px-5 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
            />
            <SelectCategory />
            <button className="w-11 h-11 shrink-0 cursor-pointer bg-linear-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shadow-md shadow-emerald-200 transition-all hover:from-emerald-500 hover:to-emerald-600">
              <svg className="w-4 h-4 text-white " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-4 flex flex-col flex-1">
            <p className="text-emerald-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Products — {products.length} items
            </p>

            <div className="grid grid-cols-3 gap-3 overflow-y-auto flex-1 max-h-[62vh] pr-1 custom-scroll">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="group bg-white hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-300 rounded-xl p-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-emerald-100 hover:-translate-y-0.5 h-fit"
                >
                  <div className="w-full aspect-square rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-2.5">
                    <svg className="w-8 h-8 text-emerald-300 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-xs font-medium leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {p.name}
                  </p>
                </div>
              ))}

              {products.length === 0 && (
                <div className="col-span-3 flex flex-col items-center justify-center py-20 gap-2">
                  <svg className="w-10 h-10 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p className="text-gray-400 text-xs">Add some products</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-3">

          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-5">

            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200 shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h2 className="text-gray-800 text-sm font-semibold">Order Details</h2>
                <p className="text-gray-400 text-xs">Fill in the information below</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-gray-500 text-sm font-semibold uppercase tracking-wide block mb-1.5">Gate Pass No</label>
                <input type="text" placeholder="Manual gate pass no..."
                  className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
              </div>
              <div>
                <label className="text-gray-500 text-sm font-semibold uppercase tracking-wide block mb-1.5">Customer Name</label>
                <input type="text" placeholder="Ali"
                  className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
              </div>
              <div>
                <label className="text-gray-500 text-sm font-semibold uppercase tracking-wide block mb-1.5">
                  Date <span className="text-red-400">*</span>
                </label>
                <input type="date" defaultValue="2026-06-23"
                  className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-gray-500 text-sm font-semibold uppercase tracking-wide block mb-1.5">Show Rate</label>
                <select className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                  <option>Distributor Rate</option>
                  <option>Retail Rate</option>
                  <option>Wholesale Rate</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 text-sm font-semibold uppercase tracking-wide block mb-1.5">Freight Charges</label>
                <input type="number" placeholder="0.00"
                  className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
              </div>
              <div>
                <label className="text-gray-500 text-sm font-semibold uppercase tracking-wide block mb-1.5">Previous Amount</label>
                <input type="number" placeholder="0.00"
                  className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
              </div>
            </div>

          </div>

          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1">

            <div className="px-5 py-3 border-b border-emerald-100 flex items-center gap-2 bg-emerald-50/50 shrink-0">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-gray-700 text-sm font-semibold">Order Items</span>
              <span className="bg-emerald-100 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {selectedItems.length}
              </span>
            </div>

            <div className="overflow-y-auto custom-scroll" style={{ maxHeight: "260px" }}>
              <table className="w-full text-sm border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-emerald-600 text-white">
                    <th className="text-left text-xs font-semibold px-3 py-2.5 whitespace-nowrap">Item Information <span className="text-red-300">*</span></th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Desc</th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Carton</th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Dozen</th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Qnty <span className="text-red-300">*</span></th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Rate <span className="text-red-300">*</span></th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Total</th>
                    <th className="text-center text-xs font-semibold px-3 py-2.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedItems.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2">
                          <svg className="w-9 h-9 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                          </svg>
                          <span className="text-gray-400 text-xs">Select some products from the left side panel</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    selectedItems.map((item, idx) => (
                      <tr key={item.id} className={`hover:bg-emerald-50/40 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                        <td className="px-3 py-2 min-w-35">
                          <input type="text" defaultValue={item.name}
                            className="w-full bg-transparent border border-transparent hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 min-w-22.5">
                          <input type="text" placeholder="Description"
                            className="w-full bg-transparent border border-transparent hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-400 text-xs focus:outline-none transition-all placeholder-gray-300" />
                        </td>
                        <td className="px-3 py-2 w-16">
                          <input type="number" placeholder="0"
                            className="w-full bg-transparent border border-transparent hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-600 text-xs text-center focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 w-16">
                          <input type="number" placeholder="0"
                            className="w-full bg-transparent border border-transparent hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-600 text-xs text-center focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 w-16">
                          <input type="number" defaultValue={item.qty}
                            className="w-full bg-transparent border border-transparent hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs text-center focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 w-24">
                          <input type="number" defaultValue={item.rate}
                            className="w-full bg-transparent border border-transparent hover:border-emerald-300 focus:border-emerald-400 focus:bg-white rounded px-2 py-1 text-gray-700 text-xs text-center focus:outline-none transition-all" />
                        </td>
                        <td className="px-3 py-2 text-center text-gray-700 text-xs font-medium w-20">{item.total ?? 0}</td>
                        <td className="px-3 py-2 w-20">
                          <div className="flex items-center justify-center gap-1.5">
                            <button className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            <button className="w-6 h-6 bg-teal-500 hover:bg-teal-600 rounded flex items-center justify-center transition-colors">
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

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4 border-t border-emerald-100 bg-emerald-50/40 shrink-0 mt-auto">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Grand Total</p>
                <p className="text-gray-800 text-xl font-bold mt-0.5">
                  Rs. <span className="text-emerald-700">
                    {selectedItems.reduce((s, i) => s + (i.total ?? 0), 0).toLocaleString()}
                  </span>
                </p>
              </div>
              <button className="w-full sm:w-auto px-8 py-2.5 bg-linear-to-r cursor-pointer from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap">
                Proceed to Order →
              </button>
            </div>

          </div>

        </div>

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

export default NewOrder;