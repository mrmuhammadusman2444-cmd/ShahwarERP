import React from 'react'

const ManageEmployee = () => {
  return (
    <div className="p-4 md:p-5">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Manage Employee</h1>
            <p className="text-gray-700 text-xs">Manage Employee Information</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-4 py-3 border-b border-emerald-50">
          <h2 className="text-gray-700 text-sm font-bold">Manage Employee</h2>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-emerald-50">

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs">Show</span>
            <select className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-lg px-2 py-1 text-gray-700 text-xs focus:outline-none cursor-pointer appearance-none">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="text-gray-500 text-xs">entries</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button type="button" className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white text-xs font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">Copy</button>
            <button type="button" className="px-3 py-1.5 bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">CSV</button>
            <button type="button" className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">Excel</button>
            <button type="button" className="px-3 py-1.5 bg-red-500 hover:bg-red-400 text-white text-xs font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">PDF</button>
            <button type="button" className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-white text-xs font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">Print</button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs">Search:</span>
            <div className="relative">
              <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                placeholder="Search Employee"
                type="text"
                className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-lg pl-8 pr-3 py-1.5 text-gray-700 text-xs focus:outline-none transition-all w-36 sm:w-48"
              />
            </div>
          </div>

        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-linear-to-r from-emerald-600 to-emerald-700 border-b border-emerald-100">
                <th className="text-left text-gray-50 font-bold px-4 py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    SL.
                    <svg className="w-3 h-3 text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="text-left text-gray-50 font-bold px-4 py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Name
                    <svg className="w-3 h-3 text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="text-left text-gray-50 font-bold px-4 py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Designation
                    <svg className="w-3 h-3 text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="text-left text-gray-50 font-bold px-4 py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Phone
                    <svg className="w-3 h-3 text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="text-left text-gray-50 font-bold px-4 py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Salary
                    <svg className="w-3 h-3 text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="text-left text-gray-50 font-bold px-4 py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Amount
                    <svg className="w-3 h-3 text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="text-left text-gray-50 font-bold px-4 py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Picture
                    <svg className="w-3 h-3 text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="text-left text-gray-50 font-bold px-4 py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Action
                    <svg className="w-3 h-3 text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="text-center py-14 h-105">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-xs font-medium">No employees found</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-emerald-50">
          <p className="text-gray-700 text-xs">Showing 0 to 0 of 0 entries</p>
          <div className="flex items-center gap-1">
            <button type="button" className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-gray-500 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-emerald-100">Previous</button>
            <button type="button" className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-gray-500 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-emerald-100">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ManageEmployee
