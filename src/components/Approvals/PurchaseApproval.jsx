import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const PurchaseApproval = () => {
    const [purchase, setPurchase] = useState([])
    const [rejectingId, setRejectingId] = useState(null)
    const [rejectReason, setRejectReason] = useState("")
    const [viewData, setViewData] = useState(null)
    const [showReject, setShowReject] = useState(false)

    async function handleFindPending() {
        try {
            let res = await axios.get('http://localhost:3000/find/purchase')
            let pending = res.data.filter(p => p.status !== "approved")
            setPurchase(pending)
        } catch (err) {
            console.log("FIND PENDING FAILED:", err.response?.data || err.message)
        }
    }

    useEffect(() => {
        handleFindPending()
    }, [])

    async function handleApprove(id) {
    try {
        await axios.post(`http://localhost:3000/approve/purchase/${id}`)
        setPurchase(prev => prev.filter(p => p._id !== id))
        setViewData(null)
        setShowReject(false)
        window.dispatchEvent(new Event("approval-changed"))   // ← ye add kar
    } catch (err) {
        console.log("APPROVE FAILED:", err.response?.data || err.message)
    }
}

async function handleReject(id) {
    try {
        await axios.put(`http://localhost:3000/reject/purchase/${id}`, { rejectReason })
        setPurchase(prev => prev.filter(p => p._id !== id))
        setViewData(null)
        setShowReject(false)
        setRejectReason("")
        window.dispatchEvent(new Event("approval-changed"))   // ← ye add kar
    } catch (err) {
        console.log("REJECT FAILED:", err.response?.data || err.message)
    }
}

    const totalAmount = purchase.reduce((sum, p) => sum + (Number(p.grandTotal) || 0), 0)

    return (
        <div className="p-4 md:p-5">

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md shadow-blue-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-gray-800 text-lg font-bold">Purchase Approval</h1>
                        <p className="text-gray-400 text-xs">Review and approve pending purchases</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">

                <div className="bg-white border border-emerald-100 rounded-xl shadow-sm p-3.5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="text-gray-400 text-xs font-medium">Pending</p>
                        <p className="text-gray-800 text-base font-bold leading-tight">{purchase.length}</p>
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

                <div className="hidden sm:flex bg-white border border-emerald-100 rounded-xl shadow-sm p-3.5 items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                <th className="w-[12%] text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Factory</th>
                                <th className="w-[12%] text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Invoice No</th>
                                <th className="w-[16%] text-left text-xs font-semibold px-4 py-3">Supplier Name</th>
                                <th className="w-[16%] text-left text-xs font-semibold px-4 py-3">Description</th>
                                <th className="w-[13%] text-right text-xs font-semibold px-4 py-3 whitespace-nowrap">Amount</th>
                                <th className="w-[12%] text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {purchase.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-16">
                                        <div className="flex flex-col items-center gap-2">
                                            <svg className="w-10 h-10 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <p className="text-gray-400 text-sm">No purchase pending for approval</p>
                                            <p className="text-gray-300 text-xs">New purchase banane par yahan automatically aayega</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                purchase.map((item, idx) => (
                                    <tr key={item._id}
                                        className={`hover:bg-emerald-50/40 transition-colors align-top ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>

                                        <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                                            {item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : "-"}
                                        </td>

                                        <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{item.factory || "-"}</td>

                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-md">
                                                {item.invoiceNo || "-"}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0">
                                                    {item.supplierName ? item.supplierName.charAt(0).toUpperCase() : "?"}
                                                </div>
                                                <p className="text-gray-700 text-xs font-medium truncate">{item.supplierName || "-"}</p>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 text-gray-500 text-xs">{item.Details || "-"}</td>

                                        <td className="px-4 py-3 text-right text-gray-800 text-xs font-bold whitespace-nowrap">
                                            Rs. {Number(item.grandTotal || 0).toLocaleString()}
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={() => setViewData(item)}
                                                    title="View & Review"
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <span className="hidden lg:inline">View & Review</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {purchase.length > 0 && (
                    <div className="px-5 py-3 border-t border-emerald-50 bg-emerald-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <p className="text-xs text-gray-400">Total Purchases: <span className="font-semibold text-gray-600">{purchase.length}</span></p>
                        <p className="text-xs text-gray-500 font-semibold">
                            Total Amount: <span className="text-emerald-700">Rs. {totalAmount.toLocaleString()}</span>
                        </p>
                    </div>
                )}
                {viewData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setViewData(null)}>
                        <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">

                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-50 bg-linear-to-r from-emerald-50 to-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0">
                                        <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-gray-800 text-[15px] font-bold leading-tight">Purchase Review</h2>
                                        <p className="text-gray-400 text-xs">Invoice: {viewData.invoiceNo || "-"}</p>
                                    </div>
                                </div>
                                <button onClick={() => setViewData(null)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Body — scrollable */}
                            <div className="overflow-y-auto px-5 py-4 flex flex-col gap-4">

                                {/* Info grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Supplier</p>
                                        <p className="text-[12.5px] text-gray-800 font-medium">{viewData.supplierName || "-"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Factory</p>
                                        <p className="text-[12.5px] text-gray-800 font-medium">{viewData.factory || "-"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Date</p>
                                        <p className="text-[12.5px] text-gray-800 font-medium">
                                            {viewData.purchaseDate ? new Date(viewData.purchaseDate).toLocaleDateString() : "-"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Vehicle No</p>
                                        <p className="text-[12.5px] text-gray-800 font-medium">{viewData.vehicleNo || "-"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Builty No</p>
                                        <p className="text-[12.5px] text-gray-800 font-medium">{viewData.builtyNo || "-"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Received By</p>
                                        <p className="text-[12.5px] text-gray-800 font-medium">{viewData.receivedBy || "-"}</p>
                                    </div>
                                </div>

                                {/* Items table */}
                                <div className="border border-gray-100 rounded-lg overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-emerald-600 text-white">
                                                <th className="text-[11px] font-semibold px-3 py-2">Product</th>
                                                <th className="text-[11px] font-semibold px-3 py-2 text-center">Inv Qty</th>
                                                <th className="text-[11px] font-semibold px-3 py-2 text-center">Rate</th>
                                                <th className="text-[11px] font-semibold px-3 py-2 text-center">Dis %</th>
                                                <th className="text-[11px] font-semibold px-3 py-2 text-right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {(viewData.items || []).map((it, i) => (
                                                <tr key={i} className="hover:bg-emerald-50/40">
                                                    <td className="text-[12px] text-gray-700 px-3 py-2">{it.product || "-"}</td>
                                                    <td className="text-[12px] text-gray-600 px-3 py-2 text-center tabular-nums">{it.invQty || 0}</td>
                                                    <td className="text-[12px] text-gray-600 px-3 py-2 text-center tabular-nums">Rs. {Number(it.rate || 0).toLocaleString()}</td>
                                                    <td className="text-[12px] text-amber-600 px-3 py-2 text-center tabular-nums">{it.dis || 0}%</td>
                                                    <td className="text-[12px] text-gray-800 font-semibold px-3 py-2 text-right tabular-nums">Rs. {Number(it.total || 0).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Totals */}
                                <div className="flex flex-col gap-1.5 items-end text-[12.5px]">
                                    <div className="flex justify-between w-48"><span className="text-gray-400">Total Amount</span><span className="text-gray-700 font-medium tabular-nums">Rs. {Number(viewData.totalAmount || 0).toLocaleString()}</span></div>
                                    <div className="flex justify-between w-48"><span className="text-gray-400">Discount</span><span className="text-amber-600 font-medium tabular-nums">Rs. {Number(viewData.totalDiscount || 0).toLocaleString()}</span></div>
                                    <div className="flex justify-between w-48"><span className="text-gray-400">Freight</span><span className="text-gray-700 font-medium tabular-nums">Rs. {Number(viewData.freightCharges || 0).toLocaleString()}</span></div>
                                    <div className="flex justify-between w-48 pt-1.5 border-t border-gray-100"><span className="text-gray-800 font-bold">Grand Total</span><span className="text-emerald-700 font-bold tabular-nums">Rs. {Number(viewData.grandTotal || 0).toLocaleString()}</span></div>
                                </div>

                                {viewData.Details && (
                                    <div className="bg-gray-50 rounded-lg px-3 py-2">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Details</p>
                                        <p className="text-[12px] text-gray-600">{viewData.Details}</p>
                                    </div>
                                )}

                            </div>

                            {/* Footer — Approve/Reject yahan Step 4 me aayega */}
                            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                                {showReject ? (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-1.5 text-red-600">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            <span className="text-[11px] font-semibold">Reason for rejection</span>
                                        </div>
                                        <textarea
                                            value={rejectReason}
                                            onChange={(e) => setRejectReason(e.target.value)}
                                            placeholder="Type reason..."
                                            rows={1}
                                            className="w-full text-xs text-gray-700 placeholder-gray-400 bg-white border border-red-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 resize-none transition-all"
                                        />
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => { setShowReject(false); setRejectReason("") }}
                                                className="px-3 py-1.5 text-gray-500 hover:text-gray-700 text-xs font-semibold transition-colors cursor-pointer">
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleReject(viewData._id)}
                                                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                                                Confirm Reject
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleApprove(viewData._id)}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => setShowReject(true)}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PurchaseApproval