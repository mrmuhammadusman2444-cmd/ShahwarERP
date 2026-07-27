import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import SelectCustomer from '../Sales/SelectCustomers.jsx'
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const CustomerLedger = () => {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [entries, setEntries] = useState([])
  const [filteredEntries, setFilteredEntries] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [closingBalance, setClosingBalance] = useState(0)

  function handleSearch() {
    if (!fromDate && !toDate) {
      setFilteredEntries(entries)
      return
    }
    let filtered = entries.filter((entry) => {
      if (!entry.date) return false

      let eDate = new Date(entry.date)
      let from = fromDate ? new Date(fromDate) : null
      let to = toDate ? new Date(toDate) : null

      if (to) to.setHours(23, 59, 59, 999)

      if (from && eDate < from) return false
      if (to && eDate > to) return false
      return true
    })

    setFilteredEntries(filtered)
  }
  async function loadLedger(customerName) {
    if (!customerName) return
    try {
      let res = await axios.get(`http://localhost:3000/customer/ledger/${customerName}`)
      setEntries(res.data.entries)
      setFilteredEntries(res.data.entries)
      setClosingBalance(res.data.closingBalance)
    } catch (err) {
      console.log("LEDGER LOAD FAILED:", err.response?.data || err.message)
    }
  }
  function handlePrint() {
    let rows = filteredEntries.map((e, i) => `
        <tr>
            <td>${e.date ? new Date(e.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-"}</td>
            <td>${e.description || "-"}</td>
            <td style="text-align:right">${e.debit ? Number(e.debit).toLocaleString() : "-"}</td>
            <td style="text-align:right">${e.credit ? Number(e.credit).toLocaleString() : "-"}</td>
            <td style="text-align:right">${Number(e.balance || 0).toLocaleString()}</td>
        </tr>
    `).join("")

    let win = window.open("", "", "width=900,height=650")
    win.document.write(`
        <html>
        <head>
            <title>Customer Ledger</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 24px; color: #333; }
                h2 { margin: 0 0 4px; }
                .meta { font-size: 12px; color: #666; margin-bottom: 16px; }
                table { width: 100%; border-collapse: collapse; font-size: 13px; }
                th { background: #059669; color: #fff; padding: 8px; text-align: left; }
                td { padding: 8px; border-bottom: 1px solid #eee; }
                .bal { text-align: right; font-weight: bold; margin-top: 16px; color: #059669; }
            </style>
        </head>
        <body>
            <h2>Shahwar Foods — Customer Ledger</h2>
            <div class="meta">
                Customer: <b>${selectedCustomer || "-"}</b> &nbsp; | &nbsp;
                Print Date: ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </div>
            <table>
                <thead>
                    <tr><th>Date</th><th>Description</th><th style="text-align:right">Debit</th><th style="text-align:right">Credit</th><th style="text-align:right">Balance</th></tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            <p class="bal">Closing Balance: Rs. ${Number(closingBalance || 0).toLocaleString()}</p>
        </body>
        </html>
    `)
    win.document.close()
    win.print()
  }
  const customer = {};
  async function handleDownloadInvoice(invoiceNo) {
    if (!invoiceNo) return
    try {
      let res = await axios.get(`http://localhost:3000/find/sale/invoice/${invoiceNo}`)
      let sale = res.data

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
      doc.text("SALE INVOICE", 196, 15, { align: "right" })
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text(sale.invoiceNo || "-", 196, 22, { align: "right" })

      doc.setTextColor(60, 60, 60)
      doc.setFontSize(9)
      doc.setFont("helvetica", "bold")
      doc.text("CUSTOMER", 14, 45)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(11)
      doc.text(sale.customerName || "-", 14, 52)
      doc.setFontSize(9)
      doc.setFont("helvetica", "bold")
      doc.text("DATE", 196, 45, { align: "right" })
      doc.setFont("helvetica", "normal")
      doc.text(sale.Date ? new Date(sale.Date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-", 196, 52, { align: "right" })

      let y = 62
      doc.setFontSize(8.5)
      doc.setTextColor(100, 100, 100)
      doc.text(`Gate Pass: ${sale.gatePass || "-"}`, 14, y)
      doc.text(`Sale By: ${sale.saleBy || "-"}`, 80, y)
      doc.text(`Rate: ${sale.showRate || "-"}`, 146, y)

      const rows = (sale.items || []).map((item, i) => [
        i + 1,
        item.product,
        item.invQty || item.qty || 0,
        `Rs. ${Number(item.rate || 0).toLocaleString()}`,
        `${item.dis || 0}%`,
        `Rs. ${Number(item.total || 0).toLocaleString()}`,
      ])

      autoTable(doc, {
        startY: y + 8,
        head: [["S.No", "Product", "Qty", "Rate", "Dis", "Total"]],
        body: rows,
        theme: "grid",
        headStyles: { fillColor: [5, 150, 105], textColor: 255, fontSize: 9, fontStyle: "bold" },
        bodyStyles: { fontSize: 9, textColor: [60, 60, 60] },
        alternateRowStyles: { fillColor: [240, 253, 244] },
        columnStyles: {
          0: { cellWidth: 12, halign: "center" },
          2: { halign: "center" }, 3: { halign: "center" }, 4: { halign: "center" }, 5: { halign: "center" },
        },
      })

      let ty = doc.lastAutoTable.finalY + 10
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.text("Freight Charges:", 130, ty)
      doc.text(`Rs. ${Number(sale.freightCharges || 0).toLocaleString()}`, 196, ty, { align: "right" })
      ty += 4
      doc.setDrawColor(200, 200, 200)
      doc.line(130, ty, 196, ty)
      ty += 8
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(5, 150, 105)
      doc.text("GRAND TOTAL", 110, ty)
      doc.text(`Rs. ${Number(sale.grandTotal || 0).toLocaleString()}`, 196, ty, { align: "right" })

      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(150, 150, 150)
      doc.text("www.shahwarfoods.com.pk", 105, 280, { align: "center" })

      const pdfBlob = doc.output("blob")
      const pdfUrl = URL.createObjectURL(pdfBlob)
      window.open(pdfUrl, "_blank")
    } catch (err) {
      console.log("INVOICE DOWNLOAD FAILED:", err.response?.data || err.message)
    }
  }

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

      <div className="bg-white border border-slate-200/70 rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 flex-wrap">

          <div className="flex-1 min-w-50">
            <label className="text-gray-500 text-[10.5px] font-bold uppercase tracking-wide block mb-1.5">
              Customer Name <span className="text-red-400">*</span>
            </label>
            <SelectCustomer value={selectedCustomer} onChange={(name) => { setSelectedCustomer(name); loadLedger(name) }} />
          </div>

          <div>
            <label className="text-gray-500 text-[10.5px] font-bold uppercase tracking-wide block mb-1.5">From</label>
            <input value={fromDate}
              onChange={(e) => setFromDate(e.target.value)} type="date"
              className="bg-emerald-50/50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all" />
          </div>

          <div>
            <label className="text-gray-500 text-[10.5px] font-bold uppercase tracking-wide block mb-1.5">To</label>
            <input value={toDate}
              onChange={(e) => setToDate(e.target.value)} type="date"
              className="bg-emerald-50/50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-xl px-3 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all" />
          </div>

          <div className="flex gap-2 pb-0.5">
            <button onClick={handleSearch} className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
            <button onClick={handlePrint} className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-600 text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
          </div>

        </div>
      </div>

      <div className="bg-white border border-slate-200/70 rounded-2xl shadow-sm overflow-hidden">

        <div className="py-3 px-5 border-b border-slate-100 bg-slate-50/40 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          <h2 className="text-gray-800 text-sm font-bold">
            {selectedCustomer || "—"}
          </h2>
          <span className="text-gray-300 text-xs hidden sm:block">|</span>
          <p className="text-gray-500 text-xs">Print Date: {new Date().toLocaleDateString()}</p>
          <span className="text-gray-300 text-xs hidden sm:block">|</span>
          <p className="text-emerald-700 text-xs font-bold">
            Balance : Rs. {closingBalance.toLocaleString()}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-linear-to-b from-emerald-500 to-emerald-700 text-white">
                <th className="text-left text-[12px] font-semibold  tracking-wider px-4 py-3 whitespace-nowrap">Date</th>
                <th className="text-left text-[12px] font-semibold  tracking-wider px-4 py-3">Description</th>
                <th className="text-left text-[12px] font-semibold  tracking-wider px-4 py-3 whitespace-nowrap">Invoice ID</th>
                <th className="text-left text-[12px] font-semibold  tracking-wider px-4 py-3 whitespace-nowrap">Deposit ID</th>
                <th className="text-right text-[12px] font-semibold  tracking-wider px-4 py-3 whitespace-nowrap">Debit</th>
                <th className="text-right text-[12px] font-semibold  tracking-wider px-4 py-3 whitespace-nowrap">Credit</th>
                <th className="text-right text-[12px] font-semibold  tracking-wider px-4 py-3 whitespace-nowrap">Balance</th>
              </tr>
            </thead>

            <tbody>

              <tr className="bg-linear-to-r from-emerald-50 to-transparent border-b border-emerald-100">
                <td className="px-4 py-3 text-left" colSpan={4}>
                  <span className="inline-flex items-center gap-2 text-gray-600 text-[11px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Opening Balance
                  </span>
                </td>
                <td className="px-4 py-3" />
                <td className="px-4 py-3" />
                <td className="px-4 py-3 text-right">
                  <span className="text-gray-800 text-xs font-bold tabular-nums">
                    {customer?.openingBalance || "—"}
                  </span>
                </td>
              </tr>

              {filteredEntries.length === 0 ? (
                <tr className="h-84">
                  <td colSpan={7} className="text-center py-14">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 ring-1 ring-emerald-100 flex items-center justify-center mb-1">
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-gray-600 text-sm font-medium">No records found</p>
                      <p className="text-gray-400 text-xs">Select customer from the above</p>
                    </div>
                  </td>
                </tr>
              ) : (
                (() => {
                  const maxAmount = Math.max(
                    ...filteredEntries.map(e => Math.max(Number(e.debit) || 0, Number(e.credit) || 0)),
                    1
                  )
                  return filteredEntries.map((entry, idx) => (
                    <tr key={idx}
                      className="group relative border-b border-gray-50 hover:bg-emerald-50/50 transition-colors">

                      <td className="px-4 py-3.5 text-left whitespace-nowrap relative">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-r bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="inline-flex items-center gap-2">
                          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </span>
                          <span className="text-gray-700 text-xs font-medium tabular-nums">
                            {entry.date ? new Date(entry.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                          </span>
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-left">
                        <button
                          onClick={() => handleDownloadInvoice(entry.invoiceId)}
                          className="inline-flex items-center gap-1.5 text-gray-700 hover:text-emerald-600 text-xs font-medium cursor-pointer group/desc transition-colors"
                          title="Download invoice">
                          <svg className="w-3.5 h-3.5 text-gray-300 group-hover/desc:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span className="group-hover/desc:underline">
                            {Array.isArray(entry.description)
                              ? entry.description.map((line, i) => <p key={i}>{line}</p>)
                              : entry.description}
                          </span>
                        </button>
                      </td>

                      <td className="px-4 py-3.5 text-left whitespace-nowrap">
                        {entry.invoiceId ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold ring-1 ring-emerald-100 font-mono">
                            {entry.invoiceId}
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-left text-gray-400 text-[11px] font-mono whitespace-nowrap">
                        {entry.depositId || "—"}
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        {entry.debit ? (
                          <div className="inline-flex flex-col items-end gap-1">
                            <span className="inline-flex items-center gap-1 text-rose-600 text-xs font-semibold tabular-nums">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 11l5 5 5-5" /></svg>
                              {Number(entry.debit).toLocaleString()}
                            </span>
                            <span className="block h-1 rounded-full bg-linear-to-r from-rose-200 to-rose-400" style={{ width: `${Math.max((Number(entry.debit) / maxAmount) * 48, 4)}px` }} />
                          </div>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        {entry.credit ? (
                          <div className="inline-flex flex-col items-end gap-1">
                            <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold tabular-nums">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 13l-5-5-5 5" /></svg>
                              {Number(entry.credit).toLocaleString()}
                            </span>
                            <span className="block h-1 rounded-full bg-linear-to-r from-emerald-200 to-emerald-400" style={{ width: `${Math.max((Number(entry.credit) / maxAmount) * 48, 4)}px` }} />
                          </div>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <span className="inline-flex items-center justify-end gap-1.5">
                          <span className="text-gray-900 text-xs font-bold tabular-nums">
                            <span className="text-gray-400 text-[10px] font-normal mr-0.5">Rs.</span>
                            {Number(entry.balance || 0).toLocaleString()}
                          </span>
                        </span>
                      </td>

                    </tr>
                  ))
                })()
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Total Entries: <span className="font-semibold text-gray-600">{filteredEntries.length}</span>
          </p>
          <p className="text-xs text-gray-500 font-semibold">
            Final Balance: <span className="text-emerald-700">Rs. {closingBalance.toLocaleString()}</span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default CustomerLedger