import axios from 'axios'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react";


const InvoiceApproval = () => {
    const [pendingInvoice, setPendingInvoice] = useState([])
    const [viewInvoice, setViewInvoice] = useState(null)
    const [showReject, setShowReject] = useState(false)
    const [rejectReason, setRejectReason] = useState("")

    async function handleFindInvoices() {
        try {
            const res = await axios.get("http://localhost:3000/all/pending/invoices")
            console.log("PENDING INVOICES:", res.data.length)
            setPendingInvoice(res.data)
        } catch (err) {
            console.log("FIND INVOICES FAILED:", err.response?.data || err.message)
        }
    }

    useEffect(() => {
        handleFindInvoices()
    }, [])

    async function handleApprove(id) {
        try {
            await axios.put(`http://localhost:3000/invoice/approve/${id}`)
            setPendingInvoice(prev => prev.filter(inv => inv._id !== id))
            setViewInvoice(null)
            setShowReject(false)
            window.dispatchEvent(new Event("approval-changed"))
        } catch (err) {
            console.log("APPROVE FAILED:", err.response?.data || err.message)
        }
    }

    async function handleReject(id) {
        try {
            await axios.put(`http://localhost:3000/invoice/reject/${id}`, { rejectReason })
            setPendingInvoice(prev => prev.filter(inv => inv._id !== id))
            setViewInvoice(null)
            setShowReject(false)
            setRejectReason("")
            window.dispatchEvent(new Event("approval-changed"))
        } catch (err) {
            console.log("REJECT FAILED:", err.response?.data || err.message)
        }
    }

    const totalAmount = pendingInvoice.reduce((sum, inv) => sum + (Number(inv.grandTotal) || 0), 0)

    return (
        <div className="p-4 md:p-5">

            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-gray-800 text-lg font-bold">Invoice Approval</h1>
                    <p className="text-gray-400 text-xs">Review and approve pending invoices</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white border border-emerald-100 rounded-xl shadow-sm p-3.5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="text-gray-400 text-xs font-medium">Pending</p>
                        <p className="text-gray-800 text-base font-bold leading-tight">{pendingInvoice.length}</p>
                    </div>
                </div>
                <div className="bg-white border border-emerald-100 rounded-xl shadow-sm p-3.5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="text-gray-400 text-xs font-medium">Total Value</p>
                        <p className="text-gray-800 text-base font-bold leading-tight truncate">Rs. {totalAmount.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-emerald-50 flex items-center justify-between">
                    <h2 className="text-gray-800 text-base font-bold">Pending Invoices</h2>
                    <span className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        {pendingInvoice.length} awaiting
                    </span>
                </div>

                <div>
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-emerald-600 text-white">
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Date</th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Invoice No</th>
                                <th className="text-left text-xs font-semibold px-4 py-3">Customer</th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Sale By</th>
                                <th className="text-right text-xs font-semibold px-4 py-3 whitespace-nowrap">Amount</th>
                                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pendingInvoice.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-16">
                                        <div className="flex flex-col items-center gap-2">
                                            <svg className="w-10 h-10 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <p className="text-gray-400 text-sm">No invoice pending for approval</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                pendingInvoice.map((inv) => (
                                    <tr key={inv._id} className="hover:bg-emerald-50/40 transition-colors">
                                        <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                                            {inv.Date ? new Date(inv.Date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-md">
                                                {inv.invoiceNo || "-"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0">
                                                    {inv.customerName ? inv.customerName.charAt(0).toUpperCase() : "?"}
                                                </div>
                                                <p className="text-gray-700 text-xs font-medium">{inv.customerName || "-"}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{inv.saleBy || "-"}</td>
                                        <td className="px-4 py-3 text-right text-gray-800 text-xs font-bold whitespace-nowrap">
                                            Rs. {Number(inv.grandTotal || 0).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={() => setViewInvoice(inv)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-emerald-100 bg-white">
                    <p className="text-sm text-gray-500 ">
                        Showing {pendingInvoice.length === 0 ? 0 : 1} to {pendingInvoice.length} of {pendingInvoice.length} entries
                    </p>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                            <ChevronLeft className="w-3.5 h-3.5" /> Previous
                        </button>

                        <button className="w-8 h-8 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center cursor-pointer">1</button>

                        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-me-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                            Next <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {viewInvoice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => { setViewInvoice(null); setShowReject(false) }}>
                    <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">

                        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-50 bg-linear-to-r from-emerald-50 to-white">
                            <div>
                                <h2 className="text-gray-800 text-[15px] font-bold leading-tight">Invoice Review</h2>
                                <p className="text-gray-400 text-xs">Invoice: {viewInvoice.invoiceNo || "-"}</p>
                            </div>
                            <button onClick={() => { setViewInvoice(null); setShowReject(false) }} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="overflow-y-auto px-5 py-4 flex flex-col gap-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Customer</p>
                                    <p className="text-[12.5px] text-gray-800 font-medium">{viewInvoice.customerName || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Date</p>
                                    <p className="text-[12.5px] text-gray-800 font-medium">{viewInvoice.Date ? new Date(viewInvoice.Date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Sale By</p>
                                    <p className="text-[12.5px] text-gray-800 font-medium">{viewInvoice.saleBy || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Gate Pass</p>
                                    <p className="text-[12.5px] text-gray-800 font-medium">{viewInvoice.gatePass || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Rate</p>
                                    <p className="text-[12.5px] text-gray-800 font-medium">{viewInvoice.showRate || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Cartons</p>
                                    <p className="text-[12.5px] text-gray-800 font-medium">{viewInvoice.totalCartons || "-"}</p>
                                </div>
                            </div>

                            <div className="border border-gray-100 rounded-lg overflow-hidden">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-emerald-600 text-white">
                                            <th className="text-[11px] font-semibold px-3 py-2">Product</th>
                                            <th className="text-[11px] font-semibold px-3 py-2 text-center">Qty</th>
                                            <th className="text-[11px] font-semibold px-3 py-2 text-center">Rate</th>
                                            <th className="text-[11px] font-semibold px-3 py-2 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {(viewInvoice.items || []).map((it, i) => (
                                            <tr key={i}>
                                                <td className="text-[12px] text-gray-700 px-3 py-2">{it.name || "-"}</td>
                                                <td className="text-[12px] text-gray-600 px-3 py-2 text-center tabular-nums">{it.qty || 0}</td>
                                                <td className="text-[12px] text-gray-600 px-3 py-2 text-center tabular-nums">Rs. {Number(it.rate || 0).toLocaleString()}</td>
                                                <td className="text-[12px] text-gray-800 font-semibold px-3 py-2 text-right tabular-nums">Rs. {Number(it.total || 0).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-between items-center bg-emerald-50 rounded-lg px-4 py-2.5">
                                <span className="text-gray-700 text-sm font-bold">Grand Total</span>
                                <span className="text-emerald-700 text-base font-bold tabular-nums">Rs. {Number(viewInvoice.grandTotal || 0).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                            {showReject ? (
                                <div className="flex flex-col gap-2">
                                    <textarea
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        placeholder="Reason for rejection..."
                                        rows={2}
                                        className="w-full text-xs text-gray-700 placeholder-gray-400 bg-white border border-red-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 resize-none transition-all"
                                    />
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => { setShowReject(false); setRejectReason("") }} className="px-3 py-1.5 text-gray-500 hover:text-gray-700 text-xs font-semibold cursor-pointer">Cancel</button>
                                        <button onClick={() => handleReject(viewInvoice._id)} className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer">Confirm Reject</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleApprove(viewInvoice._id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Approve
                                    </button>
                                    <button onClick={() => setShowReject(true)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 bg-white border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default InvoiceApproval