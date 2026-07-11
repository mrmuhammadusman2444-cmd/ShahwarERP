import React from 'react'

const RawPackingStock = () => {
return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 p-4 font-sans sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/60">
          <div className="h-1.5 w-full bg-linear-to-r from-emerald-400 via-emerald-500 to-teal-500" />
          <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1z" />
                  <path d="M16 5h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2" />
                  <path d="M8 11h8M8 15h5" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">All Packing Product</h1>
                <p className="mt-0.5 text-sm text-slate-500">Complete packing stock record</p>
              </div>
            </div>
 
            
          </div>
        </header>
 
        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/60">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/25 transition hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 active:scale-[.98]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9V3h12v6" />
                  <path d="M6 18H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2" />
                  <path d="M6 14h12v7H6z" />
                </svg>
                Print
              </button>
 
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 active:scale-[.98]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12" />
                  <path d="m8 11 4 4 4-4" />
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                </svg>
                Export
              </button>
 
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-sm text-slate-500">
                Show
                <select className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2 py-1 font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
                entries
              </label>
            </div>
 
            <div className="relative w-full lg:w-72">
              <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="search"
                placeholder="Search product..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
 
          <div className="overflow-x-auto">
            <table className="w-full min-w-205 border-collapse text-left text-sm h-93">
              <thead>
                <tr className="bg-linear-to-b from-emerald-500 to-emerald-700 text-xs uppercase tracking-wider text-slate-50">
                  <Th className="w-24 pl-6">SL.</Th>
                  <Th sortable>Pack</Th>
                  <Th sortable>Product Name</Th>
                  <Th sortable>Quantity</Th>
                  <Th sortable>Price</Th>
                  <Th sortable className="pr-6">Amount</Th>
                </tr>
              </thead>
 
              <tbody className="divide-y divide-slate-100">
              
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-500">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 7 12 3 4 7v10l8 4 8-4V7z" />
                        <path d="m4 7 8 4 8-4" />
                      </svg>
                    </div>
                    <p className="mt-3 font-medium text-slate-700">No packing products yet</p>
                    <p className="mt-1 text-sm text-slate-400">Add your rows here to see them listed.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
 
          {/* Footer */}
          <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">Showing 0 to 0 of 0 entries</p>
            <div className="flex items-center gap-1.5">
              <PageBtn>Previous</PageBtn>
              <button
                type="button"
                className="h-9 w-9 cursor-pointer rounded-xl bg-emerald-500 text-sm font-medium text-white shadow-md shadow-emerald-500/25"
              >
                1
              </button>
              <PageBtn>Next</PageBtn>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
 
 
function Th({ children, sortable, className = "" }) {
  return (
    <th className={`px-4 py-4 font-semibold ${sortable ? "cursor-pointer select-none text-slate-50" : ""} ${className}`}>
      <span className="flex items-center gap-2">
        {children}
        {sortable && (
          <svg className="h-3 w-3 shrink-0 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 9 12 5l4 4" />
            <path d="M8 15l4 4 4-4" />
          </svg>
        )}
      </span>
    </th>
  );
}
 
function PageBtn({ children }) {
  return (
    <button
      type="button"
      className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-500 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
    >
      {children}
    </button>
  );
}

export default RawPackingStock
