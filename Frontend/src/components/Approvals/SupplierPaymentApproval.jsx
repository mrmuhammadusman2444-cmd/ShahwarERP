import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const SupplierPaymentApproval = () => {
    const [payment, setPayment] = useState([])
    const [viewData, setViewData] = useState(null)
    const [showReject, setShowReject] = useState(false)
    const [rejectReason, setRejectReason] = useState("")

    async function handleFindPending() {
        try {
            let res = await axios.get('http://localhost:3000/find/supplier/payment')
            console.log("PAYMENTS AAYE:", res.data.length) 
            let pending = res.data.filter(p => p.status !== "approved" && p.status !== "rejected")
            console.log("PENDING:", pending.length) 
            setPayment(pending)
        } catch (err) {
            console.log("FIND PENDING FAILED:", err.response?.data || err.message)
        }
    }

    useEffect(() => {
        handleFindPending()
    }, [])

    async function handleApprove(id) {
        try {
            await axios.post(`http://localhost:3000/approve/supplier/payment/${id}`)
            setPayment(prev => prev.filter(p => p._id !== id))
            setViewData(null)
            setShowReject(false)
            window.dispatchEvent(new Event("approval-changed"))
        } catch (err) {
            console.log("APPROVE FAILED:", err.response?.data || err.message)
        }
    }

    async function handleReject(id) {
        try {
            await axios.post(`http://localhost:3000/reject/supplier/payment/${id}`, { rejectReason })
            setPayment(prev => prev.filter(p => p._id !== id))
            setViewData(null)
            setShowReject(false)
            setRejectReason("")
            window.dispatchEvent(new Event("approval-changed"))
        } catch (err) {
            console.log("REJECT FAILED:", err.response?.data || err.message)
        }
    }

    const totalAmount = payment.reduce((sum, p) => sum + (Number(p.totalAmount) || 0), 0)

    return (
        <div className="p-4 md:p-5">

            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-gray-800 text-lg font-bold">Supplier Payment Approval</h1>
                    <p className="text-gray-400 text-xs">Review and approve pending payments</p>
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
                        <p className="text-gray-800 text-base font-bold leading-tight">{payment.length}</p>
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
                    <h2 className="text-gray-800 text-base font-bold">Pending Payments</h2>
                    <span className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        {payment.length} awaiting
                    </span>
                </div>

                <div>
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-emerald-600 text-white">
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Date</th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Voucher No</th>
                                <th className="text-left text-xs font-semibold px-4 py-3">From Customer</th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Payment Type</th>
                                <th className="text-right text-xs font-semibold px-4 py-3 whitespace-nowrap">Amount</th>
                                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {payment.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-16">
                                        <div className="flex flex-col items-center gap-2">
                                            <svg className="w-10 h-10 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <p className="text-gray-400 text-sm">No payment pending for approval</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                payment.map((item) => (
                                    <tr key={item._id} className="hover:bg-emerald-50/40 transition-colors">
                                        <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                                            {item.date ? new Date(item.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-md">
                                                {item.voucherNo || "-"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0">
                                                    {item.fromCustomer ? item.fromCustomer.charAt(0).toUpperCase() : "?"}
                                                </div>
                                                <p className="text-gray-700 text-xs font-medium">{item.fromCustomer || "-"}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{item.paymentType || "-"}</td>
                                        <td className="px-4 py-3 text-right text-gray-800 text-xs font-bold whitespace-nowrap">
                                            Rs. {Number(item.totalAmount || 0).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={() => setViewData(item)}
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
            </div>

            {viewData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => { setViewData(null); setShowReject(false) }}>
                    <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">

                        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-50 bg-linear-to-r from-emerald-50 to-white">
                            <div>
                                <h2 className="text-gray-800 text-[15px] font-bold leading-tight">Payment Review</h2>
                                <p className="text-gray-400 text-xs">Voucher: {viewData.voucherNo || "-"}</p>
                            </div>
                            <button onClick={() => { setViewData(null); setShowReject(false) }} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="overflow-y-auto px-5 py-4 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">From Customer</p>
                                    <p className="text-[12.5px] text-gray-800 font-medium">{viewData.fromCustomer || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Date</p>
                                    <p className="text-[12.5px] text-gray-800 font-medium">{viewData.date ? new Date(viewData.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Payment Type</p>
                                    <p className="text-[12.5px] text-gray-800 font-medium">{viewData.paymentType || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Voucher No</p>
                                    <p className="text-[12.5px] text-gray-800 font-medium">{viewData.voucherNo || "-"}</p>
                                </div>
                            </div>

                            {(viewData.allocations || []).length > 0 && (
                                <div className="border border-gray-100 rounded-lg overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-emerald-600 text-white">
                                                <th className="text-[11px] font-semibold px-3 py-2">Supplier</th>
                                                <th className="text-[11px] font-semibold px-3 py-2">Code</th>
                                                <th className="text-[11px] font-semibold px-3 py-2 text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {viewData.allocations.map((a, i) => (
                                                <tr key={i}>
                                                    <td className="text-[12px] text-gray-700 px-3 py-2">{a.supplierName || "-"}</td>
                                                    <td className="text-[12px] text-gray-500 px-3 py-2">{a.code || "-"}</td>
                                                    <td className="text-[12px] text-gray-800 font-semibold px-3 py-2 text-right">Rs. {Number(a.amount || 0).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="flex justify-between items-center bg-emerald-50 rounded-lg px-4 py-2.5">
                                <span className="text-gray-700 text-sm font-bold">Total Amount</span>
                                <span className="text-emerald-700 text-base font-bold tabular-nums">Rs. {Number(viewData.totalAmount || 0).toLocaleString()}</span>
                            </div>

                            {viewData.remark && (
                                <div className="bg-gray-50 rounded-lg px-3 py-2">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Remark</p>
                                    <p className="text-[12px] text-gray-600">{viewData.remark}</p>
                                </div>
                            )}
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
                                        <button onClick={() => handleReject(viewData._id)} className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer">Confirm Reject</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleApprove(viewData._id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Approve
                                    </button>
                                    <button onClick={() => setShowReject(true)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold rounded-lg transition-colors cursor-pointer">
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

export default SupplierPaymentApproval