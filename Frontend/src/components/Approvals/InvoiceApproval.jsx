import React from 'react'

const InvoiceApproval = () => {
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
            <h1 className="text-gray-800 text-lg font-bold">Invoice Approve</h1>
            <p className="text-gray-400 text-xs">Review and approve pending invoices</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span><span>/</span><span>Sale</span><span>/</span>
          <span className="text-blue-600 font-medium">Invoice Approve</span>
        </div>
      </div>
 
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {InvoiceApproval.length} Pending Approval{InvoiceApproval.length !== 1 ? "s" : ""}
        </span>
      </div>
 
      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">
 
        <div className="py-6 px-5 text-center border-b border-blue-50">
          <h2 className="text-gray-800 text-xl font-bold mb-1">Hafiz Foods</h2>
          <p className="text-gray-500 text-sm">Near PSO Depot, D I KHAN Road, Bannu KPK</p>
          <p className="text-gray-400 text-xs mt-1">Print Date: —</p>
        </div>
 
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Date</th>
                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Invoice No</th>
                <th className="text-left text-xs font-semibold px-4 py-3">Customer Name</th>
                <th className="text-left text-xs font-semibold px-4 py-3">Description</th>
                <th className="text-right text-xs font-semibold px-4 py-3 whitespace-nowrap">Amount</th>
                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">User</th>
                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Action</th>
              </tr>
            </thead>
 
            <tbody className="divide-y divide-gray-100">
              {InvoiceApproval.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-10 h-10 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <p className="text-gray-400 text-sm">Koi invoice approval ke liye pending nahi</p>
                      <p className="text-gray-300 text-xs">New Sale banane par yahan automatically aayega</p>
                    </div>
                  </td>
                </tr>
              ) : (
                InvoiceApproval.map((InvoiceApproval, idx) => (
                  <tr key={InvoiceApproval.id}
                    className={`hover:bg-blue-50/40 transition-colors align-top ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{InvoiceApproval.date}</td>
                    <td className="px-4 py-3 text-blue-600 text-xs font-medium whitespace-nowrap">{InvoiceApproval.invoiceNo}</td>
                    <td className="px-4 py-3 text-gray-700 text-xs">{InvoiceApproval.customerName}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{InvoiceApproval.description}</td>
                    <td className="px-4 py-3 text-right text-gray-700 text-xs font-semibold whitespace-nowrap">
                      Rs {InvoiceApproval.amount}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{InvoiceApproval.user}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors shadow-sm" title="Approve">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        <button className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors shadow-sm" title="Reject">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
 
        {InvoiceApproval.length > 0 && (
          <div className="px-5 py-3 border-t border-blue-50 bg-blue-50/30 flex items-center justify-between">
            <p className="text-xs text-gray-400">Total Invoices: {InvoiceApproval.length}</p>
            <p className="text-xs text-gray-500 font-semibold">
              Total Amount: <span className="text-blue-700">Rs. —</span>
            </p>
          </div>
        )}
 
      </div>
    </div>
  );
}

export default InvoiceApproval
