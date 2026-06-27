const CustomerAdvance = () => {
  return (
    <div className="p-4 md:p-5">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Customer Advance</h1>
            <p className="text-gray-400 text-xs">Add advance payment for customer</p>
          </div>
        </div>
       
      </div>

      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-6">

        <div className="flex flex-col gap-4 max-w-2xl">

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Customer Name <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2">
              <select className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select option</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">Date</label>
            <div className="col-span-2">
              <input type="date" defaultValue="2026-06-27"
                className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Advance Type <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2">
              <select className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select type</option>
                <option value="payment">Payment</option>
                <option value="credit">Credit</option>
                <option value="refund">Refund</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">
              Amount <span className="text-red-400">*</span>
            </label>
            <div className="col-span-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">Rs.</span>
                <input type="number" placeholder="Amount"
                  className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right">Amount In Word:</label>
            <div className="col-span-2">
              <p className="text-gray-500 text-sm px-1 py-2 min-h-9 border-b border-blue-50">
                —
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 items-start gap-4">
            <label className="text-gray-700 text-sm font-semibold text-right pt-2.5">Details</label>
            <div className="col-span-2">
              <textarea rows={4} placeholder="Enter details..."
                className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all resize-none" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div />
            <div className="col-span-2">
              <button type="button"
                className="px-8 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 cursor-pointer text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5 active:translate-y-0">
                Save
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default CustomerAdvance;