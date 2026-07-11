import React from 'react'

const Salary = () => {
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
            <h1 className="text-gray-800 text-lg font-bold">Employe Salary Ledger</h1>
            <p className="text-gray-400 text-xs">Manage Employe Salary Ledger</p>
          </div>
        </div>

      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-5 mb-4">

        <div className="flex flex-wrap items-end gap-4">

          <div className="flex flex-col gap-1.5 flex-1 min-w-48">
            <label className="text-gray-700 text-sm font-semibold">
              Employe Name <span className="text-red-400">*</span>
            </label>
            <select className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-500 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
              <option value="">Select option</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 text-sm font-semibold">From</label>
            <input
              type="date"
              defaultValue="2026-07-07"
              className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all cursor-pointer w-40"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 text-sm font-semibold">To</label>
            <input
              type="date"
              defaultValue="2026-07-07"
              className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all cursor-pointer w-40"
            />
          </div>

        </div>

        <div className="flex items-center gap-2.5 mt-4">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-semibold rounded-xl shadow-md shadow-amber-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
        </div>

      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-4 py-3 border-b border-emerald-50">
          <h2 className="text-gray-700 text-sm font-bold">Employe Salary Ledger</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead>
              <tr className="border-b border-emerald-50">
                <td className="px-4 py-2.5 text-gray-400 text-xs w-24"></td>
                <td className="px-4 py-2.5"></td>


              </tr>

              <tr className="bg-linear-to-r from-emerald-600 to-emerald-700">
                <th className="text-left text-white font-bold px-4 py-2.5 whitespace-nowrap w-24">Date</th>
                <th className="text-center text-white font-bold px-4 py-2.5">Description</th>
                <th className="text-right text-white font-bold px-4 py-2.5 whitespace-nowrap w-32">Debit</th>
                <th className="text-right text-white font-bold px-4 py-2.5 whitespace-nowrap w-28">Credit</th>
                <th className="text-right text-white font-bold px-4 py-2.5 whitespace-nowrap w-32">Balance</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={5} className="text-center py-14">
                  <div className="flex flex-col items-center gap-2 h-48">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mt-10">
                      <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-xs font-medium">Select employee and click Search</p>
                  </div>
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr className="bg-emerald-50 border-t border-emerald-100">
                <td className="px-4 py-2.5 text-gray-700 text-xs font-bold" colSpan={2}>Total</td>
                <td className="px-4 py-2.5 text-right text-gray-700 text-xs font-bold">0.00</td>
                <td className="px-4 py-2.5 text-right text-gray-700 text-xs font-bold">0.00</td>
                <td className="px-4 py-2.5 text-right text-emerald-700 text-xs font-bold">0.00</td>
              </tr>
            </tfoot>

          </table>
        </div>

      </div>

    </div>
  );
}

export default Salary
