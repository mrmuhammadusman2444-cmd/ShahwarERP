import React from 'react'

const InvoiceApproval = () => {
     const invoices = [];

  const totalAmount = invoices.reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0); // ← yeh line check karo
 return (
    <div className="p-4 md:p-5">
 
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Invoice Approval </h1>
            <p className="text-gray-400 text-xs">Review and approve pending Invoice Approvals</p>
          </div>
        </div>
       
      </div>
 
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
 
        <div className="bg-white border border-amber-100 rounded-xl shadow-sm p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
            <svg className="w-4.5 h-4.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-gray-400 text-xs font-medium">Pending</p>
            <p className="text-gray-800 text-base font-bold leading-tight">{InvoiceApproval.length}</p>
          </div>
        </div>
 
        <div className="bg-white border border-blue-100 rounded-xl shadow-sm p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <svg className="w-4.5 h-4.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-gray-400 text-xs font-medium">Total Value</p>
            <p className="text-gray-800 text-base font-bold leading-tight truncate">Rs. {totalAmount.toLocaleString()}</p>
          </div>
        </div>
 
        <div className="hidden sm:flex bg-white border border-green-100 rounded-xl shadow-sm p-3.5 items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
            <svg className="w-4.5 h-4.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-gray-400 text-xs font-medium">Submitted By</p>
            <p className="text-gray-800 text-base font-bold leading-tight">—</p>
          </div>
        </div>
 
      </div>
 
      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">
 
        <div className="px-5 py-4 border-b border-blue-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-gray-800 text-base font-bold">Shahwar Foods</h2>
            <p className="text-gray-400 text-xs">Near PSO Depot, D I KHAN Road, Bannu KPK</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Awaiting Approval
            </span>
          </div>
        </div>
 
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Date</th>
                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">InvoiceApproval No</th>
                <th className="text-left text-xs font-semibold px-4 py-3">Customer Name</th>
                <th className="text-left text-xs font-semibold px-4 py-3">Description</th>
                <th className="text-right text-xs font-semibold px-4 py-3 whitespace-nowrap">Amount</th>
                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">User</th>
                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Action</th>
              </tr>
            </thead>
 
            <tbody className="divide-y divide-gray-100 h-109">
              {InvoiceApproval.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-10 h-10 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <p className="text-gray-400 text-sm">Koi InvoiceApproval approval ke liye pending nahi</p>
                      <p className="text-gray-300 text-xs">New Sale banane par yahan automatically aayega</p>
                    </div>
                  </td>
                </tr>
              ) : (
                InvoiceApproval.map((InvoiceApproval, idx) => (
                  <tr key={InvoiceApproval.id}
                    className={`hover:bg-blue-50/40 transition-colors align-top ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
 
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{InvoiceApproval.date}</td>
 
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md">
                        #{InvoiceApproval.InvoiceApprovalNo}
                      </span>
                    </td>
 
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0">
                          {InvoiceApproval.customerName ? InvoiceApproval.customerName.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div className="min-w-0">
                          <p className="text-gray-700 text-xs font-medium truncate">{InvoiceApproval.customerName}</p>
                          {InvoiceApproval.customerPhone && (
                            <p className="text-gray-400 text-xs">{InvoiceApproval.customerPhone}</p>
                          )}
                        </div>
                      </div>
                    </td>
 
                    <td className="px-4 py-3 text-gray-500 text-xs">{InvoiceApproval.description}</td>
 
                    <td className="px-4 py-3 text-right text-gray-800 text-xs font-bold whitespace-nowrap">
                      Rs {InvoiceApproval.amount}
                    </td>
 
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{InvoiceApproval.user}</td>
 
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          title="Approve"
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-white text-xs font-semibold hidden lg:inline">Approve</span>
                        </button>
                        <button
                          title="Reject"
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-red-200 hover:bg-red-50 rounded-lg transition-colors">
                          <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-red-500 text-xs font-semibold hidden lg:inline">Reject</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
 
        {InvoiceApproval.length > 0 && (
          <div className="px-5 py-3 border-t border-blue-50 bg-blue-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-xs text-gray-400">Total InvoiceApproval: <span className="font-semibold text-gray-600">{InvoiceApproval.length}</span></p>
            <p className="text-xs text-gray-500 font-semibold">
              Total Amount: <span className="text-blue-700">Rs. {totalAmount.toLocaleString()}</span>
            </p>
          </div>
        )}
 
      </div>
    </div>
  );
}

export default InvoiceApproval
