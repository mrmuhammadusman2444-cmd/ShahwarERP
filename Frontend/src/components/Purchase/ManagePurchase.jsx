import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { can } from '../../Utils/Permissions.js'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ManagePurchase = () => {

    const navigate = useNavigate()
    const [purchase, setPurchase] = useState([])
    const [allPurchase, setAllPurchase] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [purchase.length]);
    async function handleFindPurchase() {
        try {
            let res = await axios.get('http://localhost:3000/find/purchase')
            setPurchase(res.data)
            setAllPurchase(res.data)
        } catch (err) {
            console.log("FIND PURCHASE FAILED:", err.response?.data || err.message)
        }
    }
    async function handleDeletePurchase(id) {
        try {
            await axios.delete(`http://localhost:3000/delete/purchase/${id}`)
            setPurchase(prev => prev.filter(p => p._id !== id))
        } catch (err) {
            console.log("DELETE FAILED:", err.response?.data || err.message)
        }
    }
    function handleFilter() {
        if (!startDate && !endDate) {
            setPurchase(allPurchase)
            return
        }

        let filtered = allPurchase.filter((item) => {
            if (!item.purchaseDate) return false

            let pDate = new Date(item.purchaseDate)
            let start = startDate ? new Date(startDate) : null
            let end = endDate ? new Date(endDate) : null

            if (end) end.setHours(23, 59, 59, 999)

            if (start && pDate < start) return false
            if (end && pDate > end) return false
            return true
        })

        setPurchase(filtered)
    }


    useEffect(() => {
        handleFindPurchase()
    }, [])
    function handleDownloadInvoice(purchase) {
        const doc = new jsPDF()

        // ===== HEADER =====
        doc.setFillColor(5, 150, 105)
        doc.rect(0, 0, 210, 32, "F")

        doc.setTextColor(255, 255, 255)
        doc.setFontSize(20)
        doc.setFont("helvetica", "bold")
        doc.text("SHAHWAR FOODS", 14, 15)

        doc.setFontSize(9)
        doc.setFont("helvetica", "normal")
        doc.text("Distribution Management System", 14, 22)
        doc.text("info@shahwarfoods.com", 14, 27)

        doc.setFontSize(16)
        doc.setFont("helvetica", "bold")
        doc.text("PURCHASE INVOICE", 196, 15, { align: "right" })
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text(purchase.invoiceNo || "-", 196, 22, { align: "right" })

        // ===== SUPPLIER INFO =====
        doc.setTextColor(60, 60, 60)
        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")
        doc.text("SUPPLIER", 14, 45)

        doc.setFont("helvetica", "normal")
        doc.setFontSize(11)
        doc.text(purchase.supplierName || "-", 14, 52)

        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")
        doc.text("DATE", 196, 45, { align: "right" })
        doc.setFont("helvetica", "normal")
        doc.text(
            purchase.purchaseDate ? new Date(purchase.purchaseDate).toLocaleDateString() : "-",
            196, 52, { align: "right" }
        )

        // ===== EXTRA DETAILS ROW =====
        let y = 62
        doc.setFontSize(8.5)
        doc.setTextColor(100, 100, 100)
        doc.text(`Factory: ${purchase.factory || "-"}`, 14, y)
        doc.text(`Vehicle No: ${purchase.vehicleNo || "-"}`, 80, y)
        doc.text(`Builty No: ${purchase.builtyNo || "-"}`, 146, y)

        y += 6
        doc.text(`Gate Pass: ${purchase.gatePassNo || "-"}`, 14, y)
        doc.text(`Received By: ${purchase.receivedBy || "-"}`, 80, y)

        // ===== ITEMS TABLE =====
        const rows = (purchase.items || []).map((item, i) => [
            i + 1,
            item.product,
            item.invQty || 0,
            item.stkQty || 0,
            `Rs. ${Number(item.rate || 0).toLocaleString()}`,
            `${item.dis || 0}%`,
            `Rs. ${Number(item.total || 0).toLocaleString()}`,
        ])

        autoTable(doc, {
            startY: y + 8,
            head: [["S.No", "Product", "Inv Qty", "Stk Qty", "Rate", "Dis", "Total"]],
            body: rows,
            theme: "grid",
            headStyles: {
                fillColor: [5, 150, 105],
                textColor: 255,
                fontSize: 9,
                fontStyle: "bold",
            },
            bodyStyles: { fontSize: 9, textColor: [60, 60, 60] },
            alternateRowStyles: { fillColor: [240, 253, 244] },
            columnStyles: {
                0: { cellWidth: 12, halign: "center" },
                2: { halign: "center" },
                3: { halign: "center" },
                4: { halign: "center" },
                5: { halign: "center" },
                6: { halign: "center" },
            },
        })

        // ===== TOTALS =====
        let ty = doc.lastAutoTable.finalY + 10

        doc.setFontSize(9)
        doc.setTextColor(100, 100, 100)
        doc.text("Total Amount:", 130, ty)
        doc.text(`Rs. ${Number(purchase.totalAmount || 0).toLocaleString()}`, 196, ty, { align: "right" })

        ty += 6
        doc.text("Discount:", 130, ty)
        doc.text(`Rs. ${Number(purchase.totalDiscount || 0).toLocaleString()}`, 196, ty, { align: "right" })

        ty += 6
        doc.text("Freight Charges:", 130, ty)
        doc.text(`Rs. ${Number(purchase.freightCharges || 0).toLocaleString()}`, 196, ty, { align: "right" })

        ty += 4
        doc.setDrawColor(200, 200, 200)
        doc.line(130, ty, 196, ty)

        ty += 8
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(5, 150, 105)
        doc.text("GRAND TOTAL", 110, ty)
        doc.text(`Rs. ${Number(purchase.grandTotal || 0).toLocaleString()}`, 196, ty, { align: "right" })

        // ===== FOOTER =====
        doc.setFontSize(8)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(150, 150, 150)
        doc.text("www.shahwarfoods.com.pk", 105, 280, { align: "center" })

        // ===== PREVIEW =====
        const pdfBlob = doc.output('blob')
        const pdfUrl = URL.createObjectURL(pdfBlob)
        window.open(pdfUrl, '_blank')
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 md:p-6">

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-b from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-blue-200">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-gray-800 text-xl font-bold">Manage Purchases</h1>
                        <p className="text-gray-400 text-xs">Manage your Purchase</p>
                    </div>
                </div>

            </div>


            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-4 mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
                    <div>
                        <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Start Date</label>
                        <input
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            type="date"
                            className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
                    </div>
                    <div>
                        <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">End Date</label>
                        <input value={endDate}
                            onChange={(e) => setEndDate(e.target.value)} type="date"
                            className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
                    </div>
                    <button onClick={handleFilter} className="px-6 py-2.5 cursor-pointer bg-linear-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5">
                        Find
                    </button>
                    <button onClick={() => { navigate('/addpurchasepage') }} className="flex items-center cursor-pointer gap-2 px-4 py-2.5 bg-linear-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Purchase
                    </button>
                </div>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">

                <div className="px-5 py-3 border-b border-blue-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Show</span>
                            <select className="bg-blue-50 border border-blue-100 rounded-lg px-2 py-1.5 text-gray-600 text-xs focus:outline-none focus:border-blue-400 transition-all">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                            <span>entries</span>
                        </div>

                        <div className="flex items-center gap-1.5 ">
                            {[
                                { label: "Copy", bg: "bg-slate-500 cursor-pointer  hover:bg-slate-600" },
                                { label: "CSV", bg: "bg-green-500  cursor-pointer  hover:bg-green-600" },
                                { label: "Excel", bg: "bg-emerald-600 cursor-pointer hover:bg-emerald-700" },
                                { label: "PDF", bg: "bg-red-500  cursor-pointer   hover:bg-red-600" },
                                { label: "Print", bg: "bg-blue-500 cursor-pointer   hover:bg-blue-600" },
                            ].map((btn) => (
                                <button key={btn.label}
                                    className={`${btn.bg} text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors`}>
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 focus-within:border-emerald-400 transition-all">
                        <svg className="w-3.5 h-3.5 text-emerald-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Search..."
                            className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:outline-none w-36" />
                    </div>
                </div>

                <div ref={scrollRef} className="max-h-[52vh] overflow-y-auto overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-linear-to-b from-emerald-500 to-emerald-700 text-white">
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">SL.</th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        Invoice No
                                        <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Factory</th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Purchase Id</th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Supplier Name</th>
                                <th className="text-left text-xs font-semibold px-4 py-3 whitespace-nowrap">Purchase Date</th>
                                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Total Amount</th>
                                <th className="text-center text-xs font-semibold px-4 py-3 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {purchase.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="py-20">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 ring-1 ring-emerald-100 flex items-center justify-center">
                                                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-gray-700 text-sm font-semibold">No Records Found</p>
                                                <p className="text-gray-400 text-xs mt-0.5">Add a new purchase to get started</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                purchase.map((item, idx) => (
                                    <tr key={item._id} className="group hover:bg-emerald-50/40 transition-colors duration-150">
                                        {/* Serial */}
                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 text-gray-500 text-[11px] font-semibold group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                                                {idx + 1}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold ring-1 ring-emerald-100">
                                                {item.invoiceNo || "-"}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3.5 text-gray-600 text-xs font-medium whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                {item.factory || "-"}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                            <span className="font-mono text-[11px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                                                {item._id.slice(-6).toUpperCase()}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                            <div className="flex items-center gap-2.5">
                                                <span className="shrink-0 w-7 h-7 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 text-white text-[11px] font-bold flex items-center justify-center">
                                                    {(item.supplierName || "-").charAt(0).toUpperCase()}
                                                </span>
                                                <span className="text-gray-700 text-xs font-medium">{item.supplierName || "-"}</span>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3.5 text-gray-500 text-xs whitespace-nowrap">
                                            {item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : "-"}
                                        </td>

                                        <td className="px-4 py-3.5 text-center whitespace-nowrap">
                                            <span className="text-gray-900 text-sm font-bold">
                                                <span className="text-gray-400 text-[10px] font-normal mr-0.5">Rs.</span>
                                                {Number(item.grandTotal || 0).toLocaleString()}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3.5">
                                            <div className="flex flex-col items-center gap-1.5">

                                                {item.status === "approved" && (
                                                    <div className="flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-150">
                                                        <button onClick={() => handleDownloadInvoice(item)} className="w-7 h-7 rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 flex items-center justify-center transition-all cursor-pointer">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                            </svg>
                                                        </button>
                                                        
                                                        {can('purchase', 'edit') && (
                                                            <button onClick={() => navigate(`/editpurchase/${item._id}`)} className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 flex items-center justify-center transition-all cursor-pointer" >
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </button>
                                                        )}


                                                        {can('purchase', 'delete') && (
                                                            <button onClick={() => handleDeletePurchase(item._id)} className="w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all cursor-pointer" >
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        )}

                                                    </div>
                                                )}

                                                {item.status === "rejected" && (
                                                    <div className="flex flex-col items-center gap-1.5">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full ring-1 ring-red-100 whitespace-nowrap">
                                                                Rejected
                                                            </span>
                                                            <button onClick={() => handleDeletePurchase(item._id)} className="w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all cursor-pointer" title="Delete">
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        {item.rejectReason && (
                                                            <p className="text-[10px] text-red-400 italic max-w-40 text-center leading-tight" title={item.rejectReason}>
                                                                {item.rejectReason}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}

                                                {item.status !== "approved" && item.status !== "rejected" && (
                                                    <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full ring-1 ring-amber-100 whitespace-nowrap">
                                                        Pending
                                                    </span>
                                                )}

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-5 py-3 border-t border-blue-50 flex flex-col sm:flex-row items-center justify-between gap-3 bg-blue-50/30">
                    <p className="text-xs text-gray-400">Showing {purchase.length === 0 ? 0 : 1} to {purchase.length} of {purchase.length} entries</p>
                    <div className="flex items-center gap-1">
                        <button className="px-3 py-1.5 text-xs text-gray-400 bg-white border border-blue-100 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-all">Previous</button>
                        <button className="px-3 py-1.5 text-xs text-white bg-linear-to-b from-emerald-500 to-emerald-700 rounded-lg">1</button>
                        <button className="px-3 py-1.5 text-xs text-gray-400 bg-white border border-blue-100 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-all">Next</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ManagePurchase
