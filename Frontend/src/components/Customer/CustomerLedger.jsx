const CustomerLedger = () => {

  // Aap apna data yahan lagana
  const customer = {};
  const entries = [];

  return (
    <div className="p-4 md:p-5">

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Customer Ledger</h1>
            <p className="text-gray-400 text-xs">View customer transaction history</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
          <span>Home</span><span>/</span><span>Customers</span><span>/</span>
          <span className="text-blue-600 font-medium">Customer Ledger</span>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 flex-wrap">

          {/* Customer Name */}
          <div className="flex-1 min-w-50">
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">
              Customer Name <span className="text-red-400">*</span>
            </label>
            <select className="w-full bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
              <option value="">Select customer...</option>
            </select>
          </div>

          {/* From */}
          <div>
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">From</label>
            <input type="date"
              className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>

          {/* To */}
          <div>
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">To</label>
            <input type="date"
              className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pb-0.5">
            <button className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
            <button className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-white border border-blue-200 hover:bg-blue-50 text-blue-600 text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
          </div>

        </div>
      </div>

      {/* ── Ledger Table Card ── */}
      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">

        {/* Customer Info Header — single row, justified center */}
        <div className="py-3 px-5 border-b border-blue-50 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 ">
          <h2 className="text-gray-800 text-sm font-bold">
            {customer?.name || "—"}
          </h2>
          <span className="text-gray-300 text-xs hidden sm:block">|</span>
          <p className="text-gray-500 text-xs">Address : {customer?.address || "—"}</p>
          <span className="text-gray-300 text-xs hidden sm:block">|</span>
          <p className="text-gray-500 text-xs">Print Date: {customer?.printDate || "—"}</p>
          <span className="text-gray-300 text-xs hidden sm:block">|</span>
          <p className="text-blue-700 text-xs font-bold">
            Balance : {customer?.balance || "—"}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Date</th>
                <th className="text-center text-xs font-semibold px-4 py-3">Description</th>
                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Invoice ID</th>
                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Deposite ID</th>
                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Debit</th>
                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Credit</th>
                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Balance</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {/* Opening Balance Row */}
              <tr className="bg-blue-50/40">
                <td className="px-4 py-2.5" />
                <td className="px-4 py-2.5" />
                <td className="px-4 py-2.5" />
                <td className="px-4 py-2.5" />
                <td className="px-4 py-2.5" />
                <td className="px-4 py-2.5 text-right">
                  <span className="text-gray-700 text-xs font-bold">Opening Balance</span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <span className="text-gray-800 text-xs font-bold">
                    {customer?.openingBalance || "—"}
                  </span>
                </td>
              </tr>

              {/* Data Rows */}
              {entries.length === 0 ? (
                <tr className="h-84">
                  <td colSpan={7} className="text-center py-14">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-10 h-10 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-gray-400 text-sm">Koi record nahi mila</p>
                      <p className="text-gray-300 text-xs">Customer select karke search karein</p>
                    </div>
                  </td>
                </tr>
              ) : (
                entries.map((entry, idx) => (
                  <tr key={idx}
                    className={`hover:bg-blue-50/40 transition-colors align-top ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                    <td className="px-4 py-3 text-center text-gray-600 text-xs whitespace-nowrap">
                      {entry.date}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs leading-5">
                      {Array.isArray(entry.description)
                        ? entry.description.map((line, i) => <p key={i}>{line}</p>)
                        : entry.description}
                    </td>
                    <td className="px-4 py-3 text-center text-blue-600 text-xs font-medium whitespace-nowrap">
                      {entry.invoiceId || "—"}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-400 text-xs">
                      {entry.depositId || "—"}
                    </td>
                    <td className="px-4 py-3 text-center text-red-500 text-xs font-medium">
                      {entry.debit || "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700 text-xs font-medium whitespace-nowrap">
                      {entry.credit || "—"}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                        {entry.balance}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-blue-50 bg-blue-50/30 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Total Entries: {entries.length}
          </p>
          <p className="text-xs text-gray-500 font-semibold">
            Final Balance: <span className="text-blue-700">{customer?.balance || "—"}</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default CustomerLedger;