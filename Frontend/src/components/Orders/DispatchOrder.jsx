import React from 'react'

const DispatchOrder = () => {
  return (
     <div className="p-4 md:p-5">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Manage Dispatch Order</h1>
            <p className="text-gray-400 text-xs">Manage Dispatch Order</p>
          </div>
        </div>
        
      </div>

      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-4 py-3 border-b border-blue-50">
          <button onClick={()=>window.print()}
            type="button"
            className="w-9 h-9 bg-linear-to-br from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-white rounded-lg flex items-center justify-center shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm h-139 ">
            <thead>
              <tr className="bg-blue-700 border-b border-blue-700">
                <th className="text-left text-blue-100 font-bold px-4 py-2.5 whitespace-nowrap">SL.</th>
                <th className="text-left text-blue-100 font-bold px-4 py-2.5 whitespace-nowrap">Order No</th>
                <th className="text-left text-blue-100 font-bold px-4 py-2.5 whitespace-nowrap">Dispatch No</th>
                <th className="text-left text-blue-100 font-bold px-4 py-2.5">Customer Name</th>
                <th className="text-left text-blue-100 font-bold px-4 py-2.5 whitespace-nowrap">Date</th>
                <th className="text-left text-blue-100 font-bold px-4 py-2.5 whitespace-nowrap">Delivery Date</th>
                <th className="text-left text-blue-100 font-bold px-4 py-2.5 whitespace-nowrap">Weight</th>
                <th className="text-left text-blue-100 font-bold px-4 py-2.5 whitespace-nowrap">Status</th>
                <th className="text-left text-blue-100 font-bold px-4 py-2.5 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={9} className="text-center py-14">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-xs font-medium">No dispatch orders found</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}

export default DispatchOrder
