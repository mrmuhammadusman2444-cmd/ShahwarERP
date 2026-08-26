import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckCircle2, Landmark, XCircle, Eye, Users, Truck, Package, ShieldCheck, X, Search, Calendar, FileText, Inbox } from 'lucide-react'
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'

const TABS = [
  { key: 'customer', label: 'Customer Payment', icon: Users },
  { key: 'bank', label: 'Bank Payment', icon: Landmark },

  { key: 'supplier', label: 'Supplier Payment', icon: Truck },
  { key: 'asset', label: 'Asset Payment', icon: Package },
]

function partyName(row, tab) {
  if (tab === 'supplier') {
    let a = (row.allocations && row.allocations[0]) || {}
    return a.supplierName || "—"
  }
  if (tab === 'bank') {
    return row.toBank || row.bankName || "—"
  }
  return row.fromCustomer || "—"
}

export default function PaymentApproval() {
  const [activeTab, setActiveTab] = useState('customer')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [viewRow, setViewRow] = useState(null)
  const [busyId, setBusyId] = useState("")
  const [counts, setCounts] = useState({ customer: 0, supplier: 0, bank: 0, asset: 0 })

  async function loadPending(tab) {
    if (tab === 'asset') { setRows([]); return }
    setLoading(true)
    try {
      let res = await axios.get(`http://localhost:3000/payment-approval/${tab}`)
      console.log("APPROVAL DATA:", res.data[0])
      setRows(res.data)
    } catch (err) {
      console.log("PENDING LOAD FAILED:", err.response?.data || err.message)
      setRows([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPending(activeTab)
    setGlobalFilter("")
  }, [activeTab])

  async function handleApprove(id) {
    setBusyId(id)
    try {
      await axios.put(`http://localhost:3000/payment-approval/approve/${id}`)
      setRows((prev) => prev.filter((r) => r._id !== id))
      window.dispatchEvent(new Event('approval-changed')) /
        setViewRow(null)
    } catch (err) {
      console.log("APPROVE FAILED:", err.response?.data || err.message)
    } finally {
      setBusyId("")
    }
  }

  async function loadCounts() {
    try {
      let [cust, supp, bank] = await Promise.all([
        axios.get('http://localhost:3000/payment-approval/customer'),
        axios.get('http://localhost:3000/payment-approval/supplier'),
        axios.get('http://localhost:3000/payment-approval/bank'),
      ])
      setCounts({
        customer: cust.data.length,
        supplier: supp.data.length,
        bank: bank.data.length,
        asset: 0,
      })
    } catch (err) {
      console.log("COUNTS FAILED:", err.response?.data || err.message)
    }
  }

  useEffect(() => {
    loadCounts()
    window.addEventListener('approval-changed', loadCounts)
    return () => window.removeEventListener('approval-changed', loadCounts)
  }, [])
  async function handleReject(id) {
    setBusyId(id)
    try {
      await axios.delete(`http://localhost:3000/payment-approval/delete/${id}`)
      setRows((prev) => prev.filter((r) => r._id !== id))
      window.dispatchEvent(new Event('approval-changed'))
      setViewRow(null)
    } catch (err) {
      console.log("REJECT FAILED:", err.response?.data || err.message)
    } finally {
      setBusyId("")
    }
  }

  const columns = [
    { header: 'S No', id: 'sno', enableSorting: false },
    { header: 'Date', accessorKey: 'date' },
    { header: 'Voucher', accessorKey: 'voucherNo' },
    { header: 'Party', id: 'party', accessorFn: (r) => partyName(r, activeTab) },
    { header: 'Flow', id: 'flow', enableSorting: false },
    { header: 'Description', accessorKey: 'remark' },
    { header: 'Amount', accessorKey: 'totalAmount' },
    { header: 'Action', id: 'action', enableSorting: false },
  ]

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  })

  return (
    <div className="p-3.5 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 shadow-md shadow-emerald-200 shrink-0">
          <ShieldCheck className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">Payment Approval</h1>
          <p className="text-[11px] text-slate-400">Pending payments ko review, approve ya reject karein</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {TABS.map((t) => {
          const active = activeTab === t.key
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key)}
              className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12.5px] font-semibold transition-all cursor-pointer ${active
                ? 'bg-linear-to-r from-emerald-600 to-emerald-700 text-white shadow-md shadow-emerald-200'
                : 'bg-white text-slate-500 border border-slate-200 hover:border-emerald-300 hover:text-emerald-700'}`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
              {counts[t.key] > 0 && (
                <span className={`ml-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10.5px] font-bold ${active ? 'bg-white text-emerald-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {counts[t.key]}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">

        {/* Card header + search */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 flex-wrap gap-2">
          <p className="text-[13px] font-bold text-slate-900">
            {TABS.find((t) => t.key === activeTab)?.label} Approvals
            <span className="ml-2 text-[11px] font-medium text-slate-400">({table.getFilteredRowModel().rows.length} pending)</span>
          </p>
          <div className="flex items-center gap-1.5 border border-slate-200 rounded-full px-3 py-1.5 bg-emerald-50/60 focus-within:border-emerald-400 transition-all">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <input value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." className="text-[12px] bg-transparent border-none focus:outline-none w-32" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="bg-linear-to-br from-emerald-600 to-emerald-700">
                  {hg.headers.map((header) => {
                    const alignRight = ['totalAmount'].includes(header.column.id)
                    const center = ['action'].includes(header.column.id)
                    const canSort = header.column.getCanSort()
                    return (
                      <th key={header.id} className={`text-[12px] font-bold text-slate-50 tracking-wide px-3 py-2.5 whitespace-nowrap ${alignRight ? 'text-right' : center ? 'text-center' : 'text-left'}`}>
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          disabled={!canSort}
                          className={`flex items-center gap-1 select-none ${canSort ? 'cursor-pointer hover:opacity-80' : 'cursor-default'} ${alignRight ? 'ml-auto' : center ? 'mx-auto' : ''}`}
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
              {loading ? (
                <tr><td colSpan={7} className="text-center text-[12px] text-slate-400 py-14">Loading...</td></tr>
              ) : activeTab === 'asset' ? (
                <tr>
                  <td colSpan={7} className="text-center py-14">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                        <Package className="w-6 h-6 text-slate-300" />
                      </div>
                      <p className="text-slate-500 text-sm font-medium">Asset payment coming soon</p>
                      <p className="text-slate-400 text-xs">Ye tab abhi setup nahi hua</p>
                    </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-14">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                        <Inbox className="w-6 h-6 text-emerald-300" />
                      </div>
                      <p className="text-slate-600 text-sm font-medium">No pending approvals</p>
                      <p className="text-slate-400 text-xs">Sab clear hai 🎉</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => {
                  const r = row.original
                  return (
                    <tr key={row.id} className="border-b border-slate-50 hover:bg-emerald-50/40 transition-colors">
                      <td className="text-[12px] text-slate-500 px-3 py-2.5">{row.index + 1}</td>
                      <td className="text-[12px] text-slate-500 px-3 py-2.5 whitespace-nowrap">
                        {r.date ? new Date(r.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                      </td>
                      <td className="text-[12px] text-slate-400 px-3 py-2.5 font-mono whitespace-nowrap">{r.voucherNo || "-"}</td>
                      <td className="text-[12px] text-slate-800 font-semibold px-3 py-2.5">{partyName(r, activeTab)}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <span className="capitalize inline-flex items-center rounded-md bg-slate-100 text-slate-600 px-2 py-0.5 font-medium">{r.fromType || "—"}</span>
                          <span className="text-slate-300">→</span>
                          <span className="capitalize inline-flex items-center rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 px-2 py-0.5 font-medium">{r.toType || "—"}</span>
                        </div>
                      </td>
                      <td className="text-[12px] text-slate-600 px-3 py-2.5 max-w-48 truncate">{r.remark || "-"}</td>
                      <td className="text-[12px] text-slate-900 font-bold px-3 py-2.5 text-right whitespace-nowrap">
                        <span className="text-slate-400 text-[10px] font-normal mr-0.5">Rs.</span>
                        {Number(r.totalAmount || 0).toLocaleString()}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setViewRow(r)}
                            title="View"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-100 cursor-pointer transition-all hover:scale-110 active:scale-95">
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleApprove(r._id)}
                            disabled={busyId === r._id}
                            title="Accept"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-all hover:scale-110 active:scale-95 disabled:opacity-40">
                            <CheckCircle2 size={16} />
                          </button>
                          <button
                            onClick={() => handleReject(r._id)}
                            disabled={busyId === r._id}
                            title="Reject"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-100 cursor-pointer transition-all hover:scale-110 active:scale-95 disabled:opacity-40">
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {table.getRowModel().rows.length > 0 && activeTab !== 'asset' && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-[11.5px] text-slate-400 flex-wrap gap-2.5">
            <span>
              Showing <span className="font-semibold text-slate-600">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span>
              {" "}to <span className="font-semibold text-slate-600">{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}</span>
              {" "}of <span className="font-semibold text-slate-600">{table.getFilteredRowModel().rows.length}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
              {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pi) => {
                const cur = table.getState().pagination.pageIndex
                if (pi === 0 || pi === table.getPageCount() - 1 || (pi >= cur - 1 && pi <= cur + 1)) {
                  return (
                    <button key={pi} type="button" onClick={() => table.setPageIndex(pi)} className={`w-7 h-7 rounded-md text-xs font-semibold transition-all cursor-pointer ${cur === pi ? "bg-emerald-600 text-white" : "border border-slate-200 text-slate-500 hover:bg-slate-50"}`}>{pi + 1}</button>
                  )
                }
                if (pi === cur - 2 || pi === cur + 2) return <span key={pi} className="px-0.5 text-slate-400">...</span>
                return null
              })}
              <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onClick={() => setViewRow(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-between px-5 py-4 bg-linear-to-r from-emerald-600 to-emerald-700">
              <div className="flex items-center gap-2 text-white">
                <FileText className="w-5 h-5" />
                <span className="font-bold text-sm">Payment Detail</span>
              </div>
              <button onClick={() => setViewRow(null)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <DetailRow label="Voucher No" value={viewRow.voucherNo || "-"} mono />
              <DetailRow label="Date" value={viewRow.date ? new Date(viewRow.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-"} />
              <DetailRow label="Party" value={viewRow.toOther || (viewRow.toType === 'cash' ? 'Cash' : viewRow.toType === 'bank' ? (viewRow.bankName || 'Bank') : partyName(viewRow, activeTab))} />
              {viewRow.fromCustomer && (
                <DetailRow label="Paid By" value={viewRow.fromCustomer} />
              )}
              {viewRow.bankName && (
                <DetailRow label="Bank" value={viewRow.bankName} />
              )}
              {viewRow.fromBank && (
                <DetailRow label="From Bank" value={viewRow.fromBank} />
              )}
              {viewRow.toBank && (
                <DetailRow label="To Bank" value={viewRow.toBank} />
              )}
              <DetailRow label="Amount" value={`Rs. ${Number(viewRow.totalAmount || 0).toLocaleString()}`} strong />
              <DetailRow label="Description" value={viewRow.remark || "-"} />
              <DetailRow label="Status" value={viewRow.status || "-"} />
            </div>

            <div className="flex items-center gap-2 px-5 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => handleReject(viewRow._id)}
                disabled={busyId === viewRow._id}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-[13px] font-semibold py-2.5 transition-all cursor-pointer disabled:opacity-40">
                <XCircle className="w-4 h-4" />
                Reject
              </button>
              <button
                onClick={() => handleApprove(viewRow._id)}
                disabled={busyId === viewRow._id}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[13px] font-semibold py-2.5 shadow-md shadow-emerald-200 transition-all cursor-pointer disabled:opacity-40">
                <CheckCircle2 className="w-4 h-4" />
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DetailRow({ label, value, mono, strong }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400 shrink-0">{label}</span>
      <span className={`text-[13px] text-right ${mono ? 'font-mono' : ''} ${strong ? 'font-bold text-emerald-700' : 'font-medium text-slate-700'}`}>{value}</span>
    </div>
  )
}