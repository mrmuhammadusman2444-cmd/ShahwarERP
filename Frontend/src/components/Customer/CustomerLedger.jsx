const CustomerLedger = () => {

  // Aap apna data yahan lagana
  const customer = {};
  const entries = [];

  return (
    <div className="p-4 md:p-5">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Customer Ledger</h1>
            <p className="text-gray-400 text-xs">View customer transaction history</p>
          </div>
        </div>
        
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 flex-wrap">

          <div className="flex-1 min-w-50">
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">
              Customer Name <span className="text-red-400">*</span>
            </label>
            <select className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all appearance-none cursor-pointer">
              <option value="">Select customer...</option>
            </select>
          </div>

          <div>
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">From</label>
            <input type="date"
              className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>

          <div>
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">To</label>
            <input type="date"
              className="bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>

          <div className="flex gap-2 pb-0.5">
            <button className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
            <button className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-600 text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
          </div>

        </div>
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">

        <div className="py-3 px-5 border-b border-emerald-50 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 ">
          <h2 className="text-gray-800 text-sm font-bold">
            {customer?.name || "—"}
          </h2>
          <span className="text-gray-300 text-xs hidden sm:block">|</span>
          <p className="text-gray-500 text-xs">Address : {customer?.address || "—"}</p>
          <span className="text-gray-300 text-xs hidden sm:block">|</span>
          <p className="text-gray-500 text-xs">Print Date: {customer?.printDate || "—"}</p>
          <span className="text-gray-300 text-xs hidden sm:block">|</span>
          <p className="text-emerald-700 text-xs font-bold">
            Balance : {customer?.balance || "—"}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-emerald-600 text-white">
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

              <tr className="bg-emerald-50/40">
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

              {entries.length === 0 ? (
                <tr className="h-84">
                  <td colSpan={7} className="text-center py-14">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-10 h-10 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-gray-400 text-sm">No recorde found</p>
                      <p className="text-gray-300 text-xs">Select customer from the above</p>
                    </div>
                  </td>
                </tr>
              ) : (
                entries.map((entry, idx) => (
                  <tr key={idx}
                    className={`hover:bg-emerald-50/40 transition-colors align-top ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                    <td className="px-4 py-3 text-center text-gray-600 text-xs whitespace-nowrap">
                      {entry.date}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs leading-5">
                      {Array.isArray(entry.description)
                        ? entry.description.map((line, i) => <p key={i}>{line}</p>)
                        : entry.description}
                    </td>
                    <td className="px-4 py-3 text-center text-emerald-600 text-xs font-medium whitespace-nowrap">
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
                      <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                        {entry.balance}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-emerald-50 bg-emerald-50/30 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Total Entries: {entries.length}
          </p>
          <p className="text-xs text-gray-500 font-semibold">
            Final Balance: <span className="text-emerald-700">{customer?.balance || "—"}</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default CustomerLedger;