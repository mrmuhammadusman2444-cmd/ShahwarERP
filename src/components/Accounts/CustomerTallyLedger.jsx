import React from 'react'
import { Users, Calendar, Hash, StickyNote, Save } from 'lucide-react'







const CustomerTallyLedger = () => {
  return (
    <div className="p-4 md:p-5">

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm px-5 py-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Customer Tally Ledger</h1>
            <p className="text-gray-400 text-xs">Here you can tally ledger with customers</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-6 min-h-[80vh]">

        <div className="flex flex-col gap-4 max-w-2xl ">

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Voucher No
            </label>
            <div className="col-span-2 relative">
              <Hash className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Enter voucher no"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Date
            </label>
            <div className="col-span-2 relative">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="date"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Customer Name
            </label>
            <div className="col-span-2 relative">
              <Users className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Enter customer name"
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-start gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right pt-2.5">
              Remarks
            </label>
            <div className="col-span-2 relative">
              <StickyNote className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-3 pointer-events-none" />
              <textarea
                rows={3}
                placeholder="Enter remarks..."
                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div className="border-t border-emerald-50" />

          <div className="grid grid-cols-3 gap-4">
            <div />
            <div className="col-span-2">
              <button
                type="button"
                className="flex items-center gap-2 px-8 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CustomerTallyLedger
