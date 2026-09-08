import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { ClipboardList, Calendar, Search, Printer, Home, ChevronRight, FileText, User, ChevronDown } from 'lucide-react'

const SaleReport = () => {
    const [customerOpen, setCustomerOpen] = useState(false)
    const [customers, setCustomers] = useState([])
    const [customerSearch, setCustomerSearch] = useState("")
    const [selectedCustomer, setSelectedCustomer] = useState("")
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [records, setRecords] = useState([])
    const [total, setTotal] = useState(0)
    const [categoryOrder, setCategoryOrder] = useState([])

    useEffect(() => {
        async function fetchCustomers() {
            try {
                let res = await axios.get('http://localhost:3000/find')
                setCustomers(res.data)
                let catRes = await axios.get('http://localhost:3000/find/category')
                setCategoryOrder(catRes.data.map((c) => c.CategoryName))
            } catch (err) {
                console.log("CUSTOMERS FAILED:", err.response?.data || err.message)
            }
        }
        fetchCustomers()
    }, [])

    async function handleSearch() {
        try {
            let params = {}
            if (selectedCustomer) params.customerName = selectedCustomer
            if (fromDate) params.from = fromDate
            if (toDate) params.to = toDate
            let res = await axios.get('http://localhost:3000/sale-report/customer', { params })
            setRecords(res.data.rows || [])
            setTotal(res.data.total || 0)
        } catch (err) {
            console.log("SALE REPORT FAILED:", err.response?.data || err.message)
        }
    }

    function handleDownloadInvoice(sale) {
        const doc = new jsPDF()

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
        doc.text("INVOICE", 196, 15, { align: "right" })
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text(sale.invoiceNo || "-", 196, 22, { align: "right" })

        doc.setTextColor(60, 60, 60)
        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")
        doc.text("BILL TO", 14, 45)
        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        doc.text(sale.customerName || "-", 14, 52)

        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")
        doc.text("DATE", 196, 45, { align: "right" })
        doc.setFont("helvetica", "normal")
        doc.text(sale.Date ? new Date(sale.Date).toLocaleDateString() : "-", 196, 52, { align: "right" })

        const grouped = {}
            ; (sale.items || []).forEach((item) => {
                const cat = item.mainCategory || "Uncategorized"
                if (!grouped[cat]) grouped[cat] = []
                grouped[cat].push(item)
            })

        const rows = []
        let counter = 1
        const sortedKeys = [
            ...categoryOrder.filter(c => grouped[c]),
            ...Object.keys(grouped).filter(c => !categoryOrder.includes(c))
        ]
        sortedKeys.forEach((category) => {
            rows.push([{ content: category, colSpan: 6, styles: { fontStyle: "bold", fillColor: [255, 255, 255], textColor: [0, 0, 0] } }])
            grouped[category].forEach((item) => {
                const cartonRate = (Number(item.rate) || 0) * (Number(item.cartonSize) || 0)
                rows.push([
                    counter++,
                    item.name,
                    item.carton || 0,
                    item.storeLimit || item.cartonSize || "-",
                    `Rs. ${cartonRate.toLocaleString()}`,
                    `Rs. ${Number(item.total || 0).toLocaleString()}`,
                ])
            })
        })

        autoTable(doc, {
            startY: 62,
            head: [["S.No", "Product", "Carton", "Pack", "Rate (Carton Wise)", "Total"]],
            body: rows,
            theme: "grid",
            headStyles: { fillColor: [5, 150, 105], textColor: 255, fontSize: 9, fontStyle: "bold" },
            bodyStyles: { fontSize: 9, textColor: [60, 60, 60] },
            alternateRowStyles: { fillColor: [240, 253, 244] },
            columnStyles: {
                0: { cellWidth: 12, halign: "left" },
                1: { halign: "left" },
                2: { halign: "center" },
                3: { halign: "center" },
                4: { halign: "center" },
                5: { halign: "center" },
            },
        })

        let y = doc.lastAutoTable.finalY + 10
        doc.setFontSize(9)
        doc.setTextColor(100, 100, 100)
        doc.text("Freight Charges:", 140, y)
        doc.text(`Rs. ${Number(sale.freightCharges || 0).toLocaleString()}`, 196, y, { align: "right" })

        y += 6
        doc.text("Total Cartons:", 140, y)
        doc.text(`${sale.totalCartons || 0}`, 196, y, { align: "right" })

        y += 4
        doc.setDrawColor(200, 200, 200)
        doc.line(140, y, 196, y)

        y += 8
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(5, 150, 105)
        doc.text("GRAND TOTAL", 135, y)
        doc.text(`Rs. ${Number(sale.grandTotal || 0).toLocaleString()}`, 196, y, { align: "right" })

        doc.setFontSize(8)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(150, 150, 150)
        doc.text("www.shahwarfoods.com.pk", 105, 280, { align: "center" })

        const pdfBlob = doc.output('blob')
        const pdfUrl = URL.createObjectURL(pdfBlob)
        window.open(pdfUrl, '_blank')
    }


    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/40 p-4 md:p-6">

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 shadow-lg shadow-emerald-300/40 ring-4 ring-white">
                        <ClipboardList className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold leading-tight text-slate-800">Sales Report</h1>
                        <p className="text-[11px] font-medium tracking-wide text-slate-400">Total Sales Report</p>
                    </div>
                </div>


            </div>

            <div className="mb-5 rounded-3xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/50">
                <div className="h-1 w-full bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700" />
                <div className="p-5 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-end gap-3">
                        <div className="flex-1 min-w-48">
                            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Customer</label>
                            <div className="relative">
                                <div
                                    onClick={() => setCustomerOpen((o) => !o)}
                                    className={`flex cursor-pointer items-center gap-2 rounded-xl border bg-slate-50/60 px-3 py-2 transition-all ${customerOpen ? 'border-emerald-400 bg-white ring-4 ring-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}>
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-600"><User className="h-3 w-3" /></span>
                                    <span className={`flex-1 truncate text-xs font-medium ${selectedCustomer ? 'text-slate-700' : 'text-slate-400'}`}>{selectedCustomer || 'Select customer'}</span>
                                    {selectedCustomer && (
                                        <span role="button" onClick={(e) => { e.stopPropagation(); setSelectedCustomer('') }} className="flex h-4 w-4 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500 cursor-pointer">
                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </span>
                                    )}
                                    <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-emerald-400 transition-transform duration-200 ${customerOpen ? 'rotate-180' : ''}`} />
                                </div>

                                {customerOpen && (
                                    <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40">
                                        <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
                                            <Search className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                            <input autoFocus value={customerSearch} onChange={(e) => setCustomerSearch(e.target.value)} placeholder="Search customer..." className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-none" />                                        </div>
                                        <div className="max-h-56 overflow-y-auto py-1 custom-scroll">
                                            {customers.filter((c) => (c.customerName || '').toLowerCase().includes(customerSearch.toLowerCase())).length === 0 ? (
                                                <p className="px-4 py-6 text-center text-xs text-slate-400">No customers</p>
                                            ) : (
                                                customers
                                                    .filter((c) => (c.customerName || '').toLowerCase().includes(customerSearch.toLowerCase()))
                                                    .map((c) => (
                                                        <button key={c._id} type="button"
                                                            onClick={() => { setSelectedCustomer(c.customerName); setCustomerOpen(false); setCustomerSearch('') }}
                                                            className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors cursor-pointer ${selectedCustomer === c.customerName ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-600 hover:bg-emerald-50/60'}`}>
                                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-[10px] font-bold text-emerald-700">{(c.customerName || '?').charAt(0).toUpperCase()}</span>
                                                            <span className="flex-1 truncate">{c.customerName}</span>
                                                        </button>
                                                    ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-1 min-w-40">
                            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Start Date</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Calendar className="h-3.5 w-3.5" /></span>
                                <input value={fromDate} onChange={(e) => setFromDate(e.target.value)} type="date" className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-2 py-2.5 text-xs font-medium text-slate-700 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                            </div>
                        </div>

                        <div className="flex-1 min-w-40">
                            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">End Date</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><Calendar className="h-3.5 w-3.5" /></span>
                                <input value={toDate} onChange={(e) => setToDate(e.target.value)} type="date" className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-2 py-2.5 text-xs font-medium text-slate-700 transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:outline-none" />
                            </div>
                        </div>

                        <button onClick={handleSearch} className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 hover:from-emerald-500 hover:to-emerald-600 cursor-pointer">
                            <Search className="h-3.5 w-3.5" />
                            Search
                        </button>

                        <button className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-emerald-500 h-9 w-9 text-xs font-bold text-white shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 hover:from-emerald-500 hover:to-emerald-600 cursor-pointer">
                            <Printer className="h-4.5 w-4.5" />

                        </button>

                    </div>
                </div>
            </div>

            <div className="flex h-[80vh] flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-lg shadow-slate-200/50">



                <div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-white to-emerald-50/40 px-4 py-3 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-200 ring-2 ring-white">
                            <span className="text-lg font-black">H</span>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 leading-tight">Hafiz Foods</h3>
                            <p className="text-[10.5px] text-slate-400">Near PSO Depot, D I KHAN Road, Bannu KPK &middot; info@hafizfoods.com.pk &middot; 0334-1909797</p>
                        </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10.5px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                        {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                </div>

                <div className="flex flex-1 flex-col p-4 min-h-0">
                    <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-100 shadow-sm min-h-0">
                        <div className="overflow-auto flex-1 custom-scroll">
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 z-10">
                                    <tr className="bg-linear-to-r from-emerald-600 to-emerald-700">
                                        <th className="px-4 py-3 text-left text-[11px] font-bold  tracking-wide text-white">Sales Date</th>
                                        <th className="px-4 py-3 text-left text-[11px] font-bold  tracking-wide text-white">Invoice No</th>
                                        <th className="px-4 py-3 text-left text-[11px] font-bold  tracking-wide text-white">Customer Name</th>
                                        <th className="px-4 py-3 text-right text-[11px] font-bold  tracking-wide text-white">Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {records.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="py-20 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
                                                        <FileText className="h-5 w-5 text-emerald-300" />
                                                    </div>
                                                    <p className="text-xs font-semibold text-slate-500">Record not found</p>
                                                    <p className="text-[11px] text-slate-400">Select a date range and search</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        records.map((r, i) => (
                                            <tr key={i} className={`group transition-colors hover:bg-emerald-50/50 ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex items-center gap-2 text-xs text-slate-600">
                                                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-500 transition-colors">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                        </span>
                                                        <span className="font-medium tabular-nums">{r.salesDate ? new Date(r.salesDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</span>
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <button onClick={() => { console.log(">>> INVOICE DATA:", r); handleDownloadInvoice(r) }} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100 transition-all hover:bg-emerald-100 hover:ring-emerald-300 cursor-pointer">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                        {r.invoiceNo}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-[10px] font-bold text-emerald-700">{(r.customerName || '?').charAt(0).toUpperCase()}</span>
                                                        <span className="text-xs font-semibold text-slate-800 truncate">{r.customerName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <span className="text-sm font-bold text-slate-800 tabular-nums">
                                                        <span className="text-[10px] font-normal text-slate-400 mr-0.5">Rs</span>
                                                        {Number(r.totalAmount || 0).toLocaleString()}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 shrink-0">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Total Amount</span>
                        <span className="text-base font-black text-emerald-700 tabular-nums">Rs {Number(total || 0).toLocaleString()}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SaleReport
