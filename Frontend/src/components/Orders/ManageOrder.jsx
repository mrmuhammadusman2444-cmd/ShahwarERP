import React from 'react'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { Eye, Pencil, FileText, Download } from 'lucide-react'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'

const ManageOrder = () => {
  const navigate = useNavigate()
  const [entries, setEntries] = useState(10)
  const [Orders, setOrders] = useState([])
  const [detailOrder, setDetailOrder] = useState(null)
  const [categoryOrder, setCategoryOrder] = useState([])


  useEffect(() => {
    async function fetchCatOrder() {
      try {
        let res = await axios.get('http://localhost:3000/find/category')
        setCategoryOrder(res.data.map((c) => c.CategoryName))
      } catch (err) {
        console.log("CAT ORDER FAILED:", err.response?.data || err.message)
      }
    }
    fetchCatOrder()
  }, [])

  useEffect(() => {
    async function fetchOrders() {
      try {
        let res = await axios.get('http://localhost:3000/find/orders')

        setOrders(res.data)
      } catch (err) {
        console.log("ORDERS FETCH FAILED:", err.response?.data || err.message)
      }
    }
    fetchOrders()
  }, [])

  const [sorting, setSorting] = useState([])
  const [search, setSearch] = useState("")

  const columns = React.useMemo(() => [
    { id: 'sl', header: 'SL.', enableSorting: false, cell: ({ row, table }) => table.getState().pagination.pageIndex * table.getState().pagination.pageSize + row.index + 1 },
    { accessorKey: 'orderNo', header: 'Order No' },
    { accessorKey: 'saleBy', header: 'Sale By', cell: (info) => info.getValue() || "—" },
    { accessorKey: 'customerName', header: 'Customer Name', cell: (info) => info.getValue() || "—" },
    { id: 'orderDate', accessorFn: (r) => r.orderDate ? new Date(r.orderDate).getTime() : 0, header: 'Date', cell: ({ row }) => row.original.orderDate ? new Date(row.original.orderDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
    { id: 'deliveryDate', accessorFn: (r) => r.deliveryDate ? new Date(r.deliveryDate).getTime() : 0, header: 'Delivery Date', cell: ({ row }) => row.original.deliveryDate ? new Date(row.original.deliveryDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
    { id: 'action', header: 'Action', enableSorting: false },
  ], [])

  const table = useReactTable({
    data: Orders,
    columns,
    state: { sorting, globalFilter: search },
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: entries } },
  })

  useEffect(() => {
    table.setPageSize(entries)
  }, [entries])

  function handleDownload(order) {
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
    doc.text("ORDER", 196, 15, { align: "right" })
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(order.orderNo || "-", 196, 22, { align: "right" })

    doc.setTextColor(60, 60, 60)
    doc.setFontSize(9)
    doc.setFont("helvetica", "bold")
    doc.text("CUSTOMER", 14, 45)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.text(order.customerName || "-", 14, 52)

    doc.setFontSize(9)
    doc.setFont("helvetica", "bold")
    doc.text("ORDER DATE", 196, 42, { align: "right" })
    doc.setFont("helvetica", "normal")
    doc.text(order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "-", 196, 48, { align: "right" })
    doc.setFont("helvetica", "bold")
    doc.text("DELIVERY DATE", 196, 55, { align: "right" })
    doc.setFont("helvetica", "normal")
    doc.text(order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : "-", 196, 61, { align: "right" })

    const grouped = {}
      ; (order.items || []).forEach((item) => {
        const cat = item.mainCategory || "Uncategorized"
        if (!grouped[cat]) grouped[cat] = []
        grouped[cat].push(item)
      })

    const rows = []
    let counter = 1
    const sortedKeys = [
      ...categoryOrder.filter((c) => grouped[c]),
      ...Object.keys(grouped).filter((c) => !categoryOrder.includes(c)),
    ]
    sortedKeys.forEach((category) => {
      rows.push([{ content: category, colSpan: 6, styles: { fontStyle: "bold", fillColor: [255, 255, 255], textColor: [0, 0, 0] } }])
      grouped[category].forEach((item) => {
        const cartonRate = (Number(item.rate) || 0) * (Number(item.cartonSize) || 0)
        rows.push([
          counter++,
          item.name,
          item.carton || 0,
          item.cartonSize || "-",
          `Rs. ${cartonRate.toLocaleString()}`,
          `Rs. ${Number(item.total || 0).toLocaleString()}`,
        ])
      })
    })

    autoTable(doc, {
      startY: 68,
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
    doc.text("Total Weight:", 140, y)
    doc.text(`${Number(order.totalWeight || 0).toLocaleString()} kg`, 196, y, { align: "right" })

    y += 4
    doc.setDrawColor(200, 200, 200)
    doc.line(140, y, 196, y)

    y += 8
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(5, 150, 105)
    doc.text("GRAND TOTAL", 135, y)
    doc.text(`Rs. ${Number(order.grandTotal || 0).toLocaleString()}`, 196, y, { align: "right" })

    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(150, 150, 150)
    doc.text("www.shahwarfoods.com.pk", 105, 280, { align: "center" })

    const pdfBlob = doc.output('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, '_blank')
  }

  function handleDetailPrint(order) {
    const doc = new jsPDF({ orientation: "portrait", format: "a4" })

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
    doc.text("ORDER", 196, 15, { align: "right" })
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(order.orderNo || "-", 196, 22, { align: "right" })

    let fmt = (d) => d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-"

    doc.setTextColor(60, 60, 60)
    doc.setFontSize(8)
    doc.setFont("helvetica", "bold")
    doc.text("CUSTOMER", 14, 42)
    doc.text("SALE BY", 14, 54)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.text(order.customerName || "-", 14, 48)
    doc.text(order.saleBy || "-", 14, 60)

    doc.setFontSize(8)
    doc.setFont("helvetica", "bold")
    doc.text("ORDER DATE", 196, 42, { align: "right" })
    doc.text("DELIVERY DATE", 196, 54, { align: "right" })
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.text(fmt(order.orderDate), 196, 48, { align: "right" })
    doc.text(fmt(order.deliveryDate), 196, 60, { align: "right" })

    const grouped = {}
      ; (order.items || []).forEach((it) => {
        const cat = it.mainCategory || "Uncategorized"
        if (!grouped[cat]) grouped[cat] = []
        grouped[cat].push(it)
      })

    const rows = []
    let counter = 1
    const sortedKeys = [
      ...categoryOrder.filter((c) => grouped[c]),
      ...Object.keys(grouped).filter((c) => !categoryOrder.includes(c)),
    ]
    sortedKeys.forEach((category) => {
      rows.push([{ content: category, colSpan: 8, styles: { fontStyle: "bold", fillColor: [255, 255, 255], textColor: [6, 95, 70] } }])
      grouped[category].forEach((it) => {
        rows.push([
          counter++,
          it.cartonSize || "-",
          it.name || "-",
          it.desc || "-",
          Number(it.carton || 0).toLocaleString(),
          `${Number(it.weight || 0).toLocaleString()} ${it.weightUnit || "kg"}`,
          "-",
          it.status === "complete" ? "\u2713" : "\u2717",
        ])
      })
    })

    autoTable(doc, {
      startY: 68,
      head: [["SL", "Pack", "Item Name", "Description", "Carton", "Weight", "Remaining", "Status"]],
      body: rows,
      theme: "grid",
      headStyles: { fillColor: [5, 150, 105], textColor: 255, fontSize: 9, fontStyle: "bold" },
      bodyStyles: { fontSize: 9, textColor: [60, 60, 60] },
      alternateRowStyles: { fillColor: [240, 253, 244] },
      columnStyles: {
        0: { cellWidth: 14, halign: "left" },
        1: { halign: "center" },
        4: { halign: "center" },
        5: { halign: "center" },
        6: { halign: "center" },
        7: { halign: "center" },
      },
    })

    let y = doc.lastAutoTable.finalY + 10
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(5, 150, 105)
    let tw = Number(order.totalWeight || 0)
    let weightText = tw >= 1000
      ? `${Math.floor(tw / 1000)} ton${tw % 1000 > 0 ? ` ${(tw % 1000).toLocaleString()} kg` : ""}`
      : `${tw.toLocaleString()} kg`
    doc.text(`Total Weight: ${weightText}`, 14, y)
    doc.text(`Grand Total: Rs. ${Number(order.grandTotal || 0).toLocaleString()}`, 283, y, { align: "right" })

    const pdfBlob = doc.output('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 md:p-6">
      <style>{`
        .order-scroll::-webkit-scrollbar { width: 7px; height: 7px; }
        .order-scroll::-webkit-scrollbar-track { background: transparent; }
        .order-scroll::-webkit-scrollbar-thumb { background: #a7f3d0; border-radius: 99px; }
        .order-scroll::-webkit-scrollbar-thumb:hover { background: #6ee7b7; }
      `}</style>

      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/40 backdrop-blur-sm p-4" onClick={() => setDetailOrder(null)}>
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-emerald-100 flex flex-col" onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-between gap-4 border-b border-emerald-100 bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </div>
                <div>
                  <h2 className="text-white text-base font-bold">Order Details</h2>
                  <p className="text-emerald-100 text-xs font-mono">{detailOrder.orderNo}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDetailPrint(detailOrder)}
                  title="Print"
                  className="cursor-pointer rounded-xl p-2 text-white/80 transition-all hover:bg-white/15 hover:text-white hover:scale-110 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </button>
                <button
                  onClick={() => setDetailOrder(null)}
                  title="Close"
                  className="cursor-pointer rounded-xl p-2 text-white/80 transition-all hover:rotate-90 hover:bg-white/15 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-6 py-4 border-b border-emerald-50 shrink-0">
              {[
                { label: "Customer", value: detailOrder.customerName || "—" },
                { label: "Sale By", value: detailOrder.saleBy || "—" },
                { label: "Order Date", value: detailOrder.orderDate ? new Date(detailOrder.orderDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
                { label: "Delivery Date", value: detailOrder.deliveryDate ? new Date(detailOrder.deliveryDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
              ].map((f) => (
                <div key={f.label} className="rounded-xl border border-emerald-100 bg-emerald-50/40 px-3 py-2.5">
                  <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">{f.label}</p>
                  <p className="text-gray-800 text-sm font-semibold mt-0.5 truncate">{f.value}</p>
                </div>
              ))}
            </div>

            <div className="overflow-auto px-6 order-scroll" style={{ maxHeight: "400px" }}>
              <div className="border border-emerald-100 rounded-t-2xl my-4">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 z-20">
                    <tr>
                      <th className="bg-emerald-600 text-white text-left text-[11px] font-bold uppercase px-4 py-3">SL</th>
                      <th className="bg-emerald-600 text-white text-center text-[11px] font-bold uppercase px-4 py-3">Pack</th>
                      <th className="bg-emerald-600 text-white text-left text-[11px] font-bold uppercase px-4 py-3">Item Name</th>
                      <th className="bg-emerald-600 text-white text-left text-[11px] font-bold uppercase px-4 py-3">Description</th>
                      <th className="bg-emerald-600 text-white text-center text-[11px] font-bold uppercase px-4 py-3">Carton</th>
                      <th className="bg-emerald-600 text-white text-center text-[11px] font-bold uppercase px-4 py-3">Weight</th>
                      <th className="bg-emerald-600 text-white text-center text-[11px] font-bold uppercase px-4 py-3">Remaining</th>
                      <th className="bg-emerald-600 text-white text-center text-[11px] font-bold uppercase px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(detailOrder.items || []).map((it, i) => (
                      <tr key={i} className={`hover:bg-emerald-50/40 ${i % 2 === 1 ? "bg-gray-50/40" : ""}`}>
                        <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-block rounded-md bg-gray-100 px-2 py-0.5 text-gray-600 text-[11px] font-semibold">{it.cartonSize || "—"}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-800 text-xs font-semibold">{it.name}</td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{it.desc || "—"}</td>
                        <td className="px-4 py-3 text-center text-gray-700 text-xs font-bold">{Number(it.carton || 0).toLocaleString()}</td>
                        <td className="px-4 py-3 text-center text-gray-600 text-xs">{Number(it.weight || 0).toLocaleString()} {it.weightUnit || "kg"}</td>
                        <td className="px-4 py-3 text-center text-gray-400 text-xs">—</td>
                        <td className="px-4 py-3 text-center">
                          {it.status === "complete" ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            </span>
                          ) : (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-500 ring-1 ring-rose-200">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-emerald-100 bg-emerald-50/40 px-6 py-4 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">Total Weight</span>
                <span className="text-gray-700 text-sm font-bold">
                  {(() => {
                    let w = Number(detailOrder.totalWeight || 0)
                    if (w >= 1000) {
                      let ton = Math.floor(w / 1000)
                      let kg = w % 1000
                      return `${ton} ton${kg > 0 ? ` ${kg.toLocaleString()} kg` : ""}`
                    }
                    return `${w.toLocaleString()} kg`
                  })()}
                </span>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">Grand Total</p>
                <p className="text-emerald-700 text-lg font-bold">Rs. {Number(detailOrder.grandTotal || 0).toLocaleString()}</p>
              </div>
            </div>

          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6 pl-12 md:pl-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-b from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-blue-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-base md:text-xl font-bold">Manage Orders</h1>
            <p className="text-gray-400 text-xs">Manage your Orders</p>
          </div>
        </div>

      </div>


      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 flex-wrap">
          <div>
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">Start Date</label>
            <input type="date"
              className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>
          <div>
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1.5">End Date</label>
            <input type="date"
              className="bg-blue-50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none transition-all" />
          </div>
          <button className="px-6 py-2.5 cursor-pointer bg-linear-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5">
            Find
          </button>
          <button onClick={() => { navigate('/neworderspage') }} className="flex items-center cursor-pointer gap-2 px-4 py-2.5 bg-linear-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Order
          </button>
        </div>
      </div>

      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-5 py-3 border-b border-blue-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-xl p-1">
              {[10, 25, 50, 100].map((num) => {
                const active = entries === num
                return (
                  <button
                    key={num}
                    onClick={() => setEntries(num)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${active ? "text-white" : "text-gray-500 hover:text-emerald-700"}`}>
                    {active && (
                      <motion.span
                        layoutId="entriesPillOrders"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute inset-0 rounded-lg bg-linear-to-b from-emerald-500 to-emerald-600 shadow-sm shadow-emerald-200"
                      />
                    )}
                    <span className="relative">{num}</span>
                  </button>
                )
              })}
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

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 focus-within:border-emerald-400 focus-within:bg-white transition-all">
            <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={search}
              onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search orders..."
              className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:outline-none w-40" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-205 text-sm border-collapse">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="bg-linear-to-b from-emerald-500 to-emerald-700 text-white">
                  {hg.headers.map((header) => {
                    const align = header.column.id === 'action' ? 'text-center' : 'text-left'
                    const sorted = header.column.getIsSorted()
                    const canSort = header.column.getCanSort()
                    return (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`${align} text-xs font-semibold px-4 py-3 whitespace-nowrap ${canSort ? 'cursor-pointer select-none' : ''}`}
                      >
                        <span className="inline-flex items-center gap-1">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && (
                            sorted === 'asc' ? (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                            ) : sorted === 'desc' ? (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                            ) : (
                              <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                            )
                          )}
                        </span>
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-10 h-10 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-gray-400 text-sm">No Records Found</p>
                      <p className="text-gray-300 text-xs">Add a new order to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, idx) => {
                  const order = row.original
                  return (
                    <tr key={row.id} className={`hover:bg-emerald-50/40 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                      {row.getVisibleCells().map((cell) => {
                        if (cell.column.id === 'action') {
                          return (
                            <td key={cell.id} className="px-4 py-3">
                              <div className="flex items-center justify-center gap-1.5">
                                {[
                                  { icon: Eye, label: "Order Details", cls: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200", onClick: () => setDetailOrder(order) },
                                  { icon: Pencil, label: "Update", cls: "bg-sky-500 hover:bg-sky-600 shadow-sky-200", onClick: () => navigate('/neworderspage', { state: { editOrder: order } }) },
                                  { icon: FileText, label: "Add to Invoice", cls: "bg-amber-500 hover:bg-amber-600 shadow-amber-200", onClick: () => navigate('/newSale', { state: { fromOrder: order } }) },
                                  { icon: Download, label: "Download", cls: "bg-slate-500 hover:bg-slate-600 shadow-slate-200", onClick: () => handleDownload(order) },
                                ].map((btn, i) => {
                                  const Icon = btn.icon
                                  return (
                                    <motion.button
                                      key={i}
                                      onClick={btn.onClick}
                                      whileHover={{ y: -3, scale: 1.12 }}
                                      whileTap={{ scale: 0.85 }}
                                      transition={{ type: "spring", stiffness: 500, damping: 18 }}
                                      className={`group/tip relative flex h-7 w-7 items-center justify-center rounded-lg text-white shadow-sm cursor-pointer ${btn.cls}`}
                                    >
                                      <Icon size={13} strokeWidth={2.4} />
                                      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 scale-90 opacity-0 group-hover/tip:opacity-100 group-hover/tip:scale-100 transition-all duration-200 whitespace-nowrap rounded-lg bg-emerald-800 px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg z-30">
                                        {btn.label}
                                        <span className="absolute left-1/2 top-full -translate-x-1/2 -mt-px border-4 border-transparent border-t-emerald-800" />
                                      </span>
                                    </motion.button>
                                  )
                                })}
                              </div>
                            </td>
                          )
                        }
                        const isOrderNo = cell.column.id === 'orderNo'
                        return (
                          <td key={cell.id} className={`px-4 py-3 text-xs ${isOrderNo ? 'text-emerald-600 font-semibold' : 'text-gray-600'} whitespace-nowrap`}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-blue-50 flex flex-col sm:flex-row items-center justify-between gap-3 bg-blue-50/30">
          <p className="text-xs text-gray-400">Showing 0 to 0 of 0 entries</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs  cursor-pointer text-gray-400 bg-white border border-blue-100 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all">Previous</button>
            <button className="px-3 py-1.5 text-xs cursor-pointer text-white bg-linear-to-b from-emerald-500 to-emerald-700 rounded-lg">1</button>
            <button className="px-3 py-1.5 text-xs cursor-pointer text-gray-400 bg-white border border-blue-100 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-all">Next</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ManageOrder
