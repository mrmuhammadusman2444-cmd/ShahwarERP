import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { X, Eye, CheckCircle2, XCircle } from 'lucide-react'

const InvoiceApproval = () => {
  const [pendingSales, setPendingSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const totalAmount = pendingSales.reduce((sum, inv) => sum + (Number(inv.grandTotal) || 0), 0);

  useEffect(() => {
    async function loadPendingSales() {
      try {
        let res = await axios.get('http://localhost:3000/find/pending/sale')
        setPendingSales(res.data)
      } catch (err) {
        console.log("PENDING SALES LOAD FAILED:", err.response?.data || err.message)
      }
    }
    loadPendingSales()
  }, [])

  async function handleApprove(id) {
    try {
      await axios.put(`http://localhost:3000/approve/sale/${id}`)
      setPendingSales(pendingSales.filter((sale) => sale._id !== id))
      setSelectedSale(null)
    } catch (err) {
      console.log("APPROVE FAILED:", err.response?.data || err.message)
    }
  }

  async function handleReject(id) {
    try {
      await axios.put(`http://localhost:3000/reject/sale/${id}`)
      setPendingSales(pendingSales.filter((sale) => sale._id !== id))
      setSelectedSale(null)
    } catch (err) {
      console.log("REJECT FAILED:", err.response?.data || err.message)
    }
  }

  return (
    <div className="p-4 md:p-5">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
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

        <div className="bg-white border border-emerald-100 rounded-xl shadow-sm p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <svg className="w-4.5 h-4.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-gray-400 text-xs font-medium">Pending</p>
            <p className="text-gray-800 text-base font-bold leading-tight">{pendingSales.length}</p>
          </div>
        </div>

        <div className="bg-white border border-emerald-100 rounded-xl shadow-sm p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <svg className="w-4.5 h-4.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-gray-400 text-xs font-medium">Total Value</p>
            <p className="text-gray-800 text-base font-bold leading-tight truncate">Rs. {totalAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="hidden sm:flex bg-white border border-emerald-100 rounded-xl shadow-sm p-3.5 items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <svg className="w-4.5 h-4.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-gray-400 text-xs font-medium">Submitted By</p>
            <p className="text-gray-800 text-base font-bold leading-tight">—</p>
          </div>
        </div>

      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-5 py-4 border-b border-emerald-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
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
              <tr className="bg-emerald-600 text-white">
                <th className="w-[11%] text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Date</th>
                <th className="w-[12%] text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Invoice No</th>
                <th className="w-[16%] text-left text-xs font-semibold px-4 py-3">Customer Name</th>
                <th className="w-[16%] text-left text-xs font-semibold px-4 py-3">Description</th>
                <th className="w-[13%] text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Amount</th>
                <th className="w-[12%] text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">User</th>
                <th className="w-[10%] text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {pendingSales.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-20">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                        <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm font-medium">no request found to be approved</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pendingSales.map((sale, idx) => (
                  <tr
                    key={sale._id}
                    className={`group cursor-pointer transition-all duration-200 hover:bg-emerald-50/60 hover:shadow-sm align-top ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                    }`}
                  >
                    <td className="px-4 py-3.5 text-gray-500 text-xs font-medium whitespace-nowrap">
                      {sale.Date ? new Date(sale.Date).toLocaleDateString() : "-"}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                        {sale.invoiceNo || sale.gatePass}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm">
                          {sale.customerName ? sale.customerName.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div className="min-w-0">
                          <p className="text-gray-700 text-xs font-semibold truncate">{sale.customerName}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-slate-500 text-xs">{sale.totalCartons} Cartons</td>

                    <td className="px-4 py-3.5 text-right text-gray-800 text-xs font-bold whitespace-nowrap">
                      Rs {Number(sale.grandTotal).toLocaleString()}
                    </td>

                    <td className="px-4 py-3.5 text-gray-500 text-xs whitespace-nowrap">—</td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => setSelectedSale(sale)}
                          title="View Invoice"
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 hover:scale-105 rounded-lg transition-all shadow-sm cursor-pointer"
                        >
                          <Eye size={14} className="text-white" />
                          <span className="text-white text-xs font-semibold">View</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pendingSales.length > 0 && (
          <div className="px-5 py-3 border-t border-emerald-50 bg-emerald-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-xs text-gray-400">Total Pending Invoices: <span className="font-semibold text-gray-600">{pendingSales.length}</span></p>
            <p className="text-xs text-gray-500 font-semibold">
              Total Amount: <span className="text-emerald-700">Rs. {totalAmount.toLocaleString()}</span>
            </p>
          </div>
        )}

      </div>

      {selectedSale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">

            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-emerald-50/60 shrink-0">
              <div>
                <h3 className="text-gray-800 text-base font-bold">
                  Invoice {selectedSale.invoiceNo || selectedSale.gatePass}
                </h3>
                <p className="text-gray-400 text-xs">
                  {selectedSale.customerName} • {selectedSale.Date ? new Date(selectedSale.Date).toLocaleDateString() : "-"}
                </p>
              </div>
              <button
                onClick={() => setSelectedSale(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-5 py-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs">
                    <th className="text-left font-semibold px-3 py-2">Item Name</th>
                    <th className="text-center font-semibold px-3 py-2">Carton</th>
                    <th className="text-center font-semibold px-3 py-2">Qty</th>
                    <th className="text-center font-semibold px-3 py-2">Rate</th>
                    <th className="text-right font-semibold px-3 py-2">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(selectedSale.items || []).map((item, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2.5 text-gray-700 font-medium">{item.name}</td>
                      <td className="px-3 py-2.5 text-center text-gray-600">{item.carton || 0}</td>
                      <td className="px-3 py-2.5 text-center text-gray-600">{item.qty}</td>
                      <td className="px-3 py-2.5 text-center text-gray-600">Rs {item.rate}</td>
                      <td className="px-3 py-2.5 text-right text-gray-800 font-semibold">
                        Rs {Number(item.total).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex flex-col gap-1.5 items-end border-t border-gray-100 pt-4">
                <p className="text-gray-500 text-xs">Total Cartons: <span className="font-semibold text-gray-700">{selectedSale.totalCartons}</span></p>
                <p className="text-gray-800 text-base font-bold">
                  Grand Total: <span className="text-emerald-700">Rs. {Number(selectedSale.grandTotal).toLocaleString()}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
              <button
                onClick={() => handleReject(selectedSale._id)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-red-200 hover:bg-red-50 hover:border-red-300 rounded-xl transition-all cursor-pointer"
              >
                <XCircle size={16} className="text-red-500" />
                <span className="text-red-500 text-sm font-semibold">Reject</span>
              </button>
              <button
                onClick={() => handleApprove(selectedSale._id)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <CheckCircle2 size={16} className="text-white" />
                <span className="text-white text-sm font-semibold">Approve</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default InvoiceApproval