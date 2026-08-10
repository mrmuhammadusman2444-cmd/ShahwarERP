import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import SelectSupplier from '../Purchase/SelectSupplier.jsx'
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const SupplierLedger = () => {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [entries, setEntries] = useState([])
  const [filteredEntries, setFilteredEntries] = useState([])
  const [selectedSupplier, setSelectedSupplier] = useState("")
  const [closingBalance, setClosingBalance] = useState(0)
  const [openingBalance, setOpeningBalance] = useState(0)

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

  async function loadLedger(supplierName) {
    if (!supplierName) return
    try {
      let res = await axios.get(`http://localhost:3000/supplier/ledger/${supplierName}`)
      setEntries(res.data.entries)
      setFilteredEntries(res.data.entries)
      setClosingBalance(res.data.closingBalance)
      setOpeningBalance(res.data.openingBalance)
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

    let printHTML = `
        <html>
        <head>
            <title>Supplier Ledger</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 24px; color: #1e293b; }
                h1 { font-size: 18px; margin: 0 0 4px; }
                .sub { color: #64748b; font-size: 12px; margin-bottom: 16px; }
                table { width: 100%; border-collapse: collapse; font-size: 12px; }
                th { background: #059669; color: white; padding: 8px; text-align: left; }
                td { padding: 7px 8px; border-bottom: 1px solid #e2e8f0; }
                .bal { text-align: right; font-weight: bold; margin-top: 12px; font-size: 13px; }
            </style>
        </head>
        <body>
            <h1>Supplier Ledger</h1>
            <p class="sub">${selectedSupplier} &bull; ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
            <table>
                <thead>
                    <tr><th>Date</th><th>Description</th><th style="text-align:right">Debit</th><th style="text-align:right">Credit</th><th style="text-align:right">Balance</th></tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            <p class="bal">Closing Balance: Rs. ${Number(closingBalance || 0).toLocaleString()}</p>
        </body>
        </html>
    `

    if (window.electronAPI && window.electronAPI.printHTML) {
        window.electronAPI.printHTML(printHTML)
    } else {
        let win = window.open("", "", "width=900,height=650")
        win.document.write(printHTML)
        win.document.close()
        win.print()
    }
  }

  function handlePDF() {
    let doc = new jsPDF()
    doc.setFontSize(16)
    doc.text("Supplier Ledger", 14, 18)
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`${selectedSupplier}  -  ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`, 14, 25)

    autoTable(doc, {
      startY: 32,
      head: [["Date", "Description", "Debit", "Credit", "Balance"]],
      body: filteredEntries.map((e) => [
        e.date ? new Date(e.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-",
        e.description || "-",
        e.debit ? Number(e.debit).toLocaleString() : "-",
        e.credit ? Number(e.credit).toLocaleString() : "-",
        Number(e.balance || 0).toLocaleString(),
      ]),
      headStyles: { fillColor: [5, 150, 105] },
      styles: { fontSize: 9 },
    })

    doc.setFontSize(11)
    doc.setTextColor(30)
    doc.text(`Closing Balance: Rs. ${Number(closingBalance || 0).toLocaleString()}`, 14, doc.lastAutoTable.finalY + 10)
    doc.save(`SupplierLedger-${selectedSupplier}.pdf`)
  }

  return (
    <div className="p-4 md:p-5">

      <div className="flex items-center justify-between mb-4 pl-12 md:pl-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Supplier Ledger</h1>
            <p className="text-gray-400 text-xs">View supplier transaction history</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/70 rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 flex-wrap">

          <div className="flex-1 min-w-50">
            <label className="text-gray-500 text-[10.5px] font-bold uppercase tracking-wide block mb-1.5">
              Supplier Name <span className="text-red-400">*</span>
            </label>
            <SelectSupplier value={selectedSupplier} onChange={(name) => { setSelectedSupplier(name); loadLedger(name) }} />
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

        <div className="px-5 py-3 border-b border-slate-100 bg-linear-to-r from-emerald-50/50 to-white flex flex-wrap items-center justify-between gap-3">

          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
              {(selectedSupplier || "?").charAt(0).toUpperCase()}
            </span>
            <h2 className="text-gray-800 text-sm font-bold">{selectedSupplier || "No supplier"}</h2>
            <span className="text-gray-500 text-[11px] flex items-center gap-1 bg-white border border-slate-100 rounded-full px-2.5 py-0.5">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white border border-emerald-100 rounded-full pl-3 pr-1.5 py-1 shadow-sm">
            <span className="text-gray-700 text-[10px] font-bold  tracking-wide">Balance</span>
            <span className={`text-white text-xs font-bold tabular-nums rounded-full px-3 py-1 ${closingBalance > 0 ? 'bg-red-600' : 'bg-emerald-600'}`}>
              <span className="text-white/70 text-[9px] font-normal mr-0.5">Rs.</span>
              {closingBalance > 0 ? '-' : ''}{Number(Math.abs(closingBalance) || 0).toLocaleString()}
            </span>
          </div>

        </div>

        <div className="overflow-auto max-h-[60vh]">
          <table className="w-full min-w-[720px] text-sm border-collapse">
            <thead>
              <tr className="bg-linear-to-b from-emerald-500 to-emerald-700 text-white sticky top-0 z-10">
                <th className="text-left text-[12px] font-semibold  tracking-wider px-4 py-3 whitespace-nowrap">Date</th>
                <th className="text-left text-[12px] font-semibold  tracking-wider px-4 py-3">Description</th>
                <th className="text-left text-[12px] font-semibold  tracking-wider px-4 py-3 whitespace-nowrap">Purchase ID</th>
                <th className="text-left text-[12px] font-semibold  tracking-wider px-4 py-3 whitespace-nowrap">Voucher ID</th>
                <th className="text-right text-[12px] font-semibold  tracking-wider px-4 py-3 whitespace-nowrap">Debit</th>
                <th className="text-right text-[12px] font-semibold  tracking-wider px-4 py-3 whitespace-nowrap">Credit</th>
                <th className="text-right text-[12px] font-semibold  tracking-wider px-4 py-3 whitespace-nowrap">Balance</th>
              </tr>
            </thead>

            <tbody>

              <tr className="bg-emerald-50 border-b border-emerald-100">
                <td className="px-4 py-3 text-left" colSpan={6}>
                  <span className="inline-flex items-center gap-2 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 animate-ping rounded-full bg-emerald-500" />
                    Opening Balance
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-emerald-900 text-xs font-bold tabular-nums">
                    <span className="text-emerald-500 text-[10px] font-normal mr-0.5">Rs.</span>
                    {Number(openingBalance || 0).toLocaleString()}
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
                      <p className="text-gray-400 text-xs">Select supplier from the above</p>
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
                        <span className="text-gray-700 text-xs font-medium">
                          {Array.isArray(entry.description)
                            ? entry.description.map((line, i) => <p key={i}>{line}</p>)
                            : entry.description}
                        </span>
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
                            {entry.balance > 0 ? '-' : ''}{Number(entry.balance || 0).toLocaleString()}
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
            Final Balance: <span className="text-red-600">Rs. {closingBalance > 0 ? '-' : ''}{closingBalance.toLocaleString()}</span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default SupplierLedger