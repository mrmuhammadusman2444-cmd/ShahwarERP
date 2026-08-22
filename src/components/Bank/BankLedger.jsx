import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import hblLogo from '../../assets/BankLogos/HBL.svg'
import ublLogo from '../../assets/BankLogos/UBL.svg'
import mcbLogo from '../../assets/BankLogos/MCB.png'
import faisalLogo from '../../assets/BankLogos/Faisal.png'
import ablLogo from '../../assets/BankLogos/ABL.png'
import npbLogo from '../../assets/BankLogos/nbp.jpg'
import alfalahLogo from '../../assets/BankLogos/alfalah.svg'
import meezanLogo from '../../assets/BankLogos/meezan.svg'
import AlhabibLogo from '../../assets/BankLogos/Al Habib.png'
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'
import { Plus, ListOrdered, Landmark, Building2, Calendar, Search, Printer, RotateCcw, ChevronDown, Check } from 'lucide-react'

const bankLogos = {
  "HBL": hblLogo,
  "UBL": ublLogo,
  "Faisal": faisalLogo,
  "ABL": ablLogo,
  "MCB": mcbLogo,
  "nbp": npbLogo,
  "alfalah": alfalahLogo,
  "meezan": meezanLogo,
  "Al Habib": AlhabibLogo,
}

const getBankLogo = (name) => {
  if (!name) return null
  const key = Object.keys(bankLogos).find(k =>
    name.toLowerCase().includes(k.toLowerCase())
  )
  return key ? bankLogos[key] : null
}

const toneFor = (name = "") => {
  const tones = [
    "from-emerald-400 to-emerald-600",
    "from-sky-400 to-sky-600",
    "from-amber-400 to-amber-600",
    "from-violet-400 to-violet-600",
    "from-rose-400 to-rose-600",
  ]
  return tones[name.length % tones.length]
}

function BankAvatar({ name, size = "w-8 h-8" }) {
  const logo = getBankLogo(name)
  const [broken, setBroken] = useState(false)
  const initial = (name || "?").trim().charAt(0).toUpperCase()

  if (logo && !broken) {
    return (
      <img
        src={logo}
        alt={name}
        className={`${size} shrink-0 rounded-lg object-contain border border-slate-100 bg-white p-0.5 shadow-sm`}
        onError={() => setBroken(true)}
      />
    )
  }
  return (
    <div className={`${size} shrink-0 rounded-lg bg-linear-to-br ${toneFor(name)} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
      {initial}
    </div>
  )
}

function BankSelect({ banks, value, onSelect }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const selected = banks.find((b) => b.bankName === value)

  return (
    <div ref={ref} className="relative min-w-56">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full cursor-pointer items-center gap-2.5 rounded-2xl border bg-emerald-50/50 px-3 py-2 text-left transition-all ${open ? 'border-emerald-400 ring-2 ring-emerald-200' : 'border-emerald-100 hover:border-emerald-300'}`}
      >
        {selected ? (
          <BankAvatar name={selected.bankName} size="w-7 h-7" />
        ) : (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
            <Building2 className="w-3.5 h-3.5" />
          </span>
        )}
        <span className={`min-w-0 flex-1 truncate text-[12px] font-semibold ${selected ? 'text-slate-800' : 'text-slate-400'}`}>
          {selected ? selected.bankName : "Select option"}
        </span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="bank-scroll absolute z-20 mt-1.5 w-full rounded-2xl border border-emerald-100 bg-white p-1.5 shadow-lg shadow-emerald-950/5 max-h-64 overflow-y-auto">          {banks.length === 0 ? (
          <p className="text-center text-slate-400 text-[11.5px] py-3">No banks found</p>
        ) : (
          banks.map((b) => {
            const isActive = b.bankName === value
            return (
              <button
                type="button"
                key={b._id}
                onClick={() => { onSelect(b.bankName); setOpen(false) }}
                className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors cursor-pointer ${isActive ? 'bg-emerald-50' : 'hover:bg-emerald-50/60'}`}
              >
                <BankAvatar name={b.bankName} size="w-7 h-7" />
                <div className="min-w-0 flex-1">
                  <p className={`text-[12px] font-semibold truncate ${isActive ? 'text-emerald-800' : 'text-slate-700'}`}>{b.bankName}</p>
                  {b.branch ? <p className="text-[10.5px] text-slate-400 truncate">{b.branch}</p> : null}
                </div>
                {isActive && <Check className="w-4 h-4 shrink-0 text-emerald-600" />}
              </button>
            )
          })
        )}
        </div>
      )}
    </div>
  )
}

const BankLedger = () => {
  const navigate = useNavigate()

  const [banks, setBanks] = useState([])
  const [selectedBank, setSelectedBank] = useState("")
  const [entries, setEntries] = useState([])            // backend se poori list
  const [filteredEntries, setFilteredEntries] = useState([])  // date filter ke baad
  const [closingBalance, setClosingBalance] = useState(0)
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")

  const columns = [
    { header: 'S No', id: 'sno', enableSorting: false },
    { header: 'Date', accessorKey: 'date' },
    { header: 'Description', accessorKey: 'description' },
    { header: 'Withdraw / Deposit ID', accessorKey: 'voucherNo' },
    { header: 'Debit (+)', accessorKey: 'debit' },
    { header: 'Credit (-)', accessorKey: 'credit' },
    { header: 'Balance', accessorKey: 'balance' },
  ]

  const table = useReactTable({
    data: filteredEntries,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  // dropdown ke liye bank list
  useEffect(() => {
    async function loadBanks() {
      try {
        let res = await axios.get('http://localhost:3000/find/bank')
        setBanks(res.data)
      } catch (err) {
        console.log("BANK LOAD FAILED:", err.response?.data || err.message)
      }
    }
    loadBanks()
  }, [])

  // bank select hone pe uski ledger entries
  async function loadBankLedger(bankName) {
    setSelectedBank(bankName)
    if (!bankName) {
      setEntries([])
      setFilteredEntries([])
      setClosingBalance(0)
      return
    }
    try {
      let res = await axios.get(`http://localhost:3000/bank/ledger/${bankName}`)
      setEntries(res.data.entries)
      setFilteredEntries(res.data.entries)
      setClosingBalance(res.data.closingBalance)
      setFromDate("")
      setToDate("")
    } catch (err) {
      console.log("BANK LEDGER FAILED:", err.response?.data || err.message)
    }
  }

  // From / To date se filter
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

  function handleReset() {
    setFromDate("")
    setToDate("")
    setFilteredEntries(entries)
  }

  // footer totals
  const totalDebit = filteredEntries.reduce((s, e) => s + (Number(e.debit) || 0), 0)
  const totalCredit = filteredEntries.reduce((s, e) => s + (Number(e.credit) || 0), 0)
  const rangeClosing = filteredEntries.length ? Number(filteredEntries[filteredEntries.length - 1].balance) || 0 : 0

  function handlePrint() {
    let rows = filteredEntries.map((e, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${e.date ? new Date(e.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-"}</td>
            <td>${e.description || "-"}</td>
            <td>${e.voucherNo || "-"}</td>
            <td style="text-align:right">${e.debit ? Number(e.debit).toLocaleString() : "-"}</td>
            <td style="text-align:right">${e.credit ? Number(e.credit).toLocaleString() : "-"}</td>
            <td style="text-align:right">${Number(e.balance || 0).toLocaleString()}</td>
        </tr>
    `).join("")

    let rangeText = ""
    if (fromDate || toDate) {
      let f = fromDate ? new Date(fromDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Start"
      let t = toDate ? new Date(toDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "End"
      rangeText = `Period: <b>${f}</b> to <b>${t}</b> &nbsp; | &nbsp; `
    }

    let printHTML = `
        <html>
        <head>
            <title>Bank Ledger</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 24px; color: #333; }
                h2 { margin: 0 0 4px; color: #059669; }
                .meta { font-size: 12px; color: #666; margin-bottom: 16px; }
                table { width: 100%; border-collapse: collapse; font-size: 13px; }
                th { background: #059669; color: #fff; padding: 8px; text-align: left; }
                th.r, td.r { text-align: right; }
                td { padding: 8px; border-bottom: 1px solid #eee; }
                tfoot td { font-weight: bold; border-top: 2px solid #059669; }
                .bal { text-align: right; font-weight: bold; margin-top: 16px; color: #059669; font-size: 14px; }
            </style>
        </head>
        <body>
            <h2>Shahwar Foods — Bank Ledger</h2>
            <div class="meta">
                Bank: <b>${selectedBank || "-"}</b> &nbsp; | &nbsp;
                ${rangeText}
                Print Date: ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>S No</th><th>Date</th><th>Description</th><th>Withdraw / Deposit ID</th>
                        <th class="r">Debit (+)</th><th class="r">Credit (-)</th><th class="r">Balance</th>
                    </tr>
                </thead>
                <tbody>${rows || `<tr><td colspan="7" style="text-align:center;color:#999">No records</td></tr>`}</tbody>
                <tfoot>
                    <tr>
                        <td colspan="4" style="text-align:right">Grand Total:</td>
                        <td class="r">${totalDebit.toLocaleString()}</td>
                        <td class="r">${totalCredit.toLocaleString()}</td>
                        <td class="r">${rangeClosing.toLocaleString()}</td>
                    </tr>
                </tfoot>
            </table>
            <p class="bal">Closing Balance: Rs. ${rangeClosing.toLocaleString()}</p>
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

  return (
    <div className="p-3.5 bg-slate-50 min-h-screen">

      {/* ── Top action buttons ── */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <button onClick={() => navigate('/new/bank')} type="button" className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-[12px] font-semibold rounded-lg px-3.5 py-2 shadow-sm shadow-sky-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          Add New Bank
        </button>
        <button onClick={() => navigate('/add/new/transaction')} type="button" className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-[12px] font-semibold rounded-lg px-3.5 py-2 shadow-sm shadow-blue-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <ListOrdered className="w-3.5 h-3.5" />
          Bank Transaction
        </button>
        <button onClick={() => navigate('/manage/bank')} type="button" className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-semibold rounded-lg px-3.5 py-2 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
          <Landmark className="w-3.5 h-3.5" />
          Manage Bank
        </button>
      </div>

      {/* ── Filter Card ── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-visible">
        <div className="px-4 py-2.5 border-b border-slate-100">
          <p className="text-[13px] font-bold text-slate-900">Bank Ledger</p>
        </div>

        <div className="px-4 py-3.5">
          <div className="flex items-end gap-3 flex-wrap">

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <BankSelect banks={banks} value={selectedBank} onSelect={loadBankLedger} />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">From</label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input value={fromDate} onChange={(e) => setFromDate(e.target.value)} type="date" className="text-[12px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all cursor-pointer" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">To</label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input value={toDate} onChange={(e) => setToDate(e.target.value)} type="date" className="text-[12px] text-slate-900 bg-emerald-50/50 border border-emerald-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all cursor-pointer" />
              </div>
            </div>

            <button onClick={handleSearch} type="button" className="flex items-center gap-1.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[12px] font-semibold rounded-lg px-4 py-2 shadow-sm shadow-emerald-200 transition-all hover:-translate-y-0.5 cursor-pointer">
              <Search className="w-3.5 h-3.5" />
              Search
            </button>

            <button onClick={handleReset} type="button" className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-[12px] font-semibold rounded-lg px-3.5 py-2 transition-all hover:-translate-y-0.5 cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>

          </div>
        </div>
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm mt-3.5 overflow-hidden">

        {/* Card sub-header */}
        <div className="flex items-center justify-between px-4 py-3 flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {selectedBank && (
              <span className="flex items-center gap-2">
                <BankAvatar name={selectedBank} size="w-6 h-6" />
                <span className="text-[12.5px] font-bold text-slate-800">{selectedBank}</span>
              </span>
            )}
            <p className="text-[11.5px] text-slate-400">
              Print Date: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
            <div className="flex items-center gap-1.5 border border-slate-200 rounded-full px-3 py-1 bg-emerald-50/60 focus-within:border-emerald-400 transition-all">
              <Search className="w-3 h-3 text-slate-500" />
              <input value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search table..." className="text-[11.5px] bg-transparent border-none focus:outline-none w-28" />
            </div>
          </div>
          <button onClick={handlePrint} type="button" className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-[12px] font-semibold rounded-lg px-3.5 py-1.5 shadow-sm shadow-amber-200 transition-all hover:-translate-y-0.5 cursor-pointer">
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-linear-to-br from-emerald-600 to-emerald-700 border-y border-slate-100">
                  {headerGroup.headers.map((header) => {
                    const alignRight = ['debit', 'credit', 'balance'].includes(header.column.id)
                    const canSort = header.column.getCanSort()
                    return (
                      <th key={header.id} className={`text-[13px] font-bold text-slate-50 tracking-wide px-3 py-2.5 whitespace-nowrap ${alignRight ? 'text-right' : 'text-left'}`}>
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          disabled={!canSort}
                          className={`flex items-center gap-1 select-none transition-opacity ${canSort ? 'cursor-pointer hover:opacity-80' : 'cursor-default'} ${alignRight ? 'ml-auto' : ''}`}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && (
                            <span className="text-emerald-100">
                              {header.column.getIsSorted() === "asc" ? "▲" : header.column.getIsSorted() === "desc" ? "▼" : ""}
                            </span>
                          )}
                        </button>
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr className="border-b border-slate-50 h-93">
                  <td colSpan={7} className="text-center text-[12px] text-slate-400 py-14">
                    {selectedBank ? "No records found for this bank / date range" : "Select a bank to view ledger"}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => {
                  const e = row.original
                  return (
                    <tr key={row.id} className="border-b border-slate-50 hover:bg-emerald-50/40 transition-colors">
                      <td className="text-[12px] text-slate-500 px-3 py-2.5">{row.index + 1}</td>
                      <td className="text-[12px] text-slate-500 px-3 py-2.5 whitespace-nowrap">
                        {e.date ? new Date(e.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                      </td>
                      <td className="text-[12px] text-slate-600 px-3 py-2.5">{e.description || "-"}</td>
                      <td className="text-[12px] text-slate-400 px-3 py-2.5 font-mono whitespace-nowrap">{e.voucherNo || "-"}</td>
                      <td className="text-[12px] text-emerald-600 font-semibold px-3 py-2.5 text-right whitespace-nowrap">
                        {e.debit ? Number(e.debit).toLocaleString() : "-"}
                      </td>
                      <td className="text-[12px] text-rose-600 font-semibold px-3 py-2.5 text-right whitespace-nowrap">
                        {e.credit ? Number(e.credit).toLocaleString() : "-"}
                      </td>
                      <td className="text-[12px] text-slate-900 font-bold px-3 py-2.5 text-right whitespace-nowrap">
                        {Number(e.balance || 0).toLocaleString()}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>

            <tfoot>
              <tr className="bg-slate-50 border-t border-slate-100">
                <td colSpan={4} className="text-[12.5px] font-bold text-slate-700 px-3 py-2.5 text-right">Grand Total:</td>
                <td className="text-[13px] font-bold text-emerald-700 px-3 py-2.5 text-right">Rs {totalDebit.toLocaleString()}</td>
                <td className="text-[13px] font-bold text-rose-600 px-3 py-2.5 text-right">Rs {totalCredit.toLocaleString()}</td>
                <td className="text-[13px] font-bold text-emerald-700 px-3 py-2.5 text-right">Rs {rangeClosing.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pagination */}
        {table.getRowModel().rows.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-[11.5px] text-slate-400 flex-wrap gap-2.5">
            <span>
              Showing <span className="font-semibold text-slate-600">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span>
              {" "}to <span className="font-semibold text-slate-600">{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}</span>
              {" "}of <span className="font-semibold text-slate-600">{table.getFilteredRowModel().rows.length}</span> entries
            </span>
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
              {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => {
                const current = table.getState().pagination.pageIndex
                if (pageIndex === 0 || pageIndex === table.getPageCount() - 1 || (pageIndex >= current - 1 && pageIndex <= current + 1)) {
                  return (
                    <button key={pageIndex} type="button" onClick={() => table.setPageIndex(pageIndex)} className={`w-7 h-7 rounded-md text-xs font-semibold transition-all cursor-pointer ${current === pageIndex ? "bg-emerald-600 text-white" : "border border-slate-200 text-slate-500 hover:bg-slate-50"}`}>{pageIndex + 1}</button>
                  )
                }
                if (pageIndex === current - 2 || pageIndex === current + 2) {
                  return <span key={pageIndex} className="px-0.5 text-slate-400">...</span>
                }
                return null
              })}
              <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default BankLedger